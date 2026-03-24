import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import useBooking from '../../hooks/useBooking';
import { BOOKING_STATUS } from '../../utils/constants';

export default function ActiveJobs() {
  const { bookings, updateBooking } = useBooking();
  const activeJobs = bookings.filter((item) => [BOOKING_STATUS.ACCEPTED, BOOKING_STATUS.ACTIVE].includes(item.status));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Jobs</Text>
      <FlatList
        data={activeJobs}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No active jobs yet.</Text>}
        renderItem={({ item }) => (
          <Card>
            <Text style={styles.name}>{item.service?.name}</Text>
            <Text>{item.date} | {item.time}</Text>
            <Text>Status: {item.status}</Text>
            <Button title="Mark as Completed" onPress={() => updateBooking(item.id, { status: BOOKING_STATUS.COMPLETED })} />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F3F4F6', padding: 16 }, title: { fontSize: 22, fontWeight: '700', color: '#111827', marginBottom: 12 }, empty: { textAlign: 'center', marginTop: 20, color: '#6B7280' }, name: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 6 } });
