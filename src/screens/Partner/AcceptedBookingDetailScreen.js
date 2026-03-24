import React from 'react';
import { Alert, Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontScale } from '../../utils/responsive';

export default function AcceptedBookingDetailScreen({ navigation, route }) {
  const booking = route?.params?.booking;

  const details = {
    customerName: booking?.customerName || 'Priya Sharma',
    date: booking?.date || 'Today',
    time: booking?.time || '2:30 PM',
    address: booking?.address || 'Flat 402, Green Meadows Apartment, Sector 45, Gurgaon, Haryana 122003',
    totalAmount: booking?.amount || 798,
    phone: booking?.phone || '+919876543210',
  };

  const openVerification = () => {
    const verifyRoute =
      route?.name === 'PartnerAcceptedBookDetailPreview'
        ? 'PartnerServiceVerificationPreview'
        : 'ServiceVerification';
    navigation.navigate(verifyRoute, { booking });
  };

  const openMaps = async () => {
    const query = encodeURIComponent(details.address);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
      return;
    }
    Alert.alert('Maps Unavailable', 'Unable to open maps on this device.');
  };

  const callClient = async () => {
    const dialUrl = `tel:${details.phone.replace(/\s+/g, '')}`;
    const supported = await Linking.canOpenURL(dialUrl);
    if (supported) {
      await Linking.openURL(dialUrl);
      return;
    }
    Alert.alert('Call Unavailable', `Please call manually: ${details.phone}`);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back-ios-new" size={18} color="#313c3b" />
          </Pressable>
          <Text style={styles.topTitle}>Booking Details</Text>
        </View>
        <Text style={styles.confirmedPill}>Confirmed</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroLeft}>
            <Text style={styles.smallLabel}>Upcoming Session</Text>
            <Text style={styles.customerName}>{details.customerName}</Text>
            <View style={styles.timeRow}>
              <MaterialIcons name="schedule" size={16} color="#366855" />
              <Text style={styles.timeText}>
                {details.date}, {details.time}
              </Text>
            </View>
          </View>
          <View style={styles.avatarWrap}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFb5kegDaYhMobKTgHawgadJk-WPQ7SiAKl3glmmBrOZOh-erj0Rs-2TOguSRnq9c1yxEOMhuUqHfqAsKlLxtT-2ok7qs3QdKBxUK6ffR7-54q2wY1TZljhkho4GymkVA9Bty-KwW2oXewuoauEe-vKF23IHjOPSdoeR4gKY9kVeMlUoChBnPPx8G8NfOEocxkxn6LuuEzHdfVa33-347Kgfg4cIO1IuI_p-V_LDGvBVm2_AG1JrseCHEhDnL59Ro50YrU0FWoQCQ',
              }}
              style={styles.avatar}
            />
          </View>
        </View>

        <View style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <View style={styles.locationTextWrap}>
              <View style={styles.locationTitleRow}>
                <MaterialIcons name="location-on" size={20} color="#366855" />
                <Text style={styles.sectionTitle}>Service Location</Text>
              </View>
              <Text style={styles.locationAddress}>{details.address}</Text>
            </View>
            <Pressable style={styles.mapsBtn} onPress={openMaps}>
              <MaterialIcons name="map" size={18} color="#313c3b" />
              <Text style={styles.mapsBtnText}>MAPS</Text>
            </Pressable>
          </View>
          <View style={styles.mapCard}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAob7drsEMGvnfnnenLglVLr2gu_ME3fFzRB0Fi3n333luWgbr08EMBE4LYapcTQR0r7gfNe097rvQ54iYreAoZC7Ex_qYFstbdf3odxp7duIZ4-LnzEcuB-l8YVMu_Gxsb-_P3uMl2OSFQhtVPDdFwdNPFx6KAOJHz19QaRnI--YnTSwrKR6JAtfmi-zuzXxKLauwLZh9MGrWmyG14fWVeBxgRxTMU7FhlSZruUSfVACKQh0cDVVM4cFFFh8h08-0hg6qC2pSw5bw',
              }}
              style={styles.mapImage}
            />
            <View style={styles.mapOverlay} />
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.sectionTitle}>Service Summary</Text>
            <View style={styles.headerLine} />
          </View>

          <View style={styles.summaryItem}>
            <View>
              <Text style={styles.itemName}>Full Legs Waxing</Text>
              <Text style={styles.itemMeta}>45 mins • Rica Wax</Text>
            </View>
            <Text style={styles.itemPrice}>INR 599</Text>
          </View>
          <View style={styles.summaryItem}>
            <View>
              <Text style={styles.itemName}>Underarms Waxing</Text>
              <Text style={styles.itemMeta}>15 mins • Quick Care</Text>
            </View>
            <Text style={styles.itemPrice}>INR 199</Text>
          </View>

          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>TOTAL AMOUNT</Text>
              <Text style={styles.totalSub}>Incl. all taxes & fees</Text>
            </View>
            <Text style={styles.totalValue}>INR {details.totalAmount}</Text>
          </View>
        </View>

        <View style={styles.notesCard}>
          <View style={styles.notesTitleRow}>
            <MaterialIcons name="sticky-note-2" size={18} color="#366855" />
            <Text style={styles.notesTitle}>Pro Notes</Text>
          </View>
          <Text style={styles.notesText}>
            "Client prefers low temperature wax. Skin is slightly sensitive on the ankles."
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable
          style={({ pressed }) => [styles.navigateBtn, pressed && styles.pressed]}
          onPress={openVerification}
        >
          <MaterialIcons name="verified-user" size={20} color="#FFFFFF" />
          <Text style={styles.navigateBtnText}>Verify Service (OTP)</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.callBtn, pressed && styles.pressed]}
          onPress={callClient}
        >
          <MaterialIcons name="call" size={22} color="#313c3b" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#d0ddda' },
  topBar: {
    height: 64,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(240,252,250,0.92)',
    borderBottomWidth: 1,
    borderColor: 'rgba(192,201,195,0.25)',
  },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#e4f0ee', alignItems: 'center', justifyContent: 'center' },
  topTitle: { color: '#313c3b', fontSize: fontScale(20), fontWeight: '700' },
  confirmedPill: {
    backgroundColor: 'rgba(182,235,211,0.45)',
    color: '#1c4f3e',
    fontSize: fontScale(10),
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  content: { paddingHorizontal: 14, paddingTop: 12, paddingBottom: 120, gap: 10 },
  heroCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroLeft: { flex: 1, marginRight: 10 },
  smallLabel: { color: '#6b7772', fontSize: fontScale(10), textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: '700' },
  customerName: { color: '#313c3b', fontSize: fontScale(30), fontWeight: '800', marginTop: 2 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  timeText: { color: '#5f6b66', fontSize: fontScale(13), fontWeight: '700' },
  avatarWrap: { width: 64, height: 64, borderRadius: 12, overflow: 'hidden', borderWidth: 2, borderColor: '#f0fcfa', backgroundColor: '#deebe8' },
  avatar: { width: '100%', height: '100%' },
  locationCard: { borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(255,255,255,0.8)', overflow: 'hidden' },
  locationHeader: { padding: 14, paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  locationTextWrap: { flex: 1 },
  locationTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  sectionTitle: { color: '#313c3b', fontSize: fontScale(18), fontWeight: '700' },
  locationAddress: { color: '#5f6b66', fontSize: fontScale(13), lineHeight: 18, paddingLeft: 26 },
  mapsBtn: {
    minWidth: 64,
    borderRadius: 10,
    backgroundColor: '#deebe8',
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  mapsBtnText: { color: '#313c3b', fontSize: fontScale(10), fontWeight: '800', marginTop: 2, letterSpacing: 0.7 },
  mapCard: { height: 170, marginHorizontal: 14, marginBottom: 14, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(192,201,195,0.25)' },
  mapImage: { width: '100%', height: '100%' },
  mapOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.04)' },
  summaryCard: { borderRadius: 16, backgroundColor: '#eaf6f4', padding: 14 },
  summaryHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  headerLine: { flex: 1, height: 1, backgroundColor: 'rgba(112,121,116,0.25)' },
  summaryItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  itemName: { color: '#313c3b', fontSize: fontScale(14), fontWeight: '700' },
  itemMeta: { color: '#5f6b66', fontSize: fontScale(11), marginTop: 1 },
  itemPrice: { color: '#313c3b', fontSize: fontScale(14), fontWeight: '700' },
  totalRow: { borderTopWidth: 1, borderColor: 'rgba(112,121,116,0.2)', paddingTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  totalLabel: { color: '#6b7772', fontSize: fontScale(10), fontWeight: '800', letterSpacing: 1.2 },
  totalSub: { color: '#366855', fontSize: fontScale(10), marginTop: 2 },
  totalValue: { color: '#313c3b', fontSize: fontScale(32), fontWeight: '900' },
  notesCard: { borderLeftWidth: 4, borderLeftColor: 'rgba(54,104,85,0.35)', borderRadius: 12, backgroundColor: '#FFFFFF', padding: 14 },
  notesTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  notesTitle: { color: '#313c3b', fontSize: fontScale(12), fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
  notesText: { color: '#5f6b66', fontSize: fontScale(14), fontStyle: 'italic', lineHeight: 20 },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(240,252,250,0.92)',
    borderTopWidth: 1,
    borderColor: 'rgba(192,201,195,0.25)',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 20,
  },
  navigateBtn: { flex: 3, minHeight: 56, borderRadius: 14, backgroundColor: '#366855', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  navigateBtnText: { color: '#FFFFFF', fontSize: fontScale(16), fontWeight: '700' },
  callBtn: { flex: 1, minHeight: 56, borderRadius: 14, backgroundColor: '#deebe8', borderWidth: 1, borderColor: 'rgba(192,201,195,0.35)', alignItems: 'center', justifyContent: 'center' },
  pressed: { transform: [{ scale: 0.97 }] },
});
