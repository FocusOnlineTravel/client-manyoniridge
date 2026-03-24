import { Activity } from '@/lib/types';
import { activities as localActivities, getActivityBySlug as getLocalActivityBySlug } from '@/data/activities';

/**
 * WordPress Activities Client
 *
 * Fetches activity data from WordPress REST API with fallback to local data.
 */

const WP_API_URL =
  process.env.NEXT_PUBLIC_WP_API_URL ||
  'https://backend-manyoni.focusonlinetravel.co.za/wp-json/wp/v2';

const ACTIVITIES_PAGE_ID = 337; // Parent page ID for activity child pages

const USE_WORDPRESS = process.env.NEXT_PUBLIC_USE_WORDPRESS === 'true';

interface WPActivityPage {
  id: number;
  slug: string;
  title: { rendered: string };
  parent: number;
  acf?: {
    subtitle?: string;
    short_description?: string;
    description?: string;
    duration?: string;
    difficulty?: 'Easy' | 'Moderate' | 'Challenging';
    min_age?: string | number;
    icon?: string;
    placeholder_class?: string;
    includes?: Array<{ item: string }>;
    highlights?: Array<{ item: string }>;
    hero_image?: { url?: string; sizes?: Record<string, string> } | string | number;
    hero_image_align?: 'top' | 'center' | 'bottom';
    cta_image?: { url?: string; sizes?: Record<string, string> } | string | number;
    gallery_images?: Array<{ url?: string; sizes?: Record<string, string> } | string | number> | false;
  };
}

/**
 * Get image URL from ACF image field (can be ID, URL, or object)
 */
function getImageUrl(image: unknown): string | undefined {
  if (!image) return undefined;
  if (typeof image === 'string') return image;
  if (typeof image === 'object' && image !== null) {
    const img = image as Record<string, unknown>;
    if (img.url) return img.url as string;
    if (img.sizes && typeof img.sizes === 'object') {
      const sizes = img.sizes as Record<string, string>;
      return sizes.large || sizes.medium_large || sizes.full;
    }
  }
  return undefined;
}

/**
 * Transform WordPress activity data to Activity type
 */
function transformWordPressActivity(wpActivity: WPActivityPage): Activity {
  const acf = wpActivity.acf || {};

  // Handle gallery images array
  let images: string[] = [];
  if (acf.gallery_images && Array.isArray(acf.gallery_images)) {
    images = acf.gallery_images.map(getImageUrl).filter((url): url is string => !!url);
  }

  // Handle includes repeater
  const includes: string[] = Array.isArray(acf.includes)
    ? acf.includes.map((i) => i.item).filter(Boolean)
    : [];

  // Handle highlights repeater
  const highlights: string[] = Array.isArray(acf.highlights)
    ? acf.highlights.map((h) => h.item).filter(Boolean)
    : [];

  return {
    slug: wpActivity.slug,
    title: wpActivity.title?.rendered || '',
    subtitle: acf.subtitle || '',
    description: acf.description || '',
    shortDescription: acf.short_description || '',
    duration: acf.duration || '',
    difficulty: acf.difficulty,
    minAge: acf.min_age ? Number(acf.min_age) : undefined,
    icon: acf.icon || 'Star',
    placeholderClass: acf.placeholder_class || 'placeholder-nature',
    includes,
    highlights,
    images,
    heroImage: getImageUrl(acf.hero_image),
    heroImageAlign: acf.hero_image_align,
    ctaImage: getImageUrl(acf.cta_image),
  };
}

/**
 * Merge WordPress activity with local activity data for missing fields
 */
function mergeActivityWithLocal(wpActivity: Activity, localActivity?: Activity): Activity {
  if (!localActivity) return wpActivity;

  return {
    ...wpActivity,
    // Use local data for missing fields
    subtitle: wpActivity.subtitle || localActivity.subtitle,
    description: wpActivity.description || localActivity.description,
    shortDescription: wpActivity.shortDescription || localActivity.shortDescription,
    duration: wpActivity.duration || localActivity.duration,
    difficulty: wpActivity.difficulty || localActivity.difficulty,
    minAge: wpActivity.minAge ?? localActivity.minAge,
    icon: wpActivity.icon || localActivity.icon,
    includes: wpActivity.includes.length > 0 ? wpActivity.includes : localActivity.includes,
    highlights: wpActivity.highlights.length > 0 ? wpActivity.highlights : localActivity.highlights,
    images: wpActivity.images.length > 0 ? wpActivity.images : localActivity.images,
    heroImage: wpActivity.heroImage || localActivity.heroImage,
    heroImageAlign: wpActivity.heroImageAlign || localActivity.heroImageAlign,
    ctaImage: wpActivity.ctaImage || localActivity.ctaImage,
    placeholderClass: localActivity.placeholderClass,
  };
}

/**
 * Get all activities from WordPress or local data
 */
export async function getAllActivities(): Promise<Activity[]> {
  if (!USE_WORDPRESS) {
    return localActivities;
  }

  try {
    // Fetch child pages of activities (parent ID 337)
    const response = await fetch(
      `${WP_API_URL}/pages?parent=${ACTIVITIES_PAGE_ID}&per_page=50&_fields=id,slug,title,parent,acf`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      console.warn('[Activities] Failed to fetch from WordPress, using local data');
      return localActivities;
    }

    const pages: WPActivityPage[] = await response.json();

    if (!pages || pages.length === 0) {
      console.warn('[Activities] No activity pages found in WordPress, using local data');
      return localActivities;
    }

    // Transform and merge with local data
    return pages.map((wpActivity) => {
      const transformed = transformWordPressActivity(wpActivity);
      const localActivity = localActivities.find((a) => a.slug === wpActivity.slug);
      return mergeActivityWithLocal(transformed, localActivity);
    });
  } catch (error) {
    console.error('[Activities] Error fetching from WordPress:', error);
    return localActivities;
  }
}

/**
 * Get a single activity by slug from WordPress or local data
 */
export async function getActivityBySlug(slug: string): Promise<Activity | undefined> {
  if (!USE_WORDPRESS) {
    return getLocalActivityBySlug(slug);
  }

  try {
    const response = await fetch(
      `${WP_API_URL}/pages?slug=${slug}&parent=${ACTIVITIES_PAGE_ID}&_fields=id,slug,title,parent,acf`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      console.warn(`[Activities] Failed to fetch activity '${slug}' from WordPress, checking local data`);
      return getLocalActivityBySlug(slug);
    }

    const pages: WPActivityPage[] = await response.json();

    if (!pages || pages.length === 0) {
      console.warn(`[Activities] Activity page '${slug}' not found in WordPress, checking local data`);
      return getLocalActivityBySlug(slug);
    }

    const transformed = transformWordPressActivity(pages[0]);
    const localActivity = getLocalActivityBySlug(slug);
    return mergeActivityWithLocal(transformed, localActivity);
  } catch (error) {
    console.error(`[Activities] Error fetching activity page '${slug}' from WordPress:`, error);
    return getLocalActivityBySlug(slug);
  }
}

/**
 * Get all activity slugs
 */
export async function getAllActivitySlugs(): Promise<string[]> {
  const activities = await getAllActivities();
  return activities.map((activity) => activity.slug);
}
