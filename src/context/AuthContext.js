import React, { createContext, useMemo, useState } from 'react';
import { loginUser, loginUserWithOtp, resendLoginOtp, sendLoginOtp, signupUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (payload) => {
    setLoading(true);
    try {
      const res = await loginUser(payload);
      setUser(res.user);
      setToken(res.token);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (payload) => {
    setLoading(true);
    try {
      const res = await signupUser(payload);
      setUser(res.user);
      setToken(res.token);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const requestLoginOtp = async (mobile) => {
    setLoading(true);
    try {
      return await sendLoginOtp(mobile);
    } finally {
      setLoading(false);
    }
  };

  const requestResendLoginOtp = async (mobile) => {
    setLoading(true);
    try {
      return await resendLoginOtp(mobile);
    } finally {
      setLoading(false);
    }
  };

  const loginWithOtp = async (payload) => {
    setLoading(true);
    try {
      const res = await loginUserWithOtp(payload);
      setUser(res.user);
      setToken(res.token);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
  };

  const updateUserProfile = (updates) => {
    setUser((prev) => ({ ...(prev || {}), ...(updates || {}) }));
  };

  const value = useMemo(
    () => ({
      user,
      token,
      role,
      loading,
      isAuthenticated: Boolean(token),
      login,
      loginWithOtp,
      requestLoginOtp,
      requestResendLoginOtp,
      signup,
      setRole,
      logout,
      updateUserProfile,
    }),
    [user, token, role, loading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
