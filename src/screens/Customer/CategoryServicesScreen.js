import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import servicesData from '../../data/servicesData';
import { fontScale } from '../../utils/responsive';

export default function CategoryServicesScreen({ route, navigation }) {
  const category = route?.params?.category || 'Facial';
  const [query, setQuery] = useState('');

  const list = useMemo(
    () => servicesData.filter((item) => item.category.toLowerCase() === category.toLowerCase()),
    [category]
  );
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return list;
    return list.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.type.toLowerCase().includes(term)
    );
  }, [list, query]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <MaterialIcons name="arrow-back" size={22} color="#313c3b" />
          </Pressable>
          <Text style={styles.title}>{category} Services</Text>
        </View>
        <Text style={styles.count}>{filtered.length} results</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headSection}>
          <Text style={styles.heroTitle}>Find Your Perfect {category} Service</Text>
          <Text style={styles.heroSub}>Compact list for quick browsing and faster booking.</Text>
        </View>

        <View style={styles.searchWrap}>
          <MaterialIcons name="search" size={18} color="#7a8681" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={`Search ${category.toLowerCase()} services...`}
            placeholderTextColor="#8a9692"
            style={styles.searchInput}
          />
          <Pressable style={styles.searchBtn}>
            <Text style={styles.searchBtnText}>Search</Text>
          </Pressable>
        </View>

        {filtered.map((item) => (
          <Pressable key={item.id} onPress={() => navigation.navigate('ServiceDetails', { serviceId: item.id })} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.body}>
              <View style={styles.row}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>INR {item.price}</Text>
              </View>
              <Text numberOfLines={2} style={styles.desc}>{item.description}</Text>
              <Text style={styles.meta}>{item.duration} • {item.type}</Text>
            </View>
          </Pressable>
        ))}

        {!filtered.length ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyTitle}>No services found</Text>
            <Text style={styles.emptySub}>Try another keyword.</Text>
          </View>
        ) : null}
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
    borderBottomWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
  },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconBtn: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  title: { color: '#313c3b', fontSize: fontScale(20), fontWeight: '800' },
  count: { color: '#5f6b66', fontSize: fontScale(12), fontWeight: '600' },
  content: { padding: 14, paddingBottom: 20 },
  headSection: { marginBottom: 8 },
  heroTitle: { color: '#313c3b', fontSize: fontScale(23), fontWeight: '800' },
  heroSub: { color: '#5f6b66', fontSize: fontScale(12), marginTop: 2 },
  searchWrap: {
    borderRadius: 12,
    backgroundColor: '#deebe8',
    minHeight: 48,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: { flex: 1, marginLeft: 8, color: '#313c3b', fontSize: fontScale(13), borderWidth: 0, outlineWidth: 0, outlineColor: 'transparent' },
  searchBtn: { borderRadius: 9, backgroundColor: '#366855', paddingHorizontal: 11, paddingVertical: 7 },
  searchBtnText: { color: '#FFFFFF', fontSize: fontScale(11), fontWeight: '700' },
  card: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  image: { width: 90, height: 90, borderRadius: 10, backgroundColor: '#d9e5e3', marginRight: 10 },
  body: { flex: 1, paddingRight: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  name: { color: '#313c3b', fontSize: fontScale(15), fontWeight: '700', flex: 1, marginRight: 6 },
  price: { color: '#366855', fontSize: fontScale(13), fontWeight: '800' },
  desc: { color: '#5f6b66', fontSize: fontScale(11), marginTop: 3, lineHeight: 16 },
  meta: { color: '#6d7873', fontSize: fontScale(10), fontWeight: '600', marginTop: 5 },
  emptyWrap: { borderRadius: 12, backgroundColor: '#eaf6f4', padding: 14, alignItems: 'center', marginTop: 4 },
  emptyTitle: { color: '#313c3b', fontSize: fontScale(14), fontWeight: '700' },
  emptySub: { color: '#6d7873', fontSize: fontScale(11), marginTop: 2 },
});
