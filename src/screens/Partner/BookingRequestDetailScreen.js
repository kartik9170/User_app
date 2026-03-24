import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useBooking from '../../hooks/useBooking';
import { BOOKING_STATUS } from '../../utils/constants';
import { fontScale } from '../../utils/responsive';

export default function BookingRequestDetailScreen({ navigation, route }) {
  const { updateBooking } = useBooking();
  const booking = route?.params?.booking;
  const [countdown, setCountdown] = useState(165);

  const details = useMemo(
    () => ({
      id: booking?.id,
      serviceName: booking?.serviceName || booking?.service?.name || 'Bridal Makeup + Hair Styling',
      duration: booking?.duration || booking?.service?.duration || '3 hours',
      distance: booking?.distance || '2.5 km away',
      amount: booking?.amount || booking?.service?.price || 4999,
      date: booking?.date || 'Tomorrow',
      time: booking?.time || '10:00 AM',
      address: booking?.address || 'Bandra West, Mumbai',
    }),
    [booking]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (value) => {
    const mins = Math.floor(value / 60);
    const secs = value % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const acceptBooking = () => {
    if (details.id) updateBooking(details.id, { status: BOOKING_STATUS.ACCEPTED });
    const acceptedRoute =
      route?.name === 'PartnerBookDetailPreview' ? 'PartnerAcceptedBookDetailPreview' : 'AcceptedBookingDetail';
    navigation.replace(acceptedRoute, {
      booking: {
        ...booking,
        status: BOOKING_STATUS.ACCEPTED,
      },
    });
  };

  const declineBooking = () => {
    if (details.id) updateBooking(details.id, { status: BOOKING_STATUS.REJECTED });
    Alert.alert('Declined', 'Booking request declined.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <View style={styles.profileWrap}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAweLJSpjUV7HD4vQfsOpw5xu3BUVhvhiBMeqWnexNZN06uo2ZAYG_sM6EikK1bzGKGksQkMaUAZKqN1tbXs6DVKyOTeIqHy1_S1G1ituAygATN4GrNbxD0KuWyq4QeIFpQjNxun7lxORugeWrb_6WzOotVuQt4aA73YlfVMcgUfMC-XOIplkZwknFlkigDOnsEMpxWIRkwsnyS3dAgGl0HM_L2_WPiVD77S4syUr9F5dn198E4mw6jkgplqKdMn1246eNvYeUbB48',
              }}
              style={styles.profileImg}
            />
          </View>
          <Text style={styles.topBrand}>The Atelier</Text>
        </View>
        <View style={styles.onlineWrap}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>ONLINE</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.alertPill}>
          <MaterialIcons name="notifications-active" size={18} color="#93000a" />
          <Text style={styles.alertPillText}>URGENT REQUEST</Text>
        </View>
        <Text style={styles.mainTitle}>New Booking Request!</Text>
        <Text style={styles.mainSub}>
          Respond within <Text style={styles.timerText}>{formatCountdown(countdown)}</Text> minutes
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>SERVICE REQUESTED</Text>
          <Text style={styles.cardTitle}>{details.serviceName}</Text>
          <View style={styles.twoCol}>
            <View style={styles.metricBox}>
              <MaterialIcons name="schedule" size={20} color="#366855" />
              <View>
                <Text style={styles.metricLabel}>DURATION</Text>
                <Text style={styles.metricValue}>{details.duration}</Text>
              </View>
            </View>
            <View style={styles.metricBox}>
              <MaterialIcons name="near-me" size={20} color="#366855" />
              <View>
                <Text style={styles.metricLabel}>DISTANCE</Text>
                <Text style={styles.metricValue}>{details.distance}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.earningsCard}>
          <Text style={styles.earningsLabel}>ESTIMATED EARNINGS</Text>
          <Text style={styles.earningsValue}>INR {details.amount}</Text>
          <Text style={styles.earningsSub}>Net payout after platform fees</Text>
        </View>

        <View style={styles.dateCard}>
          <Text style={styles.metricLabel}>APPOINTMENT TIME</Text>
          <View style={styles.dateRow}>
            <MaterialIcons name="calendar-today" size={18} color="#366855" />
            <Text style={styles.dateDay}>{details.date}</Text>
          </View>
          <Text style={styles.dateTime}>{details.time}</Text>
        </View>

        <View style={styles.mapCard}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaW8IOQhtVKTz5SULQcBzOO-m1CmBGlIotLphHRbycECmCt9mwQyo8suu06zVcW3zZYnr3tflyZICWM3Kr2vFM3xrTSlI3x_mnwVHADUBQqPUv4eruEJiSDzThUHoqOrwF7DTpBjkfxBhHk4ZZyPDxiDdqDcgRC1D4NpyZig3lab9DKZJHJQLxvj-VCeYdKXTOVl9cPK5zu26JIEMSg6sgX49MSenICs9H3qYxcKKPvkALnAx6A8h7Dpok2hRUSFVi2_k2CXBpReM',
            }}
            style={styles.mapImage}
          />
          <View style={styles.mapOverlay} />
          <View style={styles.locationPill}>
            <MaterialIcons name="location-on" size={16} color="#366855" />
            <Text style={styles.locationText}>{details.address}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        <Pressable style={({ pressed }) => [styles.acceptBtn, pressed && styles.pressed]} onPress={acceptBooking}>
          <Text style={styles.acceptText}>ACCEPT</Text>
          <MaterialIcons name="check-circle" size={20} color="#FFFFFF" />
        </Pressable>
        <Pressable style={({ pressed }) => [styles.declineBtn, pressed && styles.pressed]} onPress={declineBooking}>
          <Text style={styles.declineText}>DECLINE REQUEST</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0fcfa' },
  topBar: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(240,252,250,0.85)',
  },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  profileWrap: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#d9e5e3', overflow: 'hidden' },
  profileImg: { width: '100%', height: '100%' },
  topBrand: { color: '#16311f', fontSize: fontScale(19), fontWeight: '700' },
  onlineWrap: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#366855' },
  onlineText: { color: '#1f4b34', fontSize: fontScale(11), fontWeight: '800' },
  content: { paddingHorizontal: 14, paddingTop: 10, paddingBottom: 170 },
  alertPill: { alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#ffdad6', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8, marginBottom: 12 },
  alertPillText: { color: '#93000a', fontSize: fontScale(11), fontWeight: '800', letterSpacing: 1 },
  mainTitle: { textAlign: 'center', color: '#273331', fontSize: fontScale(34), fontWeight: '800' },
  mainSub: { textAlign: 'center', color: '#5f6b66', marginTop: 4, marginBottom: 12, fontSize: fontScale(16) },
  timerText: { color: '#ba1a1a', fontWeight: '800', fontSize: fontScale(20) },
  card: { borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#deebe8', padding: 16, marginBottom: 12 },
  cardLabel: { color: '#76827d', fontSize: fontScale(10), fontWeight: '700', letterSpacing: 1.2, marginBottom: 4 },
  cardTitle: { color: '#313c3b', fontSize: fontScale(27), fontWeight: '700', lineHeight: 33, marginBottom: 12 },
  twoCol: { flexDirection: 'row', gap: 10 },
  metricBox: { flex: 1, borderRadius: 12, backgroundColor: 'rgba(228,240,238,0.6)', borderWidth: 1, borderColor: 'rgba(192,201,195,0.35)', padding: 12, flexDirection: 'row', alignItems: 'center', gap: 8 },
  metricLabel: { color: '#6b7772', fontSize: fontScale(10), fontWeight: '700' },
  metricValue: { color: '#313c3b', fontSize: fontScale(13), fontWeight: '700' },
  earningsCard: { borderRadius: 16, backgroundColor: '#313c3b', padding: 18, alignItems: 'center', marginBottom: 12 },
  earningsLabel: { color: '#bdc9c7', fontSize: fontScale(10), fontWeight: '700', letterSpacing: 1.2, marginBottom: 2 },
  earningsValue: { color: '#FFFFFF', fontSize: fontScale(46), fontWeight: '800', lineHeight: 52 },
  earningsSub: { color: '#bdc9c7', fontSize: fontScale(11), marginTop: 2 },
  dateCard: { borderRadius: 16, backgroundColor: '#deebe8', borderWidth: 1, borderColor: 'rgba(192,201,195,0.35)', padding: 16, alignItems: 'center', marginBottom: 12 },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 4 },
  dateDay: { color: '#313c3b', fontSize: fontScale(24), fontWeight: '700' },
  dateTime: { color: '#366855', fontSize: fontScale(42), fontWeight: '800', marginTop: 2 },
  mapCard: { borderRadius: 16, overflow: 'hidden', height: 130, borderWidth: 1, borderColor: 'rgba(192,201,195,0.35)', marginBottom: 8 },
  mapImage: { width: '100%', height: '100%' },
  mapOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(49,60,59,0.12)' },
  locationPill: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(240,252,250,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  locationText: { color: '#313c3b', fontSize: fontScale(12), fontWeight: '700', flex: 1 },
  bottomActions: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderColor: '#deebe8',
    backgroundColor: 'rgba(240,252,250,0.92)',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 22,
  },
  acceptBtn: {
    minHeight: 58,
    borderRadius: 16,
    backgroundColor: '#366855',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  acceptText: { color: '#FFFFFF', fontSize: fontScale(24), fontWeight: '800' },
  declineBtn: { minHeight: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  declineText: { color: '#5f6b66', fontSize: fontScale(13), fontWeight: '700', letterSpacing: 1.4 },
  pressed: { transform: [{ scale: 0.98 }] },
});
