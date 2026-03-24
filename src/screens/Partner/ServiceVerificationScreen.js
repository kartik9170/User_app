import React, { useRef, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontScale } from '../../utils/responsive';

export default function ServiceVerificationScreen({ navigation, route }) {
  const booking = route?.params?.booking;
  const [otp, setOtp] = useState(['', '', '', '']);
  const refs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const details = {
    serviceName: booking?.serviceName || booking?.service?.name || 'Luxury Silk Press',
    customerName: booking?.customerName || 'Sarah Jenkins',
    time: booking?.time || '14:00 - 15:30',
  };

  const onOtpChange = (index, value) => {
    const next = value.replace(/[^0-9]/g, '').slice(-1);
    setOtp((prev) => prev.map((digit, i) => (i === index ? next : digit)));
    if (next && index < 3) refs[index + 1]?.current?.focus();
  };

  const verifyAndContinue = () => {
    if (otp.join('').length < 4) {
      Alert.alert('Invalid OTP', 'Please enter the 4-digit verification code.');
      return;
    }
    const doneRoute =
      route?.name === 'PartnerServiceVerificationPreview'
        ? 'PartnerServiceCompletionPreview'
        : 'PartnerServiceCompletion';

    navigation.replace(doneRoute, {
      booking,
      verifiedOtp: otp.join(''),
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <MaterialIcons name="close" size={22} color="#1c4f3e" />
        </Pressable>
        <Text style={styles.brand}>Emerald Pro</Text>
        <View style={styles.avatarWrap}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-nEVZ6gwRxQ1x7eINweOvr_FlCIU1CD_atOjbNI1nMQgyk-h6OTCUTUcKJLCQjUGKSYFwuylxX71JTqzmmcKy6vwPJrm0bX8ifBEY2_rzycPhvmFT3UrsG5UZVsOuZPWHl7VZ0YEwpZ5cKqGcv3fcRrz6WWHk9DW0ZqISvD5H5z96pT5JYBEe_YwJV5GX_XZMYDkeaRaYNS3TTRWAUDV_YA7SgOGGe_vf0KPnn6usYRKH1zAq7wCm3ExXJ9j4RNaJVJK6IH-_ENE',
            }}
            style={styles.avatar}
          />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.headerBlock}>
          <View style={styles.secureBadge}>
            <MaterialIcons name="verified-user" size={18} color="#1c4f3e" />
            <Text style={styles.secureText}>SECURE VERIFICATION</Text>
          </View>
          <Text style={styles.title}>Service Check-in</Text>
          <Text style={styles.subTitle}>
            Please enter the 4-digit code provided by the client to verify and start the session.
          </Text>
        </View>

        <View style={styles.serviceCard}>
          <View style={styles.serviceIcon}>
            <MaterialIcons name="spa" size={24} color="#366855" />
          </View>
          <View style={styles.serviceBody}>
            <Text style={styles.serviceName}>{details.serviceName}</Text>
            <Text style={styles.clientName}>Client: {details.customerName}</Text>
            <View style={styles.timeRow}>
              <MaterialIcons name="schedule" size={16} color="#707974" />
              <Text style={styles.timeText}>{details.time}</Text>
            </View>
          </View>
        </View>

        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={`otp-${index}`}
              ref={refs[index]}
              value={digit}
              onChangeText={(value) => onOtpChange(index, value)}
              style={styles.otpBox}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <Pressable onPress={verifyAndContinue} style={({ pressed }) => [styles.verifyBtn, pressed && styles.pressed]}>
          <Text style={styles.verifyBtnText}>Verify & Start Service</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
        </Pressable>

        <Pressable onPress={() => Alert.alert('Code Sent', 'A new OTP has been sent to the client.')}>
          <Text style={styles.resendText}>Resend Code</Text>
        </Pressable>
        <Pressable onPress={() => Alert.alert('Support', 'Please contact support for verification issues.')}>
          <Text style={styles.supportText}>Having trouble? Contact Support</Text>
        </Pressable>

        <View style={styles.footerCard}>
          <View style={styles.shieldWrap}>
            <MaterialIcons name="shield" size={18} color="#002117" />
          </View>
          <Text style={styles.footerText}>
            End-to-end encrypted session verification for Emerald Pro professionals.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0fcfa' },
  topBar: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(234,246,244,0.92)',
  },
  iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  brand: { color: '#1c4f3e', fontSize: fontScale(23), fontWeight: '800' },
  avatarWrap: { width: 32, height: 32, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(112,121,116,0.2)' },
  avatar: { width: '100%', height: '100%' },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 18 },
  headerBlock: { marginBottom: 18 },
  secureBadge: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(182,235,211,0.45)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, marginBottom: 12 },
  secureText: { color: '#1c4f3e', fontSize: fontScale(10), fontWeight: '800', letterSpacing: 1 },
  title: { color: '#313c3b', fontSize: fontScale(38), fontWeight: '800', marginBottom: 6 },
  subTitle: { color: '#404944', fontSize: fontScale(14), lineHeight: 20 },
  serviceCard: { borderRadius: 14, backgroundColor: '#eaf6f4', borderWidth: 1, borderColor: 'rgba(192,201,195,0.25)', padding: 14, flexDirection: 'row', gap: 10, marginBottom: 18 },
  serviceIcon: { width: 48, height: 48, borderRadius: 10, backgroundColor: '#d9e5e3', alignItems: 'center', justifyContent: 'center' },
  serviceBody: { flex: 1 },
  serviceName: { color: '#313c3b', fontSize: fontScale(18), fontWeight: '700' },
  clientName: { color: '#5f6b66', fontSize: fontScale(13), marginTop: 1 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 6 },
  timeText: { color: '#707974', fontSize: fontScale(12), fontWeight: '600' },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  otpBox: { width: 62, height: 80, borderRadius: 12, borderBottomWidth: 2, borderColor: '#c0c9c3', backgroundColor: '#ffffff', color: '#313c3b', fontSize: fontScale(34), fontWeight: '800' },
  verifyBtn: { minHeight: 58, borderRadius: 999, backgroundColor: '#366855', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 14 },
  verifyBtnText: { color: '#FFFFFF', fontSize: fontScale(17), fontWeight: '700' },
  resendText: { textAlign: 'center', color: '#1c4f3e', fontSize: fontScale(14), fontWeight: '600', marginBottom: 18 },
  supportText: { textAlign: 'center', color: '#5f6b66', fontSize: fontScale(14), marginBottom: 14 },
  footerCard: { marginTop: 'auto', borderRadius: 12, backgroundColor: 'rgba(208,221,218,0.35)', padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  shieldWrap: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#a6f2d4', alignItems: 'center', justifyContent: 'center' },
  footerText: { flex: 1, color: '#5f6b66', fontSize: fontScale(10), fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8, lineHeight: 14 },
  pressed: { transform: [{ scale: 0.98 }] },
});
