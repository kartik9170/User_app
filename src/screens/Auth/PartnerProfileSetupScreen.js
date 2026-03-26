import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { clamp, fontScale } from '../../utils/responsive';
import useAuth from '../../hooks/useAuth';

const SERVICE_OPTIONS = ['Haircut', 'Facial', 'Massage', 'Waxing', 'Nail Art', 'Makeup'];
const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

const ONBOARDING_STEPS = [
  { key: 'basic', title: 'Basic Registration', status: 'pending' },
  { key: 'personal', title: 'Personal Details', status: 'pending' },
  { key: 'documents', title: 'Document Upload', status: 'verification_pending' },
  { key: 'services', title: 'Services & Pricing', status: 'verification_pending' },
  { key: 'location', title: 'Location Setup', status: 'verification_pending' },
  { key: 'bank', title: 'Bank Details', status: 'verification_pending' },
  { key: 'training', title: 'Guidelines', status: 'verification_pending' },
];

const initialForm = {
  mobile: '',
  otp: '',
  name: '',
  city: '',
  fullName: '',
  address: '',
  age: '',
  gender: '',
  experience: '',
  skills: [],
  aadhaar: '',
  pan: '',
  selfPhoto: '',
  certificates: '',
  latitude: '',
  longitude: '',
  area: '',
  city: '',
  accountHolder: '',
  accountNumber: '',
  ifsc: '',
  upi: '',
  agreed: false,
};

function Field({ label, value, onChangeText, placeholder, keyboardType = 'default', editable = true }) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={styles.input}
        placeholderTextColor="#8b9692"
        editable={editable}
      />
    </View>
  );
}

