import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontScale } from '../../../utils/responsive';

export default function BookingScreen({ route, navigation }) {
  const { service } = route.params || {};
  const [selectedDate, setSelectedDate] = useState('23');
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM');
  const [selectedAddress, setSelectedAddress] = useState('home');

  const days = useMemo(
    () => [
      { key: 'MON', date: '23' },
      { key: 'TUE', date: '24' },
      { key: 'WED', date: '25' },
      { key: 'THU', date: '26' },
      { key: 'FRI', date: '27' },
      { key: 'SAT', date: '28' },
    ],
    []
  );

  const slots = ['09:00 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM'];
  const addressBook = [
    { id: 'home', title: 'Home', subtitle: '42, Emerald Heights, Green Valley, Bangalore', icon: 'home' },
    { id: 'work', title: 'Work', subtitle: 'Tech Park Alpha, Tower B, Level 4, Bangalore', icon: 'work' },
  ];

  const selectedAddressData = addressBook.find((item) => item.id === selectedAddress);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={22} color="#1E1E1E" />
          </Pressable>
          <Text style={styles.topTitle}>Schedule Booking</Text>
        </View>
        <View style={styles.brandRow}>
          <MaterialIcons name="spa" size={18} color="#1E1E1E" />
          <Text style={styles.brandText}>The Atelier</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <View>
              <Text style={styles.summaryLabel}>Selected Service</Text>
              <Text style={styles.summaryService}>{service?.name || 'Service'}</Text>
            </View>
            <View style={styles.pricePill}>
              <Text style={styles.priceText}>INR {service?.price || 399}</Text>
            </View>
          </View>
          <View style={styles.durationRow}>
            <MaterialIcons name="timer" size={16} color="#6d7873" />
            <Text style={styles.durationText}>{service?.duration || '45 mins'} session</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <Text style={styles.sectionSub}>October 2023</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysRow}>
            {days.map((item) => {
              const active = item.date === selectedDate;
              return (
                <Pressable key={item.date} onPress={() => setSelectedDate(item.date)} style={[styles.dayCard, active && styles.dayCardActive]}>
                  <Text style={[styles.dayLabel, active && styles.dayLabelActive]}>{item.key}</Text>
                  <Text style={[styles.dayDate, active && styles.dayDateActive]}>{item.date}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Slots</Text>
          <View style={styles.slotGrid}>
            {slots.map((slot) => {
              const active = slot === selectedSlot;
              const disabled = slot === '07:00 PM';
              return (
                <Pressable
                  key={slot}
                  disabled={disabled}
                  onPress={() => setSelectedSlot(slot)}
                  style={[styles.slot, active && styles.slotActive, disabled && styles.slotDisabled]}
                >
                  <Text style={[styles.slotText, active && styles.slotTextActive, disabled && styles.slotTextDisabled]}>{slot}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Service Location</Text>
            <Pressable style={styles.addNewRow}>
              <MaterialIcons name="add" size={16} color="#FF6B2C" />
              <Text style={styles.addNewText}>Add New</Text>
            </Pressable>
          </View>
          <View style={styles.addressList}>
            {addressBook.map((item) => {
              const active = item.id === selectedAddress;
              return (
                <Pressable key={item.id} onPress={() => setSelectedAddress(item.id)} style={[styles.addressCard, active && styles.addressCardActive]}>
                  <View style={styles.addressIconWrap}>
                    <MaterialIcons name={item.icon} size={19} color={active ? '#FF6B2C' : '#6B6B6B'} />
                  </View>
                  <View style={styles.addressInfo}>
                    <Text style={styles.addressTitle}>{item.title}</Text>
                    <Text style={styles.addressSub}>{item.subtitle}</Text>
                  </View>
                  <View style={[styles.radioCircle, active && styles.radioCircleActive]}>
                    {active ? <View style={styles.radioDot} /> : null}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Total Amount</Text>
          <Text style={styles.bottomPrice}>INR {service?.price || 399}.00</Text>
        </View>
        <View style={styles.actionsRow}>
          <Pressable
            style={styles.bookBtn}
            onPress={() =>
              navigation.navigate('PaymentScreen', {
                service,
                date: selectedDate,
                time: selectedSlot,
                address: selectedAddressData?.subtitle,
                addressType: selectedAddressData?.title,
              })
            }
          >
            <MaterialIcons name="flash-on" size={17} color="#FFFFFF" />
            <Text style={styles.bookBtnText}>Book Now</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EDE0D4' },
  topBar: {
    height: 64,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
    backgroundColor: 'rgba(240,252,250,0.92)',
  },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconBtn: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  topTitle: { color: '#1E1E1E', fontSize: fontScale(19), fontWeight: '700' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  brandText: { color: '#1E1E1E', fontWeight: '800' },
  content: { paddingHorizontal: 14, paddingTop: 12, paddingBottom: 120 },
  summaryCard: { borderRadius: 18, backgroundColor: '#FFFFFF', padding: 14, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(192,201,195,0.35)' },
  summaryTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { color: '#6d7873', fontSize: fontScale(10), textTransform: 'uppercase', fontWeight: '700', letterSpacing: 1.2 },
  summaryService: { color: '#1E1E1E', fontSize: fontScale(20), fontWeight: '700', marginTop: 2 },
  pricePill: { backgroundColor: 'rgba(182,235,211,0.45)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  priceText: { color: '#FF6B2C', fontSize: fontScale(13), fontWeight: '800' },
  durationRow: { marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 6 },
  durationText: { color: '#6B6B6B', fontSize: fontScale(12) },
  section: { marginBottom: 16 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { color: '#1E1E1E', fontSize: fontScale(18), fontWeight: '700' },
  sectionSub: { color: '#FF6B2C', fontSize: fontScale(12), fontWeight: '700' },
  daysRow: { gap: 8 },
  dayCard: { width: 64, height: 84, borderRadius: 14, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' },
  dayCardActive: { backgroundColor: '#FF6B2C' },
  dayLabel: { color: '#6d7873', fontSize: fontScale(10), fontWeight: '700' },
  dayLabelActive: { color: 'rgba(255,255,255,0.85)' },
  dayDate: { color: '#1E1E1E', fontSize: fontScale(23), fontWeight: '800', marginTop: 2 },
  dayDateActive: { color: '#FFFFFF' },
  slotGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  slot: { width: '31.5%', minHeight: 42, borderRadius: 999, borderWidth: 1, borderColor: 'rgba(192,201,195,0.45)', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  slotActive: { backgroundColor: '#FF6B2C', borderColor: '#FF6B2C' },
  slotDisabled: { opacity: 0.4 },
  slotText: { color: '#6B6B6B', fontSize: fontScale(12), fontWeight: '600' },
  slotTextActive: { color: '#FFFFFF', fontWeight: '700' },
  slotTextDisabled: { color: '#7a8681' },
  addNewRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  addNewText: { color: '#FF6B2C', fontSize: fontScale(12), fontWeight: '700' },
  addressList: { gap: 8 },
  addressCard: { borderRadius: 16, backgroundColor: '#F5F5F5', borderWidth: 2, borderColor: 'transparent', padding: 12, flexDirection: 'row', alignItems: 'center' },
  addressCardActive: { backgroundColor: '#FFFFFF', borderColor: '#FF6B2C' },
  addressIconWrap: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  addressInfo: { flex: 1 },
  addressTitle: { color: '#1E1E1E', fontSize: fontScale(14), fontWeight: '700' },
  addressSub: { color: '#6B6B6B', fontSize: fontScale(11), marginTop: 2 },
  radioCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#DADADA', alignItems: 'center', justifyContent: 'center' },
  radioCircleActive: { borderColor: '#FF6B2C', backgroundColor: '#FF6B2C' },
  radioDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#FFFFFF' },
  bottomBar: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomLabel: { color: '#6d7873', fontSize: fontScale(10), fontWeight: '700', textTransform: 'uppercase' },
  bottomPrice: { color: '#1E1E1E', fontSize: fontScale(22), fontWeight: '800' },
  actionsRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bookBtn: {
    borderRadius: 12,
    minHeight: 44,
    minWidth: 132,
    paddingHorizontal: 14,
    backgroundColor: '#FF6B2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  bookBtnText: { color: '#FFFFFF', fontSize: fontScale(12), fontWeight: '700' },
});
