import { API_URL } from '../config/config';

export const sendLoginOtp = async (mobile) => {
  const res = await fetch(`${API_URL}/api/users/otp/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Could not send OTP (${res.status})`);
  return data;
};

export const resendLoginOtp = async (mobile) => {
  const res = await fetch(`${API_URL}/api/users/otp/resend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Could not resend OTP (${res.status})`);
  return data;
};

export const loginUserWithOtp = async (payload) => {
  const mobile = payload?.mobile;
  const otp = payload?.otp;
  if (!mobile || !otp) {
    throw new Error('Mobile and OTP are required.');
  }
  const res = await fetch(`${API_URL}/api/users/otp/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile, otp }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `OTP login failed (${res.status})`);
  return { token: data.token, user: data.user };
};

/** Customer sign-in: mobile + password (saved at registration). */
export const loginUser = async (payload) => {
  const mobile = payload?.mobile;
  const password = payload?.password;
  if (!mobile || !password) {
    throw new Error('Mobile and password are required.');
  }
  const res = await fetch(`${API_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Sign in failed (${res.status})`);
  return { token: data.token, user: data.user };
};

export const signupUser = async (payload) => {
  const res = await fetch(`${API_URL}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      mobile: payload.mobile || '',
      password: payload.password,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Signup failed (${res.status})`);
  return { token: data.token, user: data.user };
};
