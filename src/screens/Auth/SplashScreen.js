import React from 'react';
import {
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BookiLogo, BOOKI } from '../../components/BookiAuthChrome';
import { clamp, fontScale, moderateScale, verticalScale } from '../../utils/responsive';

const FEATURES = [
  { icon: 'event-available', label: 'Book slots' },
  { icon: 'spa', label: 'Salon & spa' },
  { icon: 'favorite', label: 'Your picks' },
];

export default function SplashScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  /** Shorter side keeps blobs proportional so they stay mostly inside the clipped area. */
  const shortSide = Math.min(width, height);
  const blobL = clamp(shortSide * 0.5, 150, 240);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=80',
        }}
        style={styles.bg}
        imageStyle={styles.bgImage}
      >
        <View
          style={[
            styles.overlay,
            {
              paddingTop: insets.top + 8,
              paddingBottom: Math.max(insets.bottom, 10),
            },
          ]}
        >
          <View
            pointerEvents="none"
            style={[styles.blobOrange, { width: blobL, height: blobL, borderRadius: blobL / 2 }]}
          />
          <View
            pointerEvents="none"
            style={[
              styles.blobCharcoal,
              {
                width: blobL * 0.85,
                height: blobL * 0.85,
                borderRadius: (blobL * 0.85) / 2,
              },
            ]}
          />
          <View pointerEvents="none" style={styles.sparkle} />

          <View style={styles.topBadge}>
            <MaterialIcons name="person-outline" size={14} color={BOOKI.orange} />
            <Text style={styles.badgeText}>Customer app</Text>
          </View>

          <View style={styles.center}>
            <BookiLogo size={50} />
            <Text style={styles.headline}>Beauty & wellness,{'\n'}on your schedule</Text>
            <Text style={styles.sub}>
              Book trusted salons and professionals, manage visits, and discover offers — all in one place.
            </Text>

            <View style={styles.featureRow}>
              {FEATURES.map((f) => (
                <View key={f.label} style={styles.featureChip}>
                  <MaterialIcons name={f.icon} size={18} color={BOOKI.orange} />
                  <Text style={styles.featureText}>{f.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.bottom}>
            <Pressable
              onPress={() => navigation.navigate('Login')}
              style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
            >
              <Text style={styles.ctaText}>Get started</Text>
              <MaterialIcons name="arrow-forward" size={20} color={BOOKI.white} />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Signup')}
              style={({ pressed }) => [styles.secondaryBtn, pressed && styles.secondaryPressed]}
            >
              <Text style={styles.secondaryText}>New here? Create an account</Text>
            </Pressable>
            <Text style={styles.hint}>Free to join · Secure booking</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BOOKI.bg, overflow: 'hidden' },
  bg: { flex: 1, width: '100%', overflow: 'hidden' },
  bgImage: { opacity: 0.14 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,245,239,0.93)',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(22),
    overflow: 'hidden',
  },
  blobOrange: {
    position: 'absolute',
    top: verticalScale(28),
    right: -moderateScale(40),
    backgroundColor: BOOKI.orange,
    opacity: 0.2,
    transform: [{ scaleX: 1.08 }],
  },
  blobCharcoal: {
    position: 'absolute',
    bottom: verticalScale(120),
    left: -moderateScale(52),
    backgroundColor: BOOKI.charcoal,
    opacity: 0.07,
  },
  sparkle: {
    position: 'absolute',
    top: '22%',
    right: '10%',
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255,107,53,0.25)',
    opacity: 0.6,
  },
  topBadge: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,107,53,0.2)',
  },
  badgeText: {
    fontSize: fontScale(11),
    fontWeight: '700',
    color: BOOKI.charcoal,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
  },
  headline: {
    marginTop: verticalScale(20),
    textAlign: 'center',
    fontSize: fontScale(26),
    fontWeight: '800',
    color: BOOKI.charcoal,
    lineHeight: fontScale(32),
    letterSpacing: -0.6,
    paddingHorizontal: 8,
  },
  sub: {
    marginTop: verticalScale(14),
    textAlign: 'center',
    fontSize: fontScale(14),
    lineHeight: fontScale(21),
    color: BOOKI.muted,
    paddingHorizontal: moderateScale(8),
    maxWidth: 340,
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: verticalScale(22),
    paddingHorizontal: 4,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(44,44,44,0.06)',
  },
  featureText: {
    fontSize: fontScale(12),
    fontWeight: '600',
    color: BOOKI.charcoal,
  },
  bottom: {
    width: '100%',
    alignItems: 'center',
  },
  cta: {
    width: '100%',
    maxWidth: 400,
    minHeight: 54,
    borderRadius: 8,
    backgroundColor: BOOKI.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 5,
  },
  ctaPressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },
  ctaText: {
    color: BOOKI.white,
    fontSize: fontScale(17),
    fontWeight: '700',
  },
  secondaryBtn: {
    marginTop: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  secondaryPressed: { opacity: 0.75 },
  secondaryText: {
    fontSize: fontScale(15),
    fontWeight: '700',
    color: BOOKI.orange,
  },
  hint: {
    marginTop: verticalScale(4),
    marginBottom: 0,
    fontSize: fontScale(11),
    color: BOOKI.muted,
    letterSpacing: 0.4,
  },
});
