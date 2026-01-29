import { PageDefinition } from '@/lib/types';
import { getLocalPageData, getLocalPageSlugs } from './local';
import { getWordPressPageData, getWordPressSlugs } from './client';

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
    console.log(`[Data Source] Fetching '${slug}' from WordPress`);
    const wpData = await getWordPressPageData(slug);

    // Fallback to local data if WordPress fetch fails
    if (!wpData) {
      console.warn(
        `[Data Source] WordPress fetch failed for '${slug}', falling back to local data`
      );
      return getLocalPageData(slug);
    }

    return wpData;
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
    const wpSlugs = await getWordPressSlugs();

    // Fallback to local slugs if WordPress fetch fails
    if (wpSlugs.length === 0) {
      console.warn('[Data Source] WordPress slugs fetch failed, falling back to local data');
      return getLocalPageSlugs();
    }

    return wpSlugs;
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
