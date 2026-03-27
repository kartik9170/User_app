import React, { useMemo, useRef, useState } from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useAuth from '../../hooks/useAuth';
import { resendLoginOtp, sendLoginOtp } from '../../services/authService';
import { ROLES } from '../../utils/constants';
import { clamp, fontScale, moderateScale } from '../../utils/responsive';

export default function LoginScreen({ navigation }) {
  const { login, loading, setRole } = useAuth();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const compact = width < 370;
  const [countryCode] = useState('+91');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpSending, setOtpSending] = useState(false);
  /** Last mobile we successfully triggered MSG91 for (send or resend). */
  const [lastOtpMobile, setLastOtpMobile] = useState('');
  const otpRefs = useRef([]);

  const titleSize = useMemo(() => (compact ? fontScale(30) : fontScale(34)), [compact]);
  const containerPadding = clamp(width * 0.06, 18, 26);
  const heroHeight = clamp(width * 0.72, 240, 330);

  const otpFilledCount = otp.filter((digit) => digit).length;

  const submit = async () => {
    if (mobile.trim().length < 10) {
      return Alert.alert('Invalid Mobile Number', 'Please enter a valid 10 digit mobile number.');
    }

    if (otp.join('').length < 4) {
      return Alert.alert('Verification Incomplete', 'Please enter the 4 digit verification code.');
    }

    try {
      await login({ mobile, otp: otp.join('') });
      setRole(ROLES.CUSTOMER);
    } catch (error) {
      Alert.alert('Sign In Failed', error?.message || 'Please try again.');
    }
  };

  const updateOtpDigit = (index, value) => {
    const sanitized = value.replace(/[^0-9]/g, '').slice(-1);
    setOtp((prev) => prev.map((item, idx) => (idx === index ? sanitized : item)));
    if (sanitized && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (index, key) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const requestOtp = async () => {
    if (mobile.trim().length < 10) {
      return Alert.alert('Invalid Mobile Number', 'Please enter a valid 10 digit mobile number first.');
    }
    const isResend = lastOtpMobile === mobile;
    setOtpSending(true);
    try {
      if (isResend) {
        await resendLoginOtp(mobile);
      } else {
        await sendLoginOtp(mobile);
      }
      setLastOtpMobile(mobile);
      Alert.alert('OTP', isResend ? 'A new code has been sent.' : 'Verification code sent to your mobile.');
    } catch (e) {
      Alert.alert('OTP', e?.message || 'Could not send OTP. Try again.');
    } finally {
      setOtpSending(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <ScrollView
          contentInsetAdjustmentBehavior="never"
          contentContainerStyle={[styles.scrollContainer, { paddingBottom: insets.bottom + 16, paddingTop: 0 }]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.heroWrap, { height: heroHeight }]}>
            <ImageBackground
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABmaKOVdp60VpzWXL6Tin4jrCxX7JNrh0QX_4TrKEP6dDCWUhmNYsIdLU_WWjuZJ7OSNxaHMs97GkyR8Ntim_hyF4zYiitDe4hLSbiONsES58ahelORi0cNPIONRsu1i9C0EkVa4G-sx1qSEgsRIrh9ITNcuVWZWcbaX5GWA9kjfP3g4FTb1Q1w1ZYVms7XsgiB6G3ZmOQfIZjpdLkrREI61cdcnw9ekGigdyDzbFq-vs1UTXUONdLyWkcW8HIDTCIsfjPrw8PJ18',
              }}
              style={styles.heroImage}
              resizeMode="cover"
            >
              <LinearGradient colors={['rgba(49,60,59,0.2)', 'rgba(49,60,59,0.6)', '#f0fcfa']} style={styles.heroOverlay}>
                <Text style={styles.brand}>Emerald Pro</Text>
                <Text style={styles.brandSub}>PARTNER ECOSYSTEM</Text>
              </LinearGradient>
            </ImageBackground>
          </View>

          <View style={[styles.formCard, { marginHorizontal: containerPadding, marginTop: -moderateScale(62), padding: containerPadding }]}>
            <Text style={[styles.heading, { fontSize: titleSize }]}>Welcome back</Text>
            <Text style={styles.sub}>Enter your credentials to access your professional dashboard.</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>MOBILE NUMBER</Text>
              <View style={styles.inputRow}>
                <Text style={styles.countryCode}>{countryCode}</Text>
                <TextInput
                  value={mobile}
                  onChangeText={(value) => setMobile(value.replace(/[^0-9]/g, '').slice(0, 10))}
                  placeholder="555 0123"
                  keyboardType="phone-pad"
                  style={styles.mobileInput}
                  placeholderTextColor="#8A9792"
                  maxLength={10}
                />
                <MaterialIcons name="smartphone" size={20} color="#707974" />
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${Math.max(20, (mobile.length / 10) * 100)}%` }]} />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>VERIFICATION CODE</Text>
                <Pressable
                  disabled={otpSending || loading}
                  onPress={requestOtp}
                  hitSlop={8}
                >
                  <Text style={[styles.resendText, (otpSending || loading) && styles.resendDisabled]}>
                    {otpSending ? 'Sending…' : lastOtpMobile === mobile && mobile.length === 10 ? 'Resend' : 'Send OTP'}
                  </Text>
                </Pressable>
              </View>
              <View style={styles.otpRow}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={`otp-${index}`}
                    ref={(ref) => {
                      otpRefs.current[index] = ref;
                    }}
                    value={digit}
                    onChangeText={(value) => updateOtpDigit(index, value)}
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

            <Pressable disabled={loading} onPress={submit} style={({ pressed }) => [styles.signInButton, pressed && styles.buttonPressed, loading && styles.buttonDisabled]}>
              <LinearGradient colors={['#366855', '#025d47']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.signInGradient}>
                <Text style={styles.signInText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
              </LinearGradient>
            </Pressable>

            <View style={styles.footerBlock}>
              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.footerLabel}>New to Emerald Pro?</Text>
                <View style={styles.divider} />
              </View>

              <Pressable onPress={() => navigation.navigate('PartnerProfileSetup')}>
                <Text style={styles.applyText}>Join as Partner</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.supportSection}>
            <View style={styles.supportRow}>
              <View style={styles.supportItem}>
                <MaterialIcons name="help-outline" size={16} color="#66726d" />
                <Text style={styles.supportText}>Help Center</Text>
              </View>
              <View style={styles.supportItem}>
                <MaterialIcons name="language" size={16} color="#66726d" />
                <Text style={styles.supportText}>Language</Text>
              </View>
            </View>
            <Text style={styles.versionText}>Version 4.2.0 • Editorial Artisan Edition</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0fcfa' },
  flex: { flex: 1 },
  scrollContainer: { flexGrow: 1, backgroundColor: '#f0fcfa' },
  heroWrap: { width: '100%', backgroundColor: '#313c3b' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { flex: 1, justifyContent: 'flex-start', paddingTop: 44, paddingHorizontal: 24 },
  brand: { color: '#FFFFFF', fontSize: fontScale(32), fontWeight: '900', fontStyle: 'italic' },
  brandSub: { color: '#b9eed6', fontSize: fontScale(10), letterSpacing: 2.2, marginTop: 4 },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    shadowColor: '#131e1c',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  heading: { color: '#313c3b', fontWeight: '700', letterSpacing: -0.8 },
  sub: { color: '#404944', marginTop: 8, marginBottom: 24, fontSize: fontScale(14), lineHeight: 20 },
  fieldGroup: { marginBottom: 20 },
  label: { color: '#4f5a56', fontSize: fontScale(11), fontWeight: '700', letterSpacing: 1.5, marginBottom: 8 },
  inputRow: {
    minHeight: 56,
    borderRadius: 14,
    backgroundColor: '#deebe8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  countryCode: { color: '#366855', fontWeight: '600', marginRight: 10, fontSize: fontScale(15) },
  mobileInput: {
    flex: 1,
    color: '#313c3b',
    fontSize: fontScale(16),
    borderWidth: 0,
    outlineWidth: 0,
    outlineColor: 'transparent',
  },
  progressTrack: { height: 3, backgroundColor: '#e4f0ee', borderRadius: 999, overflow: 'hidden', marginTop: 8 },
  progressFill: { height: '100%', backgroundColor: '#366855', borderRadius: 999 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  resendText: { color: '#366855', fontWeight: '700', fontSize: fontScale(11), letterSpacing: 1 },
  resendDisabled: { opacity: 0.45 },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  otpInput: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#deebe8',
    borderWidth: 0,
    outlineWidth: 0,
    outlineColor: 'transparent',
    color: '#313c3b',
    fontSize: fontScale(22),
    fontWeight: '700',
  },
  otpHint: { marginTop: 8, color: '#6d7873', fontSize: fontScale(11) },
  signInButton: { marginTop: 8, borderRadius: 14, overflow: 'hidden' },
  signInGradient: { height: 56, alignItems: 'center', justifyContent: 'center' },
  signInText: { color: '#FFFFFF', fontWeight: '700', fontSize: fontScale(18) },
  buttonPressed: { transform: [{ scale: 0.985 }] },
  buttonDisabled: { opacity: 0.7 },
  footerBlock: { marginTop: 28, alignItems: 'center' },
  dividerRow: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 },
  divider: { width: 30, height: 1, backgroundColor: 'rgba(112,121,116,0.35)' },
  footerLabel: { color: '#5f6b66', fontSize: fontScale(12), fontWeight: '500' },
  applyText: {
    color: '#1c4f3e',
    fontWeight: '700',
    fontSize: fontScale(16),
    paddingBottom: 2,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(54,104,85,0.2)',
  },
  supportSection: { alignItems: 'center', marginTop: 28, marginBottom: 10, paddingHorizontal: 12 },
  supportRow: { flexDirection: 'row', gap: 26 },
  supportItem: { flexDirection: 'row', alignItems: 'center', gap: 6, opacity: 0.7 },
  supportText: { color: '#5f6b66', fontSize: fontScale(11), fontWeight: '600', letterSpacing: 0.4 },
  versionText: { marginTop: 16, color: 'rgba(112,121,116,0.55)', fontSize: fontScale(10), letterSpacing: 1.2, textTransform: 'uppercase' },
});
