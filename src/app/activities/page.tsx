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
      "item": "https://www.manyoniridge.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Activities",
      "item": "https://www.manyoniridge.com/activities"
    }
  ]
};

const activitiesSchema = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "Manyoni Ridge Safari Lodge",
  "description": "A luxury Big 5 safari lodge offering intimate wildlife experiences in Manyoni Private Game Reserve, KwaZulu-Natal, South Africa. Home to rhino, elephant, lion, leopard, and buffalo across 23,000 hectares.",
  "url": "https://www.manyoniridge.com/activities",
  "touristType": ["Wildlife Enthusiasts", "Luxury Travellers", "Conservation Tourists"],
  "availableLanguage": ["English"],
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "KwaZulu-Natal",
    "addressCountry": "ZA"
  },
  "isAccessibleForFree": false,
  "hasMap": "https://www.manyoniridge.com/contact#directions"
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('activities');

  if (!page) {
    return {
      title: 'Safari Activities | Manyoni Ridge Safari Lodge',
    };
  }

  return {
    title: page.meta.title,
    description: page.meta.description,
  };
}

export default async function ActivitiesPage() {
  const page = await getPageData('activities');

  if (!page) {
    notFound();
  }

  return (
    <>
      <SchemaMarkup data={breadcrumbSchema} />
      <SchemaMarkup data={activitiesSchema} />
      {renderSections(page.sections)}
    </>
  );
}
