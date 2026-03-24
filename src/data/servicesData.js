const servicesData = [
  {
    id: 'svc-1',
    name: 'Hydra Facial Ritual',
    category: 'Facial',
    price: 1499,
    duration: '60 mins',
    type: 'Premium Care',
    description:
      'Deep cleanse, hydration infusion, and glow finishing mask for brighter and softer skin.',
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1800&q=80',
    benefits: ['Silky Finish', 'Sensitive Skin Friendly', 'Lasts 2-3 Weeks'],
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 'svc-1b',
    name: 'Vitamin C Bright Facial',
    category: 'Facial',
    price: 1699,
    duration: '70 mins',
    type: 'Glow Boost',
    description:
      'Anti-dullness facial with vitamin C infusion, exfoliation and hydrating mask for radiant skin.',
    image:
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1800&q=80',
    benefits: ['Instant Glow', 'Even Tone', 'Hydration Lock'],
    rating: 4.7,
    reviews: 103,
  },
  {
    id: 'svc-2',
    name: 'Artisan Hair Styling',
    category: 'Hair',
    price: 1999,
    duration: '75 mins',
    type: 'Signature Finish',
    description:
      'Precision cut and styling with personalized consultation for face shape and lifestyle.',
    image:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=80',
    benefits: ['Custom Look', 'Expert Styling', 'Professional Finish'],
    rating: 4.7,
    reviews: 98,
  },
  {
    id: 'svc-2b',
    name: 'Keratin Smooth Therapy',
    category: 'Hair',
    price: 2599,
    duration: '95 mins',
    type: 'Frizz Control',
    description:
      'Intense smoothing ritual with keratin blend to reduce frizz, add shine, and improve manageability.',
    image:
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1800&q=80',
    benefits: ['Frizz Control', 'Smooth Texture', 'Long Lasting Shine'],
    rating: 4.8,
    reviews: 76,
  },
  {
    id: 'svc-3',
    name: 'Full Arms Waxing',
    category: 'Waxing',
    price: 899,
    duration: '40 mins',
    type: 'Smooth Care',
    description:
      'Gentle organic wax with pre-care cleansing and soothing post-care treatment.',
    image:
      'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=1800&q=80',
    benefits: ['Organic Wax', 'Less Irritation', 'Long Lasting'],
    rating: 4.8,
    reviews: 142,
  },
  {
    id: 'svc-3b',
    name: 'Full Legs Waxing',
    category: 'Waxing',
    price: 1299,
    duration: '55 mins',
    type: 'Silk Finish',
    description:
      'Complete leg waxing with pre and post-care ritual for smoother skin and reduced irritation.',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1800&q=80',
    benefits: ['Smooth Skin', 'Gentle Formula', 'Quick Recovery'],
    rating: 4.7,
    reviews: 88,
  },
  {
    id: 'svc-4',
    name: 'Aroma Spa Therapy',
    category: 'Spa',
    price: 2499,
    duration: '90 mins',
    type: 'Relaxation',
    description:
      'A calming full-body aroma therapy that releases muscle stress and improves circulation.',
    image:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1800&q=80',
    benefits: ['Stress Relief', 'Deep Relaxation', 'Body Recovery'],
    rating: 4.9,
    reviews: 87,
  },
  {
    id: 'svc-4b',
    name: 'Deep Tissue Relax Spa',
    category: 'Spa',
    price: 2899,
    duration: '100 mins',
    type: 'Body Recovery',
    description:
      'Targeted deep tissue pressure and essential oils to reduce stiffness and support muscle recovery.',
    image:
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1800&q=80',
    benefits: ['Muscle Relief', 'Better Sleep', 'Calm Mind'],
    rating: 4.9,
    reviews: 69,
  },
  {
    id: 'svc-5',
    name: 'Glow Combo Package',
    category: 'Packages',
    price: 3299,
    duration: '120 mins',
    type: 'Value Pack',
    description:
      'Facial + hair spa + hand care package for complete glow and pampering in one session.',
    image:
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1800&q=80',
    benefits: ['Best Value', 'Head to Toe Care', 'Festival Ready'],
    rating: 4.8,
    reviews: 63,
  },
  {
    id: 'svc-5b',
    name: 'Weekend Revival Package',
    category: 'Packages',
    price: 3799,
    duration: '140 mins',
    type: 'Head-to-Toe Care',
    description:
      'Curated package including cleanup, shoulder massage and express hair styling for complete refresh.',
    image:
      'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1800&q=80',
    benefits: ['Best Saver', 'Multi-Service', 'Weekend Ready'],
    rating: 4.8,
    reviews: 58,
  },
  {
    id: 'svc-6',
    name: 'Bridal Signature Studio',
    category: 'Bridal',
    price: 7999,
    duration: '180 mins',
    type: 'Luxury Bridal',
    description:
      'Complete bridal makeup and hair with skin prep and custom finish for your special day.',
    image:
      'https://images.unsplash.com/photo-1523263685509-57c1d050d19b?auto=format&fit=crop&w=1800&q=80',
    benefits: ['HD Finish', 'Long Wear', 'Custom Bridal Look'],
    rating: 4.9,
    reviews: 51,
  },
  {
    id: 'svc-6b',
    name: 'Engagement Luxe Look',
    category: 'Bridal',
    price: 6499,
    duration: '150 mins',
    type: 'Event Glam',
    description:
      'Complete engagement look with skin prep, airbrush base, premium eye styling and elegant hairstyle.',
    image:
      'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?auto=format&fit=crop&w=1800&q=80',
    benefits: ['HD Finish', 'Photo Ready', 'Long Stay Makeup'],
    rating: 4.8,
    reviews: 44,
  },
];
export default servicesData;
