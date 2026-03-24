import React from 'react';
import { Alert, Platform, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontScale } from '../../../utils/responsive';

export default function PaymentReceiptScreen({ navigation, route }) {
  const { bookingId, serviceName, amount, date, time, address, transactionId } = route.params || {};

  const receiptText = [
    'THE ATELIER - PAYMENT RECEIPT',
    `Receipt ID: ${bookingId || 'N/A'}`,
    `Transaction ID: ${transactionId || 'N/A'}`,
    `Service: ${serviceName || 'Beauty Service'}`,
    `Date & Time: ${date || '-'} ${time || ''}`,
    `Address: ${address || '-'}`,
    `Amount Paid: INR ${amount || 0}`,
    `Paid Via: Razorpay Demo`,
    `Status: Success`,
  ].join('\n');

  const downloadReceipt = async () => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `atelier-receipt-${bookingId || Date.now()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      Alert.alert('Downloaded', 'Receipt downloaded successfully.');
      return;
    }

    await Share.share({ message: receiptText, title: 'Atelier Receipt' });
  };

  const goLiveTracking = () => {
    navigation.getParent()?.navigate('Bookings', {
      screen: 'LiveTracking',
      params: { bookingId },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={22} color="#366855" />
          </Pressable>
          <Text style={styles.topTitle}>Payment Receipt</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.successWrap}>
          <View style={styles.successIcon}>
            <MaterialIcons name="check" size={30} color="#FFFFFF" />
          </View>
          <Text style={styles.successTitle}>Payment Confirmed</Text>
          <Text style={styles.successSub}>Your booking is confirmed and receipt is ready.</Text>
        </View>

        <View style={styles.receiptCard}>
          <Text style={styles.receiptTitle}>Receipt Details</Text>
          <Row label="Receipt ID" value={bookingId || '-'} />
          <Row label="Transaction ID" value={transactionId || '-'} />
          <Row label="Service" value={serviceName || '-'} />
          <Row label="Date & Time" value={`${date || '-'} ${time || ''}`} />
          <Row label="Payment Method" value="Razorpay (Demo)" />
          <Row label="Status" value="Success" />
          <View style={styles.divider} />
          <Row label="Total Paid" value={`INR ${amount || 0}`} strong />
        </View>

        <Pressable onPress={downloadReceipt} style={styles.downloadBtn}>
          <MaterialIcons name="download" size={18} color="#1c4f3e" />
          <Text style={styles.downloadText}>Download Receipt</Text>
        </Pressable>

        <Pressable onPress={goLiveTracking} style={styles.trackBtn}>
          <MaterialIcons name="location-on" size={18} color="#FFFFFF" />
          <Text style={styles.trackText}>Live Tracking</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ label, value, strong = false }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, strong && styles.strong]}>{label}</Text>
      <Text style={[styles.rowValue, strong && styles.strong]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0fcfa' },
  topBar: { height: 62, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: 'rgba(192,201,195,0.35)' },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconBtn: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  topTitle: { color: '#366855', fontSize: fontScale(19), fontWeight: '700' },
  content: { padding: 14, paddingBottom: 24 },
  successWrap: { alignItems: 'center', marginBottom: 12 },
  successIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#366855', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  successTitle: { color: '#313c3b', fontSize: fontScale(26), fontWeight: '800' },
  successSub: { color: '#5f6b66', fontSize: fontScale(12), marginTop: 2, textAlign: 'center' },
  receiptCard: { borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(192,201,195,0.35)', padding: 12, marginBottom: 12 },
  receiptTitle: { color: '#313c3b', fontSize: fontScale(18), fontWeight: '700', marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, gap: 8 },
  rowLabel: { color: '#6d7873', fontSize: fontScale(12), flex: 1 },
  rowValue: { color: '#313c3b', fontSize: fontScale(12), fontWeight: '700', flex: 1, textAlign: 'right' },
  strong: { fontSize: fontScale(15), fontWeight: '800', color: '#1c4f3e' },
  divider: { height: 1, backgroundColor: 'rgba(192,201,195,0.45)', marginVertical: 6 },
  downloadBtn: {
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#9dd2bb',
    backgroundColor: '#b6ebd3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 10,
  },
  downloadText: { color: '#1c4f3e', fontSize: fontScale(14), fontWeight: '700' },
  trackBtn: {
    minHeight: 50,
    borderRadius: 12,
    backgroundColor: '#366855',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  trackText: { color: '#FFFFFF', fontSize: fontScale(15), fontWeight: '700' },
});
