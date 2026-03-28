import React, { useRef, useState } from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useAuth from '../../hooks/useAuth';
import { resendLoginOtp, sendLoginOtp } from '../../services/authService';
import { ROLES } from '../../utils/constants';
import { AuthTabs, BookiLogo, BOOKI, UnderlineField } from '../../components/BookiAuthChrome';
import { clamp, fontScale, moderateScale } from '../../utils/responsive';

export default function LoginScreen({ navigation }) {
  const { login, loading, setRole } = useAuth();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [countryCode] = useState('+91');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpSending, setOtpSending] = useState(false);
  const [lastOtpMobile, setLastOtpMobile] = useState('');
  const [mobileFocused, setMobileFocused] = useState(false);
  const otpRefs = useRef([]);

  const heroHeight = clamp(width * 0.52, 200, 280);
  const pad = clamp(width * 0.06, 18, 24);

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

  const mobileValid = mobile.trim().length === 10;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 24 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.heroWrap, { height: heroHeight }]}>
            <ImageBackground
              source={{
                uri: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
              }}
              style={styles.heroImage}
              resizeMode="cover"
            >
              <View style={styles.heroTint} />
            </ImageBackground>
          </View>

          <View style={[styles.sheet, { marginHorizontal: pad, padding: pad }]}>
            <View style={styles.logoHeader}>
              <BookiLogo size={36} compact />
            </View>

            <AuthTabs active="login" navigation={navigation} />

            <Text style={styles.headline}>Welcome back</Text>
            <Text style={styles.sub}>Enter your mobile and verification code to sign in.</Text>

            <UnderlineField label="Mobile Number" focused={mobileFocused}>
              <Text style={styles.cc}>{countryCode}</Text>
              <TextInput
                value={mobile}
                onChangeText={(value) => setMobile(value.replace(/[^0-9]/g, '').slice(0, 10))}
                placeholder="98765 43210"
                keyboardType="phone-pad"
                maxLength={10}
                placeholderTextColor={BOOKI.muted}
                style={styles.mobileInput}
                onFocus={() => setMobileFocused(true)}
                onBlur={() => setMobileFocused(false)}
              />
              <MaterialIcons name="smartphone" size={22} color={mobileValid ? BOOKI.success : BOOKI.muted} />
            </UnderlineField>

            <View style={styles.otpHeader}>
              <Text style={styles.otpLabel}>Verification code</Text>
              <Pressable disabled={otpSending || loading} onPress={requestOtp} hitSlop={8}>
                <Text style={[styles.sendLink, (otpSending || loading) && styles.sendLinkDisabled]}>
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
                  style={styles.otpBox}
                  textAlign="center"
                  placeholder="•"
                  placeholderTextColor={BOOKI.line}
                />
              ))}
            </View>
            <Text style={styles.otpHint}>{otpFilledCount}/4 digits</Text>

            <Pressable
              disabled={loading}
              onPress={submit}
              style={({ pressed }) => [styles.primaryBtn, pressed && styles.primaryBtnPressed, loading && styles.primaryBtnDisabled]}
            >
              <Text style={styles.primaryBtnText}>{loading ? 'Signing in...' : 'Login'}</Text>
            </Pressable>

            <Pressable onPress={() => Alert.alert('Forgot password?', 'Use OTP login — we verify with your mobile number.')}>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </Pressable>

            <View style={styles.switchRow}>
              <Text style={styles.switchMuted}>New to BOOKI? </Text>
              <Pressable onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.switchLink}>Create account</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BOOKI.bg },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, backgroundColor: BOOKI.bg },
  heroWrap: { width: '100%', backgroundColor: BOOKI.charcoal },
  heroImage: { width: '100%', height: '100%' },
  heroTint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,107,53,0.12)' },
  sheet: {
    marginTop: -moderateScale(28),
    backgroundColor: BOOKI.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
  logoHeader: { alignItems: 'center', marginBottom: 8 },
  headline: {
    fontSize: fontScale(26),
    fontWeight: '800',
    color: BOOKI.charcoal,
    marginTop: 16,
    letterSpacing: -0.5,
  },
  sub: { color: BOOKI.muted, marginTop: 8, marginBottom: 8, fontSize: fontScale(14), lineHeight: 20 },
  cc: { fontWeight: '700', color: BOOKI.charcoal, marginRight: 10, fontSize: fontScale(15) },
  mobileInput: {
    flex: 1,
    fontSize: fontScale(16),
    color: BOOKI.charcoal,
    paddingVertical: 4,
  },
  otpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 4,
  },
  otpLabel: { fontSize: 13, fontWeight: '600', color: BOOKI.charcoal },
  sendLink: { fontSize: 13, fontWeight: '700', color: BOOKI.orange },
  sendLinkDisabled: { opacity: 0.45 },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  otpBox: {
    flex: 1,
    maxWidth: 56,
    height: 52,
    fontSize: fontScale(22),
    fontWeight: '700',
    color: BOOKI.charcoal,
    borderBottomWidth: 2,
    borderBottomColor: BOOKI.line,
    paddingBottom: 4,
  },
  otpHint: { marginTop: 8, color: BOOKI.muted, fontSize: fontScale(11) },
  primaryBtn: {
    marginTop: 22,
    minHeight: 54,
    borderRadius: 6,
    backgroundColor: BOOKI.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnPressed: { opacity: 0.92 },
  primaryBtnDisabled: { opacity: 0.65 },
  primaryBtnText: { color: BOOKI.white, fontSize: fontScale(17), fontWeight: '700' },
  forgot: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: fontScale(15),
    color: BOOKI.charcoal,
    textDecorationLine: 'underline',
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    flexWrap: 'wrap',
  },
  switchMuted: { fontSize: fontScale(14), color: BOOKI.muted },
  switchLink: { fontSize: fontScale(14), fontWeight: '800', color: BOOKI.orange },
});
