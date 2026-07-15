import type { Metadata } from 'next';
import type { PageMeta } from '@/lib/types';
import { SITE_CONFIG } from '@/lib/constants';

/**
 * Build Next.js Metadata from a PageMeta (Yoast-sourced when available).
 *
 * OG/Twitter description cascade: Yoast field → meta.description → undefined.
 * Canonical cascade: Yoast canonical → passed canonicalPath → `/${slug}`.
 * Site-wide OG fields (type, locale, siteName, default image) are always included
 * because Next.js replaces the entire `openGraph` object at each segment.
 */
export function buildMetadata(meta: PageMeta, canonicalPath?: string): Metadata {
  const canonical = meta.canonical || canonicalPath || `/${meta.slug}`;

  const ogTitle = meta.ogTitle || meta.title;
  const ogDescription = meta.ogDescription || meta.description || undefined;
  const twitterTitle = meta.twitterTitle || meta.ogTitle || meta.title;
  const twitterDescription =
    meta.twitterDescription || meta.ogDescription || meta.description || undefined;

  const ogImage = meta.ogImage || '/images/og-clubhouse-render.jpg';
  const twitterImage = meta.twitterImage || ogImage;

  return {
    title: meta.title,
    description: meta.description || undefined,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      locale: 'en_ZA',
      siteName: SITE_CONFIG.name,
      url: canonical,
      title: ogTitle,
      description: ogDescription,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description: twitterDescription,
      images: [twitterImage],
    },
  };
}

/**
 * Build Metadata for a static (non-WordPress) page from inline strings.
 * Same shape as `buildMetadata` but takes plain fields.
 */
export function buildStaticMetadata(input: {
  title: string;
  description?: string;
  slug: string;
  canonicalPath?: string;
}): Metadata {
  return buildMetadata(
    {
      title: input.title,
      slug: input.slug,
      description: input.description || '',
    },
    input.canonicalPath ?? `/${input.slug}`
  );
}
