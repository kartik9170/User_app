import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../../components/Button';
import InputField from '../../../components/InputField';

export default function AddressScreen({ route, navigation }) {
  const { service, date, time } = route.params || {};
  const [address, setAddress] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Service Address</Text>
      <InputField label="Address" value={address} onChangeText={setAddress} placeholder="House no, street, city" />
      <Button title="Go to Payment" onPress={() => navigation.navigate('PaymentScreen', { service, date, time, address })} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F9FAFB', padding: 16 }, title: { fontSize: 20, fontWeight: '700', marginBottom: 14, color: '#111827' } });
