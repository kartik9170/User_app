import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import useBooking from '../../hooks/useBooking';
import { BOOKING_STATUS } from '../../utils/constants';

export default function BookingRequests() {
  const { bookings, updateBooking } = useBooking();
  const requests = bookings.filter((item) => item.status === BOOKING_STATUS.PENDING);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No pending requests.</Text>}
        renderItem={({ item }) => (
          <Card>
            <Text style={styles.name}>{item.service?.name}</Text>
            <Text>{item.date} | {item.time}</Text>
            <Text>{item.address}</Text>
            <View style={styles.row}>
              <Button title="Accept" style={styles.btn} onPress={() => updateBooking(item.id, { status: BOOKING_STATUS.ACCEPTED })} />
              <Button title="Reject" variant="secondary" style={styles.btn} onPress={() => updateBooking(item.id, { status: BOOKING_STATUS.REJECTED })} />
            </View>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F3F4F6', padding: 16 }, title: { fontSize: 22, fontWeight: '700', color: '#111827', marginBottom: 12 }, empty: { textAlign: 'center', marginTop: 20, color: '#6B7280' }, name: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 6 }, row: { flexDirection: 'row', gap: 10, marginTop: 8 }, btn: { flex: 1 } });
