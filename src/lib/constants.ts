export const SITE_CONFIG = {
  name: 'Manyoni Ridge',
  tagline: 'Intimate Luxury in the Wild',
  description: 'Experience intimate luxury at Manyoni Ridge Safari Lodge. Boutique accommodation in the heart of Manyoni Private Game Reserve, KwaZulu-Natal. Opening September 2026.',
  opening: 'September 2026',
  url: 'https://www.manyoniridge.co.za',
} as const;

export const CONTACT = {
  phone: '+27 (0)82 892 0598',
  phoneLink: 'tel:+27828920598',
  email: 'enquiries@manyoniridge.co.za',
  emailLink: 'mailto:enquiries@manyoniridge.co.za',
  location: 'Manyoni Private Game Reserve, North-Eastern KwaZulu-Natal, South Africa',
} as const;

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/manyoniridge',
  facebook: 'https://facebook.com/manyoniridge',
  tripadvisor: 'https://tripadvisor.com/manyoniridge',
} as const;

export const NAV_LINKS = [
  { href: '/accommodations', label: 'Accommodation' },
  { href: '/activities', label: 'Experiences' },
  { href: '/main-lodge', label: 'Facilities' },
  { href: '/reserve', label: 'Reserve' },
] as const;

export const MOBILE_NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/accommodations', label: 'Accommodation' },
  { href: '/activities', label: 'Experiences' },
  { href: '/main-lodge', label: 'Facilities' },
  { href: '/reserve', label: 'Reserve' },
  { href: '/dining', label: 'Dining' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export const FOOTER_LINKS = {
  experience: [
    { href: '/accommodations', label: 'Accommodations' },
    { href: '/main-lodge', label: 'Main Lodge' },
    { href: '/activities', label: 'Activities' },
    { href: '/dining', label: 'Dining' },
    { href: '/reserve', label: 'The Reserve' },
  ],
  discover: [
    { href: '/about', label: 'About Us' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/offers', label: 'Special Offers' },
    { href: '/faq', label: 'FAQ' },
  ],
  plan: [
    { href: '/contact', label: 'Contact Us' },
    { href: '/contact#rates', label: 'Rates & Packages' },
    { href: '/contact#bookings', label: 'Bookings' },
    { href: '/contact#directions', label: 'Getting Here' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
  ],
} as const;
