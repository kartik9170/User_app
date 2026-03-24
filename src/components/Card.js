import React from 'react';
import { StyleSheet, View } from 'react-native';
import { moderateScale, verticalScale } from '../utils/responsive';

export default function Card({ children, style }) { return <View style={[styles.card, style]}>{children}</View>; }

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(14),
    padding: moderateScale(14),
    marginBottom: verticalScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  }
});
