import { PageDefinition } from '@/lib/types';
import { pagesBySlug } from '@/lib/data/pages';

/**
 * Local data provider
 *
 * This module provides page data from local TypeScript files.
 * It serves as the default data source when WordPress integration is disabled.
 */

/**
 * Get page data from local files by slug
 *
 * @param slug - The page slug (e.g., 'home', 'about', 'accommodations')
 * @returns PageDefinition if found, null otherwise
 */
export function getLocalPageData(slug: string): PageDefinition | null {
  return pagesBySlug[slug] || null;
}

/**
 * Get all available page slugs from local data
 *
 * @returns Array of page slugs
 */
export function getLocalPageSlugs(): string[] {
  return Object.keys(pagesBySlug);
}

/**
 * Check if a page exists in local data
 *
 * @param slug - The page slug to check
 * @returns true if page exists, false otherwise
 */
export function localPageExists(slug: string): boolean {
  return slug in pagesBySlug;
}
