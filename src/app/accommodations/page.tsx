import { notFound } from 'next/navigation';
import { getPageData } from '@/lib/data';
import { renderSections } from '@/lib/renderSections';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('accommodations');

  if (!page) {
    return {
      title: 'Accommodations | Manyoni Ridge Safari Lodge',
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

  return <>{renderSections(page.sections)}</>;
}
