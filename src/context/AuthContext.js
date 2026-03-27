import React, { createContext, useMemo, useState } from 'react';
import { loginUser, loginPartnerUser, signupUser } from '../services/authService';
import { submitPartnerApplicationApi } from '../services/partnerApplicationService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [partnerApplication, setPartnerApplication] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (payload) => {
    setLoading(true);
    try {
      const res = await loginUser(payload);
      setUser(res.user);
      setToken(res.token);
    } finally {
      setLoading(false);
    }
  };

  const loginPartner = async (payload) => {
    setLoading(true);
    try {
      const res = await loginPartnerUser(payload);
      setUser(res.user);
      setToken(res.token);
      setRole('partner');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (payload) => {
    setLoading(true);
    try { const res = await signupUser(payload); setUser(res.user); setToken(res.token); }
    finally { setLoading(false); }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    setPartnerApplication(null);
  };

  const updateUserProfile = (updates) => {
    setUser((prev) => ({ ...(prev || {}), ...(updates || {}) }));
  };

  const submitPartnerApplication = async (payload) => {
    const submittedAt = new Date().toISOString();
    const merged = {
      ...(payload || {}),
      submittedAt,
      status: 'verification_pending',
      accessStatus: 'pending',
    };
    let syncError = null;
    try {
      const data = await submitPartnerApplicationApi(merged);
      const app = data.application || {};
      const { password: _p, confirmPassword: _c, otp: _o, ...safeMerged } = merged;
      setPartnerApplication({
        ...safeMerged,
        ...app,
        id: app.id,
        remoteId: app.id,
      });
    } catch (e) {
      syncError = e?.message || 'sync_failed';
      const { password: _p, confirmPassword: _c, otp: _o, ...safeMerged } = merged;
      setPartnerApplication({ ...safeMerged, syncError });
    }
    setRole('partner');
    return { syncError };
  };

  const updatePartnerStatus = (status) => {
    setPartnerApplication((prev) => {
      const previous = prev || {};
      const accessStatus = status === 'approved' ? 'active' : previous.accessStatus || 'pending';
      return {
        ...previous,
        status,
        accessStatus,
      };
    });
  };

  const value = useMemo(
    () => ({
      user,
      token,
      role,
      partnerApplication,
      loading,
      isAuthenticated: Boolean(token),
      login,
      loginPartner,
      signup,
      setRole,
      logout,
      updateUserProfile,
      submitPartnerApplication,
      updatePartnerStatus,
    }),
    [user, token, role, partnerApplication, loading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
