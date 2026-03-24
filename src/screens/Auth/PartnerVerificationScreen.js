import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontScale } from '../../utils/responsive';
import PartnerBottomNav from '../../components/PartnerBottomNav';

const TIMELINE = [
  {
    id: 'profile-created',
    title: 'Profile Created',
    subtitle: 'Completed on Oct 24, 2023',
    state: 'done',
  },
  {
    id: 'identity',
    title: 'Identity Verified',
    subtitle: 'License and ID successfully matched',
    state: 'done',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Audit',
    subtitle: 'Our curators are reviewing your work',
    state: 'active',
  },
  {
    id: 'activation',
    title: 'Final Activation',
    subtitle: 'Access to Emerald Marketplace',
    state: 'pending',
  },
];

export default function PartnerVerificationScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <MaterialIcons name="menu" size={22} color="#366855" />
          <Text style={styles.brand}>Emerald Pro</Text>
        </View>
        <View style={styles.avatarWrap}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Z60MgleEWIru5HXl8-a_G5A_O2zgIKy2K1sIaM_uHlRTJB5ACaFOGUKDnRAuN4jrsZ4386Et-773B9gGxRnsEkAXfPAIKjulqWdjqsX9v0XG02IFZgz-gOwb35gHqpfSpf0HRArm2f4sLH5cJ4KqCWa0IiTgYdKrY_StKP2MO9HzPuQv6Qv1P7f-KVyD6nhoOgaorEsXN6wEn9Miy_YWDifEsDI3EntCldWrjEonEzKwWLQZK2QcjCFG6Zs0pboz5Iq_N_or8v0',
            }}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.statusPill}>Status: Processing</Text>
          <Text style={styles.heroTitle}>Verifying your artistry</Text>
          <Text style={styles.heroSub}>
            We are currently reviewing your credentials to ensure the Emerald Pro standard remains elite.
          </Text>
        </View>

        <View style={styles.mainCard}>
          <View style={styles.mainHeader}>
            <View>
              <Text style={styles.phaseLabel}>CURRENT PHASE</Text>
              <Text style={styles.phaseTitle}>Document Review</Text>
            </View>
            <View style={styles.phaseIconWrap}>
              <MaterialIcons name="pending-actions" size={24} color="#366855" />
            </View>
          </View>

          <View style={styles.timelineWrap}>
            {TIMELINE.map((item, index) => {
              const isDone = item.state === 'done';
              const isActive = item.state === 'active';
              const isPending = item.state === 'pending';
              const showLine = index < TIMELINE.length - 1;

              return (
                <View key={item.id} style={[styles.timelineRow, isPending && styles.timelinePendingRow]}>
                  <View style={styles.dotCol}>
                    <View
                      style={[
                        styles.dot,
                        isDone && styles.dotDone,
                        isActive && styles.dotActive,
                        isPending && styles.dotPending,
                      ]}
                    >
                      {isDone ? <MaterialIcons name="check" size={12} color="#FFFFFF" /> : null}
                      {isActive ? <View style={styles.dotActiveInner} /> : null}
                    </View>
                    {showLine ? (
                      <View
                        style={[
                          styles.line,
                          isDone && styles.lineDone,
                          isActive && styles.lineActive,
                          isPending && styles.linePending,
                        ]}
                      />
                    ) : null}
                  </View>
                  <View style={styles.timelineText}>
                    <Text style={[styles.timelineTitle, isActive && styles.timelineTitleActive]}>{item.title}</Text>
                    <Text style={styles.timelineSub}>{item.subtitle}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoBoxLeft}>
            <MaterialIcons name="timer" size={22} color="#366855" />
            <View>
              <Text style={styles.infoLabel}>EST. TIME</Text>
              <Text style={styles.infoValue}>24-48h</Text>
            </View>
          </View>

          <View style={styles.infoBoxRight}>
            <MaterialIcons name="verified-user" size={22} color="#a6f2d4" />
            <View>
              <Text style={styles.infoLabelRight}>SECURITY</Text>
              <Text style={styles.infoValueRight}>AES-256</Text>
            </View>
          </View>
        </View>

        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>Need to add more?</Text>
          <Text style={styles.footerSub}>You can update your professional bio while we review.</Text>
          <Pressable onPress={() => navigation.navigate('PartnerProfessionalProfilePreview')} style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Professional Profile</Text>
          </Pressable>
        </View>

        <Pressable>
          <Text style={styles.supportText}>Contact Concierge Support</Text>
        </Pressable>
      </ScrollView>

      <PartnerBottomNav
        activeKey="profile"
        onPressItem={(key) => {
          if (key === 'home') navigation.navigate('PartnerHomePreview');
          if (key === 'book') navigation.navigate('PartnerBookPreview');
          if (key === 'pay') navigation.navigate('PartnerEarningsPreview');
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
    backgroundColor: 'rgba(240,252,250,0.9)',
    borderBottomWidth: 1,
    borderColor: 'rgba(192,201,195,0.2)',
  },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brand: { fontSize: fontScale(18), color: '#313c3b', fontWeight: '900', fontStyle: 'italic' },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#b6ebd3',
    borderWidth: 2,
    borderColor: '#e4f0ee',
    overflow: 'hidden',
  },
  avatar: { width: '100%', height: '100%' },
  content: { paddingTop: 18, paddingHorizontal: 16, paddingBottom: 120 },
  hero: { marginBottom: 18 },
  statusPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(182,235,211,0.45)',
    color: '#3a6c59',
    fontSize: fontScale(10),
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 10,
  },
  heroTitle: { fontSize: fontScale(36), lineHeight: 42, color: '#313c3b', fontWeight: '800', marginBottom: 8 },
  heroSub: { color: '#4f5a56', fontSize: fontScale(14), lineHeight: 21, maxWidth: '90%' },
  mainCard: {
    borderRadius: 14,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 2,
    borderColor: '#366855',
    shadowColor: '#131e1c',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 3,
  },
  mainHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 },
  phaseLabel: { color: '#7f8a86', fontSize: fontScale(10), fontWeight: '700', letterSpacing: 1.2, marginBottom: 4 },
  phaseTitle: { color: '#366855', fontSize: fontScale(22), fontWeight: '700' },
  phaseIconWrap: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#a6f2d4', alignItems: 'center', justifyContent: 'center' },
  timelineWrap: { gap: 2 },
  timelineRow: { flexDirection: 'row', gap: 10 },
  timelinePendingRow: { opacity: 0.45 },
  dotCol: { alignItems: 'center' },
  dot: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e4f0ee' },
  dotDone: { backgroundColor: '#366855' },
  dotActive: { borderWidth: 2, borderColor: '#366855', backgroundColor: '#FFFFFF' },
  dotPending: { backgroundColor: '#deebe8' },
  dotActiveInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#366855' },
  line: { width: 2, height: 36, backgroundColor: 'rgba(192,201,195,0.4)' },
  lineDone: { backgroundColor: 'rgba(54,104,85,0.25)' },
  lineActive: { backgroundColor: '#366855' },
  linePending: { backgroundColor: 'rgba(192,201,195,0.35)' },
  timelineText: { paddingBottom: 10 },
  timelineTitle: { color: '#273331', fontSize: fontScale(15), fontWeight: '700', marginBottom: 2 },
  timelineTitleActive: { color: '#366855' },
  timelineSub: { color: '#5f6b66', fontSize: fontScale(12) },
  infoGrid: { flexDirection: 'row', gap: 10, marginTop: 14 },
  infoBoxLeft: {
    flex: 1,
    minHeight: 110,
    borderRadius: 12,
    backgroundColor: '#e4f0ee',
    padding: 14,
    justifyContent: 'space-between',
  },
  infoBoxRight: {
    flex: 1,
    minHeight: 110,
    borderRadius: 12,
    backgroundColor: '#025d47',
    padding: 14,
    justifyContent: 'space-between',
  },
  infoLabel: { color: '#3f5550', fontSize: fontScale(10), fontWeight: '700', letterSpacing: 1.1 },
  infoValue: { color: '#313c3b', fontSize: fontScale(24), fontWeight: '700' },
  infoLabelRight: { color: 'rgba(240,252,250,0.82)', fontSize: fontScale(10), fontWeight: '700', letterSpacing: 1.1 },
  infoValueRight: { color: '#a6f2d4', fontSize: fontScale(24), fontWeight: '700' },
  footerCard: {
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
    backgroundColor: 'rgba(208,221,218,0.35)',
    padding: 16,
    alignItems: 'center',
  },
  footerTitle: { color: '#313c3b', fontSize: fontScale(18), fontWeight: '700', marginBottom: 3 },
  footerSub: { color: '#4f5a56', fontSize: fontScale(13), textAlign: 'center', marginBottom: 12 },
  editButton: {
    width: '100%',
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: '#366855',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: { color: '#FFFFFF', fontSize: fontScale(15), fontWeight: '700' },
  supportText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#1c4f3e',
    fontWeight: '700',
    textDecorationLine: 'underline',
    textDecorationColor: 'rgba(54,104,85,0.35)',
    textUnderlineOffset: 5,
  },
  
});
