import { notFound } from 'next/navigation';
import { getPageData } from '@/lib/data';
import { renderSections } from '@/lib/renderSections';
import type { Metadata } from 'next';

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

  return <>{renderSections(page.sections)}</>;
}
