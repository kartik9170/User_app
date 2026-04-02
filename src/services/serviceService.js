import servicesData from '../data/servicesData';

const wait = () => new Promise((resolve) => setTimeout(resolve, 150));

const CATEGORY_ICONS = {
  facial: 'face-5',
  hair: 'content-cut',
  waxing: 'dry-cleaning',
  spa: 'hot-tub',
  packages: 'redeem',
  bridal: 'auto-awesome',
};

const slugify = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

function normalizeService(item, index) {
  const category = item.category || 'Service';
  const chapterSlug = item.chapterSlug || slugify(category);
  const images = Array.isArray(item.images) && item.images.length ? item.images : [item.image].filter(Boolean);
  return {
    ...item,
    chapterSlug,
    image: images[0] || item.image || '',
    images,
    showInQuickRituals: item.showInQuickRituals ?? index % 2 === 0,
    showInSeasonalHighlights: item.showInSeasonalHighlights ?? index % 3 === 0,
  };
}

const STATIC_SERVICES = servicesData.map(normalizeService);

const STATIC_CHAPTERS = Array.from(
  STATIC_SERVICES.reduce((acc, service) => {
    const slug = service.chapterSlug || slugify(service.category);
    if (!acc.has(slug)) {
      acc.set(slug, {
        slug,
        title: service.category || 'Service',
        iconKey: CATEGORY_ICONS[slug] || 'spa',
      });
    }
    return acc;
  }, new Map()).values()
);

export function assetUrl(path) {
  return path || '';
}

export async function fetchChapters() {
  await wait();
  return STATIC_CHAPTERS;
}

export async function fetchServices() {
  await wait();
  return STATIC_SERVICES;
}

export async function fetchServicesByChapterSlug(slug) {
  await wait();
  const normalized = slugify(slug);
  return STATIC_SERVICES.filter((service) => service.chapterSlug === normalized);
}

export async function fetchServiceById(id) {
  await wait();
  return STATIC_SERVICES.find((service) => String(service.id) === String(id)) || null;
}
