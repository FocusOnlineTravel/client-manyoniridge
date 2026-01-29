/**
 * Central export for all page definitions
 *
 * This file exports all page content definitions for easy importing
 * throughout the application.
 */

export { homePage } from './home';
export { aboutPage } from './about';
export { accommodationsPage } from './accommodations';
export { activitiesPage } from './activities';
export { contactPage } from './contact';
export { diningPage } from './dining';
export { galleryPage } from './gallery';
export { reservePage } from './reserve';
export { offersPage } from './offers';
export { faqPage } from './faq';
export { mainLodgePage } from './main-lodge';

import { PageDefinition } from '@/lib/types';
import { homePage } from './home';
import { aboutPage } from './about';
import { accommodationsPage } from './accommodations';
import { activitiesPage } from './activities';
import { contactPage } from './contact';
import { diningPage } from './dining';
import { galleryPage } from './gallery';
import { reservePage } from './reserve';
import { offersPage } from './offers';
import { faqPage } from './faq';
import { mainLodgePage } from './main-lodge';

/**
 * Map of all pages by slug
 */
export const pagesBySlug: Record<string, PageDefinition> = {
  home: homePage,
  about: aboutPage,
  accommodations: accommodationsPage,
  activities: activitiesPage,
  contact: contactPage,
  dining: diningPage,
  gallery: galleryPage,
  reserve: reservePage,
  offers: offersPage,
  faq: faqPage,
  'main-lodge': mainLodgePage,
};

/**
 * Get a page by its slug
 */
export function getPageBySlug(slug: string): PageDefinition | null {
  return pagesBySlug[slug] || null;
}

/**
 * Get all page slugs
 */
export function getAllPageSlugs(): string[] {
  return Object.keys(pagesBySlug);
}
