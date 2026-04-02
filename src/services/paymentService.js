const memoryPayments = [];

export async function recordCustomerPayment(payload) {
  const payment = {
    id: `pay_${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...payload,
  };
  memoryPayments.push(payment);
  return { ok: true, payment };
}
