import { Service, PricingTier } from '../models/service.model';

export const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Luxury Skincare',
    description: 'Premium facial treatments with organic products and advanced techniques',
    icon: 'sparkles',
    price: 150,
    duration: 60,
  },
  {
    id: '2',
    name: 'Hair Styling',
    description: 'Expert hair cutting, coloring, and styling for all hair types',
    icon: 'scissors',
    price: 120,
    duration: 90,
  },
  {
    id: '3',
    name: 'Makeup Services',
    description: 'Professional makeup application for events and everyday looks',
    icon: 'palette',
    price: 100,
    duration: 45,
  },
  {
    id: '4',
    name: 'Spa Experiences',
    description: 'Relaxing spa treatments including massages and body treatments',
    icon: 'droplet',
    price: 180,
    duration: 90,
  },
  {
    id: '5',
    name: 'Lashes & Extensions',
    description: 'Eyelash extensions, lifts, and tints for stunning eyes',
    icon: 'eye',
    price: 80,
    duration: 60,
  },
  {
    id: '6',
    name: 'Nails & Manicure',
    description: 'Gel nails, manicures, pedicures with premium finishes',
    icon: 'hand',
    price: 70,
    duration: 45,
  },
  {
    id: '7',
    name: 'Facial Treatments',
    description: 'Specialized facials targeting specific skin concerns',
    icon: 'star',
    price: 140,
    duration: 60,
  },
  {
    id: '8',
    name: 'Wellness Consultations',
    description: 'Personalized beauty and wellness consultations',
    icon: 'heart',
    price: 60,
    duration: 30,
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: '1',
    name: 'Essential',
    description: 'Perfect for getting started with our services',
    price: 99,
    features: [
      'One service per month',
      'Basic skincare consultation',
      'Access to our facilities',
      'Email support',
    ],
    icon: 'star',
  },
  {
    id: '2',
    name: 'Premium',
    description: 'Our most popular choice for regular clients',
    price: 249,
    features: [
      'Four services per month',
      'Priority booking',
      'Personalized beauty plan',
      'Phone & email support',
      '10% discount on additional services',
    ],
    isPopular: true,
    icon: 'crown',
  },
  {
    id: '3',
    name: 'Luxury',
    description: 'Complete luxury experience',
    price: 499,
    features: [
      'Unlimited services',
      'VIP priority booking',
      'Dedicated beauty consultant',
      '24/7 concierge support',
      'Complimentary products',
      'Exclusive events access',
    ],
    icon: 'gem',
  },
  {
    id: '4',
    name: 'VIP',
    description: 'Ultimate exclusive experience',
    price: 999,
    features: [
      'Everything in Luxury',
      'Private treatment rooms',
      'Personal stylist',
      'Customized wellness program',
      'Complimentary luxury products',
      'Priority access to new services',
      'Quarterly spa retreats',
    ],
    icon: 'sparkles',
  },
];

export const NAVIGATION_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#booking' },
];

export const SOCIAL_LINKS = [
  { icon: 'facebook', url: 'https://facebook.com', label: 'Facebook' },
  { icon: 'instagram', url: 'https://instagram.com', label: 'Instagram' },
  { icon: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
  { icon: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
];

export const GALLERY_IMAGES = [
  { id: '1', title: 'Luxury Skincare',  category: 'Skincare', image: '/assets/images/gallery/gallery-skincare.png', alt: 'Luxury skincare facial treatment with premium serums and glowing skin' },
  { id: '2', title: 'Hair Styling',     category: 'Hair',     image: '/assets/images/gallery/gallery-hair.png',     alt: 'Professional hair styling and blow dry in upscale Luxelle salon' },
  { id: '3', title: 'Makeup Artistry',  category: 'Makeup',   image: '/assets/images/gallery/gallery-makeup.png',   alt: 'Professional full-glam makeup application by Luxelle makeup artist' },
  { id: '4', title: 'Spa Treatment',    category: 'Spa',      image: '/assets/images/gallery/gallery-spa.png',      alt: 'Relaxing hot stone massage spa treatment with candles and white towels' },
  { id: '5', title: 'Lash Extensions',  category: 'Lashes',   image: '/assets/images/gallery/gallery-lashes.png',   alt: 'Professional eyelash extension treatment for fluttery long lashes' },
  { id: '6', title: 'Nail Art',         category: 'Nails',    image: '/assets/images/gallery/gallery-nails.png',    alt: 'Luxury nail art and rose gold gel manicure at Luxelle beauty salon' },
  { id: '7', title: 'Facial Treatment', category: 'Facial',   image: '/assets/images/gallery/gallery-facial.png',   alt: 'Specialized LED facial treatment and advanced skincare ritual' },
  { id: '8', title: 'Wellness Session', category: 'Wellness', image: '/assets/images/gallery/gallery-wellness.png', alt: 'Personalized beauty and wellness consultation at Luxelle center' },
];

export const THEME_STORAGE_KEY = 'luxelle-theme';
export const DEFAULT_THEME = 'dark';
