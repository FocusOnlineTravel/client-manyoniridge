import { notFound } from 'next/navigation';
import { getPageData } from '@/lib/data';
import { renderSections } from '@/lib/renderSections';
import { SchemaMarkup } from '@/components/ui/SchemaMarkup';
import { buildMetadata } from '@/lib/metadata';
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
      "name": "Offers",
      "item": "https://www.manyoniridge.com/offers"
    }
  ]
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('offers');

  if (!page) {
    return {
      title: 'Special Offers | Manyoni Ridge Safari Lodge',
      alternates: { canonical: '/offers' },
    };
  }

  return buildMetadata(page.meta, '/offers');
}

export default async function OffersPage() {
  const page = await getPageData('offers');

  if (!page) {
    notFound();
  }

  return (
    <>
      <SchemaMarkup data={breadcrumbSchema} />
      {renderSections(page.sections)}
    </>
  );
}
