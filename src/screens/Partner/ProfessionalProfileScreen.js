import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontScale } from '../../utils/responsive';
import useAuth from '../../hooks/useAuth';

export default function ProfessionalProfileScreen({ navigation, route }) {
  const { user } = useAuth();
  const isPreview = route?.name === 'PartnerProfessionalProfilePreview';

  const goPerformance = () => {
    if (isPreview) {
      navigation.navigate('PartnerPerformancePreview');
      return;
    }
    navigation.getParent()?.navigate('Earnings', { screen: 'Performance' });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconButton}>
          <MaterialIcons name="arrow-back" size={22} color="#366855" />
        </Pressable>
        <Text style={styles.headerTitle}>Professional Profile</Text>
        <Pressable style={styles.iconButton}>
          <MaterialIcons name="edit" size={20} color="#366855" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.avatarWrap}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAobIGsqPWitM0ccPHP2FdqDQcZ-AYXGWZAS8ulIejZKvOFDXtEPCz3nxQxbufWxxDS-rrzdF0_wfeGUPG2K5V3L_xAXGLmesq59DjQrskrG6PZiyXddJATw0QtF2Rut1ub1Gm9Rx8fCyz-pYPQDS8bvOvkLUAyceQ_yTxsCcYHrrCf0tq2wTugm_xf4Vz8SD6_eYQGdcbJFSgPyoCtQZYtpbfMSKm4qayHkx4qQaG8GaqVm8_N6tTeTM1mlCPRn0r_EKJUe5HhRzI',
              }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.name}>{user?.name || 'Rahul Mehta'}</Text>
          <Text style={styles.role}>Senior Beauty Specialist</Text>
          <View style={styles.ratingRow}>
            <MaterialIcons name="star" size={16} color="#FACC15" />
            <Text style={styles.ratingText}>4.9 (124 Reviews)</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>About</Text>
          <Text style={styles.aboutText}>
            Certified beauty professional with 7+ years of experience in facials, skin therapies, and bridal grooming.
            Focused on hygiene, comfort, and premium client experience.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Professional Details</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email || 'pro@emerald.com'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Experience</Text>
            <Text style={styles.infoValue}>7 Years</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>City</Text>
            <Text style={styles.infoValue}>Mumbai</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Availability</Text>
            <Text style={styles.infoValue}>Mon - Sat, 9 AM - 8 PM</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Specialties</Text>
          <View style={styles.tagsWrap}>
            {['Facials', 'Bridal Makeup', 'Hair Spa', 'Waxing', 'Skin Consultation'].map((item) => (
              <View key={item} style={styles.tag}>
                <Text style={styles.tagText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Insights</Text>
          <Pressable onPress={goPerformance} style={({ pressed }) => [styles.linkRow, pressed && styles.pressed]}>
            <View style={styles.linkLeft}>
              <View style={styles.linkIcon}>
                <MaterialIcons name="insights" size={18} color="#366855" />
              </View>
              <View>
                <Text style={styles.linkTitle}>Performance</Text>
                <Text style={styles.linkSub}>Open monthly progress and earnings</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={22} color="#7f8a86" />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0fcfa' },
  header: {
    height: 62,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
    backgroundColor: 'rgba(240,252,250,0.94)',
  },
  iconButton: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#313c3b', fontSize: fontScale(18), fontWeight: '800' },
  content: { paddingHorizontal: 14, paddingTop: 14, paddingBottom: 20 },
  heroCard: {
    borderRadius: 22,
    backgroundColor: '#313c3b',
    alignItems: 'center',
    padding: 20,
    marginBottom: 12,
  },
  avatarWrap: {
    width: 74,
    height: 74,
    borderRadius: 37,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.35)',
    marginBottom: 10,
  },
  avatar: { width: '100%', height: '100%' },
  name: { color: '#FFFFFF', fontSize: fontScale(22), fontWeight: '800' },
  role: { color: 'rgba(255,255,255,0.74)', fontSize: fontScale(12), marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
  ratingText: { color: '#FFFFFF', fontSize: fontScale(12), fontWeight: '700' },
  card: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(192,201,195,0.45)',
    padding: 14,
    marginBottom: 10,
  },
  cardTitle: { color: '#313c3b', fontSize: fontScale(16), fontWeight: '800', marginBottom: 8 },
  aboutText: { color: '#4f5a56', fontSize: fontScale(13), lineHeight: 20 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 10 },
  infoLabel: { color: '#5f6b66', fontSize: fontScale(12), fontWeight: '600' },
  infoValue: { color: '#273331', fontSize: fontScale(12), fontWeight: '700', flex: 1, textAlign: 'right' },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { borderRadius: 999, backgroundColor: '#e4f0ee', paddingHorizontal: 10, paddingVertical: 6 },
  tagText: { color: '#366855', fontSize: fontScale(11), fontWeight: '700' },
  linkRow: {
    borderRadius: 14,
    backgroundColor: '#eaf6f4',
    borderWidth: 1,
    borderColor: 'rgba(182,235,211,0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  linkLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  linkIcon: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(182,235,211,0.45)', alignItems: 'center', justifyContent: 'center' },
  linkTitle: { color: '#313c3b', fontSize: fontScale(14), fontWeight: '700' },
  linkSub: { color: '#5f6b66', fontSize: fontScale(11), marginTop: 1 },
  pressed: { transform: [{ scale: 0.985 }] },
});
