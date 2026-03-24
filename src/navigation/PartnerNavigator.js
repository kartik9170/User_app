import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/Partner/DashboardScreen';
import BookOverviewScreen from '../screens/Partner/BookOverviewScreen';
import BookingRequestDetailScreen from '../screens/Partner/BookingRequestDetailScreen';
import AcceptedBookingDetailScreen from '../screens/Partner/AcceptedBookingDetailScreen';
import ServiceVerificationScreen from '../screens/Partner/ServiceVerificationScreen';
import ServiceCompletionScreen from '../screens/Partner/ServiceCompletionScreen';
import ActiveJobs from '../screens/Partner/ActiveJobs';
import EarningsScreen from '../screens/Partner/EarningsScreen';
import PerformanceScreen from '../screens/Partner/PerformanceScreen';
import WithdrawalScreen from '../screens/Partner/WithdrawalScreen';
import WithdrawalSuccessScreen from '../screens/Partner/WithdrawalSuccessScreen';
import AvailabilityScreen from '../screens/Partner/AvailabilityScreen';
import ProfileScreen from '../screens/Partner/ProfileScreen';
import ProfessionalProfileScreen from '../screens/Partner/ProfessionalProfileScreen';

const Tab = createBottomTabNavigator();
const BookStack = createNativeStackNavigator();
const EarningsStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function BookNavigator() {
  return (
    <BookStack.Navigator>
      <BookStack.Screen name="BookingsOverview" component={BookOverviewScreen} options={{ title: 'Book', headerShown: false }} />
      <BookStack.Screen name="BookingRequestDetail" component={BookingRequestDetailScreen} options={{ title: 'Request Details', headerShown: false }} />
      <BookStack.Screen name="AcceptedBookingDetail" component={AcceptedBookingDetailScreen} options={{ title: 'Accepted Booking', headerShown: false }} />
      <BookStack.Screen name="ServiceVerification" component={ServiceVerificationScreen} options={{ title: 'Service Verification', headerShown: false }} />
      <BookStack.Screen name="ServiceCompletion" component={ServiceCompletionScreen} options={{ title: 'Service Complete', headerShown: false }} />
    </BookStack.Navigator>
  );
}

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileHome" component={ProfileScreen} options={{ title: 'Profile', headerShown: false }} />
      <ProfileStack.Screen name="ProfessionalProfile" component={ProfessionalProfileScreen} options={{ title: 'Professional Profile', headerShown: false }} />
    </ProfileStack.Navigator>
  );
}

function EarningsNavigator() {
  return (
    <EarningsStack.Navigator>
      <EarningsStack.Screen name="EarningsHome" component={EarningsScreen} options={{ title: 'Earnings', headerShown: false }} />
      <EarningsStack.Screen name="Withdraw" component={WithdrawalScreen} options={{ title: 'Withdraw', headerShown: false }} />
      <EarningsStack.Screen name="WithdrawSuccess" component={WithdrawalSuccessScreen} options={{ title: 'Withdraw Success', headerShown: false }} />
      <EarningsStack.Screen name="Performance" component={PerformanceScreen} options={{ title: 'Performance', headerShown: false }} />
    </EarningsStack.Navigator>
  );
}

export default function PartnerNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Home', headerShown: false }} />
      <Tab.Screen name="Book" component={BookNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="ActiveJobs" component={ActiveJobs} options={{ title: 'Active Jobs' }} />
      <Tab.Screen name="Earnings" component={EarningsNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Availability" component={AvailabilityScreen} />
      <Tab.Screen name="Profile" component={ProfileNavigator} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
