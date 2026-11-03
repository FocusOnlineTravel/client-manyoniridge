import type { Metadata } from 'next';
import type { PageMeta } from '@/lib/types';
import { SITE_CONFIG } from '@/lib/constants';

const BRAND_SUFFIX = new RegExp(
  `(\\s*[|\\-–—]\\s*${SITE_CONFIG.name}(\\s+Safari\\s+Lodge)?)+\\s*$`,
  'i'
);

/**
 * Normalise a page title so the brand appears exactly once.
 *
 * The root layout's title template appends "| Manyoni Ridge", so titles coming
 * from Yoast (which already end in the brand) would otherwise render as
 * "FAQ | Manyoni Ridge | Manyoni Ridge". Trailing brand segments are stripped;
 * if the brand still appears (e.g. the homepage "Manyoni Ridge | ..."), the
 * title is returned as absolute so the template is skipped.
 */
export function pageTitle(title: string): NonNullable<Metadata['title']> {
  const stripped = title.replace(BRAND_SUFFIX, '').trim() || title;
  return stripped.toLowerCase().includes(SITE_CONFIG.name.toLowerCase())
    ? { absolute: stripped }
    : stripped;
}

/**
 * Build Next.js Metadata from a PageMeta (Yoast-sourced when available).
 *
 * OG/Twitter description cascade: Yoast field → meta.description → undefined.
 * Canonical cascade: Yoast canonical → passed canonicalPath → `/${slug}`.
 * Site-wide OG fields (type, locale, siteName, default image) are always included
 * because Next.js replaces the entire `openGraph` object at each segment.
 */
export function buildMetadata(
  meta: PageMeta,
  canonicalPath?: string,
  options: { isRoot?: boolean } = {}
): Metadata {
  const canonical = meta.canonical || canonicalPath || `/${meta.slug}`;

  const ogTitle = meta.ogTitle || meta.title;
  const ogDescription = meta.ogDescription || meta.description || undefined;
  const twitterTitle = meta.twitterTitle || meta.ogTitle || meta.title;
  const twitterDescription =
    meta.twitterDescription || meta.ogDescription || meta.description || undefined;

  const ogImage = meta.ogImage || '/images/og-clubhouse-render.jpg';
  const twitterImage = meta.twitterImage || ogImage;

  // The layout's title template doesn't apply to the root page (same segment),
  // so the homepage appends the brand itself.
  const title = pageTitle(meta.title);
  const resolvedTitle =
    options.isRoot && typeof title === 'string'
      ? { absolute: `${title} | ${SITE_CONFIG.name}` }
      : title;

  return {
    title: resolvedTitle,
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
