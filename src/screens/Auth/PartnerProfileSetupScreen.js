import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { clamp, fontScale, moderateScale } from '../../utils/responsive';
import PartnerBottomNav from '../../components/PartnerBottomNav';

const EXPERIENCE_OPTIONS = ['1-3 Years', '3-5 Years', '5-10 Years', '10+ Years'];

const EXPERTISE_CARDS = [
  {
    id: 'facial',
    title: 'Facial Specialist',
    subtitle: 'Advanced dermalogica & extractions',
    icon: 'face',
    featured: true,
  },
  { id: 'waxing', title: 'Waxing', subtitle: 'Full body & sensitive', icon: 'content-cut' },
  { id: 'massage', title: 'Massage', subtitle: 'Deep tissue & Swedish', icon: 'spa' },
  { id: 'nail-art', title: 'Nail Art', subtitle: 'Gel, Acrylic & Design', icon: 'brush' },
  { id: 'others', title: 'Others', subtitle: 'Add custom services', icon: 'more-horiz' },
];

const PORTFOLIO_ITEMS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuByznlFeW9oR9cpxcOxLzivZQWWvAtw1pYwWFsbudQnJ_Rrj8fkKrK_hM1dMsPRpHwlvQZvkU4cwffPu3zeux0Vc_UV46DRPrstwLgkyfhKV3E2dnEilheVTUT_o-GjXG8v62zxIsBl14rd1IcyeJERCwB5SfYfSRpQoZwVDUGptIwGndiKADDSyQbbAkVYRSOWSpCJ-3hsZ7mufCJLI3WACXfVL3uzSnJIunlkYzm-IxyjvYdVF65__lFj6J-mK5CajoldA3ud3mc',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCJwTfSxC95T4nSvripLkwxaNXyVkm9g3C1yL2W9ucX42ZGHc1MYL4sM-D2GIhAOEjOM_mH3Baqhfdg2evrGRRaCJ5sV7HfPKdIVk1Lebn0aUr8jmYYxGOF2zxZ66FxXZycz3elxtLHWHOktTkR2yLqaj6mQHR_ao4SNdqbplbHxCSu_iq7_kDnv4ZjqDggdoY_qBAnBGybPBjr_z0m28szfOfES-gUUYMnwiPszKquUd0-s8SgVha_jDnKDYUbLzpEI32twSp_-Bw',
];

