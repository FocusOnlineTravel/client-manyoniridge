import { notFound } from 'next/navigation';
import { getPageData, getAllPageSlugs } from '@/lib/data';
import { renderSections } from '@/lib/renderSections';
import type { Metadata } from 'next';

/**
 * Catch-all route for dynamic pages
 *
 * This route handles ANY page that doesn't have a specific route defined.
 * It fetches page data from the configured data source (local or WordPress)
 * and renders it using the section system.
 *
 * This enables creating new pages in WordPress that automatically appear
 * on the site without code changes!
 */

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

/**
 * Generate static params for all known pages
 *
 * This enables static generation for all pages at build time.
 * New WordPress pages will be generated on-demand via ISR.
 */
export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();

  // Exclude pages that have explicit routes (they're handled separately)
  const explicitRoutes = [
    'home', // handled by app/page.tsx
    'accommodations',
    'activities',
    'about',
    'contact',
    'dining',
    'gallery',
    'reserve',
    'offers',
    'faq',
  ];

  return slugs
    .filter((slug) => !explicitRoutes.includes(slug))
    .map((slug) => ({
      slug: slug.split('/'), // Convert "foo/bar" to ["foo", "bar"]
    }));
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: slugArray } = await params;
  const slug = slugArray.join('/');
  const page = await getPageData(slug);

  if (!page) {
    return {
      title: 'Page Not Found | Manyoni Ridge Safari Lodge',
    };
  }

  return {
    title: page.meta.title,
    description: page.meta.description,
  };
}

/**
 * Page component
 *
 * This is a server component that fetches page data and renders sections.
 */
export default async function DynamicPage({ params }: PageProps) {
  const { slug: slugArray } = await params;
  const slug = slugArray.join('/');

  // Fetch page data from configured source (local or WordPress)
  const page = await getPageData(slug);

  if (!page) {
    notFound();
  }

  // Render the page sections
  return <>{renderSections(page.sections)}</>;
}

/**
 * Enable ISR (Incremental Static Regeneration)
 *
 * Pages will be regenerated every 60 seconds if there are requests.
 * This ensures WordPress content updates appear quickly without full rebuilds.
 */
export const revalidate = 60;
