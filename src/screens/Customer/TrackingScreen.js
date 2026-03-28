import React, { useMemo } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useBooking from '../../hooks/useBooking';
import { BOOKING_STATUS } from '../../utils/constants';
import { fontScale } from '../../utils/responsive';

export default function TrackingScreen({ navigation }) {
  const { bookings } = useBooking();
  const upcoming = useMemo(() => bookings.filter((item) => item.status !== BOOKING_STATUS.COMPLETED), [bookings]);
  const past = useMemo(() => bookings.filter((item) => item.status === BOOKING_STATUS.COMPLETED), [bookings]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Text style={styles.brand}>The Atelier</Text>
        </View>
        <MaterialIcons name="more-vert" size={22} color="#6B6B6B" />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heroTitle}>My Journeys</Text>
        <Text style={styles.heroSub}>Review your upcoming and past artistic treatments.</Text>

        <View style={styles.filterRow}>
          <View style={[styles.filterPill, styles.filterPillActive]}><Text style={styles.filterPillTextActive}>Upcoming</Text></View>
          <View style={styles.filterPill}><Text style={styles.filterPillText}>Past Appointments</Text></View>
          <View style={styles.filterPill}><Text style={styles.filterPillText}>Drafts</Text></View>
        </View>

        <Text style={styles.sectionLabel}>Upcoming</Text>
        {upcoming.length ? (
          upcoming.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => navigation.navigate('LiveTracking', { bookingId: item.id })}
              style={styles.upcomingCard}
            >
              <View style={styles.badge}><Text style={styles.badgeText}>Confirmed</Text></View>
              <Text style={styles.cardKicker}>Service</Text>
              <Text style={styles.cardTitle}>{item.service?.name || 'Beauty Service'}</Text>
              <View style={styles.metaRow}>
                <View>
                  <Text style={styles.metaLabel}>Date</Text>
                  <Text style={styles.metaValue}>{item.date || 'Oct 24, 2023'}</Text>
                </View>
                <View>
                  <Text style={styles.metaLabel}>Time</Text>
                  <Text style={styles.metaValue}>{item.time || '14:30 PM'}</Text>
                </View>
              </View>
              <View style={styles.bottomRow}>
                <View style={styles.artistRow}>
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80' }} style={styles.artistAvatar} />
                  <View>
                    <Text style={styles.metaLabel}>Artisan</Text>
                    <Text style={styles.artistName}>Elena Vance</Text>
                  </View>
                </View>
                <View style={styles.calendarBtn}>
                  <MaterialIcons name="calendar-today" size={18} color="#FF6B2C" />
                </View>
              </View>
            </Pressable>
          ))
        ) : (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No upcoming bookings yet.</Text>
          </View>
        )}

        <Text style={styles.sectionLabelPast}>Past Experience</Text>
        {(past.length ? past : [{ id: 'sample-1' }, { id: 'sample-2' }]).map((item, index) => (
          <View key={item.id} style={styles.pastCard}>
            <Image
              source={{
                uri: index === 0
                  ? 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=500&q=80'
                  : 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=500&q=80',
              }}
              style={styles.pastImage}
            />
            <View style={styles.pastBody}>
              <View style={styles.pastHead}>
                <Text style={styles.pastTitle}>{item.service?.name || (index === 0 ? 'Hybrid Lash Extensions' : 'Deep Condition Mask')}</Text>
                <Text style={styles.pastStatus}>Completed</Text>
              </View>
              <Text style={styles.pastSub}>
                {item.date || (index === 0 ? 'Sep 15, 2023' : 'Aug 28, 2023')} • With {index === 0 ? 'Elena Vance' : 'Sarah K.'}
              </Text>
              {index === 0 ? (
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <MaterialIcons key={star} name="star" size={14} color="#FF6B2C" />
                  ))}
                </View>
              ) : (
                <Pressable onPress={() => navigation.getParent()?.navigate('Services')}>
                  <Text style={styles.rebookText}>Rebook service</Text>
                </Pressable>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EDE0D4' },
  topBar: { height: 62, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  topLeft: { flexDirection: 'row', alignItems: 'center' },
  brand: { color: '#1E1E1E', fontSize: fontScale(22), fontWeight: '800', letterSpacing: 1 },
  content: { paddingHorizontal: 14, paddingBottom: 20 },
  heroTitle: { color: '#1E1E1E', fontSize: fontScale(36), fontWeight: '800' },
  heroSub: { color: '#6B6B6B', fontSize: fontScale(13), marginTop: 2, marginBottom: 10 },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  filterPill: { borderRadius: 999, backgroundColor: '#F5F5F5', paddingHorizontal: 12, paddingVertical: 8 },
  filterPillActive: { backgroundColor: '#FF6B2C' },
  filterPillText: { color: '#6B6B6B', fontSize: fontScale(12), fontWeight: '600' },
  filterPillTextActive: { color: '#FFFFFF', fontSize: fontScale(12), fontWeight: '700' },
  sectionLabel: { color: '#3a6c59', fontSize: fontScale(10), fontWeight: '700', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  sectionLabelPast: { color: 'rgba(64,73,68,0.6)', fontSize: fontScale(10), fontWeight: '700', textTransform: 'uppercase', letterSpacing: 2, marginTop: 16, marginBottom: 8 },
  upcomingCard: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 14,
    marginBottom: 10,
    shadowColor: '#1E1E1E',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  badge: { alignSelf: 'flex-end', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'rgba(182,235,211,0.45)' },
  badgeText: { color: '#FF6B2C', fontSize: fontScale(10), fontWeight: '700', textTransform: 'uppercase' },
  cardKicker: { color: '#FF6B2C', fontSize: fontScale(10), fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.6, marginTop: 2 },
  cardTitle: { color: '#1E1E1E', fontSize: fontScale(24), fontWeight: '800', marginTop: 2 },
  metaRow: { marginTop: 10, flexDirection: 'row', gap: 26 },
  metaLabel: { color: '#7a8681', fontSize: fontScale(10), fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.2 },
  metaValue: { color: '#1E1E1E', fontSize: fontScale(13), fontWeight: '700', marginTop: 1 },
  bottomRow: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderColor: '#F5F5F5', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  artistRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  artistAvatar: { width: 42, height: 42, borderRadius: 21 },
  artistName: { color: '#1E1E1E', fontSize: fontScale(13), fontWeight: '700' },
  calendarBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5' },
  emptyWrap: { borderRadius: 14, backgroundColor: '#F5F5F5', padding: 14 },
  emptyText: { color: '#6B6B6B', textAlign: 'center' },
  pastCard: { borderRadius: 18, backgroundColor: 'rgba(228,240,238,0.45)', padding: 10, marginBottom: 8, flexDirection: 'row', gap: 10 },
  pastImage: { width: 62, height: 62, borderRadius: 12 },
  pastBody: { flex: 1 },
  pastHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  pastTitle: { color: '#1E1E1E', fontSize: fontScale(14), fontWeight: '700', flex: 1, marginRight: 6 },
  pastStatus: { color: 'rgba(64,73,68,0.6)', fontSize: fontScale(9), fontWeight: '700', textTransform: 'uppercase' },
  pastSub: { color: '#6d7873', fontSize: fontScale(11), marginTop: 2 },
  starsRow: { flexDirection: 'row', gap: 1, marginTop: 5 },
  rebookText: { marginTop: 6, color: '#FF6B2C', fontSize: fontScale(10), fontWeight: '700', textTransform: 'uppercase', textDecorationLine: 'underline' },
});
