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
      "name": "Dining",
      "item": "https://www.manyoniridge.co.za/dining"
    }
  ]
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('dining');

  if (!page) {
    return {
      title: 'Dining | Manyoni Ridge Safari Lodge',
    };
  }

  return {
    title: page.meta.title,
    description: page.meta.description,
  };
}

export default async function DiningPage() {
  const page = await getPageData('dining');

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
