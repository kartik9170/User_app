import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontScale } from '../../utils/responsive';
import PartnerBottomNav from '../../components/PartnerBottomNav';

const BANKS = [
  { id: 'chase', label: 'Chase Business', meta: '•••• 8829' },
  { id: 'mercury', label: 'Mercury Bank', meta: '•••• 1104' },
];

export default function WithdrawalScreen({ navigation, route }) {
  const showPreviewNav = route?.name === 'PartnerWithdrawPreview';
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('chase');

  const setPercentAmount = (percent) => {
    const base = 12450.8;
    const value = ((base * percent) / 100).toFixed(2);
    setAmount(value);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Pressable onPress={() => navigation.goBack()} style={styles.topIconBtn}>
            <MaterialIcons name="arrow-back" size={22} color="#366855" />
          </Pressable>
          <Text style={styles.topTitle}>Withdrawal</Text>
        </View>
        <MaterialIcons name="notifications" size={20} color="#366855" />
      </View>

      <ScrollView contentContainerStyle={[styles.content, showPreviewNav && styles.contentWithNav]} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroGlow} />
          <Text style={styles.heroLabel}>Available Balance</Text>
          <Text style={styles.heroAmount}>$12,450.80</Text>
          <View style={styles.heroFooter}>
            <MaterialIcons name="lock" size={12} color="#a6f2d4" />
            <Text style={styles.heroFooterText}>Secured by Atelier Vault</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Enter Amount</Text>
            <Text style={styles.currencyChip}>USD</Text>
          </View>
          <View style={styles.amountInputWrap}>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor="rgba(112,121,116,0.6)"
              style={styles.amountInput}
            />
            <View style={styles.amountUnderline} />
          </View>
          <View style={styles.percentRow}>
            <Pressable style={styles.percentBtn} onPress={() => setPercentAmount(25)}>
              <Text style={styles.percentText}>25%</Text>
            </Pressable>
            <Pressable style={styles.percentBtn} onPress={() => setPercentAmount(50)}>
              <Text style={styles.percentText}>50%</Text>
            </Pressable>
            <Pressable style={[styles.percentBtn, styles.percentBtnActive]} onPress={() => setPercentAmount(100)}>
              <Text style={[styles.percentText, styles.percentTextActive]}>100%</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destination Bank</Text>
          <View style={styles.bankList}>
            {BANKS.map((bank) => {
              const active = selectedBank === bank.id;
              return (
                <Pressable key={bank.id} onPress={() => setSelectedBank(bank.id)} style={[styles.bankCard, active && styles.bankCardActive]}>
                  <View style={styles.bankIconWrap}>
                    <MaterialIcons name="account-balance" size={22} color="#366855" />
                  </View>
                  <View style={styles.bankInfo}>
                    <Text style={styles.bankName}>{bank.label}</Text>
                    <Text style={styles.bankMeta}>{bank.meta}</Text>
                  </View>
                  <View style={[styles.radio, active && styles.radioActive]}>
                    {active ? <View style={styles.radioDot} /> : null}
                  </View>
                </Pressable>
              );
            })}
            <Pressable style={styles.addBankBtn}>
              <MaterialIcons name="add" size={18} color="#5f6b66" />
              <Text style={styles.addBankText}>Link New Account</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Processing Fee</Text>
            <Text style={styles.summaryValue}>$0.00 (Free)</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Estimated Arrival</Text>
            <Text style={styles.summaryValue}>1-3 Business Days</Text>
          </View>
        </View>

        <Pressable
          onPress={() => {
            const value = amount?.trim()?.length ? amount : '12,450.80';
            if (showPreviewNav) navigation.navigate('PartnerWithdrawSuccessPreview', { amount: value });
            else navigation.navigate('WithdrawSuccess', { amount: value });
          }}
          style={styles.requestBtn}
        >
          <Text style={styles.requestText}>Request Withdrawal</Text>
          <MaterialIcons name="send" size={18} color="#FFFFFF" />
        </Pressable>
      </ScrollView>

      {showPreviewNav ? (
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
    height: 62,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(240,252,250,0.9)',
  },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  topIconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  topTitle: { color: '#366855', fontSize: fontScale(18), fontWeight: '700' },
  content: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24 },
  contentWithNav: { paddingBottom: 116 },
  heroCard: {
    borderRadius: 30,
    backgroundColor: '#313c3b',
    padding: 22,
    overflow: 'hidden',
    marginBottom: 16,
  },
  heroGlow: { position: 'absolute', top: -34, right: -24, width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(182,235,211,0.14)' },
  heroLabel: { color: 'rgba(255,255,255,0.8)', fontSize: fontScale(10), fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.2 },
  heroAmount: { color: '#FFFFFF', fontSize: fontScale(40), fontWeight: '900', marginTop: 4, marginBottom: 8 },
  heroFooter: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  heroFooterText: { color: '#a6f2d4', fontSize: fontScale(10), fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  section: { marginBottom: 16 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  sectionTitle: { color: '#313c3b', fontSize: fontScale(20), fontWeight: '700' },
  currencyChip: { color: '#366855', fontSize: fontScale(11), fontWeight: '700', backgroundColor: 'rgba(182,235,211,0.5)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  amountInputWrap: { borderRadius: 18, backgroundColor: '#deebe8', paddingHorizontal: 16, paddingTop: 14, paddingBottom: 8 },
  amountInput: { color: '#313c3b', fontSize: fontScale(36), fontWeight: '800' },
  amountUnderline: { marginTop: 6, alignSelf: 'center', width: '90%', height: 2, backgroundColor: '#408A71' },
  percentRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
  percentBtn: { flex: 1, borderRadius: 12, backgroundColor: '#e4f0ee', minHeight: 42, alignItems: 'center', justifyContent: 'center' },
  percentBtnActive: { backgroundColor: '#366855' },
  percentText: { color: '#5f6b66', fontSize: fontScale(13), fontWeight: '700' },
  percentTextActive: { color: '#FFFFFF' },
  bankList: { marginTop: 8, gap: 10 },
  bankCard: {
    borderRadius: 20,
    backgroundColor: '#eaf6f4',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankCardActive: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(182,235,211,0.8)' },
  bankIconWrap: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  bankInfo: { flex: 1 },
  bankName: { color: '#131e1c', fontSize: fontScale(14), fontWeight: '700' },
  bankMeta: { color: '#5f6b66', fontSize: fontScale(11), marginTop: 2 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#c0c9c3', alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: '#366855', backgroundColor: '#366855' },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFFFFF' },
  addBankBtn: { borderRadius: 20, borderWidth: 2, borderStyle: 'dashed', borderColor: '#c0c9c3', minHeight: 62, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6, backgroundColor: '#f0fcfa' },
  addBankText: { color: '#5f6b66', fontSize: fontScale(13), fontWeight: '700' },
  summaryCard: { borderRadius: 22, backgroundColor: 'rgba(228,240,238,0.5)', padding: 14, marginBottom: 18 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  summaryLabel: { color: '#5f6b66', fontSize: fontScale(12) },
  summaryValue: { color: '#313c3b', fontSize: fontScale(12), fontWeight: '700' },
  requestBtn: { borderRadius: 16, minHeight: 56, backgroundColor: '#366855', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  requestText: { color: '#FFFFFF', fontSize: fontScale(17), fontWeight: '700' },
});
