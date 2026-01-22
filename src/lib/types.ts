export interface NavLink {
  href: string;
  label: string;
}

export interface Room {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  capacity: {
    adults: number;
    children: number;
  };
  size: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  features: string[];
  images: string[];
  placeholderClass: string;
}

export interface Activity {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  duration: string;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging';
  minAge?: number;
  includes: string[];
  highlights: string[];
  images: string[];
  icon: string;
  placeholderClass: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  items: FAQItem[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: 'wildlife' | 'lodge' | 'suites' | 'activities' | 'landscape';
  placeholderClass: string;
}

export interface Offer {
  slug: string;
  title: string;
  description: string;
  validFrom?: string;
  validTo?: string;
  discountPercent?: number;
  highlights: string[];
  terms: string[];
  placeholderClass: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  placeholderClass: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  arrivalDate?: string;
  departureDate?: string;
  guests?: number;
}

export interface NewsletterFormData {
  firstName: string;
  lastName: string;
  email: string;
  consent: boolean;
}

export interface EnquiryFormData {
  name: string;
  email: string;
  phone?: string;
  arrivalDate: string;
  departureDate: string;
  adults: number;
  children: number;
  roomPreference?: string;
  specialRequests?: string;
}
