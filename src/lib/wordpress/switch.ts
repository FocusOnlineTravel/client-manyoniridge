import { PageDefinition, Section } from '@/lib/types';
import { getLocalPageData, getLocalPageSlugs } from './local';
import { getWordPressPageDataRest, getWordPressPageSlugsRest } from './rest-client';

/**
 * Data source switch
 *
 * This module provides a unified interface for fetching page data,
 * automatically switching between local files and WordPress based on
 * environment configuration.
 *
 * Set NEXT_PUBLIC_USE_WORDPRESS=true to use WordPress as the data source.
 */

/**
 * Check if WordPress mode is enabled
 */
const USE_WORDPRESS = process.env.NEXT_PUBLIC_USE_WORDPRESS === 'true';

/**
 * Merge WordPress section with local fallback for missing media
 *
 * This ensures that when WordPress data is missing images/videos,
 * we fall back to the local data's images.
 */
function mergeSectionWithFallback(wpSection: Section, localSection?: Section): Section {
  if (!localSection || wpSection.type !== localSection.type) {
    return wpSection;
  }

  const wpProps = wpSection.props as Record<string, unknown>;
  const localProps = localSection.props as Record<string, unknown>;

  // Fields to fallback from local data if missing/empty in WordPress
  const fallbackFields = [
    // Media
    'imageSrc',
    'videoSrc',
    'posterSrc',
    'placeholderClass',
    'imagePlaceholder',
    // Content
    'title',
    'subtitle',
    'description',
    'content',
    'ctaText',
    'ctaHref',
    'secondaryCtaText',
    'secondaryCtaHref',
    // Data arrays
    'features',
    'stats',
    'values',
    'schedule',
    'items',
    'categories',
    'offers',
    'wildlife',
    'directions',
    'experiences',
    'options',
    // Headings
    'heading',
    'headingTitle',
    'headingSubtitle',
    // Slugs for dynamic sections
    'roomSlugs',
    'activitySlugs',
  ];

  // Fields to always prefer from local data (override WordPress)
  // roomSlugs/activitySlugs override because WP may use different slug naming
  // heading override because WP may have null headingTitle/headingSubtitle
  const overrideFields = ['size', 'showScrollIndicator', 'scrollToId', 'id', 'roomSlugs', 'activitySlugs', 'heading', 'features', 'variant', 'layout'];

  const mergedProps = { ...wpProps };

  for (const field of fallbackFields) {
    const wpValue = wpProps[field];
    const localValue = localProps[field];
    // Use local data if WordPress value is missing, empty string, or empty array
    const isEmpty = wpValue === undefined || wpValue === null || wpValue === '' ||
      (Array.isArray(wpValue) && wpValue.length === 0);
    if (isEmpty && localValue !== undefined) {
      mergedProps[field] = localValue;
    }
  }

  for (const field of overrideFields) {
    if (localProps[field] !== undefined) {
      mergedProps[field] = localProps[field];
    }
  }

  return {
    ...wpSection,
    props: mergedProps,
  } as Section;
}

/**
 * Merge WordPress page data with local fallbacks for missing media
 */
function mergePageWithFallbacks(
  wpPage: PageDefinition,
  localPage: PageDefinition | null
): PageDefinition {
  if (!localPage) {
    return wpPage;
  }

  const mergedSections = wpPage.sections.map((wpSection, index) => {
    // Try to find matching section in local data by type and index
    const localSection = localPage.sections.find(
      (local, localIndex) => local.type === wpSection.type && localIndex === index
    ) || localPage.sections.find((local) => local.type === wpSection.type);

    return mergeSectionWithFallback(wpSection, localSection);
  });

  return {
    ...wpPage,
    sections: mergedSections,
  };
}

/**
 * Get page data from the configured data source
 *
 * This is the main function used throughout the app to fetch page data.
 * It automatically uses either local files or WordPress based on the
 * NEXT_PUBLIC_USE_WORDPRESS environment variable.
 *
 * @param slug - The page slug (e.g., 'home', 'about')
 * @returns PageDefinition if found, null otherwise
 *
 * @example
 * ```tsx
 * // In a page component
 * export default async function AboutPage() {
 *   const page = await getPageData('about');
 *   if (!page) notFound();
 *   return <>{renderSections(page.sections)}</>;
 * }
 * ```
 */
export async function getPageData(slug: string): Promise<PageDefinition | null> {
  if (USE_WORDPRESS) {
    console.log(`[Data Source] Fetching '${slug}' from WordPress REST API`);
    const wpData = await getWordPressPageDataRest(slug);

    // Fallback to local data if WordPress fetch fails or returns no sections
    if (!wpData || wpData.sections.length === 0) {
      const localData = getLocalPageData(slug);
      if (localData) {
        console.log(`[Data Source] Using local data for '${slug}' (WordPress had no sections)`);
        return localData;
      }
      // If no local data either, return whatever WordPress gave us (might have meta)
      if (wpData) {
        console.log(`[Data Source] Using WordPress data for '${slug}' (no local fallback)`);
        return wpData;
      }
      console.warn(`[Data Source] No data found for '${slug}'`);
      return null;
    }

    // Get local data for fallback media (images/videos)
    const localData = getLocalPageData(slug);

    // Merge WordPress data with local fallbacks for missing media
    return mergePageWithFallbacks(wpData, localData);
  }

  console.log(`[Data Source] Using local data for '${slug}'`);
  return getLocalPageData(slug);
}

/**
 * Get all available page slugs from the configured data source
 *
 * @returns Array of page slugs
 */
export async function getAllPageSlugs(): Promise<string[]> {
  if (USE_WORDPRESS) {
    const wpSlugs = await getWordPressPageSlugsRest();

    // Fallback to local slugs if WordPress fetch fails
    if (wpSlugs.length === 0) {
      console.warn('[Data Source] WordPress slugs fetch failed, falling back to local data');
      return getLocalPageSlugs();
    }

    // Combine WordPress slugs with local slugs to ensure all pages are available
    const localSlugs = getLocalPageSlugs();
    const allSlugs = [...new Set([...wpSlugs, ...localSlugs])];
    return allSlugs;
  }

  return getLocalPageSlugs();
}

/**
 * Get the current data source name
 *
 * @returns 'wordpress' or 'local'
 */
export function getDataSource(): 'wordpress' | 'local' {
  return USE_WORDPRESS ? 'wordpress' : 'local';
}

/**
 * Check if WordPress mode is enabled
 *
 * @returns true if using WordPress, false if using local data
 */
export function isWordPressMode(): boolean {
  return USE_WORDPRESS;
}
