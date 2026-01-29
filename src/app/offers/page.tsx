import { notFound } from 'next/navigation';
import { getPageData } from '@/lib/data';
import { renderSections } from '@/lib/renderSections';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('offers');

  if (!page) {
    return {
      title: 'Special Offers | Manyoni Ridge Safari Lodge',
    };
  }

  return {
    title: page.meta.title,
    description: page.meta.description,
  };
}

export default async function OffersPage() {
  const page = await getPageData('offers');

  if (!page) {
    notFound();
  }

  return <>{renderSections(page.sections)}</>;
}
