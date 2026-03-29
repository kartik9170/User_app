import { API_URL } from '../config/config';

/**
 * Persists a customer payment so the admin Payments page can list it.
 * Fails silently (logged) so demo checkout still works if API is offline.
 */
export async function recordCustomerPayment(payload) {
  const res = await fetch(`${API_URL}/api/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'payment_record_failed');
  }
  return res.json();
}
