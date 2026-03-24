import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontScale } from '../../utils/responsive';
import PartnerBottomNav from '../../components/PartnerBottomNav';

export default function PerformanceScreen({ route, navigation }) {
  const showPreviewBottomNav = route?.name === 'PartnerEarningsPreview';
  const [selectedMonth, setSelectedMonth] = useState('Sep');

  const monthData = useMemo(
    () => ({
      Jan: { earnings: '$9,120.00', growth: '+4%', bookings: 104, retention: '71%', rating: '4.5', bars: [52, 60, 74, 68] },
      Feb: { earnings: '$9,840.00', growth: '+6%', bookings: 110, retention: '73%', rating: '4.6', bars: [55, 62, 78, 70] },
      Mar: { earnings: '$10,520.00', growth: '+7%', bookings: 116, retention: '76%', rating: '4.6', bars: [58, 68, 82, 73] },
      Apr: { earnings: '$10,980.00', growth: '+5%', bookings: 118, retention: '77%', rating: '4.7', bars: [60, 70, 85, 76] },
      May: { earnings: '$11,360.00', growth: '+4%', bookings: 121, retention: '78%', rating: '4.7', bars: [62, 71, 87, 77] },
      Jun: { earnings: '$11,940.00', growth: '+6%', bookings: 126, retention: '79%', rating: '4.8', bars: [66, 75, 89, 79] },
      Jul: { earnings: '$12,060.00', growth: '+3%', bookings: 129, retention: '80%', rating: '4.8', bars: [67, 76, 90, 80] },
      Aug: { earnings: '$12,230.00', growth: '+2%', bookings: 133, retention: '82%', rating: '4.8', bars: [68, 79, 92, 81] },
      Sep: { earnings: '$12,450.00', growth: '+12%', bookings: 142, retention: '84%', rating: '4.8', bars: [40, 65, 95, 55] },
      Oct: { earnings: '$11,980.00', growth: '-4%', bookings: 131, retention: '81%', rating: '4.7', bars: [62, 74, 84, 71] },
      Nov: { earnings: '$12,330.00', growth: '+3%', bookings: 136, retention: '83%', rating: '4.8', bars: [64, 77, 88, 75] },
      Dec: { earnings: '$13,100.00', growth: '+7%', bookings: 148, retention: '86%', rating: '4.9', bars: [70, 80, 96, 84] },
    }),
    []
  );

  const months = useMemo(() => Object.keys(monthData), [monthData]);
  const current = monthData[selectedMonth];

  const reviews = useMemo(
    () => [
      {
        id: 'rv-1',
        name: 'Sarah Jenkins',
        when: '2 hours ago',
        service: 'Balayage',
        rating: 5,
        text: 'Absolutely incredible attention to detail. The color is exactly what I wanted, and the atmosphere was calming.',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCnH-S4z4XFXvi-hZx4FJCbSbvjYQcLBvpxmtKtj0YUaJ3h8XPPAYKg2eQwyAymecLu56Woax6jVF2uk1Qdn1M7wmvoccxaSzLKeqnBvXXhmhG5k3rMxz79_HHICBAIo0cC4GK11CVYInn1XT0UGbN86K5cyppYYr-u5O1TG_Hk3f-hatOiaTGPo9-ZtHs2yW1HjMf0KhrvYXCr_zp6WB4FGUid7JUKqdagTl4nQjrdSYXvAgM1sXTgxIrHuegFIBYS5TeiiREF_Vw',
      },
      {
        id: 'rv-2',
        name: 'David Chen',
        when: 'Yesterday',
        service: 'Signature Cut',
        rating: 4,
        text: 'Great experience as always. Professional, punctual, and highly skilled. Highly recommend for any styling needs.',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAgxwC15mLUrCmcqWw8LU95lEs31brqd9LWB1wX3U1UWDLQ5AcGX41QAt9T0xRpoS0eF-x8iz17V1bci9ndyXT_heVGsslRu4QqBfUdO2jglgrRTYAFf2KaYRDNog9QoO8fcZh4dqRkKQ7cy4R107XeLZRF-w6XJkfzKLESA2HHquLfbl408sLTkx0SggUbmfvbx-CDSYaPepIVffvEgj4RPodNBYtNlpY6eCoXQ4jsuO-MbxIJLd-zUFyEqdf26eB4TQHkK_vo9sQ',
      },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <View style={styles.avatarWrap}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1iR1Acy8YOdjEulUX2KlE8UnqPKRfHM7X9wiyWIMABzo1v0J2gzKfrd8nAqUiiNEdndrrbeeLmynLzm8fgZS_cQh-7A3w0er_j_VmFSpi4XsXMkFLJaGAEVig5tu4DVx1cxtlmySpd9SmpZQcsU3lrpPqVOVY6bikvC-BmBAxelhn8At-dm8XQ6UsYh6ru3X0yL0tNtn8EYxO7X6PaPErYY1gaIffk4Qj1xkj6leQ89-fOoaDbSr6QKgKmsnXb0VKBGI_l-F-4oM',
              }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.brand}>Atelier Pro</Text>
        </View>
        <Pressable style={styles.notificationBtn}>
          <MaterialIcons name="notifications" size={21} color="#366855" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={[styles.content, showPreviewBottomNav && styles.contentWithPreviewNav]} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Text style={styles.heroLabel}>GLOBAL AVERAGE</Text>
          <View style={styles.heroScoreRow}>
            <Text style={styles.heroScore}>{current.rating}</Text>
            <MaterialIcons name="star" size={38} color="#8bd5b9" />
          </View>
          <View style={styles.lineRatingRow}>
            {[1, 2, 3, 4, 5].map((item) => (
              <View key={item} style={[styles.lineBar, item <= Number(current.rating) ? styles.lineBarActive : styles.lineBarMuted]} />
            ))}
          </View>
          <Text style={styles.heroSub}>Top 5% of professionals in your area</Text>
        </View>

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Month in Review</Text>
          <Text style={styles.sectionSub}>{selectedMonth.toUpperCase()}</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.monthRow}>
          {months.map((month) => {
            const active = month === selectedMonth;
            return (
              <Pressable key={month} onPress={() => setSelectedMonth(month)} style={[styles.monthChip, active && styles.monthChipActive]}>
                <Text style={[styles.monthChipText, active && styles.monthChipTextActive]}>{month}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.statsCard}>
          <View style={styles.statsGlow} />
          <Text style={styles.statsLabel}>Total Earnings</Text>
          <Text style={styles.statsAmount}>{current.earnings}</Text>
          <View style={styles.growthChip}>
            <MaterialIcons name="trending-up" size={14} color="#FFFFFF" />
            <Text style={styles.growthChipText}>{current.growth} vs last month</Text>
          </View>
        </View>

        <View style={styles.gridRow}>
          <View style={[styles.smallStatCard, styles.smallStatSurface]}>
            <MaterialIcons name="event-available" size={24} color="#366855" />
            <Text style={styles.smallStatValue}>{current.bookings}</Text>
            <Text style={styles.smallStatLabel}>Bookings</Text>
          </View>
          <View style={[styles.smallStatCard, styles.smallStatGreen]}>
            <MaterialIcons name="group-add" size={24} color="#1c4f3e" />
            <Text style={[styles.smallStatValue, styles.smallStatValueGreen]}>{current.retention}</Text>
            <Text style={[styles.smallStatLabel, styles.smallStatLabelGreen]}>Retention</Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Weekly Trend</Text>
          <View style={styles.chartRow}>
            {current.bars.map((height, idx) => (
              <View key={`week-${idx + 1}`} style={styles.chartCol}>
                <View style={[styles.chartBar, { height: `${height}%` }, idx === 2 && styles.chartBarActive]} />
                <Text style={[styles.chartLabel, idx === 2 && styles.chartLabelActive]}>{`W${idx + 1}`}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.reviewHead}>
          <Text style={styles.reviewTitle}>Recent Reviews</Text>
          <Pressable>
            <Text style={styles.reviewAction}>View All</Text>
          </Pressable>
        </View>

        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewTop}>
              <View style={styles.clientRow}>
                <View style={styles.clientAvatarWrap}>
                  <Image source={{ uri: review.avatar }} style={styles.clientAvatar} />
                </View>
                <View>
                  <Text style={styles.clientName}>{review.name}</Text>
                  <Text style={styles.clientMeta}>{`${review.when} - ${review.service}`}</Text>
                </View>
              </View>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <MaterialIcons key={`${review.id}-${star}`} name="star" size={14} color={star <= review.rating ? '#366855' : '#d9e5e3'} />
                ))}
              </View>
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        ))}
      </ScrollView>

      {showPreviewBottomNav ? (
        <PartnerBottomNav
          activeKey="pay"
          onPressItem={(key) => {
            if (key === 'home') navigation.navigate('PartnerHomePreview');
            if (key === 'book') navigation.navigate('PartnerBookPreview');
            if (key === 'pay') navigation.navigate('PartnerEarningsPreview');
            if (key === 'profile') navigation.navigate('PartnerProfessionalProfilePreview');
          }}
        />
      ) : null}
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
    backgroundColor: '#e4f0ee',
  },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatarWrap: { width: 32, height: 32, borderRadius: 16, overflow: 'hidden', backgroundColor: '#d9e5e3' },
  avatar: { width: '100%', height: '100%' },
  brand: { color: '#313c3b', fontSize: fontScale(24), fontWeight: '900', letterSpacing: -0.7 },
  notificationBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  content: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 24 },
  contentWithPreviewNav: { paddingBottom: 126 },
  heroSection: { marginBottom: 18, alignItems: 'center' },
  heroLabel: { color: '#5f6b66', fontSize: fontScale(10), fontWeight: '700', letterSpacing: 2, marginBottom: 8 },
  heroScoreRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  heroScore: { color: '#313c3b', fontSize: fontScale(74), fontWeight: '900', lineHeight: fontScale(80) },
  lineRatingRow: { marginTop: 8, flexDirection: 'row', gap: 6 },
  lineBar: { width: 42, height: 4, borderRadius: 999 },
  lineBarActive: { backgroundColor: '#366855' },
  lineBarMuted: { backgroundColor: '#d9e5e3' },
  heroSub: { marginTop: 10, color: '#5f6b66', fontSize: fontScale(12), textAlign: 'center' },
  sectionHead: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { color: '#313c3b', fontSize: fontScale(28), fontWeight: '800' },
  sectionSub: { color: '#366855', fontSize: fontScale(11), fontWeight: '700', letterSpacing: 1.2 },
  monthRow: { gap: 8, paddingBottom: 8 },
  monthChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(192,201,195,0.6)',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  monthChipActive: { backgroundColor: '#366855', borderColor: '#366855' },
  monthChipText: { color: '#5f6b66', fontSize: fontScale(11), fontWeight: '700' },
  monthChipTextActive: { color: '#FFFFFF' },
  statsCard: {
    borderRadius: 26,
    backgroundColor: '#366855',
    padding: 18,
    marginBottom: 10,
    overflow: 'hidden',
  },
  statsGlow: { position: 'absolute', right: -34, bottom: -34, width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(2,93,71,0.32)' },
  statsLabel: { color: 'rgba(255,255,255,0.82)', fontSize: fontScale(11), fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.2 },
  statsAmount: { color: '#FFFFFF', fontSize: fontScale(42), fontWeight: '800', marginTop: 2, marginBottom: 8 },
  growthChip: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  growthChipText: { color: '#FFFFFF', fontSize: fontScale(10), fontWeight: '700' },
  gridRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  smallStatCard: { flex: 1, borderRadius: 22, minHeight: 138, padding: 16, justifyContent: 'space-between' },
  smallStatSurface: { backgroundColor: '#eaf6f4' },
  smallStatGreen: { backgroundColor: '#b6ebd3' },
  smallStatValue: { color: '#131e1c', fontSize: fontScale(34), fontWeight: '800' },
  smallStatValueGreen: { color: '#1c4f3e' },
  smallStatLabel: { color: '#5f6b66', fontSize: fontScale(11), fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.1 },
  smallStatLabelGreen: { color: '#1c4f3e' },
  chartCard: { borderRadius: 20, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(192,201,195,0.35)', padding: 14, marginBottom: 12 },
  chartTitle: { color: '#313c3b', fontSize: fontScale(15), fontWeight: '700', marginBottom: 8 },
  chartRow: { height: 124, flexDirection: 'row', gap: 8, alignItems: 'flex-end' },
  chartCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 4 },
  chartBar: { width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: '#d9e5e3' },
  chartBarActive: { backgroundColor: '#b6ebd3' },
  chartLabel: { color: '#707974', fontSize: fontScale(10), fontWeight: '700' },
  chartLabelActive: { color: '#366855' },
  reviewHead: { marginTop: 6, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reviewTitle: { color: '#313c3b', fontSize: fontScale(28), fontWeight: '800' },
  reviewAction: { color: '#366855', fontSize: fontScale(13), fontWeight: '700' },
  reviewCard: { borderRadius: 22, backgroundColor: '#FFFFFF', padding: 14, marginBottom: 10 },
  reviewTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  clientRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  clientAvatarWrap: { width: 38, height: 38, borderRadius: 19, overflow: 'hidden', backgroundColor: '#d9e5e3' },
  clientAvatar: { width: '100%', height: '100%' },
  clientName: { color: '#131e1c', fontSize: fontScale(14), fontWeight: '700' },
  clientMeta: { color: '#5f6b66', fontSize: fontScale(10), marginTop: 1 },
  starsRow: { flexDirection: 'row' },
  reviewText: { color: '#4f5a56', fontSize: fontScale(13), lineHeight: 20 },
});
