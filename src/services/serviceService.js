import { API_URL } from '../config/config';

export function assetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80';

function mapService(api) {
  const duration = `${api.durationMinutes || 60} mins`;
  const type = (api.variants && api.variants[0]) || api.chapterTitle || 'Service';
  const rawPaths =
    api.imagePaths && api.imagePaths.length
      ? api.imagePaths
      : api.imagePath
        ? [api.imagePath]
        : [];
  const images = rawPaths.map((p) => assetUrl(p)).filter(Boolean);
  const primary = images[0] || FALLBACK_IMAGE;
  return {
    id: api.id,
    name: api.name,
    category: api.chapterTitle || 'Service',
    chapterSlug: api.chapterSlug,
    price: api.price,
    duration,
    type,
    description: api.description || '',
    image: primary,
    images: images.length ? images : [primary],
    benefits: api.variants?.length ? api.variants : ['Professional care', 'Trained stylists'],
    rating: 4.8,
    reviews: 0,
    isMvp: api.isMvp,
    showInQuickRituals: !!api.showInQuickRituals,
    showInSeasonalHighlights: !!api.showInSeasonalHighlights,
  };
}

export async function fetchChapters() {
  const res = await fetch(`${API_URL}/api/services/chapters`);
  if (!res.ok) throw new Error('chapters_failed');
  const data = await res.json();
  return data.chapters || [];
}

export async function fetchServices() {
  const res = await fetch(`${API_URL}/api/services`);
  if (!res.ok) throw new Error('services_failed');
  const data = await res.json();
  return (data.services || []).map(mapService);
}

export async function fetchServicesByChapterSlug(slug) {
  const q = new URLSearchParams({ chapterSlug: slug });
  const res = await fetch(`${API_URL}/api/services?${q}`);
  if (!res.ok) throw new Error('services_failed');
  const data = await res.json();
  return (data.services || []).map(mapService);
}

export async function fetchServiceById(id) {
  const res = await fetch(`${API_URL}/api/services/${id}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.service ? mapService(data.service) : null;
}
