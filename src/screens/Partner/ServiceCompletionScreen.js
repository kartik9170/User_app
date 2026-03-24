import React from 'react';
import { Alert, Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontScale } from '../../utils/responsive';
import PartnerBottomNav from '../../components/PartnerBottomNav';

export default function ServiceCompletionScreen({ navigation, route }) {
  const booking = route?.params?.booking;
  const showPreviewNav = route?.name === 'PartnerServiceCompletionPreview';
  const receiptId = booking?.id ? `EP-${String(booking.id).slice(-6).toUpperCase()}` : 'EP-942023-BT';

  const shareWhatsapp = async () => {
    const message = encodeURIComponent(
      `Service completed successfully for ${booking?.customerName || 'client'}.\nReceipt: ${receiptId}\nAmount: INR ${booking?.amount || 260}`
    );
    const url = `https://wa.me/?text=${message}`;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
      return;
    }
    Alert.alert('WhatsApp unavailable', 'Unable to open WhatsApp on this device.');
  };

  const goDashboard = () => {
    if (showPreviewNav) {
      navigation.navigate('PartnerHomePreview');
      return;
    }
    navigation.getParent()?.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <MaterialIcons name="menu" size={22} color="#1c4f3e" />
          <Text style={styles.brand}>Emerald Pro</Text>
        </View>
        <View style={styles.avatarWrap}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6OZSAbapjti9j3kLSo33ZErNhw13X9UtZ09QLkV3AztnUVDrnhJvFCX8De8Bnuy5HCKk1b7jcH4BUWFXvBg6ELX5pf0HuJ5DWP0mi77x7xMLnDlJax5Sp6gyAQDVotE1BTj_aaWK63OKtFodoiPukcARETjsqILk22rQdyIWuDhdd1O2CxsCaSrdx4CO8NFwf83hJ3Gkh-1zNDWYqD28H-KSE8sDjZAnkik2k2Vv_6K9cxbJTL7KyoX6N_PFn8JeIwq_KeVGvRRo',
            }}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.content, showPreviewNav && styles.contentPreview]} showsVerticalScrollIndicator={false}>
        <View style={styles.successWrap}>
          <View style={styles.successIcon}>
            <MaterialIcons name="check-circle" size={40} color="#1c4f3e" />
          </View>
          <Text style={styles.successTitle}>Service Completed</Text>
          <Text style={styles.successSub}>
            The transaction for {booking?.customerName || 'Elena Gilbert'} has been processed successfully.
          </Text>
        </View>

        <View style={styles.receiptCard}>
          <View style={styles.receiptHeader}>
            <View>
              <Text style={styles.receiptLabel}>Receipt</Text>
              <Text style={styles.receiptId}>{receiptId}</Text>
            </View>
            <Text style={styles.paidPill}>Paid</Text>
          </View>

          <View style={styles.lineItem}>
            <View>
              <Text style={styles.itemName}>Advanced Microneedling</Text>
              <Text style={styles.itemSub}>60 mins session</Text>
            </View>
            <Text style={styles.itemPrice}>$180.00</Text>
          </View>
          <View style={styles.lineItem}>
            <View>
              <Text style={styles.itemName}>Post-Care Serum Kit</Text>
              <Text style={styles.itemSub}>Home treatment</Text>
            </View>
            <Text style={styles.itemPrice}>$45.00</Text>
          </View>
          <View style={styles.lineItem}>
            <View>
              <Text style={styles.itemName}>Professional Tip</Text>
              <Text style={styles.itemSub}>Gratuity</Text>
            </View>
            <Text style={styles.itemPrice}>$35.00</Text>
          </View>

          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalTitle}>Total Amount</Text>
            <Text style={styles.totalAmount}>$260.00</Text>
          </View>

          <View style={styles.methodRow}>
            <View style={styles.methodBox}>
              <Text style={styles.methodLabel}>METHOD</Text>
              <View style={styles.methodValueRow}>
                <MaterialIcons name="credit-card" size={14} color="#313c3b" />
                <Text style={styles.methodValue}>Visa **** 4242</Text>
              </View>
            </View>
            <View style={styles.methodBox}>
              <Text style={styles.methodLabel}>DATE</Text>
              <View style={styles.methodValueRow}>
                <MaterialIcons name="calendar-today" size={14} color="#313c3b" />
                <Text style={styles.methodValue}>Oct 24, 2023</Text>
              </View>
            </View>
          </View>
        </View>

        <Pressable onPress={goDashboard} style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}>
          <Text style={styles.primaryBtnText}>Back to Dashboard</Text>
        </Pressable>

        <Pressable onPress={shareWhatsapp} style={({ pressed }) => [styles.secondaryBtn, pressed && styles.pressed]}>
          <MaterialIcons name="share" size={18} color="#1c4f3e" />
          <Text style={styles.secondaryBtnText}>Share via WhatsApp</Text>
        </Pressable>

        <Pressable onPress={() => Alert.alert('Print', 'Print receipt action can be connected here.')}>
          <Text style={styles.printText}>Print Physical Receipt</Text>
        </Pressable>
      </ScrollView>

      <PartnerBottomNav
        activeKey="home"
        onPressItem={(key) => {
          if (showPreviewNav) {
            if (key === 'home') navigation.navigate('PartnerHomePreview');
            if (key === 'book') navigation.navigate('PartnerBookPreview');
            if (key === 'pay') navigation.navigate('PartnerEarningsPreview');
            if (key === 'profile') navigation.navigate('PartnerProfileSetup');
            return;
          }

          if (key === 'home') goDashboard();
          if (key === 'book') navigation.getParent()?.navigate('Book');
          if (key === 'pay') navigation.getParent()?.navigate('Earnings');
          if (key === 'profile') navigation.getParent()?.navigate('Profile');
        }}
      />
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
    backgroundColor: 'rgba(234,246,244,0.9)',
  },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brand: { color: '#1c4f3e', fontSize: fontScale(24), fontWeight: '800' },
  avatarWrap: { width: 40, height: 40, borderRadius: 20, overflow: 'hidden', backgroundColor: '#e4f0ee' },
  avatar: { width: '100%', height: '100%' },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 116 },
  contentPreview: { paddingBottom: 124 },
  successWrap: { alignItems: 'center', marginBottom: 14 },
  successIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#b6ebd3', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  successTitle: { color: '#313c3b', fontSize: fontScale(36), fontWeight: '800', textAlign: 'center' },
  successSub: { color: '#5f6b66', fontSize: fontScale(14), textAlign: 'center', marginTop: 4, fontWeight: '500' },
  receiptCard: { borderRadius: 14, backgroundColor: '#FFFFFF', padding: 16, shadowColor: '#131e1c', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 20, elevation: 3, marginBottom: 14 },
  receiptHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  receiptLabel: { color: '#366855', fontSize: fontScale(12), fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.1 },
  receiptId: { color: '#6b7772', fontSize: fontScale(11) },
  paidPill: { backgroundColor: '#a6f2d4', color: '#00513d', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, fontSize: fontScale(10), fontWeight: '800', textTransform: 'uppercase' },
  lineItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 },
  itemName: { color: '#313c3b', fontSize: fontScale(14), fontWeight: '700' },
  itemSub: { color: '#707974', fontSize: fontScale(11), marginTop: 2 },
  itemPrice: { color: '#313c3b', fontSize: fontScale(14), fontWeight: '700' },
  divider: { height: 1, backgroundColor: 'rgba(192,201,195,0.35)', marginVertical: 8 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  totalTitle: { color: '#313c3b', fontSize: fontScale(20), fontWeight: '800' },
  totalAmount: { color: '#366855', fontSize: fontScale(30), fontWeight: '900' },
  methodRow: { flexDirection: 'row', gap: 10 },
  methodBox: { flex: 1, borderRadius: 10, backgroundColor: '#eaf6f4', padding: 10 },
  methodLabel: { color: '#6b7772', fontSize: fontScale(10), fontWeight: '800', letterSpacing: 1 },
  methodValueRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  methodValue: { color: '#313c3b', fontSize: fontScale(12), fontWeight: '700' },
  primaryBtn: { minHeight: 56, borderRadius: 14, backgroundColor: '#366855', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  primaryBtnText: { color: '#FFFFFF', fontSize: fontScale(18), fontWeight: '700' },
  secondaryBtn: { minHeight: 52, borderRadius: 14, backgroundColor: 'rgba(217,229,227,0.55)', borderWidth: 1, borderColor: 'rgba(192,201,195,0.4)', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6, marginBottom: 12 },
  secondaryBtnText: { color: '#1c4f3e', fontSize: fontScale(15), fontWeight: '700' },
  printText: { color: '#1c4f3e', fontSize: fontScale(14), fontWeight: '700', textAlign: 'center', textDecorationLine: 'underline', textDecorationColor: 'rgba(185,238,214,0.9)', marginBottom: 12 },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderTopWidth: 1,
    borderColor: 'rgba(16,185,129,0.12)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottomNavItem: {
    width: 78,
    minHeight: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNavItemActive: {
    backgroundColor: '#d1fae5',
  },
  bottomNavText: {
    marginTop: 2,
    color: '#2f7d5f',
    fontSize: fontScale(10),
    fontWeight: '600',
  },
  bottomNavTextActive: {
    color: '#1c4f3e',
    fontWeight: '700',
  },
  pressed: { transform: [{ scale: 0.98 }] },
});
