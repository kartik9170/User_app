import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import CustomerNavigator from './CustomerNavigator';
import PartnerNavigator from './PartnerNavigator';
import useAuth from '../hooks/useAuth';
import { ROLES } from '../utils/constants';

export default function AppNavigator() {
  const { isAuthenticated, role } = useAuth();

  let content = <AuthNavigator />;
  if (isAuthenticated && role === ROLES.CUSTOMER) content = <CustomerNavigator />;
  if (isAuthenticated && (!role || role === ROLES.PARTNER)) content = <PartnerNavigator />;

  return <NavigationContainer>{content}</NavigationContainer>;
}
