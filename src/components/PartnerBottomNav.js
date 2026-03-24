import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fontScale } from '../utils/responsive';

const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: 'grid-view' },
  { key: 'book', label: 'Book', icon: 'calendar-today' },
  { key: 'pay', label: 'Earnings', icon: 'payments' },
  { key: 'profile', label: 'Profile', icon: 'person' },
];

export default function PartnerBottomNav({ activeKey = 'home', onPressItem }) {
  return (
    <View style={styles.container}>
      {NAV_ITEMS.map((item) => {
        const active = item.key === activeKey;
        return (
          <Pressable key={item.key} onPress={() => onPressItem?.(item.key)} style={[styles.item, active && styles.itemActive]}>
            <MaterialIcons name={item.icon} size={22} color={active ? '#366855' : '#7a8681'} />
            <Text style={[styles.label, active && styles.labelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderTopWidth: 1,
    borderColor: '#deebe8',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item: {
    width: 68,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemActive: {
    backgroundColor: 'rgba(54,104,85,0.1)',
  },
  label: {
    marginTop: 2,
    color: '#6b7772',
    fontSize: fontScale(10),
    fontWeight: '600',
  },
  labelActive: {
    color: '#366855',
    fontWeight: '700',
  },
});
