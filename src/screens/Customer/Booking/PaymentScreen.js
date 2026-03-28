import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../../components/Button';
import useBooking from '../../../hooks/useBooking';
import { BOOKING_STATUS } from '../../../utils/constants';
import { fontScale } from '../../../utils/responsive';

export default function PaymentScreen({ route, navigation }) {
  const { service, date, time, address } = route.params || {};
  const { addBooking } = useBooking();
  const payableAmount = Math.round((service?.price || 399) * 1.05);

  const submit = async () => {
    const booking = addBooking({
      service,
      date: date || 'Tomorrow',
      time: time || '4:00 PM',
      address: address || 'Atelier Studio, Suite 402',
      amount: payableAmount,
      status: BOOKING_STATUS.ACCEPTED,
    });

    navigation.navigate('PaymentReceiptScreen', {
      bookingId: booking.id,
      serviceName: service?.name || 'Beauty Service',
      amount: payableAmount,
      date: date || 'Tomorrow',
      time: time || '4:00 PM',
      address: address || 'Atelier Studio, Suite 402',
      transactionId: `RP_DEMO_${Date.now()}`,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={22} color="#FF6B2C" />
          </Pressable>
          <Text style={styles.topTitle}>Payment</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionKicker}>The Reservation</Text>
        <Text style={styles.heading}>Booking Summary</Text>

        <View style={styles.summaryGrid}>
          <View style={styles.summaryBox}>
            <View style={styles.summaryHead}>
              <MaterialIcons name="calendar-today" size={18} color="#FF6B2C" />
              <Text style={styles.summaryHeadText}>DATE & TIME</Text>
            </View>
            <Text style={styles.summaryMain}>{date || 'Tomorrow'}, {time || '4:00 PM'}</Text>
            <Text style={styles.summarySub}>Estimated duration: {service?.duration || '45 mins'}</Text>
          </View>
          <View style={styles.summaryBox}>
            <View style={styles.summaryHead}>
              <MaterialIcons name="location-on" size={18} color="#FF6B2C" />
              <Text style={styles.summaryHeadText}>LOCATION</Text>
            </View>
            <Text style={styles.summaryMain}>Atelier Studio, Suite 402</Text>
            <Text style={styles.summarySub}>{address || 'Bangalore, India'}</Text>
          </View>
        </View>

        <View style={styles.methodSection}>
          <View style={styles.methodHead}>
            <View>
              <Text style={styles.sectionKicker}>Transaction</Text>
              <Text style={styles.methodTitle}>Payment Method</Text>
            </View>
            <Text style={styles.methodSub}>Secure SSL Encrypted</Text>
          </View>
          <View style={[styles.methodCard, styles.methodCardActive]}>
            <View style={styles.methodLeft}>
              <View style={[styles.methodIcon, styles.methodIconActive]}>
                <MaterialIcons name="account-balance-wallet" size={20} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.methodName}>Razorpay (Demo)</Text>
                <Text style={styles.methodInfo}>Test mode payment for app demo</Text>
              </View>
            </View>
            <View style={[styles.radio, styles.radioActive]}>
              <View style={styles.radioDot} />
            </View>
          </View>
          <Text style={styles.demoHint}>Demo payment only. No real money will be charged.</Text>
        </View>

        <View style={styles.billCard}>
          <Text style={styles.billTitle}>Bill Details</Text>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>{service?.name || 'Service'}</Text>
            <Text style={styles.billValue}>INR {service?.price || 399}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Service Fee</Text>
            <Text style={styles.billValue}>INR {Math.round((service?.price || 399) * 0.05)}</Text>
          </View>
          <View style={styles.billDivider} />
          <View style={styles.billRow}>
            <Text style={styles.billTotalLabel}>Total Amount</Text>
            <Text style={styles.billTotalValue}>INR {payableAmount}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Total to Pay</Text>
          <Text style={styles.footerPrice}>INR {payableAmount}</Text>
        </View>
        <Button title="Pay Now" style={styles.placeBtn} onPress={submit} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EDE0D4' },
  topBar: { height: 62, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: 'rgba(192,201,195,0.35)' },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconBtn: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  topTitle: { color: '#FF6B2C', fontSize: fontScale(19), fontWeight: '700' },
  content: { padding: 14, paddingBottom: 116 },
  sectionKicker: { color: '#3a6c59', fontSize: fontScale(10), fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.2 },
  heading: { color: '#1E1E1E', fontSize: fontScale(30), fontWeight: '800', marginBottom: 10 },
  summaryGrid: { gap: 8, marginBottom: 12 },
  summaryBox: { borderRadius: 14, backgroundColor: '#F5F5F5', padding: 12 },
  summaryHead: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  summaryHeadText: { color: '#FF6B2C', fontSize: fontScale(10), fontWeight: '700', letterSpacing: 1.1 },
  summaryMain: { color: '#1E1E1E', fontSize: fontScale(15), fontWeight: '700' },
  summarySub: { color: '#6B6B6B', fontSize: fontScale(11), marginTop: 2 },
  methodSection: { marginBottom: 12 },
  methodHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 },
  methodTitle: { color: '#1E1E1E', fontSize: fontScale(22), fontWeight: '700' },
  methodSub: { color: '#6d7873', fontSize: fontScale(11) },
  methodCard: { borderRadius: 14, backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: 'transparent', padding: 12, marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  methodCardActive: { borderColor: '#FF6B2C', backgroundColor: 'rgba(182,235,211,0.2)' },
  methodLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, marginRight: 8 },
  methodIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' },
  methodIconActive: { backgroundColor: '#FF6B2C' },
  methodName: { color: '#1E1E1E', fontSize: fontScale(14), fontWeight: '700' },
  methodInfo: { color: '#6B6B6B', fontSize: fontScale(11), marginTop: 1 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#DADADA', alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: '#FF6B2C', backgroundColor: '#FF6B2C' },
  radioDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#FFFFFF' },
  demoHint: { color: '#6B6B6B', fontSize: fontScale(11), marginTop: 2, marginLeft: 2 },
  billCard: { borderRadius: 16, backgroundColor: '#1E1E1E', padding: 12 },
  billTitle: { color: '#FFFFFF', fontSize: fontScale(17), fontWeight: '700', marginBottom: 8 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  billLabel: { color: 'rgba(255,255,255,0.7)', fontSize: fontScale(12) },
  billValue: { color: '#FFFFFF', fontSize: fontScale(13), fontWeight: '700' },
  billDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: 6 },
  billTotalLabel: { color: '#FFFFFF', fontSize: fontScale(14), fontWeight: '700' },
  billTotalValue: { color: '#FFA06A', fontSize: fontScale(18), fontWeight: '800' },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderTopWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  footerLabel: { color: '#6d7873', fontSize: fontScale(10), fontWeight: '700', textTransform: 'uppercase' },
  footerPrice: { color: '#1E1E1E', fontSize: fontScale(20), fontWeight: '800' },
  placeBtn: { minWidth: 145, marginVertical: 0 },
});
