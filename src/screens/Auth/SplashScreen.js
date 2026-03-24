import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { clamp, fontScale, moderateScale, verticalScale } from '../../utils/responsive';

export default function SplashScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const compact = width < 360 || height < 700;
  const logoSize = compact ? fontScale(46) : width > 430 ? fontScale(64) : fontScale(56);
  const iconSize = compact ? 30 : 36;
  const horizontalPadding = clamp(width * 0.072, 18, 34);
  const topPadding = clamp(height * 0.085, 56, 98);
  const bottomPadding = clamp(height * 0.06, 36, 62);
  const centerTopOffset = clamp(height * 0.045, 22, 46);
  const lineWidth = clamp(width * 0.08, 22, 34);
  const glowSize = clamp(width * 0.58, 190, 260);

  return (
    <LinearGradient colors={['#1c4f3e', '#091413']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
      <StatusBar style="light" />
      <View pointerEvents="none" style={[styles.abstractTopBorder, { top: -height * 0.07, left: -width * 0.1, borderTopLeftRadius: moderateScale(120) }]} />
      <View pointerEvents="none" style={[styles.abstractGlow, { bottom: -height * 0.03, right: -width * 0.08, width: glowSize, height: glowSize, borderRadius: glowSize / 2 }]} />

      <ImageBackground
        source={{
          uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAelJ53B_fovtms6pO4IleCKkuLmEJv33SIs3L_AigTZFwGxWPrg9YLYArJQEhzd76W2xR5gWCY3NnXsu5Fd2IoFZai8E03VkT76Y0pBQcRZAd4y9XsbOh1VKgM15Fghpv2MFgrKS1vGuU3iVby5F_NxhaaJPp2SAy2aUCUuIUkYyjKxgdKLTa6UL2OX_plVUBwoX4ZXWJDlP_gwEgDSLXG9PUwtTgaK-oXuRTTEJMm1GhIKwqE2_TXLsJQwq61veKX3LqV2EChkhQ',
        }}
        resizeMode="cover"
        style={styles.textureLayer}
        imageStyle={styles.textureImage}
      >
        <View style={[styles.content, { paddingTop: topPadding, paddingBottom: bottomPadding, paddingHorizontal: horizontalPadding }]}>
          <View style={[styles.centerBlock, { marginTop: centerTopOffset }]}>
            <MaterialIcons name="spa" size={iconSize} color="#f0fcfa" style={styles.spaIcon} />

            <Text style={[styles.logo, { fontSize: logoSize }]}>ATELIER</Text>

            <View style={styles.taglineRow}>
              <View style={[styles.line, { width: lineWidth }]} />
              <Text style={styles.tagline}>Experience the Art of Beauty</Text>
              <View style={[styles.line, { width: lineWidth }]} />
            </View>
          </View>

          <View style={styles.bottomArea}>
            <View style={styles.estRow}>
              <Text style={styles.estText}>EST. MMXXIV</Text>
              <View style={styles.estLine} />
              <Text style={styles.estText}>PREMIUM PRO</Text>
            </View>

            <Pressable onPress={() => navigation.navigate('Login')} style={({ pressed }) => [styles.ctaButton, pressed && styles.ctaPressed]}>
              <LinearGradient colors={['#366855', '#025d47']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaGradient}>
                <Text style={styles.ctaText}>Explore the Atelier</Text>
                <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
              </LinearGradient>
            </Pressable>

            <Text style={styles.footerText}>CURATED PROFESSIONAL EXCELLENCE</Text>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091413',
    overflow: 'hidden',
  },
  textureLayer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  textureImage: {
    opacity: 0.05,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  centerBlock: {
    alignItems: 'center',
  },
  spaIcon: {
    opacity: 0.65,
    marginBottom: verticalScale(28),
  },
  logo: {
    fontWeight: '800',
    color: '#d5eee4',
    letterSpacing: -2,
    marginBottom: verticalScale(14),
  },
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
    width: '100%',
    justifyContent: 'center',
  },
  line: {
    height: 1,
    backgroundColor: 'rgba(217,229,227,0.35)',
  },
  tagline: {
    color: '#d9e5e3',
    fontSize: fontScale(11),
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  bottomArea: {
    width: '100%',
    alignItems: 'center',
  },
  estRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(22),
    opacity: 0.75,
  },
  estText: {
    color: '#c5d3d0',
    fontSize: fontScale(9),
    fontWeight: '600',
    letterSpacing: 1.8,
  },
  estLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(240,252,250,0.25)',
    marginHorizontal: moderateScale(10),
  },
  ctaButton: {
    width: '100%',
    borderRadius: 999,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaPressed: {
    transform: [{ scale: 0.98 }],
  },
  ctaGradient: {
    minHeight: clamp(verticalScale(56), 48, 60),
    paddingHorizontal: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(8),
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: fontScale(13),
    fontWeight: '800',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  footerText: {
    marginTop: verticalScale(18),
    fontSize: fontScale(10),
    color: 'rgba(192,201,195,0.5)',
    letterSpacing: 1.8,
  },
  abstractTopBorder: {
    position: 'absolute',
    width: '70%',
    height: '55%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'rgba(182,235,211,0.18)',
    zIndex: 1,
  },
  abstractGlow: {
    position: 'absolute',
    backgroundColor: 'rgba(2,93,71,0.24)',
    zIndex: 1,
  },
});
