const wait = () => new Promise((resolve) => setTimeout(resolve, 300));
export const loginUser = async (payload) => { await wait(); return { token: 'demo-token', user: { id: 'user-1', name: payload.email?.split('@')[0] || 'User', email: payload.email } }; };
export const signupUser = async (payload) => { await wait(); return { token: 'demo-token', user: { id: `user_${Date.now()}`, name: payload.name, email: payload.email } }; };
