import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useBooking from '../../hooks/useBooking';
import { fontScale } from '../../utils/responsive';
import PartnerBottomNav from '../../components/PartnerBottomNav';

export default function DashboardScreen({ route, navigation }) {
  const { bookings } = useBooking();
  const completed = bookings.filter((item) => item.status === 'completed').length;
  const active = bookings.filter((item) => ['active', 'accepted'].includes(item.status)).length;
  const dailyRevenue = bookings.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const laterToday = [
    { id: 'lt-1', time: '4:00 PM', name: 'Ananya Iyer', service: 'Hydra Facial', duration: '60 min' },
    { id: 'lt-2', time: '5:30 PM', name: 'Meera Reddy', service: 'Hair Spa', duration: '45 min' },
  ];

  const showPreviewBottomNav = route?.name === 'PartnerHomePreview';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.topBar}>
        <View style={styles.profileRow}>
          <View style={styles.avatarWrap}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABJakEyOD4hvgo2g0A7vvpEiOHWJtEptyHvdU4H1ZqfOta-d7a8YHLU8IHEG839J0Z4ZVX3DlGXlS5SeGFDXXneBbn91dAfuOTJ1DZh1XXo8ybbsiuhQnRZoXgP12GzOIhSG9DJ3zuNdscoNIux256SiyeRPQ09cWCxpE2hvx-N3pLWT9imDhBwUmqtfy6sg5oKBW3CT8dg3N7MTX9cqzO_P8SiVTa7ZAP2BhI-AdZh-YHsBRwQqs69_F6jQB7CZryrwezfoaXkFU',
              }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.brand}>The Atelier</Text>
        </View>
        <View style={styles.onlineBadge}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>Online</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.content, showPreviewBottomNav && styles.contentWithBottomNav]} showsVerticalScrollIndicator={false}>
        <View style={styles.revenueCard}>
          <View style={styles.revenueTop}>
            <Text style={styles.revenueLabel}>DAILY REVENUE</Text>
            <MaterialIcons name="payments" size={20} color="rgba(255,255,255,0.6)" />
          </View>
          <Text style={styles.revenueAmount}>INR {dailyRevenue || 1200}</Text>
          <View style={styles.revenueMetaRow}>
            <View style={styles.ratingChip}>
              <MaterialIcons name="star" size={14} color="#FACC15" />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
            <Text style={styles.sessionText}>{completed + active || 8} sessions today</Text>
          </View>
          <View style={styles.decorCircle} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today&apos;s Schedule</Text>
            <Text style={styles.sectionPill}>{Math.max(0, 3 - completed)} left</Text>
          </View>
          <View style={styles.scheduleGrid}>
            <View style={styles.scheduleCard}>
              <View style={styles.scheduleIconWrap}>
                <MaterialIcons name="schedule" size={20} color="#366855" />
              </View>
              <Text style={styles.scheduleText}>Next in{'\n'}45 mins</Text>
            </View>
            <View style={[styles.scheduleCard, styles.scheduleCardDone]}>
              <View style={[styles.scheduleIconWrap, styles.scheduleIconDone]}>
                <MaterialIcons name="check-circle" size={20} color="#366855" />
              </View>
              <Text style={styles.scheduleDoneText}>{completed} Completed</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Booking</Text>
          <View style={styles.bookingCard}>
            <View style={styles.bookingTop}>
              <View style={styles.bookingPersonRow}>
                <View style={styles.personIconWrap}>
                  <MaterialIcons name="person" size={20} color="#5f6b66" />
                </View>
                <View>
                  <Text style={styles.personName}>Priya Sharma</Text>
                  <Text style={styles.personService}>Full Arms Waxing</Text>
                </View>
              </View>
              <View style={styles.timeBadge}>
                <Text style={styles.timeBadgeText}>2:30 PM</Text>
              </View>
            </View>

            <View style={styles.bookingActions}>
              <Pressable style={({ pressed }) => [styles.startBtn, pressed && styles.pressed]}>
                <MaterialIcons name="play-circle" size={20} color="#FFFFFF" />
                <Text style={styles.startBtnText}>Start Session</Text>
              </Pressable>
              <Pressable style={({ pressed }) => [styles.moreBtn, pressed && styles.pressed]}>
                <MaterialIcons name="more-horiz" size={20} color="#5f6b66" />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Later Today</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>
          {laterToday.map((item, index) => (
            <View key={item.id} style={[styles.laterRow, index === 1 && styles.laterRowMuted]}>
              <View style={styles.laterLeft}>
                <Text style={styles.timePill}>{item.time}</Text>
                <View>
                  <Text style={styles.laterName}>{item.name}</Text>
                  <Text style={styles.laterService}>
                    {item.service} • {item.duration}
                  </Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={18} color="#9aa6a1" />
            </View>
          ))}
        </View>
      </ScrollView>

      {showPreviewBottomNav ? (
        <PartnerBottomNav
          activeKey="home"
          onPressItem={(key) => {
            if (key === 'book') navigation.navigate('PartnerBookPreview');
            if (key === 'pay') navigation.navigate('PartnerEarningsPreview');
            if (key === 'profile') navigation.navigate('PartnerProfileSetup');
          }}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0fcfa' },
  topBar: {
    height: 58,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: '#e4f0ee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(240,252,250,0.92)',
  },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatarWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#deebe8',
    borderWidth: 1,
    borderColor: 'rgba(182,235,211,0.7)',
  },
  avatar: { width: '100%', height: '100%' },
  brand: { color: '#313c3b', fontWeight: '800', fontSize: fontScale(18) },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(182,235,211,0.35)',
  },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#366855' },
  onlineText: { color: '#366855', fontSize: fontScale(10), fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.8 },
  content: { paddingHorizontal: 14, paddingTop: 12, paddingBottom: 24 },
  contentWithBottomNav: { paddingBottom: 96 },
  revenueCard: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: '#313c3b',
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: '#313c3b',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 4,
  },
  revenueTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  revenueLabel: { color: 'rgba(255,255,255,0.7)', fontSize: fontScale(10), fontWeight: '700', letterSpacing: 1.2 },
  revenueAmount: { color: '#FFFFFF', fontSize: fontScale(38), fontWeight: '800', marginBottom: 10 },
  revenueMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  ratingChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.16)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  ratingText: { color: '#FFFFFF', fontSize: fontScale(12), fontWeight: '700' },
  sessionText: { color: 'rgba(255,255,255,0.72)', fontSize: fontScale(12) },
  decorCircle: { position: 'absolute', right: -24, bottom: -24, width: 96, height: 96, borderRadius: 48, backgroundColor: 'rgba(255,255,255,0.06)' },
  section: { marginBottom: 18 },
  sectionHeader: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { color: '#313c3b', fontSize: fontScale(20), fontWeight: '700' },
  sectionPill: { backgroundColor: '#e4f0ee', color: '#5f6b66', fontSize: fontScale(10), fontWeight: '700', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  scheduleGrid: { flexDirection: 'row', gap: 10 },
  scheduleCard: { flex: 1, borderRadius: 16, padding: 14, minHeight: 132, justifyContent: 'space-between', backgroundColor: '#eaf6f4' },
  scheduleCardDone: { backgroundColor: 'rgba(182,235,211,0.5)' },
  scheduleIconWrap: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(54,104,85,0.1)' },
  scheduleIconDone: { backgroundColor: 'rgba(54,104,85,0.18)' },
  scheduleText: { color: '#273331', fontSize: fontScale(15), fontWeight: '700', lineHeight: 19 },
  scheduleDoneText: { color: '#366855', fontSize: fontScale(15), fontWeight: '700' },
  bookingCard: { borderRadius: 22, backgroundColor: '#FFFFFF', padding: 14, borderWidth: 1, borderColor: '#deebe8' },
  bookingTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  bookingPersonRow: { flexDirection: 'row', gap: 10 },
  personIconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#d9e5e3', alignItems: 'center', justifyContent: 'center' },
  personName: { color: '#273331', fontSize: fontScale(16), fontWeight: '700' },
  personService: { color: '#5f6b66', fontSize: fontScale(12) },
  timeBadge: { borderRadius: 10, backgroundColor: '#eaf6f4', borderWidth: 1, borderColor: '#deebe8', paddingHorizontal: 10, paddingVertical: 7 },
  timeBadgeText: { color: '#313c3b', fontSize: fontScale(12), fontWeight: '700' },
  bookingActions: { flexDirection: 'row', gap: 8 },
  startBtn: { flex: 1, minHeight: 54, borderRadius: 16, backgroundColor: '#366855', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  startBtnText: { color: '#FFFFFF', fontSize: fontScale(15), fontWeight: '700' },
  moreBtn: { width: 54, height: 54, borderRadius: 16, backgroundColor: '#eaf6f4', alignItems: 'center', justifyContent: 'center' },
  pressed: { transform: [{ scale: 0.97 }] },
  viewAll: { color: '#366855', fontSize: fontScale(11), fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1.1 },
  laterRow: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(192,201,195,0.45)',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  laterRowMuted: { opacity: 0.62 },
  laterLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  timePill: { color: '#5f6b66', fontSize: fontScale(11), fontWeight: '800', backgroundColor: '#e4f0ee', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 5 },
  laterName: { color: '#273331', fontSize: fontScale(14), fontWeight: '700' },
  laterService: { color: '#6b7772', fontSize: fontScale(11) },
});
