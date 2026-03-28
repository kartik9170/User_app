import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

/** BOOKI-inspired palette — vibrant orange, charcoal, soft peach */
export const BOOKI = {
  bg: '#FFF5EF',
  bgDeep: '#FFEFE6',
  charcoal: '#2C2C2C',
  orange: '#FF6B35',
  orangeDim: '#E85A28',
  border: '#E5D4C8',
  line: '#C9B8AD',
  muted: '#6B6560',
  white: '#FFFFFF',
  success: '#2E7D32',
};

export function BookiLogo({ size = 44, compact = false }) {
  const s = compact ? size * 0.72 : size;
  return (
    <View style={styles.logoRow}>
      <Text style={[styles.logoText, { fontSize: s, color: BOOKI.charcoal }]}>BOO</Text>
      <Text style={[styles.logoText, { fontSize: s, color: BOOKI.orange }]}>K</Text>
      <Text style={[styles.logoText, { fontSize: s, color: BOOKI.charcoal }]}>I</Text>
    </View>
  );
}

export function AuthTabs({ active, navigation }) {
  return (
    <View style={styles.tabsRow}>
      <Pressable
        onPress={() => navigation.navigate('Login')}
        style={[styles.tabBtn, active === 'login' && styles.tabBtnActive]}
      >
        <Text style={[styles.tabText, active === 'login' && styles.tabTextActive]}>Login</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('Signup')}
        style={[styles.tabBtn, active === 'signup' && styles.tabBtnActive]}
      >
        <Text style={[styles.tabText, active === 'signup' && styles.tabTextActive]}>Signup</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  logoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  logoText: { fontWeight: '900', letterSpacing: -1.5 },
  tabsRow: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(44,44,44,0.08)',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: BOOKI.orange,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: BOOKI.muted,
  },
  tabTextActive: {
    color: BOOKI.charcoal,
    fontWeight: '700',
  },
});

const ul = StyleSheet.create({
  label: { fontSize: 13, fontWeight: '600', color: BOOKI.charcoal, marginBottom: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: BOOKI.line,
    paddingBottom: 8,
    minHeight: 44,
  },
  rowFocused: { borderBottomColor: BOOKI.orange },
  input: { flex: 1, fontSize: 16, color: BOOKI.charcoal, paddingVertical: 4, paddingHorizontal: 0 },
});

/** Minimal underline field — BOOKI style (label + bottom rule). */
export function UnderlineField({ label, focused, children }) {
  return (
    <View style={{ marginBottom: 22 }}>
      <Text style={ul.label}>{label}</Text>
      <View style={[ul.row, focused && ul.rowFocused]}>{children}</View>
    </View>
  );
}

export function UnderlineTextInput({ label, value, onChangeText, keyboardType, placeholder, secureTextEntry, autoCapitalize, right, onFocus, onBlur, editable }) {
  const [f, setF] = useState(false);
  return (
    <UnderlineField label={label} focused={f}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={BOOKI.muted}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        editable={editable !== false}
        style={ul.input}
        onFocus={() => {
          setF(true);
          onFocus?.();
        }}
        onBlur={() => {
          setF(false);
          onBlur?.();
        }}
      />
      {right}
    </UnderlineField>
  );
}
