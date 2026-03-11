import { notFound } from 'next/navigation';
import { getPageData } from '@/lib/data';
import { renderSections } from '@/lib/renderSections';
import { SchemaMarkup } from '@/components/ui/SchemaMarkup';
import type { Metadata } from 'next';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.manyoniridge.co.za"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About",
      "item": "https://www.manyoniridge.co.za/about"
    }
  ]
};

// TODO: Remove this schema when the lodge opens (November 2026)
const openingEventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Manyoni Ridge Safari Lodge — Grand Opening",
  "description": "The grand opening of Manyoni Ridge, a boutique luxury Big 5 safari lodge in Manyoni Private Game Reserve, KwaZulu-Natal. 9 exclusive suites, all-inclusive luxury, expert guides, and unforgettable wildlife encounters.",
  "startDate": "2026-11-01",
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
    "url": "https://www.manyoniridge.co.za"
  },
  "url": "https://www.manyoniridge.co.za/contact",
  "offers": {
    "@type": "Offer",
    "url": "https://www.manyoniridge.co.za/rates",
    "availability": "https://schema.org/PreOrder",
    "validFrom": "2025-01-01"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('about');

  if (!page) {
    return {
      title: 'About Us | Manyoni Ridge Safari Lodge',
    };
  }

  return {
    title: page.meta.title,
    description: page.meta.description,
  };
}

export default async function AboutPage() {
  const page = await getPageData('about');

  if (!page) {
    notFound();
  }

  return (
    <>
      <SchemaMarkup data={breadcrumbSchema} />
      <SchemaMarkup data={openingEventSchema} />
      {renderSections(page.sections)}
    </>
  );
}
