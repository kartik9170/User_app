import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
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
import { ROLES } from '../../utils/constants';
import { AuthTabs, BookiLogo, BOOKI, UnderlineField } from '../../components/BookiAuthChrome';
import { clamp, fontScale, moderateScale } from '../../utils/responsive';

/** Toast copy for failed sign-in — keep one clear line in the popup. */
function formatLoginErrorToast(raw) {
  const msg = String(raw || '').trim();
  if (/not active|suspended/i.test(msg)) return 'This account is not active.';
  return 'Invalid credentials.';
}

export default function LoginScreen({ navigation }) {
  const { login, loading, setRole } = useAuth();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [countryCode] = useState('+91');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [mobileFocused, setMobileFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [loginErrorToast, setLoginErrorToast] = useState(null);
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastTranslateY = useRef(new Animated.Value(-22)).current;
  const toastScale = useRef(new Animated.Value(0.9)).current;
  const toastHideTimerRef = useRef(null);

  const runToastHide = useCallback(() => {
    Animated.parallel([
      Animated.timing(toastOpacity, { toValue: 0, duration: 220, useNativeDriver: true }),
      Animated.timing(toastTranslateY, { toValue: -12, duration: 220, useNativeDriver: true }),
      Animated.timing(toastScale, { toValue: 0.94, duration: 220, useNativeDriver: true }),
    ]).start(({ finished }) => {
      if (finished) setLoginErrorToast(null);
    });
  }, [toastOpacity, toastTranslateY, toastScale]);

  const dismissToast = useCallback(() => {
    if (toastHideTimerRef.current) {
      clearTimeout(toastHideTimerRef.current);
      toastHideTimerRef.current = null;
    }
    runToastHide();
  }, [runToastHide]);

  useEffect(() => {
    if (!loginErrorToast) return undefined;
    toastOpacity.setValue(0);
    toastTranslateY.setValue(-22);
    toastScale.setValue(0.9);
    Animated.parallel([
      Animated.timing(toastOpacity, { toValue: 1, duration: 280, useNativeDriver: true }),
      Animated.spring(toastTranslateY, {
        toValue: 0,
        friction: 8,
        tension: 160,
        useNativeDriver: true,
      }),
      Animated.spring(toastScale, {
        toValue: 1,
        friction: 8,
        tension: 160,
        useNativeDriver: true,
      }),
    ]).start();
    toastHideTimerRef.current = setTimeout(runToastHide, 4000);
    return () => {
      if (toastHideTimerRef.current) {
        clearTimeout(toastHideTimerRef.current);
        toastHideTimerRef.current = null;
      }
    };
  }, [loginErrorToast, runToastHide, toastOpacity, toastTranslateY, toastScale]);

  const heroHeight = clamp(width * 0.52, 200, 280);
  const pad = clamp(width * 0.06, 18, 24);

  const mobileValid = mobile.trim().length === 10;

  const submit = async () => {
    if (mobile.trim().length < 10) {
      return Alert.alert('Invalid Mobile Number', 'Please enter a valid 10 digit mobile number.');
    }
    if (!password || password.length < 6) {
      return Alert.alert('Password', 'Enter the password you used when you registered (min. 6 characters).');
    }
    try {
      await login({ mobile, password });
      setRole(ROLES.CUSTOMER);
    } catch (error) {
      setLoginErrorToast(formatLoginErrorToast(error?.message || 'Sign in failed.'));
    }
  };

  const toastMaxW = Math.min(248, width - 24);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {loginErrorToast ? (
        <Animated.View
          style={[
            styles.errorToastWrap,
            {
              top: Math.max(insets.top, 8) + 2,
              right: 10,
              width: toastMaxW,
              opacity: toastOpacity,
              transform: [{ translateY: toastTranslateY }, { scale: toastScale }],
            },
          ]}
          pointerEvents="box-none"
        >
          <Pressable
            accessibilityRole="alert"
            onPress={dismissToast}
            style={styles.errorToast}
          >
            <MaterialIcons name="error-outline" size={15} color="#B91C1C" style={styles.errorToastIcon} />
            <Text style={styles.errorToastText}>{loginErrorToast}</Text>
          </Pressable>
        </Animated.View>
      ) : null}
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 24 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.heroWrap, { height: heroHeight }]}>
            <ImageBackground
              source={{
                uri: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVhdXR5fGVufDB8fDB8fHww',
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
            <Text style={styles.sub}>Sign in with your registered mobile number and password.</Text>

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

            <UnderlineField label="Password" focused={passFocused}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Your account password"
                placeholderTextColor={BOOKI.muted}
                secureTextEntry={!showPass}
                style={styles.mobileInput}
                onFocus={() => setPassFocused(true)}
                onBlur={() => setPassFocused(false)}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Pressable onPress={() => setShowPass((p) => !p)} hitSlop={8}>
                <MaterialIcons name={showPass ? 'visibility-off' : 'visibility'} size={22} color={BOOKI.muted} />
              </Pressable>
            </UnderlineField>

            <Text style={styles.hintMuted}>New users: create an account first — your details are saved securely. OTP login can be added later.</Text>

            <Pressable
              disabled={loading}
              onPress={submit}
              style={({ pressed }) => [styles.primaryBtn, pressed && styles.primaryBtnPressed, loading && styles.primaryBtnDisabled]}
            >
              <Text style={styles.primaryBtnText}>{loading ? 'Signing in...' : 'Login'}</Text>
            </Pressable>

            <Pressable
              onPress={() =>
                Alert.alert(
                  'Forgot password?',
                  'Reset via SMS (OTP) will be available in a future update. For now, contact support or sign up again with a new email if needed.'
                )
              }
            >
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
  errorToastWrap: {
    position: 'absolute',
    zIndex: 9999,
  },
  errorToast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 11,
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(185, 28, 28, 0.22)',
    borderLeftWidth: 3,
    borderLeftColor: '#DC2626',
    backgroundColor: '#FEF2F2',
    shadowColor: '#450a0a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  },
  errorToastIcon: { marginRight: 7 },
  errorToastText: {
    flex: 1,
    color: '#991B1B',
    fontSize: fontScale(12),
    fontWeight: '600',
    lineHeight: fontScale(16),
  },
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
  hintMuted: {
    marginTop: 10,
    fontSize: fontScale(11),
    lineHeight: fontScale(16),
    color: BOOKI.muted,
  },
  cc: { fontWeight: '700', color: BOOKI.charcoal, marginRight: 10, fontSize: fontScale(15) },
  mobileInput: {
    flex: 1,
    fontSize: fontScale(16),
    color: BOOKI.charcoal,
    paddingVertical: 4,
  },
  primaryBtn: {
    marginTop: 18,
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
