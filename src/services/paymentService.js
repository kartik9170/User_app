const wait = () => new Promise((resolve) => setTimeout(resolve, 300));
export const processPayment = async (payload) => { await wait(); return { success: true, transactionId: `txn_${Date.now()}`, ...payload }; };
