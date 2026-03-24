import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';
import Button from './Button';
import { formatCurrency } from '../utils/helpers';
import { fontScale, verticalScale } from '../utils/responsive';

export default function ServiceCard({ service, onPress }) {
  return (
    <Card>
      <Text style={styles.title}>{service.name}</Text>
      <Text style={styles.sub}>{service.category}</Text>
      <View style={styles.row}><Text>{formatCurrency(service.price)}</Text><Text>{service.duration}</Text></View>
      <Button title="View Details" onPress={onPress} />
    </Card>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: fontScale(16), fontWeight: '700', color: '#111827' },
  sub: { color: '#6B7280', marginVertical: verticalScale(6), fontSize: fontScale(13) },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: verticalScale(10) }
});
