import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontScale } from '../../utils/responsive';

export default function WithdrawalSuccessScreen({ navigation, route }) {
  const showPreview = route?.name === 'PartnerWithdrawSuccessPreview';
  const amount = route?.params?.amount || '0.00';

  const goDashboard = () => {
    if (showPreview) {
      navigation.navigate('PartnerHomePreview');
      return;
    }
    navigation.getParent()?.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.successIconWrap}>
          <MaterialIcons name="check-circle" size={58} color="#1c4f3e" />
        </View>

        <Text style={styles.title}>Withdrawal Requested</Text>
        <Text style={styles.subtitle}>
          Your request for ${amount} has been submitted successfully.
        </Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status</Text>
            <Text style={styles.infoValue}>Processing</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Estimated Time</Text>
            <Text style={styles.infoValue}>Within 24 hours</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Method</Text>
            <Text style={styles.infoValue}>Bank Transfer</Text>
          </View>
        </View>

        <View style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>What happens next?</Text>
          <View style={styles.stepRow}>
            <MaterialIcons name="radio-button-checked" size={16} color="#366855" />
            <Text style={styles.stepText}>Request received and queued</Text>
          </View>
          <View style={styles.stepRow}>
            <MaterialIcons name="schedule" size={16} color="#366855" />
            <Text style={styles.stepText}>Bank processing starts shortly</Text>
          </View>
          <View style={styles.stepRow}>
            <MaterialIcons name="payments" size={16} color="#366855" />
            <Text style={styles.stepText}>Amount will be credited within 24 hours</Text>
          </View>
        </View>

        <Pressable onPress={goDashboard} style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Go To Dashboard</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            if (showPreview) navigation.navigate('PartnerEarningsPreview');
            else navigation.navigate('EarningsHome');
          }}
          style={styles.secondaryBtn}
        >
          <Text style={styles.secondaryBtnText}>Back to Earnings</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0fcfa' },
  content: { paddingHorizontal: 18, paddingTop: 24, paddingBottom: 30 },
  successIconWrap: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignSelf: 'center',
    backgroundColor: 'rgba(182,235,211,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: { textAlign: 'center', color: '#313c3b', fontSize: fontScale(30), fontWeight: '800' },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    color: '#5f6b66',
    fontSize: fontScale(14),
    lineHeight: 20,
    marginBottom: 16,
  },
  infoCard: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
    padding: 14,
    marginBottom: 12,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  infoLabel: { color: '#5f6b66', fontSize: fontScale(12) },
  infoValue: { color: '#313c3b', fontSize: fontScale(12), fontWeight: '700' },
  timelineCard: {
    borderRadius: 18,
    backgroundColor: '#eaf6f4',
    padding: 14,
    marginBottom: 18,
  },
  timelineTitle: { color: '#1c4f3e', fontSize: fontScale(15), fontWeight: '700', marginBottom: 10 },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  stepText: { color: '#3a6c59', fontSize: fontScale(12), flex: 1 },
  primaryBtn: {
    minHeight: 54,
    borderRadius: 14,
    backgroundColor: '#366855',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: fontScale(16), fontWeight: '700' },
  secondaryBtn: {
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: '#deebe8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: { color: '#366855', fontSize: fontScale(14), fontWeight: '700' },
});