export default function PartnerProfileSetupScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const compact = width < 370;
  const sidePadding = clamp(width * 0.06, 16, 24);
  const [selectedServices, setSelectedServices] = useState(['facial']);
  const [experienceIndex, setExperienceIndex] = useState(1);
  const [bio, setBio] = useState('');

  const profileTitleSize = useMemo(() => (compact ? fontScale(28) : fontScale(32)), [compact]);

  const toggleService = (serviceId) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) return prev.filter((item) => item !== serviceId);
      return [...prev, serviceId];
    });
  };

  const cycleExperience = () => {
    setExperienceIndex((prev) => (prev + 1) % EXPERIENCE_OPTIONS.length);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconButton}>
            <MaterialIcons name="arrow-back" size={22} color="#366855" />
          </Pressable>
          <Text style={styles.headerTitle}>Emerald Pro</Text>
        </View>
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPeC79a3yAT4biE2hGwt5cHwuuU6UWj_I7eQR3U4I8auxVFye3CEKD4l7YxF_bBtdoQRIqmwi7OLmDFGWklRLplpWulVuiey20PmVzGj8s3CQiXdegPQvz-De32rLGflOFEOo3j2ia5X1SgIWFGYo3O309f0_Wxqtul9dPJ1jOxXVAp-kTEGH0I3gl-RVuMVDMWJaoNEFf3fFoXpo5Y1C7d8otkemfNSRtrM85kINlA_i3LFCy6CfC0IuIyeNn6E1d2x-BSY_MBAE',
          }}
          style={styles.headerAvatar}
        />
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingHorizontal: sidePadding }]} showsVerticalScrollIndicator={false}>
        <View style={styles.stepper}>
          {[
            { id: 1, label: 'Expertise', done: true },
            { id: 2, label: 'Details', done: false },
            { id: 3, label: 'Portfolio', done: false },
          ].map((step, index) => (
            <React.Fragment key={step.id}>
              {index > 0 && <View style={[styles.stepLine, step.done && styles.stepLineDone]} />}
              <View style={styles.stepItem}>
                <View style={[styles.stepCircle, step.done && styles.stepCircleDone]}>
                  <Text style={[styles.stepNumber, step.done && styles.stepNumberDone]}>{step.id}</Text>
                </View>
                <Text style={[styles.stepLabel, step.done && styles.stepLabelDone]}>{step.label}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { fontSize: profileTitleSize }]}>Refine Your Craft</Text>
          <Text style={styles.sectionSubtitle}>
            Select the specialized services you offer. This helps us match you with the right clients.
          </Text>
        </View>

        <View style={styles.gridWrap}>
          {EXPERTISE_CARDS.map((item) => {
            const selected = selectedServices.includes(item.id);
            return (
              <Pressable
                key={item.id}
                onPress={() => toggleService(item.id)}
                style={[
                  item.featured ? styles.featuredCard : styles.smallCard,
                  selected && styles.cardSelected,
                ]}
              >
                <View style={styles.cardTopRow}>
                  <MaterialIcons name={item.icon} size={item.featured ? 28 : 24} color={selected ? '#366855' : '#707974'} />
                  {selected ? (
                    <View style={styles.checkBadge}>
                      <MaterialIcons name="check" size={14} color="#FFFFFF" />
                    </View>
                  ) : null}
                </View>
                <Text style={[item.featured ? styles.featuredTitle : styles.smallTitle]}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoHeading}>Professional Experience</Text>

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>YEARS OF PRACTICE</Text>
            <Pressable onPress={cycleExperience} style={styles.selectLike}>
              <Text style={styles.selectText}>{EXPERIENCE_OPTIONS[experienceIndex]}</Text>
              <MaterialIcons name="expand-more" size={20} color="#707974" />
            </Pressable>
          </View>

          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>BIOGRAPHY</Text>
            <View style={styles.textareaWrap}>
              <TextInput
                value={bio}
                onChangeText={(value) => setBio(value.slice(0, 500))}
                placeholder="Tell clients about your unique approach..."
                multiline
                numberOfLines={4}
                style={styles.textarea}
                placeholderTextColor="#8b9692"
              />
              <Text style={styles.counterText}>{bio.length}/500</Text>
            </View>
          </View>
        </View>

        <View style={styles.portfolioSection}>
          <View style={styles.portfolioHeader}>
            <Text style={styles.infoHeading}>Portfolio Clips</Text>
            <Pressable>
              <Text style={styles.addNewText}>Add New</Text>
            </Pressable>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.portfolioRow}>
            {PORTFOLIO_ITEMS.map((uri, index) => (
              <View key={uri} style={styles.portfolioItem}>
                <Image source={{ uri }} style={styles.portfolioImage} />
                <View style={styles.portfolioOverlay} />
                {index === 0 ? (
                  <Pressable style={styles.closeBadge}>
                    <MaterialIcons name="close" size={14} color="#FFFFFF" />
                  </Pressable>
                ) : null}
              </View>
            ))}

            <Pressable style={styles.uploadCard}>
              <MaterialIcons name="add-a-photo" size={20} color="#707974" />
              <Text style={styles.uploadText}>Upload</Text>
            </Pressable>
          </ScrollView>
        </View>

        <Pressable
          onPress={() => navigation.navigate('PartnerVerification')}
          style={({ pressed }) => [styles.saveButton, pressed && styles.saveButtonPressed]}
        >
          <Text style={styles.saveButtonText}>Save & Continue</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.stepFooterText}>Step 1 of 3</Text>
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
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(240,252,250,0.9)',
    borderBottomWidth: 1,
    borderColor: 'rgba(192,201,195,0.2)',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconButton: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#313c3b', fontWeight: '700', fontSize: fontScale(18) },
  headerAvatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(112,121,116,0.2)' },
  content: { paddingTop: 18, paddingBottom: 110 },
  stepper: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 26 },
  stepItem: { alignItems: 'center', minWidth: 72 },
  stepLine: { flex: 1, height: 2, backgroundColor: '#deebe8', marginTop: 14 },
  stepLineDone: { backgroundColor: '#b6ebd3' },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#deebe8',
  },
  stepCircleDone: { backgroundColor: '#366855' },
  stepNumber: { color: '#5f6965', fontSize: fontScale(12), fontWeight: '700' },
  stepNumberDone: { color: '#FFFFFF' },
  stepLabel: {
    marginTop: 6,
    fontSize: fontScale(10),
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: '#6f7a76',
  },
  stepLabelDone: { color: '#366855' },
  sectionHeader: { marginBottom: 18 },
  sectionTitle: { color: '#313c3b', fontWeight: '800', letterSpacing: -0.6, marginBottom: 6 },
  sectionSubtitle: { color: '#4c5753', fontSize: fontScale(13), lineHeight: 19 },
  gridWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  featuredCard: {
    width: '100%',
    minHeight: 138,
    borderRadius: 14,
    padding: 16,
    backgroundColor: 'rgba(182,235,211,0.45)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  smallCard: {
    width: '48.5%',
    minHeight: 112,
    borderRadius: 14,
    padding: 13,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(192,201,195,0.3)',
  },
  cardSelected: { borderColor: '#366855' },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  checkBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#366855',
  },
  featuredTitle: { color: '#1f2a27', fontSize: fontScale(18), fontWeight: '700' },
  smallTitle: { color: '#313c3b', fontSize: fontScale(14), fontWeight: '700' },
  cardSubtitle: { marginTop: 3, color: '#4f5b56', fontSize: fontScale(11) },
  infoSection: { marginBottom: 24 },
  infoHeading: { color: '#313c3b', fontSize: fontScale(18), fontWeight: '700', marginBottom: 10 },
  fieldWrap: { marginBottom: 14 },
  fieldLabel: {
    color: '#366855',
    fontSize: fontScale(10),
    letterSpacing: 1.5,
    fontWeight: '700',
    marginLeft: 6,
    marginBottom: 6,
  },
  selectLike: {
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: '#deebe8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  selectText: { color: '#313c3b', fontSize: fontScale(14) },
  textareaWrap: { borderRadius: 12, backgroundColor: '#deebe8', padding: 12 },
  textarea: { minHeight: 84, textAlignVertical: 'top', color: '#313c3b', fontSize: fontScale(13) },
  counterText: { alignSelf: 'flex-end', color: 'rgba(112,121,116,0.6)', fontSize: fontScale(10) },
  portfolioSection: { marginBottom: 20 },
  portfolioHeader: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 10 },
  addNewText: { color: '#366855', fontWeight: '700', fontSize: fontScale(10), textTransform: 'uppercase', letterSpacing: 1.2 },
  portfolioRow: { gap: 12, paddingBottom: 4 },
  portfolioItem: { width: 140, height: 180, borderRadius: 12, overflow: 'hidden', backgroundColor: '#e4f0ee' },
  portfolioImage: { width: '100%', height: '100%' },
  portfolioOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  closeBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  uploadCard: {
    width: 140,
    height: 180,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(112,121,116,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(234,246,244,0.8)',
  },
  uploadText: { color: '#6f7a76', fontSize: fontScale(10), fontWeight: '700', textTransform: 'uppercase' },
  saveButton: {
    marginTop: 8,
    minHeight: 56,
    borderRadius: 999,
    backgroundColor: '#366855',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonPressed: { transform: [{ scale: 0.985 }] },
  saveButtonText: { color: '#FFFFFF', fontSize: fontScale(18), fontWeight: '700' },
  stepFooterText: {
    marginTop: 14,
    textAlign: 'center',
    color: '#5f6b66',
    fontSize: fontScale(10),
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  
});
