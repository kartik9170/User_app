import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/Auth/SplashScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import PartnerProfileSetupScreen from '../screens/Auth/PartnerProfileSetupScreen';
import PartnerVerificationScreen from '../screens/Auth/PartnerVerificationScreen';
import PartnerSupportDetailsScreen from '../screens/Auth/PartnerSupportDetailsScreen';
import DashboardScreen from '../screens/Partner/DashboardScreen';
import BookOverviewScreen from '../screens/Partner/BookOverviewScreen';
import BookingRequestDetailScreen from '../screens/Partner/BookingRequestDetailScreen';
import AcceptedBookingDetailScreen from '../screens/Partner/AcceptedBookingDetailScreen';
import ServiceVerificationScreen from '../screens/Partner/ServiceVerificationScreen';
import ServiceCompletionScreen from '../screens/Partner/ServiceCompletionScreen';
import EarningsScreen from '../screens/Partner/EarningsScreen';
import PerformanceScreen from '../screens/Partner/PerformanceScreen';
import WithdrawalScreen from '../screens/Partner/WithdrawalScreen';
import WithdrawalSuccessScreen from '../screens/Partner/WithdrawalSuccessScreen';
import ProfessionalProfileScreen from '../screens/Partner/ProfessionalProfileScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Signup' }} />
      <Stack.Screen name="PartnerProfileSetup" component={PartnerProfileSetupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PartnerVerification" component={PartnerVerificationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PartnerSupportDetails" component={PartnerSupportDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PartnerHomePreview" component={DashboardScreen} options={{ title: 'Partner Home', headerShown: false }} />
      <Stack.Screen name="PartnerEarningsPreview" component={EarningsScreen} options={{ title: 'Partner Earnings', headerShown: false }} />
      <Stack.Screen name="PartnerWithdrawPreview" component={WithdrawalScreen} options={{ title: 'Partner Withdraw', headerShown: false }} />
      <Stack.Screen name="PartnerWithdrawSuccessPreview" component={WithdrawalSuccessScreen} options={{ title: 'Withdraw Success', headerShown: false }} />
      <Stack.Screen name="PartnerPerformancePreview" component={PerformanceScreen} options={{ title: 'Partner Performance', headerShown: false }} />
      <Stack.Screen name="PartnerProfessionalProfilePreview" component={ProfessionalProfileScreen} options={{ title: 'Partner Profile', headerShown: false }} />
      <Stack.Screen
        name="PartnerBookPreview"
        component={BookOverviewScreen}
        initialParams={{ detailRouteName: 'PartnerBookDetailPreview', acceptedDetailRouteName: 'PartnerAcceptedBookDetailPreview' }}
        options={{ title: 'Partner Book', headerShown: false }}
      />
      <Stack.Screen name="PartnerBookDetailPreview" component={BookingRequestDetailScreen} options={{ title: 'Request Detail', headerShown: false }} />
      <Stack.Screen name="PartnerAcceptedBookDetailPreview" component={AcceptedBookingDetailScreen} options={{ title: 'Accepted Detail', headerShown: false }} />
      <Stack.Screen name="PartnerServiceVerificationPreview" component={ServiceVerificationScreen} options={{ title: 'Verify Service', headerShown: false }} />
      <Stack.Screen name="PartnerServiceCompletionPreview" component={ServiceCompletionScreen} options={{ title: 'Service Completion', headerShown: false }} />
    </Stack.Navigator>
  );
}
