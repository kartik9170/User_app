import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { fontScale, moderateScale, verticalScale } from '../utils/responsive';

export default function InputField({ label, value, onChangeText, placeholder, secureTextEntry = false, keyboardType = 'default' }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} placeholder={placeholder} secureTextEntry={secureTextEntry} keyboardType={keyboardType} placeholderTextColor="#9CA3AF" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: verticalScale(14) },
  label: {
    marginBottom: verticalScale(6),
    color: '#374151',
    fontWeight: '500',
    fontSize: fontScale(14),
  },
  input: {
    borderRadius: moderateScale(10),
    borderWidth: 0,
    outlineWidth: 0,
    outlineColor: 'transparent',
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(10),
    backgroundColor: '#fff',
    fontSize: fontScale(15),
  }
});
