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
      "name": "The Reserve",
      "item": "https://www.manyoniridge.com/reserve"
    }
  ]
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('reserve');

  if (!page) {
    return {
      title: 'The Reserve | Manyoni Ridge Safari Lodge',
      alternates: { canonical: '/reserve' },
    };
  }

  return buildMetadata(page.meta, '/reserve');
}

export default async function ReservePage() {
  const page = await getPageData('reserve');

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
