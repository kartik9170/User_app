import React, { useMemo, useState } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import useAuth from '../../hooks/useAuth';
import { isRequired, isStrongPassword, isValidEmail } from '../../utils/validation';
import { clamp, fontScale, moderateScale } from '../../utils/responsive';

export default function SignupScreen({ navigation }) {
  const { signup, loading } = useAuth();
  const { width } = useWindowDimensions();
  const compact = width < 370;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const headingSize = useMemo(() => (compact ? fontScale(30) : fontScale(34)), [compact]);
  const containerPadding = clamp(width * 0.06, 18, 26);
  const heroHeight = clamp(width * 0.62, 220, 290);

  const submit = async () => {
    if (!isRequired(name)) return Alert.alert('Name Required', 'Please enter your name.');
    if (!isValidEmail(email)) return Alert.alert('Invalid Email', 'Please enter a valid email.');
    if (mobile.trim().length < 10) return Alert.alert('Invalid Mobile Number', 'Please enter a valid 10 digit mobile number.');
    if (!isStrongPassword(password)) return Alert.alert('Weak Password', 'Password should be at least 6 characters.');
    try {
      await signup({ name, email, password, mobile });
    } catch {
      Alert.alert('Signup Failed', 'Try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={[styles.heroWrap, { height: heroHeight }]}>
            <ImageBackground
              source={{
                uri: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
              }}
              style={styles.heroImage}
            >
              <LinearGradient colors={['rgba(49,60,59,0.2)', 'rgba(49,60,59,0.7)', '#f0fcfa']} style={styles.heroOverlay}>
                <Text style={styles.brand}>Emerald Pro</Text>
                <Text style={styles.brandSub}>PARTNERSHIP APPLICATION</Text>
              </LinearGradient>
            </ImageBackground>
          </View>

          <View style={[styles.formCard, { marginHorizontal: containerPadding, marginTop: -moderateScale(50), padding: containerPadding }]}>
            <Text style={[styles.heading, { fontSize: headingSize }]}>Apply for partnership</Text>
            <Text style={styles.sub}>Create your professional account and join our elite service network.</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>FULL NAME</Text>
              <TextInput value={name} onChangeText={setName} placeholder="Enter full name" style={styles.input} placeholderTextColor="#8A9792" />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                placeholderTextColor="#8A9792"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>MOBILE NUMBER</Text>
              <TextInput
                value={mobile}
                onChangeText={(value) => setMobile(value.replace(/[^0-9]/g, '').slice(0, 10))}
                placeholder="10 digit mobile number"
                keyboardType="phone-pad"
                style={styles.input}
                placeholderTextColor="#8A9792"
                maxLength={10}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>PASSWORD</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Create strong password"
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#8A9792"
              />
            </View>

            <Pressable disabled={loading} onPress={submit} style={({ pressed }) => [styles.submitButton, pressed && styles.buttonPressed, loading && styles.buttonDisabled]}>
              <LinearGradient colors={['#366855', '#025d47']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.submitGradient}>
                <Text style={styles.submitText}>{loading ? 'Creating account...' : 'Create account'}</Text>
              </LinearGradient>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.backText}>Already have an account? Sign in</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0fcfa' },
  flex: { flex: 1 },
  scrollContainer: { flexGrow: 1, backgroundColor: '#f0fcfa', paddingBottom: 24 },
  heroWrap: { width: '100%', backgroundColor: '#313c3b' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { flex: 1, justifyContent: 'flex-start', paddingTop: 38, paddingHorizontal: 24 },
  brand: { color: '#FFFFFF', fontSize: fontScale(30), fontWeight: '900', fontStyle: 'italic' },
  brandSub: { color: '#b9eed6', fontSize: fontScale(10), letterSpacing: 2.2, marginTop: 4 },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    shadowColor: '#131e1c',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  heading: { color: '#313c3b', fontWeight: '700', letterSpacing: -0.6 },
  sub: { color: '#404944', marginTop: 8, marginBottom: 24, fontSize: fontScale(14), lineHeight: 20 },
  fieldGroup: { marginBottom: 14 },
  label: { color: '#4f5a56', fontSize: fontScale(11), fontWeight: '700', letterSpacing: 1.5, marginBottom: 8 },
  input: {
    minHeight: 54,
    borderRadius: 12,
    backgroundColor: '#deebe8',
    borderWidth: 0,
    outlineWidth: 0,
    outlineColor: 'transparent',
    paddingHorizontal: 14,
    color: '#313c3b',
    fontSize: fontScale(15),
  },
  submitButton: { borderRadius: 14, overflow: 'hidden', marginTop: 8 },
  submitGradient: { height: 56, alignItems: 'center', justifyContent: 'center' },
  submitText: { color: '#FFFFFF', fontWeight: '700', fontSize: fontScale(17) },
  buttonPressed: { transform: [{ scale: 0.985 }] },
  buttonDisabled: { opacity: 0.7 },
  backText: { textAlign: 'center', marginTop: 18, color: '#366855', fontWeight: '700', fontSize: fontScale(14) },
});
