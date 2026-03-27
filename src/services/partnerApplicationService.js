import { API_URL } from '../config/config';

export async function submitPartnerApplicationApi(payload) {
  const res = await fetch(`${API_URL}/api/partner-applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}