export default function PartnerProfileSetupScreen({ navigation }) {
  const { submitPartnerApplication } = useAuth();
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState(initialForm);
  const otpRefs = useRef([]);
  const [locating, setLocating] = useState(false);

  const progressText = useMemo(() => `Step ${stepIndex + 1} of ${ONBOARDING_STEPS.length}`, [stepIndex]);
  const currentStep = ONBOARDING_STEPS[stepIndex];
  const sidePadding = clamp(22, 16, 24);
  const otpFilledCount = (form.otp || '').length;

  const updateForm = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const extractFileName = (uri = '') => {
    if (!uri) return '';
    const chunks = uri.split('/');
    return chunks[chunks.length - 1] || 'uploaded-file';
  };

  const pickDocument = async (key, label) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Needed', 'Please allow gallery access to upload documents.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      updateForm(key, result.assets[0].uri);
      Alert.alert('Uploaded', `${label} uploaded successfully.`);
    }
  };

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/[^0-9]/g, '').slice(-1);
    const current = (form.otp || '').padEnd(4, ' ').split('');
    current[index] = digit || '';
    const nextOtp = current.join('').replace(/\s/g, '');
    updateForm('otp', nextOtp);
    if (digit && index < 3) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyPress = (index, key) => {
    if (key === 'Backspace' && !(form.otp || '')[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const detectCurrentLocation = async () => {
    setLocating(true);
    try {
      if (!navigator?.geolocation?.getCurrentPosition) {
        Alert.alert('Not Supported', 'Geolocation is not supported on this device.');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = String(position?.coords?.latitude || '');
          const lng = String(position?.coords?.longitude || '');
          updateForm('latitude', lat);
          updateForm('longitude', lng);
          try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
            const response = await fetch(url, {
              headers: {
                Accept: 'application/json',
              },
            });
            const data = await response.json();
            const address = data?.address || {};
            const areaName =
              address.suburb ||
              address.neighbourhood ||
              address.city_district ||
              address.road ||
              '';
            const cityName =
              address.city ||
              address.town ||
              address.village ||
              address.county ||
              '';
            updateForm('area', areaName);
            updateForm('city', cityName);
          } catch (err) {
            // Keep lat/long saved even if reverse geocoding fails.
            updateForm('area', '');
            updateForm('city', '');
          }
          setLocating(false);
        },
        () => {
          setLocating(false);
          Alert.alert('Permission Needed', 'Please allow location access for auto location.');
        },
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 10000 }
      );
      return;
    } catch (error) {
      Alert.alert('Location Error', 'Current location fetch nahi ho paayi. Please try again.');
      setLocating(false);
      return;
    }
  };

  useEffect(() => {
    if (currentStep.key === 'location' && (!form.latitude || !form.longitude)) {
      detectCurrentLocation();
    }
  }, [currentStep.key]);

  const toggleSkill = (item) => {
    setForm((prev) => {
      const next = prev.skills.includes(item)
        ? prev.skills.filter((s) => s !== item)
        : [...prev.skills, item];
      return { ...prev, skills: next };
    });
  };

  const toggleServiceForPricing = (item) => {
    setForm((prev) => {
      const exists = prev.skills.includes(item);
      return {
        ...prev,
        skills: exists ? prev.skills.filter((s) => s !== item) : [...prev.skills, item],
      };
    });
  };

  const validateStep = () => {
    if (currentStep.key === 'basic') {
      if (form.mobile.trim().length < 10) return 'Valid mobile number dalo.';
      if (form.otp.trim().length !== 4) return '4 digit OTP verify karo.';
    }

    if (currentStep.key === 'personal') {
      if (!form.fullName.trim()) return 'Full name required hai.';
      if (!form.address.trim()) return 'Address required hai.';
      if (!form.age.trim()) return 'Age required hai.';
      if (!form.gender.trim()) return 'Gender select karo.';
      if (!form.experience.trim()) return 'Experience years dalo.';
      if (!form.skills.length) return 'Kam se kam 1 skill select karo.';
    }

    if (currentStep.key === 'documents') {
      if (!form.aadhaar.trim()) return 'Aadhaar upload/number required hai.';
      if (!form.pan.trim()) return 'PAN upload/number required hai.';
      if (!form.selfPhoto.trim()) return 'Self photo required hai.';
    }

    if (currentStep.key === 'services') {
      if (!form.skills.length) return 'Service select karo.';
    }

    if (currentStep.key === 'location') {
      const hasDetectedCoordinates = Boolean(form.latitude.trim() && form.longitude.trim());
      const hasDetectedAddress = Boolean(form.area.trim() || form.city.trim());
      if (!hasDetectedCoordinates && !hasDetectedAddress) {
        return 'Pehle current location detect karo.';
      }
    }

    if (currentStep.key === 'bank') {
      if (!form.accountHolder.trim()) return 'Account holder name required hai.';
      if (!form.accountNumber.trim()) return 'Account number required hai.';
      if (!form.ifsc.trim()) return 'IFSC code required hai.';
    }

    if (currentStep.key === 'training' && !form.agreed) return 'Terms agree karna required hai.';

    return '';
  };

  const goNext = () => {
    const error = validateStep();
    if (error) return Alert.alert('Required', error);
    if (stepIndex < ONBOARDING_STEPS.length - 1) {
      setStepIndex((prev) => prev + 1);
      return;
    }

    submitPartnerApplication({
      ...form,
      flowStatus: 'pending',
      verificationStatus: 'verification_pending',
      reviewStatus: 'pending',
    });
    Alert.alert('Application Submitted', 'Partner onboarding submit ho gaya. Ab admin verification ke baad panel active hoga.');
    navigation.navigate('PartnerVerification');
  };

  const goBack = () => {
    if (stepIndex === 0) {
      navigation.goBack();
      return;
    }
    setStepIndex((prev) => prev - 1);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable onPress={goBack} style={styles.iconBtn}>
          <MaterialIcons name="arrow-back" size={22} color="#366855" />
        </Pressable>
        <Text style={styles.headerTitle}>Join as Partner</Text>
        <View style={styles.iconBtn} />
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingHorizontal: sidePadding }]} showsVerticalScrollIndicator={false}>
        <Text style={styles.stepText}>{progressText}</Text>
        <Text style={styles.mainTitle}>{currentStep.title}</Text>
        <Text style={styles.sub}>
          Partner panel tabhi open hoga jab onboarding complete ho aur admin status `approved` karke `active` kare.
        </Text>

        <View style={styles.flowCard}>
          <Text style={styles.flowTitle}>Status Flow</Text>
          <Text style={styles.flowLine}>pending → verification_pending → approved → active</Text>
        </View>

        {currentStep.key === 'basic' ? (
          <View style={styles.authCard}>
            <Text style={styles.authTitle}>Welcome back</Text>
            <Text style={styles.authSub}>Enter your credentials to access your professional dashboard.</Text>

            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Mobile Number</Text>
              <View style={styles.mobileRow}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  value={form.mobile}
                  onChangeText={(v) => updateForm('mobile', v.replace(/[^0-9]/g, '').slice(0, 10))}
                  placeholder="10 digit number"
                  keyboardType="phone-pad"
                  style={styles.mobileInput}
                  placeholderTextColor="#8A9792"
                  maxLength={10}
                />
                <MaterialIcons name="smartphone" size={19} color="#707974" />
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${Math.max(20, (form.mobile.length / 10) * 100)}%` }]} />
              </View>
            </View>

            <View style={styles.fieldWrap}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Verification Code</Text>
                <Text style={styles.resendText}>Resend</Text>
              </View>
              <View style={styles.otpRow}>
                {[0, 1, 2, 3].map((index) => (
                  <TextInput
                    key={`partner-otp-${index}`}
                    ref={(ref) => {
                      otpRefs.current[index] = ref;
                    }}
                    value={(form.otp || '')[index] || ''}
                    onChangeText={(value) => handleOtpChange(index, value)}
                    onKeyPress={({ nativeEvent }) => handleOtpKeyPress(index, nativeEvent.key)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={styles.otpInput}
                    textAlign="center"
                  />
                ))}
              </View>
              <Text style={styles.otpHint}>{otpFilledCount}/4 digits entered</Text>
            </View>
          </View>
        ) : null}

        {currentStep.key === 'personal' ? (
          <View>
            <Field label="Full Name" value={form.fullName} onChangeText={(v) => updateForm('fullName', v)} placeholder="Full legal name" />
            <Field label="Address" value={form.address} onChangeText={(v) => updateForm('address', v)} placeholder="Complete address" />
            <Field label="Age" value={form.age} onChangeText={(v) => updateForm('age', v.replace(/[^0-9]/g, '').slice(0, 2))} placeholder="Age" keyboardType="number-pad" />
            <Field label="Experience (Years)" value={form.experience} onChangeText={(v) => updateForm('experience', v.replace(/[^0-9]/g, '').slice(0, 2))} placeholder="e.g. 5" keyboardType="number-pad" />

            <Text style={styles.label}>Gender</Text>
            <View style={styles.row}>
              {GENDER_OPTIONS.map((item) => (
                <Pressable key={item} onPress={() => updateForm('gender', item)} style={[styles.chip, form.gender === item && styles.chipActive]}>
                  <Text style={[styles.chipText, form.gender === item && styles.chipTextActive]}>{item}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.label}>Skills (Multi Select)</Text>
            <View style={styles.row}>
              {SERVICE_OPTIONS.map((item) => {
                const selected = form.skills.includes(item);
                return (
                  <Pressable key={item} onPress={() => toggleSkill(item)} style={[styles.chip, selected && styles.chipActive]}>
                    <Text style={[styles.chipText, selected && styles.chipTextActive]}>{item}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : null}

        {currentStep.key === 'documents' ? (
          <View>
            {[
              { key: 'aadhaar', label: 'Aadhaar Card', required: true },
              { key: 'pan', label: 'PAN Card', required: true },
              { key: 'selfPhoto', label: 'Self Photo', required: true },
              { key: 'certificates', label: 'Work Certificates', required: false },
            ].map((item) => {
              const value = form[item.key];
              const uploaded = Boolean(value);
              return (
                <View key={item.key} style={styles.uploadItemWrap}>
                  <Text style={styles.label}>{item.required ? item.label : `${item.label} (Optional)`}</Text>
                  <Pressable onPress={() => pickDocument(item.key, item.label)} style={[styles.uploadBtn, uploaded && styles.uploadBtnDone]}>
                    <View style={styles.uploadLeft}>
                      <MaterialIcons name={uploaded ? 'check-circle' : 'cloud-upload'} size={18} color={uploaded ? '#366855' : '#5f6b66'} />
                      <Text style={[styles.uploadBtnText, uploaded && styles.uploadBtnTextDone]}>
                        {uploaded ? 'Uploaded' : 'Click to Upload'}
                      </Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={18} color="#7a8681" />
                  </Pressable>
                  {uploaded ? <Text style={styles.uploadFileText}>{extractFileName(value)}</Text> : null}
                </View>
              );
            })}
            <Text style={styles.hint}>Backend note: documents store in S3/Cloudinary with status `verification_pending`.</Text>
          </View>
        ) : null}

        {currentStep.key === 'services' ? (
          <View>
            <Text style={styles.label}>Select Services</Text>
            <View style={styles.row}>
              {SERVICE_OPTIONS.map((item) => {
                const selected = form.skills.includes(item);
                return (
                  <Pressable key={item} onPress={() => toggleServiceForPricing(item)} style={[styles.chip, selected && styles.chipActive]}>
                    <Text style={[styles.chipText, selected && styles.chipTextActive]}>{item}</Text>
                  </Pressable>
                );
              })}
            </View>
            <Text style={styles.hint}>Pricing admin side se manage hogi.</Text>
          </View>
        ) : null}

        {currentStep.key === 'location' ? (
          <View>
            <Text style={styles.hint}>Aapki current location automatically detect hogi.</Text>
            <Field label="Area" value={form.area} onChangeText={(v) => updateForm('area', v)} placeholder="Auto detected area" editable={false} />
            <Field label="City" value={form.city} onChangeText={(v) => updateForm('city', v)} placeholder="Auto detected city" editable={false} />
            <Pressable onPress={detectCurrentLocation} style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>{locating ? 'Detecting...' : 'Use Current Location'}</Text>
            </Pressable>
          </View>
        ) : null}

        {currentStep.key === 'bank' ? (
          <View>
            <Field label="Account Holder Name" value={form.accountHolder} onChangeText={(v) => updateForm('accountHolder', v)} placeholder="As per bank" />
            <Field label="Account Number" value={form.accountNumber} onChangeText={(v) => updateForm('accountNumber', v.replace(/[^0-9]/g, '').slice(0, 18))} placeholder="Bank account number" keyboardType="number-pad" />
            <Field label="IFSC Code" value={form.ifsc} onChangeText={(v) => updateForm('ifsc', v.toUpperCase())} placeholder="SBIN0001234" />
            <Field label="UPI ID (Optional)" value={form.upi} onChangeText={(v) => updateForm('upi', v)} placeholder="name@upi" />
            <Text style={styles.hint}>Payout setup: Razorpay Route ya Stripe Connect use karo.</Text>
          </View>
        ) : null}

        {currentStep.key === 'training' ? (
          <View>
            <View style={styles.infoBlock}>
              <Text style={styles.infoTitle}>Training / Guidelines</Text>
              <Text style={styles.infoText}>- App usage guide{"\n"}- Customer behavior rules{"\n"}- Cancellation policy</Text>
            </View>
            <Pressable onPress={() => updateForm('agreed', !form.agreed)} style={styles.checkboxRow}>
              <View style={[styles.checkbox, form.agreed && styles.checkboxChecked]}>
                {form.agreed ? <MaterialIcons name="check" size={14} color="#FFFFFF" /> : null}
              </View>
              <Text style={styles.checkboxText}>I agree to terms</Text>
            </Pressable>
          </View>
        ) : null}

        <View style={styles.footerRow}>
          <Pressable onPress={goBack} style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>{stepIndex === 0 ? 'Cancel' : 'Previous'}</Text>
          </Pressable>
          <Pressable onPress={goNext} style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>{stepIndex === ONBOARDING_STEPS.length - 1 ? 'Submit' : 'Continue'}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0fcfa' },
  header: {
    height: 60,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
  },
  iconBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#313c3b', fontSize: fontScale(18), fontWeight: '800' },
  content: { paddingTop: 16, paddingBottom: 24 },
  stepText: { color: '#366855', fontWeight: '700', fontSize: fontScale(11), letterSpacing: 1.1, textTransform: 'uppercase' },
  mainTitle: { color: '#1f2a27', fontSize: fontScale(29), fontWeight: '800', marginTop: 8 },
  sub: { color: '#4c5753', marginTop: 8, marginBottom: 14, fontSize: fontScale(13), lineHeight: 18 },
  flowCard: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(182,235,211,0.45)',
    borderWidth: 1,
    borderColor: 'rgba(54,104,85,0.18)',
    marginBottom: 12,
  },
  flowTitle: { color: '#366855', fontWeight: '700', marginBottom: 4, fontSize: fontScale(12) },
  flowLine: { color: '#2c3a35', fontSize: fontScale(12) },
  authCard: {
    borderRadius: 24,
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
    marginBottom: 6,
  },
  authTitle: { color: '#1f2a27', fontSize: fontScale(24), fontWeight: '800' },
  authSub: { color: '#4f5a56', marginTop: 6, marginBottom: 14, fontSize: fontScale(13), lineHeight: 19 },
  fieldWrap: { marginBottom: 12 },
  label: {
    color: '#366855',
    fontSize: fontScale(10),
    letterSpacing: 1.2,
    fontWeight: '700',
    marginBottom: 6,
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  input: {
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: '#deebe8',
    paddingHorizontal: 12,
    color: '#313c3b',
    fontSize: fontScale(14),
    borderWidth: 0,
    outlineWidth: 0,
    outlineColor: 'transparent',
  },
  mobileRow: {
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: '#deebe8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  countryCode: { color: '#366855', fontWeight: '700', marginRight: 8, fontSize: fontScale(14) },
  mobileInput: {
    flex: 1,
    color: '#313c3b',
    fontSize: fontScale(15),
    borderWidth: 0,
    outlineWidth: 0,
    outlineColor: 'transparent',
  },
  progressTrack: { height: 3, backgroundColor: '#e4f0ee', borderRadius: 999, overflow: 'hidden', marginTop: 8 },
  progressFill: { height: '100%', backgroundColor: '#366855', borderRadius: 999 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  resendText: { color: '#366855', fontWeight: '700', fontSize: fontScale(11), letterSpacing: 0.8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  otpRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  otpInput: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#deebe8',
    color: '#313c3b',
    fontSize: fontScale(17),
    fontWeight: '700',
    borderWidth: 0,
    outlineWidth: 0,
    outlineColor: 'transparent',
  },
  otpHint: { color: '#6d7873', fontSize: fontScale(11), marginTop: -4 },
  chip: {
    minHeight: 36,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(112,121,116,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  chipActive: {
    backgroundColor: '#366855',
    borderColor: '#366855',
  },
  chipText: { color: '#4f5a56', fontWeight: '600', fontSize: fontScale(12) },
  chipTextActive: { color: '#FFFFFF' },
  hint: { color: '#5f6b66', fontSize: fontScale(11), marginBottom: 8 },
  uploadItemWrap: { marginBottom: 10 },
  uploadBtn: {
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: '#deebe8',
    borderWidth: 1,
    borderColor: 'rgba(192,201,195,0.4)',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uploadBtnDone: {
    borderColor: 'rgba(54,104,85,0.35)',
    backgroundColor: 'rgba(182,235,211,0.35)',
  },
  uploadLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  uploadBtnText: { color: '#5f6b66', fontSize: fontScale(13), fontWeight: '600' },
  uploadBtnTextDone: { color: '#366855' },
  uploadFileText: { marginTop: 4, marginLeft: 4, color: '#5f6b66', fontSize: fontScale(10) },
  infoBlock: { backgroundColor: '#deebe8', borderRadius: 12, padding: 12, marginBottom: 12 },
  infoTitle: { color: '#1f2a27', fontWeight: '700', marginBottom: 6, fontSize: fontScale(14) },
  infoText: { color: '#4f5a56', lineHeight: 20, fontSize: fontScale(13) },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(112,121,116,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: { backgroundColor: '#366855', borderColor: '#366855' },
  checkboxText: { color: '#313c3b', fontWeight: '600' },
  footerRow: { marginTop: 8, flexDirection: 'row', gap: 10 },
  secondaryBtn: {
    flex: 1,
    minHeight: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(112,121,116,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  primaryBtn: {
    flex: 1,
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: '#366855',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: { color: '#4f5a56', fontWeight: '700' },
  primaryBtnText: { color: '#FFFFFF', fontWeight: '700' },
});
