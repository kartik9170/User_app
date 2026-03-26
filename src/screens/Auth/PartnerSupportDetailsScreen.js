import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontScale } from '../../utils/responsive';

export default function PartnerSupportDetailsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={22} color="#366855" />
        </Pressable>
        <Text style={styles.headerTitle}>Support Details</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Concierge Support</Text>
        <Text style={styles.sub}>Need help with onboarding or verification? Reach out on the channels below.</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <MaterialIcons name="call" size={18} color="#366855" />
            <View>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>+91 98765 43210</Text>
            </View>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="mail-outline" size={18} color="#366855" />
            <View>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>partner.support@emeraldpro.in</Text>
            </View>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="schedule" size={18} color="#366855" />
            <View>
              <Text style={styles.label}>Working Hours</Text>
              <Text style={styles.value}>Mon-Sat, 9:00 AM - 7:00 PM</Text>
            </View>
          </View>
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
    borderBottomWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#313c3b', fontSize: fontScale(18), fontWeight: '800' },
  content: { padding: 16 },
  title: { color: '#1f2a27', fontSize: fontScale(26), fontWeight: '800' },
  sub: { color: '#4f5a56', fontSize: fontScale(13), lineHeight: 20, marginTop: 6, marginBottom: 14 },
  card: {
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
    padding: 14,
    gap: 14,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  label: { color: '#6f7a76', fontSize: fontScale(11), fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 2 },
  value: { color: '#273331', fontSize: fontScale(14), fontWeight: '600' },
});
