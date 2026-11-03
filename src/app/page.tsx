import ReactDOM from 'react-dom';
import { notFound } from 'next/navigation';
import { getPageData } from '@/lib/data';
import { renderSections } from '@/lib/renderSections';
import { SchemaMarkup } from '@/components/ui/SchemaMarkup';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Manyoni Ridge Safari Lodge",
  "alternateName": "Manyoni Ridge",
  "description": "Boutique luxury safari lodge in Manyoni Private Game Reserve, KwaZulu-Natal. Offering Big 5 game drives, nine private villas (five one-bedroom, three two-bedroom and one honeymoon villa), all-inclusive luxury experiences, and conservation-focused activities. Opening April 2027.",
  "url": "https://www.manyoniridge.com",
  "telephone": "+27828920598",
  "email": "enquiries@manyoniridge.com",
  "logo": "https://www.manyoniridge.com/images/manyoni-ridge-logo-full-white.png",
  "image": "https://www.manyoniridge.com/images/manyoni-ridge-main.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Manyoni Private Game Reserve",
    "addressRegion": "KwaZulu-Natal",
    "addressCountry": "ZA"
  },
  // geo omitted until the lodge's surveyed GPS coordinates are confirmed:
  // the previous placeholder (-28.0, 31.5) put the lodge in the wrong place.
  "priceRange": "$$$",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Private Plunge Pool", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "All-Inclusive", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Game Drives", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Expert Guides & Trackers", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Conservation Activities", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Fine Dining", "value": true }
  ],
  "numberOfRooms": "9",
  // starRating omitted until the lodge is officially graded (it opens April 2027).
  "containedInPlace": {
    "@type": "Park",
    "name": "Manyoni Private Game Reserve"
  },
  "sameAs": [
    "https://www.facebook.com/manyoniridge",
    "https://www.instagram.com/manyoniridge"
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "validFrom": "2027-04-01",
    "opens": "00:00",
    "closes": "23:59",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ]
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.manyoniridge.com"
    }
  ]
};

// TODO: Remove this schema when the lodge opens (April 2027)
const openingEventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Manyoni Ridge Safari Lodge — Grand Opening",
  "description": "The grand opening of Manyoni Ridge, a boutique luxury Big 5 safari lodge in Manyoni Private Game Reserve, KwaZulu-Natal. nine private villas, all-inclusive luxury, expert guides, and unforgettable wildlife encounters.",
  "startDate": "2027-04-01",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Manyoni Private Game Reserve",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "KwaZulu-Natal",
      "addressCountry": "ZA"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "Manyoni Ridge",
    "url": "https://www.manyoniridge.com"
  },
  "url": "https://www.manyoniridge.com/contact",
  "offers": {
    "@type": "Offer",
    "url": "https://www.manyoniridge.com/rates",
    "availability": "https://schema.org/PreOrder",
    "validFrom": "2025-01-01"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('home');

  if (!page) {
    return {
      title: { absolute: 'Manyoni Ridge Safari Lodge' },
      alternates: { canonical: '/' },
    };
  }

  return buildMetadata(page.meta, '/', { isRoot: true });
}

export default async function HomePage() {
  const page = await getPageData('home');

  if (!page) {
    notFound();
  }

  ReactDOM.preload('/videos/manyoni-ridge-poster.webp', {
    as: 'image',
    fetchPriority: 'high',
  });

  return (
    <>
      <SchemaMarkup data={homeSchema} />
      <SchemaMarkup data={openingEventSchema} />
      <SchemaMarkup data={breadcrumbSchema} />
      {renderSections(page.sections)}
    </>
  );
}
