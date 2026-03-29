import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/Customer/HomeScreen';
import CategoryServicesScreen from '../screens/Customer/CategoryServicesScreen';
import ServiceDetails from '../screens/Customer/ServiceDetails';
import BookingScreen from '../screens/Customer/Booking/BookingScreen';
import DateTimeScreen from '../screens/Customer/Booking/DateTimeScreen';
import AddressScreen from '../screens/Customer/Booking/AddressScreen';
import PaymentScreen from '../screens/Customer/Booking/PaymentScreen';
import PaymentReceiptScreen from '../screens/Customer/Booking/PaymentReceiptScreen';
import TrackingScreen from '../screens/Customer/TrackingScreen';
import LiveTrackingScreen from '../screens/Customer/LiveTrackingScreen';
import ReviewScreen from '../screens/Customer/ReviewScreen';
import ProfileScreen from '../screens/Customer/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TrackingStack = createNativeStackNavigator();

function ServiceFlow() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Services', headerShown: false }} />
      <Stack.Screen name="CategoryServices" component={CategoryServicesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} options={{ title: 'Service Details', headerShown: false }} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DateTimeScreen" component={DateTimeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddressScreen" component={AddressScreen} options={{ title: 'Address' }} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PaymentReceiptScreen" component={PaymentReceiptScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function BookingHistoryFlow() {
  return (
    <TrackingStack.Navigator>
      <TrackingStack.Screen name="BookingHistory" component={TrackingScreen} options={{ headerShown: false }} />
      <TrackingStack.Screen name="LiveTracking" component={LiveTrackingScreen} options={{ headerShown: false }} />
    </TrackingStack.Navigator>
  );
}

export default function CustomerNavigator() {
  const iconByRoute = {
    Services: 'spa',
    Bookings: 'event-note',
    Review: 'star-rate',
    Profile: 'account-circle',
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FF6B2C',
        tabBarInactiveTintColor: '#7a8681',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginBottom: 2 },
        tabBarStyle: {
          height: 64,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 10 : 8,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          marginHorizontal: 14,
          marginBottom: Platform.OS === 'ios' ? 10 : 8,
          overflow: 'hidden',
          elevation: 16,
          shadowColor: '#2A2118',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.12,
          shadowRadius: 14,
        },
        tabBarIcon: ({ color, focused, size }) => (
          <MaterialIcons
            name={iconByRoute[route.name] || 'circle'}
            size={focused ? size + 1 : size}
            color={color}
            style={focused ? { transform: [{ translateY: -1 }] } : undefined}
          />
        ),
      })}
    >
      <Tab.Screen name="Services" component={ServiceFlow} />
      <Tab.Screen name="Bookings" component={BookingHistoryFlow} />
      <Tab.Screen name="Review" component={ReviewScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
