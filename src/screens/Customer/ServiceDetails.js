import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import servicesData from '../../data/servicesData';
import { fontScale } from '../../utils/responsive';

export default function ServiceDetails({ route, navigation }) {
  const { serviceId } = route.params || {};
  const service = servicesData.find((item) => item.id === serviceId);

  if (!service) return <View style={styles.center}><Text>Service not found.</Text></View>;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={22} color="#131e1c" />
          </Pressable>
          <Text style={styles.brand}>The Atelier</Text>
        </View>
        <View style={styles.topRight}>
          <Pressable style={styles.iconBtn}>
            <MaterialIcons name="share" size={20} color="#404944" />
          </Pressable>
          <Pressable style={styles.iconBtn}>
            <MaterialIcons name="favorite-border" size={20} color="#404944" />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <Image source={{ uri: service.image }} style={styles.heroImage} />
          <View style={styles.heroGrad} />
          <View style={styles.heroPill}>
            <Text style={styles.heroPillText}>{service.type || 'Premium Care'}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.titleRow}>
            <View style={styles.titleLeft}>
              <Text style={styles.name}>{service.name}</Text>
              <View style={styles.ratingRow}>
                <MaterialIcons name="star" size={14} color="#366855" />
                <Text style={styles.ratingText}>{service.rating || 4.8}</Text>
                <Text style={styles.reviewCount}>({service.reviews || 120} reviews)</Text>
              </View>
            </View>
            <View>
              <Text style={styles.price}>INR {service.price}</Text>
              <Text style={styles.tax}>Inclusive of all taxes</Text>
            </View>
          </View>

          <View style={styles.metaGrid}>
            <View style={styles.metaCard}>
              <View style={styles.metaIconCircle}>
                <MaterialIcons name="schedule" size={18} color="#366855" />
              </View>
              <Text style={styles.metaLabel}>Duration</Text>
              <Text style={styles.metaValue}>{service.duration}</Text>
            </View>
            <View style={styles.metaCard}>
              <View style={styles.metaIconCircleAlt}>
                <MaterialIcons name="spa" size={18} color="#025d47" />
              </View>
              <Text style={styles.metaLabel}>Type</Text>
              <Text style={styles.metaValue}>{service.category}</Text>
            </View>
          </View>

          <Text style={styles.aboutTitle}>About Service</Text>
          <Text style={styles.desc}>{service.description}</Text>

          <View style={styles.chipsWrap}>
            {(service.benefits || ['Premium Care', 'Skin Friendly', 'Long Lasting']).map((item) => (
              <View key={item} style={styles.chip}>
                <Text style={styles.chipText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.reviewSection}>
          <View style={styles.reviewHead}>
            <Text style={styles.reviewTitle}>User Reviews</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.reviewRow}>
            <View style={styles.reviewCard}>
              <View style={styles.reviewTop}>
                <View style={styles.avatar}><Text style={styles.avatarText}>A</Text></View>
                <View>
                  <Text style={styles.reviewer}>Ananya Sharma</Text>
                  <View style={styles.starRow}>
                    {[1, 2, 3, 4, 5].map((s) => <MaterialIcons key={`a-${s}`} name="star" size={12} color="#366855" />)}
                  </View>
                </View>
              </View>
              <Text style={styles.reviewDesc}>
                The service was smooth and professional. Loved the finish and hygiene standards.
              </Text>
            </View>
            <View style={styles.reviewCard}>
              <View style={styles.reviewTop}>
                <View style={[styles.avatar, styles.avatarAlt]}><Text style={styles.avatarText}>R</Text></View>
                <View>
                  <Text style={styles.reviewer}>Riya Kapoor</Text>
                  <View style={styles.starRow}>
                    {[1, 2, 3, 4].map((s) => <MaterialIcons key={`r-${s}`} name="star" size={12} color="#366855" />)}
                    <MaterialIcons name="star-border" size={12} color="#366855" />
                  </View>
                </View>
              </View>
              <Text style={styles.reviewDesc}>
                Great quality and comfort. Definitely booking again for the next appointment.
              </Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalWrap}>
          <Text style={styles.totalLabel}>Total Payable</Text>
          <Text style={styles.totalValue}>INR {service.price}</Text>
        </View>
        <View style={styles.actionRow}>
          <Pressable
            style={styles.addBtn}
            onPress={() => navigation.navigate('DateTimeScreen', { service })}
          >
            <MaterialIcons name="add-shopping-cart" size={16} color="#1c4f3e" />
            <Text style={styles.addBtnText}>Add To Cart</Text>
          </Pressable>
          <Pressable
            style={styles.bookNowBtn}
            onPress={() => navigation.navigate('BookingScreen', { service })}
          >
            <MaterialIcons name="flash-on" size={16} color="#FFFFFF" />
            <Text style={styles.bookNowText}>Book Now</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0fcfa' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  topBar: {
    height: 62,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(240,252,250,0.92)',
    borderBottomWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
  },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  topRight: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  brand: { color: '#313c3b', fontSize: fontScale(20), fontWeight: '800' },
  content: { paddingBottom: 110 },
  heroWrap: { height: 290, position: 'relative' },
  heroImage: { width: '100%', height: '100%', backgroundColor: '#d9e5e3' },
  heroGrad: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(19,30,28,0.15)' },
  heroPill: { position: 'absolute', left: 14, bottom: 14, backgroundColor: 'rgba(182,235,211,0.8)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  heroPillText: { color: '#1c4f3e', fontSize: fontScale(10), fontWeight: '700', textTransform: 'uppercase' },
  infoCard: {
    marginTop: -22,
    marginHorizontal: 12,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
    padding: 14,
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  titleLeft: { flex: 1, marginRight: 10 },
  name: { color: '#313c3b', fontSize: fontScale(25), fontWeight: '800' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  ratingText: { color: '#366855', fontSize: fontScale(12), fontWeight: '700' },
  reviewCount: { color: '#6d7873', fontSize: fontScale(11) },
  price: { color: '#366855', fontSize: fontScale(25), fontWeight: '800', textAlign: 'right' },
  tax: { color: '#6d7873', fontSize: fontScale(10), textAlign: 'right' },
  metaGrid: { flexDirection: 'row', gap: 8, marginTop: 12, marginBottom: 12 },
  metaCard: { flex: 1, borderRadius: 16, backgroundColor: '#eaf6f4', padding: 10 },
  metaIconCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#b6ebd3', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  metaIconCircleAlt: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#a6f2d4', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  metaLabel: { color: '#6d7873', fontSize: fontScale(10), textTransform: 'uppercase', fontWeight: '700' },
  metaValue: { color: '#313c3b', fontSize: fontScale(14), fontWeight: '700', marginTop: 2 },
  aboutTitle: { color: '#313c3b', fontSize: fontScale(18), fontWeight: '700', marginBottom: 6 },
  desc: { color: '#4f5a56', fontSize: fontScale(13), lineHeight: 20 },
  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  chip: { borderRadius: 999, backgroundColor: '#deebe8', paddingHorizontal: 10, paddingVertical: 6 },
  chipText: { color: '#366855', fontSize: fontScale(11), fontWeight: '700' },
  reviewSection: { paddingHorizontal: 14, marginTop: 14 },
  reviewHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  reviewTitle: { color: '#313c3b', fontSize: fontScale(19), fontWeight: '700' },
  viewAll: { color: '#366855', fontSize: fontScale(12), fontWeight: '700' },
  reviewRow: { gap: 10, paddingBottom: 8 },
  reviewCard: { width: 250, borderRadius: 16, backgroundColor: '#eaf6f4', padding: 12 },
  reviewTop: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#b6ebd3', alignItems: 'center', justifyContent: 'center' },
  avatarAlt: { backgroundColor: '#a6f2d4' },
  avatarText: { color: '#1c4f3e', fontWeight: '800' },
  reviewer: { color: '#313c3b', fontSize: fontScale(12), fontWeight: '700' },
  starRow: { flexDirection: 'row', marginTop: 1 },
  reviewDesc: { color: '#4f5a56', fontSize: fontScale(12), lineHeight: 18 },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  totalWrap: { minWidth: 92 },
  totalLabel: { color: '#6d7873', fontSize: fontScale(10), textTransform: 'uppercase', fontWeight: '700' },
  totalValue: { color: '#313c3b', fontSize: fontScale(18), fontWeight: '800' },
  actionRow: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  addBtn: {
    flex: 1,
    minHeight: 44,
    borderRadius: 12,
    backgroundColor: '#b6ebd3',
    borderWidth: 1,
    borderColor: '#9dd2bb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 8,
  },
  addBtnText: { color: '#1c4f3e', fontSize: fontScale(12), fontWeight: '700' },
  bookNowBtn: {
    flex: 1,
    minHeight: 44,
    borderRadius: 12,
    backgroundColor: '#366855',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 8,
  },
  bookNowText: { color: '#FFFFFF', fontSize: fontScale(12), fontWeight: '700' },
});
