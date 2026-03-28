import React, { useMemo, useState } from 'react';
import {
  Alert,
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
import { isRequired, isStrongPassword, isValidEmail } from '../../utils/validation';
import { AuthTabs, BookiLogo, BOOKI, UnderlineField, UnderlineTextInput } from '../../components/BookiAuthChrome';
import { clamp, fontScale, moderateScale } from '../../utils/responsive';

export default function SignupScreen({ navigation }) {
  const { signup, loading } = useAuth();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [mobileFocused, setMobileFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

  const pad = clamp(width * 0.06, 18, 24);
  const emailOk = useMemo(() => isValidEmail(email), [email]);

  const submit = async () => {
    if (!isRequired(name)) return Alert.alert('Name Required', 'Please enter your name.');
    if (!isValidEmail(email)) return Alert.alert('Invalid Email', 'Please enter a valid email.');
    if (mobile.trim().length < 10) return Alert.alert('Invalid Mobile Number', 'Please enter a valid 10 digit mobile number.');
    if (!isStrongPassword(password)) return Alert.alert('Weak Password', 'Password should be at least 6 characters.');
    if (password !== confirmPassword) return Alert.alert('Mismatch', 'Passwords do not match.');
    try {
      await signup({ name, email, password, mobile });
    } catch {
      Alert.alert('Signup Failed', 'Try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 28 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.sheet, { marginHorizontal: pad, marginTop: moderateScale(16), padding: pad }]}>
            <View style={styles.logoHeader}>
              <BookiLogo size={34} compact />
            </View>

            <AuthTabs active="signup" navigation={navigation} />

            <Text style={styles.headline}>Create Account</Text>
            <Text style={styles.sub}>Join BOOKI to book beauty and wellness in seconds.</Text>

            <UnderlineTextInput label="Full Name" value={name} onChangeText={setName} placeholder="Your full name" autoCapitalize="words" />

            <UnderlineTextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              right={
                emailOk ? <MaterialIcons name="check-circle" size={22} color={BOOKI.success} /> : <View style={{ width: 22 }} />
              }
            />

            <UnderlineField label="Mobile Number" focused={mobileFocused}>
              <Text style={styles.cc}>+91</Text>
              <TextInput
                value={mobile}
                onChangeText={(v) => setMobile(v.replace(/[^0-9]/g, '').slice(0, 10))}
                placeholder="10 digit number"
                keyboardType="phone-pad"
                maxLength={10}
                placeholderTextColor={BOOKI.muted}
                style={styles.flexInput}
                onFocus={() => setMobileFocused(true)}
                onBlur={() => setMobileFocused(false)}
              />
              <MaterialIcons name="smartphone" size={22} color={mobile.length === 10 ? BOOKI.success : BOOKI.muted} />
            </UnderlineField>

            <UnderlineField label="Password" focused={passFocused}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={BOOKI.muted}
                secureTextEntry={!showPass}
                style={styles.flexInput}
                onFocus={() => setPassFocused(true)}
                onBlur={() => setPassFocused(false)}
              />
              <Pressable onPress={() => setShowPass((p) => !p)} hitSlop={8}>
                <MaterialIcons name={showPass ? 'visibility-off' : 'visibility'} size={22} color={BOOKI.muted} />
              </Pressable>
            </UnderlineField>

            <UnderlineField label="Confirm Password" focused={confirmFocused}>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••••"
                placeholderTextColor={BOOKI.muted}
                secureTextEntry={!showConfirm}
                style={styles.flexInput}
                onFocus={() => setConfirmFocused(true)}
                onBlur={() => setConfirmFocused(false)}
              />
              <Pressable onPress={() => setShowConfirm((p) => !p)} hitSlop={8}>
                <MaterialIcons name={showConfirm ? 'visibility-off' : 'visibility'} size={22} color={BOOKI.muted} />
              </Pressable>
            </UnderlineField>

            <Pressable
              disabled={loading}
              onPress={submit}
              style={({ pressed }) => [styles.primaryBtn, pressed && styles.primaryBtnPressed, loading && styles.primaryBtnDisabled]}
            >
              <Text style={styles.primaryBtnText}>{loading ? 'Creating account...' : 'Create Account'}</Text>
            </Pressable>

            <Text style={styles.terms}>
              By creating an account you are accepting our{' '}
              <Text style={styles.termsBold} onPress={() => Alert.alert('Terms', 'Terms of Service — add your URL later.')}>
                Terms of Services
              </Text>
              .
            </Text>

            <Pressable style={styles.signInRow} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signInText}>Already have an account? Sign in</Text>
            </Pressable>
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
  sheet: {
    backgroundColor: BOOKI.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
  logoHeader: { alignItems: 'center', marginBottom: 4 },
  headline: {
    fontSize: fontScale(26),
    fontWeight: '800',
    color: BOOKI.charcoal,
    marginTop: 16,
    letterSpacing: -0.5,
  },
  sub: { color: BOOKI.muted, marginTop: 8, marginBottom: 12, fontSize: fontScale(14), lineHeight: 20 },
  cc: { fontWeight: '700', color: BOOKI.charcoal, marginRight: 10, fontSize: fontScale(15) },
  flexInput: { flex: 1, fontSize: fontScale(16), color: BOOKI.charcoal, paddingVertical: 4 },
  primaryBtn: {
    marginTop: 8,
    minHeight: 54,
    borderRadius: 6,
    backgroundColor: BOOKI.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnPressed: { opacity: 0.92 },
  primaryBtnDisabled: { opacity: 0.65 },
  primaryBtnText: { color: BOOKI.white, fontSize: fontScale(17), fontWeight: '700' },
  terms: {
    marginTop: 22,
    textAlign: 'center',
    fontSize: fontScale(13),
    lineHeight: 20,
    color: BOOKI.muted,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  termsBold: { fontWeight: '700', color: BOOKI.charcoal },
  signInRow: { marginTop: 18, alignItems: 'center' },
  signInText: { fontSize: fontScale(14), fontWeight: '700', color: BOOKI.orange },
});
