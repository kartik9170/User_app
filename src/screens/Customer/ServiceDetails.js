import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import servicesData from '../../data/servicesData';
import { fetchServiceById } from '../../services/serviceService';
import Loader from '../../components/Loader';
import ServiceHeroGallery from '../../components/ServiceHeroGallery';
import { fontScale } from '../../utils/responsive';

export default function ServiceDetails({ route, navigation }) {
  const { serviceId } = route.params || {};
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const galleryUris = useMemo(() => {
    if (!service) return [];
    if (service.images?.length) return service.images;
    return service.image ? [service.image] : [];
  }, [service]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const api = await fetchServiceById(serviceId);
        if (!cancelled) {
          if (api) setService(api);
          else setService(servicesData.find((item) => item.id === serviceId) || null);
        }
      } catch {
        if (!cancelled) setService(servicesData.find((item) => item.id === serviceId) || null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [serviceId]);

  if (loading) return <Loader />;

  if (!service) {
    return (
      <View style={styles.center}>
        <Text>Service not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={22} color="#1E1E1E" />
          </Pressable>
          <Text style={styles.brand}>The Atelier</Text>
        </View>
        <View style={styles.topRight}>
          <Pressable style={styles.iconBtn}>
            <MaterialIcons name="share" size={20} color="#6B6B6B" />
          </Pressable>
          <Pressable style={styles.iconBtn}>
            <MaterialIcons name="favorite-border" size={20} color="#6B6B6B" />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ServiceHeroGallery uris={galleryUris} variantLabel={service.type || 'Premium Care'} />

        <View style={styles.infoCard}>
          <View style={styles.titleRow}>
            <View style={styles.titleLeft}>
              <Text style={styles.name}>{service.name}</Text>
              <View style={styles.ratingRow}>
                <MaterialIcons name="star" size={14} color="#FF6B2C" />
                <Text style={styles.ratingText}>{service.rating || 4.8}</Text>
                <Text style={styles.reviewCount}>({service.reviews || 0} reviews)</Text>
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
                <MaterialIcons name="schedule" size={18} color="#FF6B2C" />
              </View>
              <Text style={styles.metaLabel}>Duration</Text>
              <Text style={styles.metaValue}>{service.duration}</Text>
            </View>
            <View style={styles.metaCard}>
              <View style={styles.metaIconCircleAlt}>
                <MaterialIcons name="spa" size={18} color="#2C2C2C" />
              </View>
              <Text style={styles.metaLabel}>Chapter</Text>
              <Text style={styles.metaValue}>{service.category}</Text>
            </View>
          </View>

          <Text style={styles.aboutTitle}>About Service</Text>
          <Text style={styles.desc}>{service.description}</Text>

          <View style={styles.chipsWrap}>
            {(service.benefits || ['Premium Care', 'Skin Friendly']).map((item) => (
              <View key={item} style={styles.chip}>
                <Text style={styles.chipText}>{item}</Text>
              </View>
            ))}
          </View>

          <Pressable style={styles.cta} onPress={() => navigation.navigate('BookingScreen', { service })}>
            <Text style={styles.ctaText}>Book now</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  safeArea: { flex: 1, backgroundColor: '#f6fbfa' },
  topBar: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  topRight: { flexDirection: 'row', gap: 4 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  brand: { color: '#1E1E1E', fontSize: fontScale(16), fontWeight: '800' },
  content: { paddingBottom: 28 },
  infoCard: {
    marginTop: -24,
    marginHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  titleLeft: { flex: 1 },
  name: { color: '#1E1E1E', fontSize: fontScale(22), fontWeight: '800' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  ratingText: { color: '#FF6B2C', fontSize: fontScale(12), fontWeight: '700' },
  reviewCount: { color: '#6d7873', fontSize: fontScale(11) },
  price: { color: '#FF6B2C', fontSize: fontScale(20), fontWeight: '800', textAlign: 'right' },
  tax: { color: '#6d7873', fontSize: fontScale(10), textAlign: 'right', marginTop: 2 },
  metaGrid: { flexDirection: 'row', gap: 10, marginTop: 16 },
  metaCard: {
    flex: 1,
    backgroundColor: '#EDE0D4',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
  },
  metaIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  metaIconCircleAlt: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#d9f2ec',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  metaLabel: { color: '#6d7873', fontSize: fontScale(10), fontWeight: '600' },
  metaValue: { color: '#1E1E1E', fontSize: fontScale(13), fontWeight: '700', marginTop: 2 },
  aboutTitle: { marginTop: 18, color: '#1E1E1E', fontSize: fontScale(14), fontWeight: '800' },
  desc: { color: '#6B6B6B', fontSize: fontScale(13), lineHeight: 20, marginTop: 6 },
  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  chip: { backgroundColor: '#F5F5F5', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  chipText: { color: '#FF6B2C', fontSize: fontScale(11), fontWeight: '700' },
  cta: {
    marginTop: 20,
    backgroundColor: '#FF6B2C',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: { color: '#FFFFFF', fontSize: fontScale(15), fontWeight: '800' },
});
