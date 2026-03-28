import React, { useMemo } from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useBooking from '../../hooks/useBooking';
import { fontScale } from '../../utils/responsive';

export default function LiveTrackingScreen({ navigation, route }) {
  const { bookings } = useBooking();
  const bookingId = route?.params?.bookingId;

  const booking = useMemo(() => bookings.find((item) => item.id === bookingId), [bookings, bookingId]);
  const serviceName = booking?.service?.name || 'Classic Manicure & Pedicure';
  const orderCode = booking?.id ? booking.id.slice(-6).toUpperCase() : 'AB-9241';

  const callArtisan = async () => {
    const url = 'tel:+919999999999';
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={22} color="#FF6B2C" />
          </Pressable>
          <Text style={styles.title}>Atelier Beauty</Text>
        </View>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80' }} style={styles.avatar} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Live Booking</Text>
        <Text style={styles.subheading}>Order #{orderCode} - {serviceName}</Text>

        <View style={styles.mapCard}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=80' }} style={styles.mapImage} />
          <View style={styles.mapOverlay} />
          <View style={styles.centerPin}>
            <View style={styles.pinCircle}>
              <MaterialIcons name="directions-car" size={16} color="#FFFFFF" />
            </View>
          </View>
        </View>

        <View style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>Service Timeline</Text>
          {[
            ['check-circle', 'Finding your Artisan', 'Completed at 10:45 AM', true],
            ['check-circle', 'Artisan Assigned', 'Lucille V. is ready to assist', true],
            ['radio-button-checked', 'On the Way', 'Estimated arrival in 8 mins', false],
            ['panorama-fish-eye', 'Arrived', 'Expected arrival: 11:15 AM', false],
          ].map(([icon, label, meta, completed], index) => (
            <View key={label} style={styles.timelineRow}>
              <MaterialIcons name={icon} size={20} color={completed || index === 2 ? '#FF6B2C' : '#9aa6a1'} />
              <View style={styles.timelineTextWrap}>
                <Text style={[styles.timelineLabel, !completed && index === 3 && styles.timelineLabelMuted]}>{label}</Text>
                <Text style={[styles.timelineMeta, index === 2 && styles.timelineMetaActive]}>{meta}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.artisanCard}>
          <View style={styles.artisanLeft}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80' }} style={styles.artisanAvatar} />
            <View>
              <Text style={styles.artisanName}>Lucille V.</Text>
              <View style={styles.ratingRow}>
                <MaterialIcons name="star" size={15} color="#f4b400" />
                <Text style={styles.ratingText}>4.9 (120 Reviews)</Text>
              </View>
            </View>
          </View>
          <Pressable onPress={callArtisan} style={styles.callBtn}>
            <MaterialIcons name="call" size={16} color="#FFFFFF" />
            <Text style={styles.callBtnText}>Call Artisan</Text>
          </Pressable>
        </View>

        <ButtonBlock label="Rate Service" onPress={() => navigation.getParent()?.navigate('Review')} />
      </ScrollView>
    </SafeAreaView>
  );
}

function ButtonBlock({ label, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.rateBtn}>
      <Text style={styles.rateBtnText}>{label}</Text>
      <MaterialIcons name="arrow-forward" size={18} color="#FFFFFF" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EDE0D4' },
  topBar: { height: 62, paddingHorizontal: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconBtn: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  title: { color: '#1E1E1E', fontSize: fontScale(18), fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  content: { paddingHorizontal: 14, paddingBottom: 20 },
  heading: { color: '#1E1E1E', fontSize: fontScale(30), fontWeight: '800' },
  subheading: { color: '#6B6B6B', fontSize: fontScale(12), marginTop: 2, marginBottom: 10 },
  mapCard: { height: 230, borderRadius: 16, overflow: 'hidden', position: 'relative', backgroundColor: '#F5F5F5' },
  mapImage: { width: '100%', height: '100%', opacity: 0.45 },
  mapOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(240,252,250,0.2)' },
  centerPin: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  pinCircle: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF6B2C' },
  timelineCard: { marginTop: 12, borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(192,201,195,0.35)', padding: 12 },
  timelineTitle: { color: '#1E1E1E', fontSize: fontScale(17), fontWeight: '700', marginBottom: 8 },
  timelineRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 9 },
  timelineTextWrap: { flex: 1 },
  timelineLabel: { color: '#1E1E1E', fontSize: fontScale(14), fontWeight: '700' },
  timelineLabelMuted: { color: 'rgba(64,73,68,0.6)' },
  timelineMeta: { color: '#6d7873', fontSize: fontScale(11), marginTop: 1 },
  timelineMetaActive: { color: '#FF6B2C', fontWeight: '600' },
  artisanCard: { marginTop: 12, borderRadius: 14, backgroundColor: '#F5F5F5', padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  artisanLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1, marginRight: 8 },
  artisanAvatar: { width: 52, height: 52, borderRadius: 26 },
  artisanName: { color: '#1E1E1E', fontSize: fontScale(15), fontWeight: '700' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  ratingText: { color: '#6B6B6B', fontSize: fontScale(11), fontWeight: '600' },
  callBtn: { borderRadius: 999, backgroundColor: '#FF6B2C', flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 8 },
  callBtnText: { color: '#FFFFFF', fontSize: fontScale(11), fontWeight: '700' },
  rateBtn: {
    marginTop: 12,
    borderRadius: 14,
    backgroundColor: '#FF6B2C',
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  rateBtnText: { color: '#FFFFFF', fontSize: fontScale(16), fontWeight: '700' },
});
