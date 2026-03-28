import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BOOKI } from './src/components/BookiAuthChrome';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { BookingProvider } from './src/context/BookingContext';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: BOOKI.bg }}>
      <SafeAreaProvider>
        <AuthProvider>
          <BookingProvider>
            <AppNavigator />
            <StatusBar style="auto" />
          </BookingProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
