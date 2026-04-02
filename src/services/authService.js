const wait = () => new Promise((resolve) => setTimeout(resolve, 250));
const DEMO_OTP_CODES = new Set(['1234', '123456']);

function normalizeMobile(value) {
  return String(value || '').replace(/\D/g, '').slice(0, 10);
}

function buildUser({ mobile, name, email }) {
  const cleanMobile = normalizeMobile(mobile);
  return {
    id: `user_${cleanMobile || Date.now()}`,
    name: name || 'Atelier Member',
    email: email || '',
    mobile: cleanMobile,
    role: 'customer',
    status: 'active',
  };
}

export const sendLoginOtp = async (mobile) => {
  const cleanMobile = normalizeMobile(mobile);
  if (cleanMobile.length !== 10) {
    throw new Error('Please enter a valid 10-digit mobile number.');
  }
  await wait();
  return { success: true, message: 'Demo OTP sent. Use 1234.', otpHint: '1234' };
};

export const resendLoginOtp = async (mobile) => {
  const cleanMobile = normalizeMobile(mobile);
  if (cleanMobile.length !== 10) {
    throw new Error('Please enter a valid 10-digit mobile number.');
  }
  await wait();
  return { success: true, message: 'Demo OTP resent. Use 1234.', otpHint: '1234' };
};

export const loginUserWithOtp = async (payload) => {
  const mobile = normalizeMobile(payload?.mobile);
  const otp = String(payload?.otp || '').trim();
  if (!mobile || !otp) throw new Error('Mobile and OTP are required.');
  if (!DEMO_OTP_CODES.has(otp)) throw new Error('Invalid OTP. Use demo OTP 1234.');
  await wait();
  return {
    token: `user-token-${mobile}`,
    user: buildUser({ mobile }),
  };
};

export const loginUser = async (payload) => {
  const mobile = normalizeMobile(payload?.mobile);
  const password = String(payload?.password || '');
  if (!mobile || !password) throw new Error('Mobile and password are required.');
  await wait();
  return {
    token: `user-token-${mobile}`,
    user: buildUser({ mobile }),
  };
};

export const signupUser = async (payload) => {
  await wait();
  return {
    token: `user-token-${Date.now()}`,
    user: buildUser({
      mobile: payload?.mobile,
      name: payload?.name,
      email: payload?.email,
    }),
  };
};
