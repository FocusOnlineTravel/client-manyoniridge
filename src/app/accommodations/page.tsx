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
      "name": "Accommodations",
      "item": "https://www.manyoniridge.co.za/accommodations"
    }
  ]
};

const accommodationsSchema = {
  "@context": "https://schema.org",
  "@type": "Suite",
  "name": "Manyoni Ridge Luxury Suite",
  "description": "Exclusive luxury suite at Manyoni Ridge Safari Lodge, featuring a private plunge pool overlooking Manyoni Private Game Reserve. All-inclusive accommodation with expert guided Big 5 game drives.",
  "url": "https://www.manyoniridge.co.za/accommodations",
  "containedInPlace": {
    "@type": "LodgingBusiness",
    "name": "Manyoni Ridge Safari Lodge",
    "url": "https://www.manyoniridge.co.za"
  },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Private Plunge Pool", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Bush Views", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "All-Inclusive", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Air Conditioning", "value": true }
  ],
  "occupancy": {
    "@type": "QuantitativeValue",
    "maxValue": 2
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('accommodations');

  if (!page) {
    return {
      title: 'Accommodation | Manyoni Ridge Safari Lodge',
    };
  }

  return {
    title: page.meta.title,
    description: page.meta.description,
  };
}

export default async function AccommodationsPage() {
  const page = await getPageData('accommodations');

  if (!page) {
    notFound();
  }

  return (
    <>
      <SchemaMarkup data={breadcrumbSchema} />
      <SchemaMarkup data={accommodationsSchema} />
      {renderSections(page.sections)}
    </>
  );
}
