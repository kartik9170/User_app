import React, { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loader from '../../components/Loader';
import { fetchServices } from '../../services/serviceService';
import { fontScale } from '../../utils/responsive';

export default function HomeScreen({ navigation }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const load = async () => { try { setServices(await fetchServices()); } finally { setLoading(false); } };
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return services;
    return services.filter((item) => item.name.toLowerCase().includes(term) || item.category.toLowerCase().includes(term));
  }, [query, services]);

  const featured = filtered.slice(0, 3);
  const quickRituals = filtered.slice(3);

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <MaterialIcons name="spa" size={22} color="#313c3b" />
          <Text style={styles.brand}>The Atelier</Text>
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.iconBtn}>
            <MaterialIcons name="notifications" size={20} color="#5f6b66" />
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
        <View style={styles.heroBlock}>
          <Text style={styles.heroTitle}>Curating Your Signature Experience</Text>
          <Text style={styles.heroSub}>Salon and home beauty services for modern lifestyle.</Text>
        </View>

        <View style={styles.searchWrap}>
          <MaterialIcons name="search" size={20} color="#7a8681" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search Facial, Hair, Spa..."
            placeholderTextColor="#8a9692"
            style={styles.searchInput}
          />
          <Pressable style={styles.searchBtn}>
            <Text style={styles.searchBtnText}>Explore</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Service Chapters</Text>
        </View>

        <View style={styles.categoriesGrid}>
          {[
            ['face-5', 'Facial'],
            ['content-cut', 'Hair'],
            ['dry-cleaning', 'Waxing'],
            ['hot-tub', 'Spa'],
            ['redeem', 'Packages'],
            ['auto-awesome', 'Bridal'],
          ].map(([icon, label]) => (
            <Pressable
              key={label}
              style={styles.categoryCard}
              onPress={() => navigation.navigate('CategoryServices', { category: label })}
            >
              <View style={styles.categoryIconWrap}>
                <MaterialIcons name={icon} size={26} color="#366855" />
              </View>
              <Text style={styles.categoryText}>{label}</Text>
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
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerPill}>Limited Edition</Text>
            <Text style={styles.bannerTitle}>Spring Revival Retreat</Text>
            <Text style={styles.bannerSub}>Body therapy + organic facial with special month discount.</Text>
          </View>
        </View>

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Seasonal Highlights</Text>
        </View>

        {featured.map((item) => (
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
              <Text style={styles.featureDesc} numberOfLines={2}>{item.description}</Text>
              <Text style={styles.featureMeta}>{item.duration} • {item.category}</Text>
            </View>
          </Pressable>
        ))}

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
                <MaterialIcons name="add-circle" size={20} color="#366855" />
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>
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
    backgroundColor: 'rgba(240,252,250,0.92)',
    borderBottomWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brand: { color: '#313c3b', fontSize: fontScale(21), fontWeight: '800' },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 32, height: 32, borderRadius: 16, overflow: 'hidden', backgroundColor: '#d9e5e3' },
  avatarImg: { width: '100%', height: '100%' },
  content: { padding: 14, paddingBottom: 24 },
  heroBlock: { marginBottom: 10 },
  heroTitle: { color: '#313c3b', fontSize: fontScale(30), fontWeight: '900', lineHeight: fontScale(35), marginBottom: 3 },
  heroSub: { color: '#5f6b66', fontSize: fontScale(14) },
  searchWrap: {
    borderRadius: 14,
    backgroundColor: '#deebe8',
    minHeight: 54,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchInput: { flex: 1, marginLeft: 8, color: '#313c3b', fontSize: fontScale(14) },
  searchBtn: { borderRadius: 10, backgroundColor: '#366855', paddingHorizontal: 12, paddingVertical: 8 },
  searchBtnText: { color: '#FFFFFF', fontSize: fontScale(11), fontWeight: '700' },
  sectionHead: { marginTop: 4, marginBottom: 8 },
  sectionTitle: { color: '#313c3b', fontSize: fontScale(22), fontWeight: '800' },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  categoryCard: {
    width: '31.8%',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
    paddingVertical: 12,
    alignItems: 'center',
  },
  categoryIconWrap: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#eaf6f4', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  categoryText: { color: '#313c3b', fontSize: fontScale(12), fontWeight: '700' },
  banner: { borderRadius: 24, overflow: 'hidden', minHeight: 190, marginBottom: 12 },
  bannerImage: { ...StyleSheet.absoluteFillObject, width: undefined, height: undefined },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(19,30,28,0.38)' },
  bannerContent: { padding: 16, marginTop: 'auto' },
  bannerPill: { alignSelf: 'flex-start', backgroundColor: 'rgba(166,242,212,0.85)', color: '#004332', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4, fontSize: fontScale(9), fontWeight: '800', textTransform: 'uppercase' },
  bannerTitle: { marginTop: 8, color: '#FFFFFF', fontSize: fontScale(24), fontWeight: '800' },
  bannerSub: { color: 'rgba(255,255,255,0.85)', fontSize: fontScale(12), marginTop: 2 },
  featureCard: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
    overflow: 'hidden',
    marginBottom: 10,
  },
  featureImage: { width: '100%', height: 160, backgroundColor: '#d9e5e3' },
  featureBody: { padding: 12 },
  featureTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  featureName: { color: '#313c3b', fontSize: fontScale(16), fontWeight: '700', flex: 1, marginRight: 8 },
  featurePrice: { color: '#366855', fontSize: fontScale(14), fontWeight: '800' },
  featureDesc: { color: '#5f6b66', fontSize: fontScale(12), marginTop: 4 },
  featureMeta: { color: '#6d7873', fontSize: fontScale(11), marginTop: 6, fontWeight: '600' },
  quickRow: { gap: 10, paddingBottom: 8 },
  quickCard: { width: 220, borderRadius: 16, backgroundColor: '#eaf6f4', padding: 10 },
  quickImage: { width: '100%', height: 120, borderRadius: 12, marginBottom: 8, backgroundColor: '#d9e5e3' },
  quickName: { color: '#313c3b', fontSize: fontScale(14), fontWeight: '700' },
  quickSub: { color: '#6d7873', fontSize: fontScale(11), marginTop: 2 },
  quickFooter: { marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  quickPrice: { color: '#366855', fontSize: fontScale(13), fontWeight: '800' },
});
