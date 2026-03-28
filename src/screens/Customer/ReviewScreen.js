import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import { fontScale } from '../../utils/responsive';

export default function ReviewScreen({ navigation }) {
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState('Absolutely divine, as always.');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <MaterialIcons name="arrow-back" size={22} color="#FF6B2C" />
        </Pressable>
        <Text style={styles.headerTitle}>Rate Service</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.artistCard}>
          <View style={styles.artistTop}>
            <View style={styles.avatarWrap}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80' }} style={styles.avatar} />
              <View style={styles.verified}>
                <MaterialIcons name="verified" size={12} color="#FFFFFF" />
              </View>
            </View>
            <View>
              <Text style={styles.artistLabel}>Your Artist</Text>
              <Text style={styles.artistName}>Elena Rodriguez</Text>
            </View>
          </View>
          <View style={styles.serviceBox}>
            <View>
              <Text style={styles.serviceName}>Botanical Facial Lift</Text>
              <Text style={styles.serviceMeta}>Completed Dec 14 - 60 mins</Text>
            </View>
            <Text style={styles.donePill}>Done</Text>
          </View>
        </View>

        <Text style={styles.ratingTitle}>How was your session?</Text>
        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Pressable key={star} onPress={() => setRating(star)}>
              <MaterialIcons name={star <= rating ? 'star' : 'star-border'} size={34} color="#FF6B2C" />
            </Pressable>
          ))}
        </View>
        <Text style={styles.quote}>"Absolutely divine, as always."</Text>

        <Text style={styles.feedbackLabel}>Tell us about your experience...</Text>
        <TextInput
          value={review}
          onChangeText={setReview}
          multiline
          placeholder="Describe the atmosphere, the result, or anything else..."
          placeholderTextColor="#88948f"
          style={styles.feedbackInput}
        />

        <View style={styles.photoHead}>
          <Text style={styles.photoTitle}>Show off the results</Text>
          <Text style={styles.photoSub}>Up to 4 photos</Text>
        </View>
        <View style={styles.photoGrid}>
          <View style={styles.photoUpload}>
            <MaterialIcons name="add-a-photo" size={28} color="#FF6B2C" />
            <Text style={styles.photoUploadText}>Upload New</Text>
          </View>
          <View style={styles.photoPreviewCol}>
            <View style={styles.previewPhotoWrap}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=500&q=80' }} style={styles.previewPhoto} />
              <View style={styles.closePhoto}>
                <MaterialIcons name="close" size={11} color="#FFFFFF" />
              </View>
            </View>
            <View style={styles.photoAddMini}>
              <MaterialIcons name="add" size={20} color="#9E9E9E" />
            </View>
          </View>
        </View>

        <Button
          title="Submit Review"
          onPress={() => Alert.alert('Thank You', 'Your review has been submitted.')}
          style={styles.submitBtn}
        />

        <Pressable onPress={() => navigation.getParent()?.navigate('Services')} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip for now</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EDE0D4' },
  header: { height: 62, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconBtn: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#1E1E1E', fontSize: fontScale(18), fontWeight: '700' },
  headerSpacer: { width: 34 },
  content: { paddingHorizontal: 14, paddingBottom: 20 },
  artistCard: { borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(192,201,195,0.35)', padding: 12, marginBottom: 12 },
  artistTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  avatarWrap: { position: 'relative' },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  verified: { position: 'absolute', right: -1, bottom: -1, width: 20, height: 20, borderRadius: 10, backgroundColor: '#2C2C2C', alignItems: 'center', justifyContent: 'center' },
  artistLabel: { color: 'rgba(64,73,68,0.65)', fontSize: fontScale(10), textTransform: 'uppercase', fontWeight: '700' },
  artistName: { color: '#1E1E1E', fontSize: fontScale(20), fontWeight: '800', marginTop: 2 },
  serviceBox: { borderRadius: 12, backgroundColor: '#F5F5F5', padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  serviceName: { color: '#1E1E1E', fontSize: fontScale(14), fontWeight: '700' },
  serviceMeta: { color: '#6B6B6B', fontSize: fontScale(11), marginTop: 1 },
  donePill: { backgroundColor: 'rgba(182,235,211,0.45)', color: '#3a6c59', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4, fontSize: fontScale(10), fontWeight: '700', textTransform: 'uppercase' },
  ratingTitle: { color: '#1E1E1E', textAlign: 'center', fontSize: fontScale(18), fontWeight: '700', marginBottom: 8 },
  starRow: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  quote: { textAlign: 'center', color: '#6B6B6B', marginTop: 4, marginBottom: 10, fontStyle: 'italic' },
  feedbackLabel: { color: '#1E1E1E', fontSize: fontScale(13), fontWeight: '700', marginBottom: 6 },
  feedbackInput: {
    borderRadius: 14,
    minHeight: 120,
    padding: 12,
    textAlignVertical: 'top',
    backgroundColor: '#F5F5F5',
    color: '#1E1E1E',
    marginBottom: 10,
  },
  photoHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 },
  photoTitle: { color: '#1E1E1E', fontSize: fontScale(16), fontWeight: '700' },
  photoSub: { color: '#7a8681', fontSize: fontScale(11) },
  photoGrid: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  photoUpload: { flex: 1.2, borderRadius: 14, minHeight: 140, borderWidth: 2, borderStyle: 'dashed', borderColor: '#DADADA', backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' },
  photoUploadText: { color: '#FF6B2C', fontSize: fontScale(11), fontWeight: '600', marginTop: 4 },
  photoPreviewCol: { flex: 0.8, gap: 8 },
  previewPhotoWrap: { flex: 1, borderRadius: 12, overflow: 'hidden', position: 'relative' },
  previewPhoto: { width: '100%', height: '100%' },
  closePhoto: { position: 'absolute', top: 4, right: 4, width: 18, height: 18, borderRadius: 9, backgroundColor: 'rgba(30,30,30,0.6)', alignItems: 'center', justifyContent: 'center' },
  photoAddMini: { flex: 1, borderRadius: 12, borderWidth: 2, borderStyle: 'dashed', borderColor: '#DADADA', backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' },
  submitBtn: { marginTop: 4 },
  skipBtn: { alignSelf: 'center', marginTop: 10, paddingVertical: 6 },
  skipText: { color: '#FF6B2C', opacity: 0.7, textDecorationLine: 'underline' },
});
