import React, { useEffect, useMemo, useState } from 'react';
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loader from '../../components/Loader';
import { fetchChapters, fetchServices } from '../../services/serviceService';
import { fontScale } from '../../utils/responsive';
import { AppTheme as T } from '../../theme/appTheme';

const shadowCard =
  Platform.OS === 'ios'
    ? {
        shadowColor: '#2A2118',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      }
    : { elevation: 3 };

export default function HomeScreen({ navigation }) {
  const [services, setServices] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoadError('');
      try {
        const [svc, ch] = await Promise.all([fetchServices(), fetchChapters()]);
        setServices(svc);
        setChapters(ch);
      } catch {
        setLoadError('Could not load services. Check API and try again.');
        setServices([]);
        setChapters([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return services;
    return services.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        (item.category && item.category.toLowerCase().includes(term))
    );
  }, [query, services]);

  const seasonalHighlights = useMemo(
    () => filtered.filter((s) => s.showInSeasonalHighlights),
    [filtered]
  );
  const quickRituals = useMemo(
    () => filtered.filter((s) => s.showInQuickRituals),
    [filtered]
  );

  const gridChapters = chapters.length
    ? chapters.slice(0, 12)
    : [
        { slug: 'facial', title: 'Facial', iconKey: 'face-5' },
        { slug: 'hair', title: 'Hair', iconKey: 'content-cut' },
        { slug: 'waxing', title: 'Waxing', iconKey: 'dry-cleaning' },
        { slug: 'spa', title: 'Spa', iconKey: 'hot-tub' },
        { slug: 'packages', title: 'Packages', iconKey: 'redeem' },
        { slug: 'bridal', title: 'Bridal', iconKey: 'auto-awesome' },
      ];

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <LinearGradient colors={[T.accentSoft, T.accentGlow]} style={styles.logoMark}>
            <MaterialIcons name="spa" size={20} color={T.accentDark} />
          </LinearGradient>
          <Text style={styles.brand}>The Atelier</Text>
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.iconBtn}>
            <MaterialIcons name="notifications-none" size={22} color={T.textSecondary} />
          </Pressable>
          <View style={styles.avatar}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
              }}
              style={styles.avatarImg}
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={T.heroGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <Text style={styles.heroKicker}>Welcome in</Text>
          <Text style={styles.heroTitle}>Curating Your Signature Experience</Text>
          <Text style={styles.heroSub}>Salon & home beauty for a modern lifestyle — effortless booking, trusted pros.</Text>

          {loadError ? (
            <View style={styles.warnBox}>
              <MaterialIcons name="error-outline" size={18} color={T.error} style={{ marginRight: 6 }} />
              <Text style={styles.warnText}>{loadError}</Text>
            </View>
          ) : null}

          <View style={styles.searchWrap}>
            <MaterialIcons name="search" size={20} color={T.textMuted} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search facial, hair, spa..."
              placeholderTextColor={T.textMuted}
              style={styles.searchInput}
            />
            <Pressable style={styles.searchBtn}>
              <LinearGradient colors={[T.accent, T.accentDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.searchBtnGrad}>
                <Text style={styles.searchBtnText}>Explore</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </LinearGradient>

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Service Chapters</Text>
          <Text style={styles.sectionHint}>Tap a category to browse</Text>
        </View>

        <View style={styles.categoriesGrid}>
          {gridChapters.map((ch) => (
            <Pressable
              key={ch.slug || ch.title}
              style={({ pressed }) => [styles.categoryCard, pressed && styles.categoryCardPressed]}
              onPress={() =>
                navigation.navigate('CategoryServices', {
                  chapterSlug: ch.slug,
                  category: ch.title,
                })
              }
            >
              <LinearGradient colors={['#FFF8F4', '#FFEFE5']} style={styles.categoryIconWrap}>
                <MaterialIcons name={ch.iconKey || 'spa'} size={26} color={T.accent} />
              </LinearGradient>
              <Text style={styles.categoryText}>{ch.title}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.banner}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=80',
            }}
            style={styles.bannerImage}
          />
          <LinearGradient
            colors={['rgba(42,33,24,0.1)', 'rgba(42,33,24,0.75)']}
            style={styles.bannerOverlay}
          />
          <View style={styles.bannerContent}>
            <View style={styles.bannerPill}>
              <Text style={styles.bannerPillText}>Limited edition</Text>
            </View>
            <Text style={styles.bannerTitle}>Spring Revival Retreat</Text>
            <Text style={styles.bannerSub}>Body therapy + organic facial — special month pricing.</Text>
          </View>
        </View>

        {seasonalHighlights.length > 0 ? (
          <>
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>Seasonal Highlights</Text>
            </View>
            {seasonalHighlights.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => navigation.navigate('ServiceDetails', { serviceId: item.id })}
                style={styles.featureCard}
              >
                <Image source={{ uri: item.image }} style={styles.featureImage} />
                <View style={styles.featureBody}>
                  <View style={styles.featureTop}>
                    <Text style={styles.featureName}>{item.name}</Text>
                    <Text style={styles.featurePrice}>INR {item.price}</Text>
                  </View>
                  <Text style={styles.featureDesc} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <Text style={styles.featureMeta}>
                    {item.duration} • {item.category}
                  </Text>
                </View>
              </Pressable>
            ))}
          </>
        ) : null}

        {quickRituals.length > 0 ? (
          <>
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>Quick Rituals</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickRow}>
              {quickRituals.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => navigation.navigate('ServiceDetails', { serviceId: item.id })}
                  style={styles.quickCard}
                >
                  <Image source={{ uri: item.image }} style={styles.quickImage} />
                  <Text style={styles.quickName}>{item.name}</Text>
                  <Text style={styles.quickSub}>{item.duration}</Text>
                  <View style={styles.quickFooter}>
                    <Text style={styles.quickPrice}>INR {item.price}</Text>
                    <MaterialIcons name="add-circle" size={20} color={T.accent} />
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: T.bg },
  topBar: {
    height: 58,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: T.bgElevated,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: T.border,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: T.accentSoftBorder,
  },
  brand: { color: T.text, fontSize: fontScale(20), fontWeight: '800', letterSpacing: -0.3 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: T.accentSoftBorder,
  },
  avatarImg: { width: '100%', height: '100%' },
  content: { padding: 16, paddingBottom: 28 },
  heroCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 180, 130, 0.35)',
    ...shadowCard,
  },
  heroKicker: {
    color: T.accentMuted,
    fontSize: fontScale(11),
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  heroTitle: {
    color: T.text,
    fontSize: fontScale(26),
    fontWeight: '900',
    lineHeight: fontScale(31),
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  heroSub: { color: T.textSecondary, fontSize: fontScale(14), lineHeight: fontScale(20) },
  warnBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(186, 26, 26, 0.08)',
    borderRadius: 12,
    padding: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(186, 26, 26, 0.2)',
  },
  warnText: { color: T.error, fontSize: fontScale(12), flex: 1 },
  searchWrap: {
    borderRadius: 16,
    backgroundColor: T.bgCard,
    minHeight: 52,
    paddingHorizontal: 4,
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: T.borderLight,
    ...shadowCard,
  },
  searchInput: { flex: 1, marginLeft: 8, color: T.text, fontSize: fontScale(14) },
  searchBtn: { borderRadius: 12, overflow: 'hidden' },
  searchBtnGrad: { paddingHorizontal: 14, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' },
  searchBtnText: { color: T.white, fontSize: fontScale(12), fontWeight: '800' },
  sectionHead: { marginTop: 4, marginBottom: 12 },
  sectionTitle: { color: T.text, fontSize: fontScale(21), fontWeight: '800', letterSpacing: -0.3 },
  sectionHint: { color: T.textMuted, fontSize: fontScale(12), marginTop: 4 },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  categoryCard: {
    width: '31.3%',
    borderRadius: 16,
    backgroundColor: T.bgCard,
    borderWidth: 1,
    borderColor: T.border,
    paddingVertical: 14,
    alignItems: 'center',
    ...shadowCard,
  },
  categoryCardPressed: { opacity: 0.92, transform: [{ scale: 0.98 }] },
  categoryIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: T.accentSoftBorder,
  },
  categoryText: { color: T.text, fontSize: fontScale(11), fontWeight: '700', textAlign: 'center' },
  banner: { borderRadius: 24, overflow: 'hidden', minHeight: 200, marginBottom: 12, ...shadowCard },
  bannerImage: { ...StyleSheet.absoluteFillObject, width: undefined, height: undefined },
  bannerOverlay: { ...StyleSheet.absoluteFillObject },
  bannerContent: { padding: 18, marginTop: 'auto' },
  bannerPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 107, 44, 0.95)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  bannerPillText: {
    color: T.white,
    fontSize: fontScale(9),
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  bannerTitle: { marginTop: 10, color: T.white, fontSize: fontScale(24), fontWeight: '800', letterSpacing: -0.3 },
  bannerSub: { color: 'rgba(255,255,255,0.9)', fontSize: fontScale(13), marginTop: 4, lineHeight: fontScale(18) },
  featureCard: {
    borderRadius: 20,
    backgroundColor: T.bgCard,
    borderWidth: 1,
    borderColor: T.border,
    overflow: 'hidden',
    marginBottom: 12,
    ...shadowCard,
  },
  featureImage: { width: '100%', height: 160, backgroundColor: '#E8E0D8' },
  featureBody: { padding: 14 },
  featureTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  featureName: { color: T.text, fontSize: fontScale(16), fontWeight: '700', flex: 1, marginRight: 8 },
  featurePrice: { color: T.accent, fontSize: fontScale(14), fontWeight: '800' },
  featureDesc: { color: T.textSecondary, fontSize: fontScale(12), marginTop: 4 },
  featureMeta: { color: T.textMuted, fontSize: fontScale(11), marginTop: 6, fontWeight: '600' },
  quickRow: { gap: 12, paddingBottom: 8 },
  quickCard: {
    width: 220,
    borderRadius: 18,
    backgroundColor: T.bgCard,
    padding: 12,
    borderWidth: 1,
    borderColor: T.border,
    ...shadowCard,
  },
  quickImage: { width: '100%', height: 120, borderRadius: 14, marginBottom: 8, backgroundColor: '#E8E0D8' },
  quickName: { color: T.text, fontSize: fontScale(14), fontWeight: '700' },
  quickSub: { color: T.textMuted, fontSize: fontScale(11), marginTop: 2 },
  quickFooter: { marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  quickPrice: { color: T.accent, fontSize: fontScale(13), fontWeight: '800' },
});
