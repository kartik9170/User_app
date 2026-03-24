import React, { useMemo } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useBooking from '../../hooks/useBooking';
import { fontScale } from '../../utils/responsive';
import PartnerBottomNav from '../../components/PartnerBottomNav';

export default function EarningsScreen({ route, navigation }) {
  const { bookings } = useBooking();
  const completed = bookings.filter((item) => item.status === 'completed');
  const total = completed.reduce((sum, item) => sum + Number(item.amount || 0), 0) || 4820.5;
  const showPreviewBottomNav = route?.name === 'PartnerEarningsPreview';

  const transactions = useMemo(
    () => [
      {
        id: 'tx-1',
        name: 'Elena Rodriguez',
        sub: 'Signature Balayage',
        amount: '+$320.00',
        status: 'Completed',
        positive: true,
        icon: 'face-3',
        iconBg: '#a6f2d4',
      },
      {
        id: 'tx-2',
        name: 'Bank Transfer',
        sub: 'Withdrawal to ****4291',
        amount: '-$1,200.00',
        status: 'Processed',
        positive: false,
        icon: 'account-balance',
        iconBg: '#d9e5e3',
      },
      {
        id: 'tx-3',
        name: 'Marcus Chen',
        sub: 'Scalp Treatment',
        amount: '+$115.00',
        status: 'Completed',
        positive: true,
        icon: 'spa',
        iconBg: '#a6f2d4',
      },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Pressable>
            <MaterialIcons name="menu" size={22} color="#131e1c" />
          </Pressable>
          <Text style={styles.brand}>Emerald Pro</Text>
        </View>
        <View style={styles.avatarWrap}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9KfZM5Ju6c0wKFT5E6DsuU_HWOj57Hb6usMBSKyjB0XA8YCdzxo1DNrZHg4r1ogB9n2CkWb_oh5AXWLI0fetMHUtlMG2CxBz6-IYV2bPJNtay-cV7HSLkKrNnFClInQL4PExPVr-HtT1pJ0Da4HjyGP40ERtZegxetbWQ3WfFVg9Vu0_sUpXG32xDPSbsIS9eIhu90zaih1U2BYXq8SCiqRSRovs3-HjMeAz2RrofzCHtA8fTC0s39ssTxGuRbiooduEtRCm1hTo',
            }}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.content, showPreviewBottomNav && styles.contentWithPreviewNav]} showsVerticalScrollIndicator={false}>
        <View style={styles.balanceCard}>
          <View style={styles.balanceGlow} />
          <Text style={styles.balanceLabel}>AVAILABLE BALANCE</Text>
          <View style={styles.amountRow}>
            <Text style={styles.currency}>$</Text>
            <Text style={styles.amount}>{total.toFixed(2)}</Text>
          </View>
          <Pressable
            onPress={() => {
              if (showPreviewBottomNav) navigation.navigate('PartnerWithdrawPreview');
              else navigation.navigate('Withdraw');
            }}
            style={({ pressed }) => [styles.withdrawBtn, pressed && styles.pressed]}
          >
            <MaterialIcons name="account-balance-wallet" size={20} color="#FFFFFF" />
            <Text style={styles.withdrawText}>Withdraw to Bank</Text>
          </Pressable>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressHead}>
            <View>
              <Text style={styles.progressTitle}>Monthly Progress</Text>
              <Text style={styles.progressSub}>Performance vs Last Month</Text>
            </View>
            <View style={styles.growthPill}>
              <MaterialIcons name="trending-up" size={15} color="#004332" />
              <Text style={styles.growthText}>+12.5%</Text>
            </View>
          </View>

          <View style={styles.progressCard}>
            <View style={styles.chartRow}>
              {[
                { key: 'W1', h: '40%', active: false },
                { key: 'W2', h: '65%', active: false },
                { key: 'W3', h: '95%', active: true },
                { key: 'W4', h: '55%', active: false },
              ].map((item) => (
                <View key={item.key} style={styles.chartCol}>
                  <View style={[styles.chartBar, { height: item.h }, item.active && styles.chartBarActive]} />
                  <Text style={[styles.chartLabel, item.active && styles.chartLabelActive]}>{item.key}</Text>
                </View>
              ))}
            </View>

            <View style={styles.metricsRow}>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>BOOKINGS</Text>
                <Text style={styles.metricValue}>{Math.max(124, completed.length)}</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>TIPS</Text>
                <Text style={styles.metricValue}>$842</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.txSection}>
          <View style={styles.txHead}>
            <Text style={styles.txTitle}>Recent Transactions</Text>
            <Pressable>
              <Text style={styles.txAction}>View All</Text>
            </Pressable>
          </View>

          {transactions.map((item) => (
            <View key={item.id} style={styles.txCard}>
              <View style={[styles.txIconWrap, { backgroundColor: item.iconBg }]}>
                <MaterialIcons name={item.icon} size={22} color="#1c4f3e" />
              </View>
              <View style={styles.txMain}>
                <Text style={styles.txName}>{item.name}</Text>
                <Text style={styles.txSub}>{item.sub}</Text>
              </View>
              <View style={styles.txRight}>
                <Text style={[styles.txAmount, !item.positive && styles.txAmountNegative]}>{item.amount}</Text>
                <Text style={[styles.txStatus, !item.positive && styles.txStatusMuted]}>{item.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {showPreviewBottomNav ? (
        <PartnerBottomNav
          activeKey="pay"
          onPressItem={(key) => {
            if (key === 'home') navigation.navigate('PartnerHomePreview');
            if (key === 'book') navigation.navigate('PartnerBookPreview');
            if (key === 'pay') navigation.navigate('PartnerEarningsPreview');
            if (key === 'profile') navigation.navigate('PartnerProfileSetup');
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
    backgroundColor: 'rgba(240,252,250,0.92)',
  },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brand: { color: '#131e1c', fontSize: fontScale(22), fontWeight: '800' },
  avatarWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(192,201,195,0.4)',
    backgroundColor: '#d9e5e3',
  },
  avatar: { width: '100%', height: '100%' },
  content: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 24 },
  contentWithPreviewNav: { paddingBottom: 110 },
  balanceCard: {
    borderRadius: 30,
    backgroundColor: '#313c3b',
    padding: 24,
    marginBottom: 24,
    overflow: 'hidden',
  },
  balanceGlow: { position: 'absolute', top: -60, right: -50, width: 190, height: 190, borderRadius: 100, backgroundColor: 'rgba(54,104,85,0.22)' },
  balanceLabel: { color: 'rgba(255,255,255,0.75)', fontSize: fontScale(11), fontWeight: '700', letterSpacing: 1.8, marginBottom: 6 },
  amountRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginBottom: 18 },
  currency: { color: '#b9eed6', fontSize: fontScale(34), fontWeight: '700' },
  amount: { color: '#FFFFFF', fontSize: fontScale(50), fontWeight: '900', letterSpacing: -1 },
  withdrawBtn: {
    minHeight: 52,
    borderRadius: 999,
    backgroundColor: '#366855',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  withdrawText: { color: '#FFFFFF', fontSize: fontScale(16), fontWeight: '700' },
  progressSection: { marginBottom: 24 },
  progressHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 },
  progressTitle: { color: '#313c3b', fontSize: fontScale(28), fontWeight: '800' },
  progressSub: { color: '#5f6b66', fontSize: fontScale(12), fontWeight: '500' },
  growthPill: { backgroundColor: '#a6f2d4', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 3 },
  growthText: { color: '#004332', fontSize: fontScale(11), fontWeight: '800' },
  progressCard: { borderRadius: 26, backgroundColor: '#eaf6f4', padding: 16 },
  chartRow: { height: 160, flexDirection: 'row', gap: 8, alignItems: 'flex-end', marginBottom: 12 },
  chartCol: { flex: 1, alignItems: 'center', gap: 5 },
  chartBar: { width: '100%', borderTopLeftRadius: 12, borderTopRightRadius: 12, backgroundColor: '#d9e5e3' },
  chartBarActive: { backgroundColor: '#b6ebd3' },
  chartLabel: { color: '#707974', fontSize: fontScale(10), fontWeight: '700' },
  chartLabelActive: { color: '#366855' },
  metricsRow: { flexDirection: 'row', gap: 10 },
  metricCard: { flex: 1, borderRadius: 16, backgroundColor: '#FFFFFF', padding: 12 },
  metricLabel: { color: '#5f6b66', fontSize: fontScale(10), fontWeight: '700', letterSpacing: 1.2 },
  metricValue: { color: '#313c3b', fontSize: fontScale(25), fontWeight: '800', marginTop: 2 },
  txSection: { marginBottom: 12 },
  txHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  txTitle: { color: '#313c3b', fontSize: fontScale(24), fontWeight: '800' },
  txAction: { color: '#366855', fontSize: fontScale(14), fontWeight: '700' },
  txCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  txIconWrap: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  txMain: { flex: 1 },
  txName: { color: '#131e1c', fontSize: fontScale(15), fontWeight: '700' },
  txSub: { color: '#5f6b66', fontSize: fontScale(11), marginTop: 1 },
  txRight: { alignItems: 'flex-end' },
  txAmount: { color: '#313c3b', fontSize: fontScale(16), fontWeight: '800' },
  txAmountNegative: { color: '#ba1a1a' },
  txStatus: {
    marginTop: 3,
    color: '#1c4f3e',
    backgroundColor: 'rgba(182,235,211,0.45)',
    fontSize: fontScale(9),
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    textTransform: 'uppercase',
    overflow: 'hidden',
  },
  txStatusMuted: { backgroundColor: '#d9e5e3', color: '#5f6b66' },
  pressed: { transform: [{ scale: 0.985 }] },
});
