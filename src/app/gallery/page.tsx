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
      "name": "Gallery",
      "item": "https://www.manyoniridge.com/gallery"
    }
  ]
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('gallery');

  if (!page) {
    return {
      title: 'Gallery | Manyoni Ridge Safari Lodge',
      alternates: { canonical: '/gallery' },
    };
  }

  return buildMetadata(page.meta, '/gallery');
}

export default async function GalleryPage() {
  const page = await getPageData('gallery');

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
