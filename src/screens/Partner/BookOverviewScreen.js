import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useBooking from '../../hooks/useBooking';
import { BOOKING_STATUS } from '../../utils/constants';
import { fontScale } from '../../utils/responsive';
import PartnerBottomNav from '../../components/PartnerBottomNav';

export default function BookOverviewScreen({ navigation, route }) {
  const { bookings } = useBooking();
  const showPreviewNav = route?.name === 'PartnerBookPreview';
  const detailRouteName = route?.params?.detailRouteName || 'BookingRequestDetail';
  const acceptedDetailRouteName = route?.params?.acceptedDetailRouteName || 'AcceptedBookingDetail';
  const [instantBooking, setInstantBooking] = useState(true);
  const [selectedDay, setSelectedDay] = useState(17);

  const data = useMemo(() => {
    const live = bookings.map((item, index) => ({
      id: item.id,
      customerName: item.customerName || item.service?.name?.split(' ')[0] || `Customer ${index + 1}`,
      serviceName: item.service?.name || 'Beauty Service',
      duration: item.service?.duration || '60 mins',
      distance: item.distance || `${(index + 1) * 1.2} km`,
      date: item.date || 'Tomorrow',
      time: item.time || '10:00 AM',
      amount: Number(item.amount || item.service?.price || 2499),
      urgent: item.status === BOOKING_STATUS.PENDING,
      status: item.status,
      address: item.address || 'Bandra West, Mumbai',
    }));

    if (live.length > 0) return live;

    return [
      {
        id: 'demo-1',
        customerName: 'Riya Malhotra',
        serviceName: 'Bridal Makeup + Hair Styling',
        duration: '3 hours',
        distance: '2.5 km',
        date: 'Tomorrow',
        time: '10:00 AM',
        amount: 4999,
        urgent: true,
        status: BOOKING_STATUS.PENDING,
        address: 'Bandra West, Mumbai',
      },
      {
        id: 'demo-2',
        customerName: 'Ananya Iyer',
        serviceName: 'Hydra Facial',
        duration: '60 mins',
        distance: '1.8 km',
        date: 'Today',
        time: '4:00 PM',
        amount: 1999,
        urgent: false,
        status: BOOKING_STATUS.PENDING,
        address: 'Andheri East, Mumbai',
      },
      {
        id: 'demo-3',
        customerName: 'Meera Reddy',
        serviceName: 'Hair Spa',
        duration: '45 mins',
        distance: '3.2 km',
        date: 'Today',
        time: '5:30 PM',
        amount: 1499,
        urgent: false,
        status: BOOKING_STATUS.ACCEPTED,
        address: 'Juhu, Mumbai',
      },
    ];
  }, [bookings]);

  const pendingCount = data.filter((item) => item.status === BOOKING_STATUS.PENDING).length;
  const scheduled = useMemo(
    () => [
      { ...data[0], slot: '10:00', subtitle: '10:00 AM — 11:30 AM', style: 'primary' },
      { ...data[1], slot: '12:00', subtitle: '12:00 PM — 12:45 PM', style: 'soft' },
      { ...data[2], slot: '15:00', subtitle: '03:00 PM — 04:30 PM', style: 'tertiary' },
    ],
    [data]
  );

  const days = [
    { key: 'mon', label: 'Mon', date: 16 },
    { key: 'tue', label: 'Tue', date: 17 },
    { key: 'wed', label: 'Wed', date: 18 },
    { key: 'thu', label: 'Thu', date: 19 },
    { key: 'fri', label: 'Fri', date: 20 },
    { key: 'sat', label: 'Sat', date: 21 },
  ];

  const slots = ['09:00', '10:00', '12:00', '13:00', '14:00', '15:00'];

  const openBooking = (item) => {
    navigation.navigate(item.status === BOOKING_STATUS.ACCEPTED ? acceptedDetailRouteName : detailRouteName, {
      booking: item,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <View style={styles.avatarWrap}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAobIGsqPWitM0ccPHP2FdqDQcZ-AYXGWZAS8ulIejZKvOFDXtEPCz3nxQxbufWxxDS-rrzdF0_wfeGUPG2K5V3L_xAXGLmesq59DjQrskrG6PZiyXddJATw0QtF2Rut1ub1Gm9Rx8fCyz-pYPQDS8bvOvkLUAyceQ_yTxsCcYHrrCf0tq2wTugm_xf4Vz8SD6_eYQGdcbJFSgPyoCtQZYtpbfMSKm4qayHkx4qQaG8GaqVm8_N6tTeTM1mlCPRn0r_EKJUe5HhRzI',
              }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.topTitle}>Atelier Pro</Text>
        </View>
        <Pressable style={styles.notifyBtn}>
          <MaterialIcons name="notifications" size={20} color="#366855" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={[styles.content, showPreviewNav && styles.contentWithPreviewNav]} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>TODAY&apos;S SCHEDULE</Text>
          <Text style={styles.heroCount}>{data.length} Bookings</Text>
          <View style={styles.heroNext}>
            <View>
              <Text style={styles.nextLabel}>Next Session</Text>
              <Text style={styles.nextText}>10:00 AM — Priya S.</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={14} color="#a6f2d4" />
          </View>
          <View style={styles.heroGlow} />
        </View>

        <View style={styles.instantCard}>
          <View style={styles.instantLeft}>
            <View style={styles.instantIcon}>
              <MaterialIcons name="bolt" size={18} color="#366855" />
            </View>
            <View>
              <Text style={styles.instantTitle}>Instant Booking</Text>
              <Text style={styles.instantSub}>Allow clients to book instantly</Text>
            </View>
          </View>
          <Switch
            value={instantBooking}
            onValueChange={setInstantBooking}
            trackColor={{ false: '#d9e5e3', true: '#366855' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.monthHeader}>
          <Text style={styles.monthTitle}>October 2023</Text>
          <Text style={styles.monthAction}>Month View</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayRow}>
          {days.map((day) => {
            const active = selectedDay === day.date;
            return (
              <Pressable key={day.key} onPress={() => setSelectedDay(day.date)} style={[styles.dayItem, active && styles.dayItemActive]}>
                <Text style={[styles.dayLabel, active && styles.dayLabelActive]}>{day.label}</Text>
                <Text style={[styles.dayDate, active && styles.dayDateActive]}>{day.date}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.timelineWrap}>
          {slots.map((slot) => {
            if (slot === '13:00') {
              return (
                <View key={slot} style={styles.timeRow}>
                  <View style={styles.timeCol}>
                    <Text style={styles.timeLabel}>{slot}</Text>
                  </View>
                  <View style={styles.slotArea}>
                    <View style={styles.breakCard}>
                      <MaterialIcons name="coffee" size={14} color="#707974" />
                      <Text style={styles.breakText}>Lunch Break</Text>
                    </View>
                  </View>
                </View>
              );
            }

            const event = scheduled.find((item) => item.slot === slot);
            if (!event) {
              return (
                <View key={slot} style={styles.timeRow}>
                  <View style={styles.timeCol}>
                    <Text style={styles.timeLabel}>{slot}</Text>
                  </View>
                  <View style={styles.slotArea}>
                    <Pressable style={styles.emptySlot}>
                      <MaterialIcons name="add" size={18} color="#a0aba6" />
                    </Pressable>
                  </View>
                </View>
              );
            }

            return (
              <View key={slot} style={styles.timeRow}>
                <View style={styles.timeCol}>
                  <Text style={styles.timeLabel}>{slot}</Text>
                </View>
                <View style={styles.slotArea}>
                  <Pressable
                    onPress={() => openBooking(event)}
                    style={[
                      styles.eventCard,
                      event.style === 'soft' && styles.eventCardSoft,
                      event.style === 'tertiary' && styles.eventCardTertiary,
                    ]}
                  >
                    <View style={styles.eventMain}>
                      <Text style={[styles.eventTitle, event.style === 'soft' && styles.eventTitleSoft]}>
                        {event.serviceName}
                      </Text>
                      <Text style={[styles.eventSub, event.style === 'soft' && styles.eventSubSoft]}>{event.subtitle}</Text>
                    </View>
                    <MaterialIcons
                      name={event.style === 'tertiary' ? 'schedule' : 'check-circle'}
                      size={16}
                      color={event.style === 'tertiary' ? '#004332' : '#366855'}
                    />
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {showPreviewNav ? (
        <PartnerBottomNav
          activeKey="book"
          onPressItem={(key) => {
            if (key === 'home') navigation.navigate('PartnerHomePreview');
            if (key === 'book') navigation.navigate('PartnerBookPreview');
            if (key === 'pay') navigation.navigate('PartnerEarningsPreview');
            if (key === 'profile') navigation.navigate('PartnerProfileSetup');
          }}
        />
      ) : null}

      {showPreviewNav ? (
        <Pressable style={styles.fab} onPress={() => navigation.navigate(detailRouteName, { booking: data[0] })}>
          <MaterialIcons name="add" size={28} color="#FFFFFF" />
        </Pressable>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#d0ddda' },
  topBar: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e4f0ee',
  },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatarWrap: { width: 40, height: 40, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(192,201,195,0.35)', backgroundColor: '#d9e5e3' },
  avatar: { width: '100%', height: '100%' },
  topTitle: { color: '#313c3b', fontSize: fontScale(30), fontWeight: '900', letterSpacing: -1 },
  notifyBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  content: { paddingHorizontal: 14, paddingTop: 10, paddingBottom: 22 },
  contentWithPreviewNav: { paddingBottom: 132 },
  heroCard: {
    borderRadius: 24,
    backgroundColor: '#313c3b',
    padding: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#131e1c',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 4,
  },
  heroLabel: { color: 'rgba(255,255,255,0.75)', fontSize: fontScale(10), fontWeight: '700', letterSpacing: 1.5, marginBottom: 4 },
  heroCount: { color: '#FFFFFF', fontSize: fontScale(40), fontWeight: '900', marginBottom: 10 },
  heroNext: { borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  nextLabel: { color: 'rgba(255,255,255,0.65)', fontSize: fontScale(10), textTransform: 'uppercase' },
  nextText: { color: '#FFFFFF', fontSize: fontScale(14), fontWeight: '700', marginTop: 2 },
  heroGlow: { position: 'absolute', top: -30, right: -30, width: 128, height: 128, borderRadius: 64, backgroundColor: 'rgba(54,104,85,0.24)' },
  instantCard: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(192,201,195,0.25)',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  instantLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, marginRight: 8 },
  instantIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(182,235,211,0.4)', alignItems: 'center', justifyContent: 'center' },
  instantTitle: { color: '#313c3b', fontSize: fontScale(14), fontWeight: '700' },
  instantSub: { color: '#5f6b66', fontSize: fontScale(11), marginTop: 1 },
  monthHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  monthTitle: { color: '#313c3b', fontSize: fontScale(24), fontWeight: '800' },
  monthAction: { color: '#366855', fontSize: fontScale(11), fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  dayRow: { gap: 8, paddingBottom: 6 },
  dayItem: {
    width: 58,
    height: 84,
    borderRadius: 29,
    borderWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayItemActive: {
    backgroundColor: '#366855',
    borderColor: '#366855',
  },
  dayLabel: { color: '#6b7772', fontSize: fontScale(10), fontWeight: '600', textTransform: 'uppercase' },
  dayLabelActive: { color: 'rgba(255,255,255,0.85)' },
  dayDate: { color: '#313c3b', fontSize: fontScale(22), fontWeight: '800', marginTop: 2 },
  dayDateActive: { color: '#FFFFFF' },
  timelineWrap: { marginTop: 8 },
  timeRow: { flexDirection: 'row', gap: 10, marginBottom: 9 },
  timeCol: { width: 44, alignItems: 'flex-end', paddingTop: 8 },
  timeLabel: { color: 'rgba(64,73,68,0.65)', fontSize: fontScale(10), fontWeight: '700' },
  slotArea: { flex: 1 },
  emptySlot: {
    height: 58,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(192,201,195,0.45)',
    backgroundColor: 'rgba(240,252,250,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  breakCard: {
    height: 42,
    borderRadius: 14,
    backgroundColor: '#e4f0ee',
    alignItems: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
    gap: 6,
  },
  breakText: { color: '#5f6b66', fontSize: fontScale(10), fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  eventCard: {
    minHeight: 62,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 11,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 4,
    borderLeftColor: '#366855',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  eventCardSoft: { backgroundColor: 'rgba(182,235,211,0.4)', borderLeftColor: '#366855' },
  eventCardTertiary: { borderLeftColor: '#004332' },
  eventMain: { flex: 1, marginRight: 8 },
  eventTitle: { color: '#313c3b', fontSize: fontScale(13), fontWeight: '700' },
  eventTitleSoft: { color: '#1c4f3e' },
  eventSub: { color: '#5f6b66', fontSize: fontScale(11), marginTop: 1 },
  eventSubSoft: { color: 'rgba(28,79,62,0.85)' },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    borderColor: 'rgba(192,201,195,0.25)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 14,
    paddingHorizontal: 8,
  },
  bottomNavItem: {
    minWidth: 74,
    minHeight: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNavItemActive: {
    backgroundColor: 'rgba(182,235,211,0.45)',
  },
  bottomNavText: { color: '#5f6b66', fontSize: fontScale(10), fontWeight: '600', marginTop: 2 },
  bottomNavTextActive: { color: '#366855', fontWeight: '700' },
  fab: {
    position: 'absolute',
    right: 18,
    bottom: 96,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#366855',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#131e1c',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 5,
  },
});
