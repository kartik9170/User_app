import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import CustomerNavigator from './CustomerNavigator';
import useAuth from '../hooks/useAuth';

export default function AppNavigator() {
  const { isAuthenticated } = useAuth();
  const content = isAuthenticated ? <CustomerNavigator /> : <AuthNavigator />;

  return <NavigationContainer>{content}</NavigationContainer>;
}
