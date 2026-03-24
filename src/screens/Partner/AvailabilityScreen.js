import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import Card from '../../components/Card';

export default function AvailabilityScreen() {
  const [isAvailable, setIsAvailable] = useState(true);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Availability</Text>
      <Card style={styles.row}>
        <View>
          <Text style={styles.label}>Accept new bookings</Text>
          <Text style={styles.caption}>{isAvailable ? 'You are online' : 'You are offline'}</Text>
        </View>
        <Switch value={isAvailable} onValueChange={setIsAvailable} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F9FAFB', padding: 16 }, title: { fontSize: 22, fontWeight: '700', color: '#111827', marginBottom: 12 }, row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, label: { fontSize: 16, fontWeight: '600', color: '#111827' }, caption: { marginTop: 3, color: '#6B7280' } });
