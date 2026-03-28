import React, { useMemo, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import useAuth from '../../hooks/useAuth';
import { fontScale } from '../../utils/responsive';

const DEFAULT_PROFILE_NAME = 'Sophia Chen';

export default function ProfileScreen() {
  const { user, logout, updateUserProfile } = useAuth();
  const sanitizedName = (() => {
    const raw = String(user?.name || '').trim();
    if (!raw) return DEFAULT_PROFILE_NAME;
    // If backend returns mobile-like values, keep a proper display name.
    if (/^[0-9+\-\s()]+$/.test(raw)) return DEFAULT_PROFILE_NAME;
    return raw;
  })();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(sanitizedName);
  const [email, setEmail] = useState(user?.email || 'sophia.chen@atelier.com');
  const [city, setCity] = useState(user?.city || 'Bangalore');
  const [memberSince, setMemberSince] = useState(user?.memberSince || '2024');
  const [profileImage, setProfileImage] = useState(
    user?.avatar ||
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80'
  );

  const recentBookings = useMemo(
    () => [
      { id: '1', title: 'HydraFacial', meta: 'Oct 12 • Atelier Downtown', icon: 'face-6', tone: '#FFA06A' },
      { id: '2', title: 'Manicure', meta: 'Sep 28 • The Suite', icon: 'back-hand', tone: '#FFA06A' },
    ],
    []
  );

  const favorites = useMemo(
    () => [
      {
        id: 'f1',
        name: 'Elena R.',
        role: 'Skin Expert',
        image:
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 'f2',
        name: 'Marcus V.',
        role: 'Master Stylist',
        image:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80',
      },
    ],
    []
  );

  const handleUploadPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Needed', 'Please allow gallery access to upload a profile image.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const saveProfile = () => {
    updateUserProfile({
      name: name.trim(),
      email: email.trim(),
      city: city.trim(),
      memberSince: memberSince.trim(),
      avatar: profileImage,
    });
    setIsEditing(false);
    Alert.alert('Profile Updated', 'Your profile changes have been saved.');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <View style={styles.topAvatarWrap}>
            <Image source={{ uri: profileImage }} style={styles.topAvatar} />
          </View>
          <Text style={styles.topBrand}>Emerald Pro</Text>
        </View>
        <Pressable onPress={() => setIsEditing((prev) => !prev)} style={styles.topActionBtn}>
          <MaterialIcons name={isEditing ? 'close' : 'settings'} size={22} color="#6B6B6B" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.heroAvatarBorder}>
            <Image source={{ uri: profileImage }} style={styles.heroAvatar} />
          </View>
          <Pressable style={styles.uploadChip} onPress={handleUploadPhoto}>
            <MaterialIcons name="photo-camera" size={14} color="#FFFFFF" />
            <Text style={styles.uploadChipText}>Upload</Text>
          </Pressable>
          <Text style={styles.heroName}>{name || DEFAULT_PROFILE_NAME}</Text>
          <Text style={styles.heroMeta}>Atelier Member since {memberSince || '2024'}</Text>
        </View>

        {isEditing ? (
          <View style={styles.editCard}>
            <Text style={styles.editTitle}>Edit Profile</Text>
            <TextInput value={name} onChangeText={setName} placeholder="Full Name" placeholderTextColor="#80908a" style={styles.input} />
            <TextInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" placeholderTextColor="#80908a" style={styles.input} />
            <TextInput value={city} onChangeText={setCity} placeholder="City" placeholderTextColor="#80908a" style={styles.input} />
            <TextInput value={memberSince} onChangeText={setMemberSince} placeholder="Member Since" placeholderTextColor="#80908a" style={styles.input} />
            <Button title="Save Profile" onPress={saveProfile} />
          </View>
        ) : null}

        <View style={styles.membershipCard}>
          <View style={styles.membershipHead}>
            <View>
              <Text style={styles.membershipKicker}>Status</Text>
              <Text style={styles.membershipTitle}>Emerald Tier</Text>
            </View>
            <View style={styles.vipPill}>
              <MaterialIcons name="auto-awesome" size={14} color="#FF6B2C" />
              <Text style={styles.vipText}>V.I.P</Text>
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.membershipNote}>120 points to reach <Text style={styles.membershipStrong}>Diamond Elite</Text></Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Recent Bookings</Text>
            <Pressable>
              <Text style={styles.linkText}>View History</Text>
            </Pressable>
          </View>
          {recentBookings.map((item, index) => (
            <Pressable key={item.id} style={[styles.bookingCard, index === 1 && styles.bookingCardOffset]}>
              <View style={styles.bookingLeft}>
                <View style={[styles.bookingIconWrap, { backgroundColor: item.tone }]}>
                  <MaterialIcons name={item.icon} size={20} color="#FF6B2C" />
                </View>
                <View>
                  <Text style={styles.bookingTitle}>{item.title}</Text>
                  <Text style={styles.bookingMeta}>{item.meta}</Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#9aa6a1" />
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favorite Artisans</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.favRow}>
            {favorites.map((item) => (
              <View key={item.id} style={styles.favCard}>
                <Image source={{ uri: item.image }} style={styles.favAvatar} />
                <Text style={styles.favName}>{item.name}</Text>
                <Text style={styles.favRole}>{item.role}</Text>
              </View>
            ))}
            <Pressable style={styles.favCard}>
              <View style={styles.addFavCircle}>
                <MaterialIcons name="add" size={22} color="#9E9E9E" />
              </View>
              <Text style={styles.addFavText}>Add New</Text>
            </Pressable>
          </ScrollView>
        </View>

        <View style={styles.settingsList}>
          {[
            ['shield', 'Privacy & Security'],
            ['notifications', 'Notifications'],
            ['payments', 'Payments & Methods'],
          ].map(([icon, label]) => (
            <Pressable key={label} style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <MaterialIcons name={icon} size={20} color="#FF6B2C" />
                <Text style={styles.settingText}>{label}</Text>
              </View>
              <MaterialIcons name="arrow-outward" size={18} color="#9aa6a1" />
            </Pressable>
          ))}
        </View>

        <Button title="Logout" onPress={logout} style={styles.actionBtn} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EDE0D4' },
  topBar: {
    height: 64,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(240,252,250,0.9)',
    borderBottomWidth: 1,
    borderColor: 'rgba(192,201,195,0.35)',
  },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  topAvatarWrap: { width: 34, height: 34, borderRadius: 17, overflow: 'hidden', borderWidth: 2, borderColor: '#FFA06A' },
  topAvatar: { width: '100%', height: '100%' },
  topBrand: { color: '#1E1E1E', fontSize: fontScale(21), fontWeight: '800' },
  topActionBtn: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  content: { padding: 14, paddingBottom: 30 },
  heroSection: { alignItems: 'center', marginBottom: 14 },
  heroAvatarBorder: { width: 130, height: 130, borderRadius: 65, padding: 3, backgroundColor: '#FF6B2C' },
  heroAvatar: { width: '100%', height: '100%', borderRadius: 63, borderWidth: 4, borderColor: '#EDE0D4' },
  uploadChip: { marginTop: 8, borderRadius: 999, backgroundColor: '#FF6B2C', paddingHorizontal: 10, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 4 },
  uploadChipText: { color: '#FFFFFF', fontSize: fontScale(10), fontWeight: '700', textTransform: 'uppercase' },
  heroName: { color: '#1E1E1E', fontSize: fontScale(34), fontWeight: '800', marginTop: 8 },
  heroMeta: { color: '#6B6B6B', fontSize: fontScale(13), fontWeight: '500' },
  editCard: { borderRadius: 20, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(192,201,195,0.35)', padding: 12, marginBottom: 12 },
  editTitle: { color: '#1E1E1E', fontSize: fontScale(18), fontWeight: '700', marginBottom: 8 },
  input: {
    minHeight: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#F5F5F5',
    color: '#1E1E1E',
    fontSize: fontScale(13),
  },
  membershipCard: { borderRadius: 30, padding: 16, backgroundColor: '#F5F5F5', marginBottom: 14 },
  membershipHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  membershipKicker: { color: '#FF6B2C', fontSize: fontScale(10), fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.3 },
  membershipTitle: { color: '#1E1E1E', fontSize: fontScale(25), fontWeight: '700' },
  vipPill: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 7, backgroundColor: 'rgba(182,235,211,0.4)', flexDirection: 'row', alignItems: 'center', gap: 4 },
  vipText: { color: '#FF6B2C', fontSize: fontScale(11), fontWeight: '700' },
  progressTrack: { height: 7, borderRadius: 999, backgroundColor: '#DADADA', overflow: 'hidden' },
  progressFill: { width: '75%', height: '100%', backgroundColor: '#FF6B2C' },
  membershipNote: { color: '#6B6B6B', marginTop: 8, fontSize: fontScale(12) },
  membershipStrong: { color: '#1E1E1E', fontWeight: '700' },
  section: { marginBottom: 14 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { color: '#1E1E1E', fontSize: fontScale(22), fontWeight: '700' },
  linkText: { color: '#FF6B2C', fontSize: fontScale(12), fontWeight: '700' },
  bookingCard: { borderRadius: 24, backgroundColor: '#FFFFFF', padding: 14, marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  bookingCardOffset: { marginLeft: 14 },
  bookingLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bookingIconWrap: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  bookingTitle: { color: '#1E1E1E', fontSize: fontScale(14), fontWeight: '700' },
  bookingMeta: { color: '#6B6B6B', fontSize: fontScale(11), marginTop: 1 },
  favRow: { gap: 10, paddingTop: 8, paddingBottom: 6 },
  favCard: { width: 140, borderRadius: 30, padding: 12, backgroundColor: '#F5F5F5', alignItems: 'center' },
  favAvatar: { width: 76, height: 76, borderRadius: 38, marginBottom: 8 },
  favName: { color: '#1E1E1E', fontSize: fontScale(14), fontWeight: '700' },
  favRole: { color: '#6B6B6B', fontSize: fontScale(10), textTransform: 'uppercase', letterSpacing: 1.1, marginTop: 2 },
  addFavCircle: { width: 76, height: 76, borderRadius: 38, borderWidth: 2, borderStyle: 'dashed', borderColor: '#DADADA', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  addFavText: { color: '#6B6B6B', fontSize: fontScale(12) },
  settingsList: { gap: 6, marginBottom: 10 },
  settingItem: { borderRadius: 12, backgroundColor: 'rgba(228,240,238,0.5)', paddingHorizontal: 12, minHeight: 48, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  settingText: { color: '#1E1E1E', fontSize: fontScale(14), fontWeight: '500' },
  actionBtn: { marginTop: 6 },
});
