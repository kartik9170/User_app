export const formatCurrency = (amount) => `INR ${Number(amount || 0).toFixed(2)}`;
export const formatDateTime = (date, time) => (date && time ? `${date} at ${time}` : 'Not selected');
export const generateId = (prefix = 'id') => `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
