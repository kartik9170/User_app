import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import Card from '../../components/Card';
import useAuth from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import { fontScale } from '../../utils/responsive';

export default function ProfileScreen({ navigation }) {
  const { user, role, setRole, logout } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Partner Profile</Text>
      <Card>
        <Text>Name: {user?.name || '-'}</Text>
        <Text>Email: {user?.email || '-'}</Text>
        <Text>Current Role: {role}</Text>
      </Card>

      <Pressable onPress={() => navigation.navigate('ProfessionalProfile')} style={({ pressed }) => [styles.menuRow, pressed && styles.pressed]}>
        <View style={styles.menuLeft}>
          <MaterialIcons name="badge" size={20} color="#366855" />
          <Text style={styles.menuText}>Professional Details</Text>
        </View>
        <MaterialIcons name="chevron-right" size={22} color="#7a8681" />
      </Pressable>

      <Pressable onPress={() => navigation.getParent()?.navigate('Earnings', { screen: 'Performance' })} style={({ pressed }) => [styles.menuRow, pressed && styles.pressed]}>
        <View style={styles.menuLeft}>
          <MaterialIcons name="insights" size={20} color="#366855" />
          <Text style={styles.menuText}>Performance</Text>
        </View>
        <MaterialIcons name="chevron-right" size={22} color="#7a8681" />
      </Pressable>

      <Button title="Switch to Customer" variant="secondary" style={{ marginBottom: 10 }} onPress={() => setRole(ROLES.CUSTOMER)} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#111827', marginBottom: 12 },
  menuRow: {
    marginTop: 10,
    marginBottom: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#deebe8',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  menuText: { color: '#313c3b', fontSize: fontScale(14), fontWeight: '700' },
  pressed: { transform: [{ scale: 0.99 }] },
});
