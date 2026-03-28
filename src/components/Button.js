import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { clamp, fontScale, moderateScale, verticalScale } from '../utils/responsive';

export default function Button({ title, onPress, variant = 'primary', disabled = false, loading = false, style }) {
  const secondary = variant === 'secondary';
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        secondary ? styles.secondary : styles.primary,
        secondary ? styles.secondaryShadow : styles.primaryShadow,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {loading ? <ActivityIndicator color={secondary ? '#1E1E1E' : '#fff'} /> : <Text style={[styles.txt, secondary ? styles.dark : styles.light]}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: moderateScale(14),
    paddingVertical: clamp(verticalScale(13), 11, 16),
    paddingHorizontal: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: verticalScale(50),
  },
  primary: { backgroundColor: '#FF6B2C' },
  secondary: {
    backgroundColor: '#EDE0D4',
    borderWidth: 1.5,
    borderColor: '#9dd2bb',
  },
  primaryShadow: {
    shadowColor: '#FF6B2C',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  secondaryShadow: {
    shadowColor: '#1E1E1E',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  disabled: { opacity: 0.6 },
  txt: { fontWeight: '700', fontSize: fontScale(15), letterSpacing: 0.3 },
  dark: { color: '#FF6B2C' },
  light: { color: '#FFFFFF' }
});
