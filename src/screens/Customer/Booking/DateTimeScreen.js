import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../../components/Button';
import { fontScale } from '../../../utils/responsive';

export default function DateTimeScreen({ route, navigation }) {
  const { service, date, time, address, addressType } = route.params || {};

  const bundles = [
    {
      id: 'b-1',
      name: 'The Glow Collection',
      desc: 'Facial + LED Therapy + Serum',
      price: '$210',
      old: '$245',
      save: 'Save 15%',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'b-2',
      name: 'Restorative Duo',
      desc: 'Massage + Scalp Treatment',
      price: '$160',
      old: '$190',
      save: 'Save 12%',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={22} color="#FF6B2C" />
          </Pressable>
          <Text style={styles.topTitle}>Review Order</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>Your Selection</Text>
        <Text style={styles.heading}>Your Custom Beauty Ritual</Text>

        <View style={styles.itemCard}>
          <View style={styles.itemLeft}>
            <Text style={styles.itemName}>{service?.name || 'Service'}</Text>
            <Text style={styles.itemMeta}>{service?.duration || '45 mins'} • {service?.category || 'Beauty Care'}</Text>
            <Text style={styles.itemBadge}>Premium Service</Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.itemPrice}>INR {service?.price || 399}</Text>
            <MaterialIcons name="delete-outline" size={20} color="#9aa6a1" />
          </View>
        </View>

        <View style={styles.itemCardMuted}>
          <View style={styles.itemLeft}>
            <Text style={styles.itemName}>Home Visit Slot</Text>
            <Text style={styles.itemMeta}>{addressType || 'Home'} • {date || '23 Oct'} • {time || '11:30 AM'}</Text>
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.itemPrice}>INR 0</Text>
          </View>
        </View>

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Artisan Packages</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bundleRow}>
          {bundles.map((bundle) => (
            <View key={bundle.id} style={styles.bundleCard}>
              <Image source={{ uri: bundle.image }} style={styles.bundleImage} />
              <View style={styles.bundleBody}>
                <Text style={styles.bundleName}>{bundle.name}</Text>
                <Text style={styles.bundleDesc}>{bundle.desc}</Text>
                <View style={styles.bundleFooter}>
                  <Text style={styles.bundlePrice}>{bundle.price} <Text style={styles.bundleOld}>{bundle.old}</Text></Text>
                  <Pressable style={styles.bundleAddBtn}>
                    <MaterialIcons name="add" size={16} color="#FFFFFF" />
                  </Pressable>
                </View>
              </View>
              <Text style={styles.saveTag}>{bundle.save}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>INR {service?.price || 399}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service Tax (5%)</Text>
            <Text style={styles.summaryValue}>INR {Math.round((service?.price || 399) * 0.05)}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>INR {Math.round((service?.price || 399) * 1.05)}</Text>
          </View>
        </View>

        <Button
          title="Proceed To Payment"
          onPress={() =>
            navigation.navigate('PaymentScreen', {
              service,
              date,
              time,
              address,
              addressType,
            })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EDE0D4' },
  topBar: { height: 62, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: 'rgba(192,201,195,0.35)' },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconBtn: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  topTitle: { color: '#FF6B2C', fontSize: fontScale(19), fontWeight: '700' },
  content: { padding: 14, paddingBottom: 24 },
  eyebrow: { color: '#3a6c59', fontSize: fontScale(10), fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.4 },
  heading: { color: '#1E1E1E', fontSize: fontScale(34), fontWeight: '800', lineHeight: fontScale(40), marginTop: 4, marginBottom: 12 },
  itemCard: { borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(192,201,195,0.35)', padding: 12, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  itemCardMuted: { borderRadius: 16, backgroundColor: '#F5F5F5', padding: 12, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  itemLeft: { flex: 1, marginRight: 8 },
  itemName: { color: '#1E1E1E', fontSize: fontScale(16), fontWeight: '700' },
  itemMeta: { color: '#6B6B6B', fontSize: fontScale(12), marginTop: 2 },
  itemBadge: { marginTop: 6, alignSelf: 'flex-start', backgroundColor: 'rgba(182,235,211,0.5)', color: '#FF6B2C', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4, fontSize: fontScale(9), fontWeight: '700', textTransform: 'uppercase' },
  itemRight: { alignItems: 'flex-end', justifyContent: 'space-between' },
  itemPrice: { color: '#FF6B2C', fontSize: fontScale(16), fontWeight: '800' },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 },
  sectionTitle: { color: '#1E1E1E', fontSize: fontScale(22), fontWeight: '700' },
  viewAll: { color: '#FF6B2C', fontSize: fontScale(12), fontWeight: '700' },
  bundleRow: { gap: 10, paddingBottom: 8 },
  bundleCard: { width: 260, borderRadius: 16, backgroundColor: '#F5F5F5', overflow: 'hidden', position: 'relative' },
  bundleImage: { width: '100%', height: 120 },
  bundleBody: { padding: 10 },
  bundleName: { color: '#1E1E1E', fontSize: fontScale(15), fontWeight: '700' },
  bundleDesc: { color: '#6B6B6B', fontSize: fontScale(11), marginTop: 2 },
  bundleFooter: { marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bundlePrice: { color: '#FF6B2C', fontSize: fontScale(16), fontWeight: '800' },
  bundleOld: { color: '#8a9692', textDecorationLine: 'line-through', fontSize: fontScale(11), fontWeight: '400' },
  bundleAddBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#FF6B2C', alignItems: 'center', justifyContent: 'center' },
  saveTag: { position: 'absolute', top: 8, right: 8, backgroundColor: '#FFA06A', color: '#1E1E1E', fontSize: fontScale(9), fontWeight: '800', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4, textTransform: 'uppercase' },
  summaryCard: { marginTop: 8, borderRadius: 16, backgroundColor: 'rgba(228,240,238,0.5)', padding: 12, marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  summaryLabel: { color: '#6B6B6B', fontSize: fontScale(12) },
  summaryValue: { color: '#1E1E1E', fontSize: fontScale(13), fontWeight: '700' },
  summaryDivider: { height: 1, backgroundColor: 'rgba(192,201,195,0.5)', marginVertical: 6 },
  totalLabel: { color: '#1E1E1E', fontSize: fontScale(15), fontWeight: '700' },
  totalValue: { color: '#FF6B2C', fontSize: fontScale(18), fontWeight: '800' },
});
