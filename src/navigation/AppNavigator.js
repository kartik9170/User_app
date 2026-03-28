import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { BOOKI } from '../components/BookiAuthChrome';
import AuthNavigator from './AuthNavigator';
import CustomerNavigator from './CustomerNavigator';
import useAuth from '../hooks/useAuth';

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: BOOKI.bg },
};

export default function AppNavigator() {
  const { isAuthenticated } = useAuth();
  const content = isAuthenticated ? <CustomerNavigator /> : <AuthNavigator />;

  return <NavigationContainer theme={navTheme}>{content}</NavigationContainer>;
}
