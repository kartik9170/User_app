import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import useAuth from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import { fontScale, hp, wp } from '../../utils/responsive';

export default function RoleSelectScreen() {
  const { user, setRole } = useAuth();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Choose Your Role</Text>
        <Text style={styles.sub}>Hi {user?.name || 'there'}, continue as customer or partner.</Text>
        <Button title="Continue as Customer" onPress={() => setRole(ROLES.CUSTOMER)} style={{ marginBottom: hp(1.5) }} />
        <Button title="Continue as Partner" variant="secondary" onPress={() => setRole(ROLES.PARTNER)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: wp(5.5), paddingVertical: hp(2.5), backgroundColor: '#F9FAFB' },
  heading: { fontSize: fontScale(28), fontWeight: '700', color: '#111827', marginBottom: hp(0.8) },
  sub: { color: '#6B7280', marginBottom: hp(3), fontSize: fontScale(14) },
});
