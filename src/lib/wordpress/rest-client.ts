import { PageDefinition, Section } from '@/lib/types';

/**
 * WordPress REST API Client
 *
 * Fetches pages with ACF sections from WordPress REST API.
 * This is used instead of GraphQL because ACF fields are properly exposed via REST.
 */

const WP_API_URL =
  process.env.NEXT_PUBLIC_WP_API_URL ||
  'https://backend-manyoni.focusonlinetravel.co.za/wp-json/wp/v2';

interface WPRestPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  acf?: {
    sections?: WPAcfSection[];
  };
  yoast_head_json?: {
    title?: string;
    description?: string;
    og_title?: string;
    og_description?: string;
  };
}

interface WPAcfSection {
  acf_fc_layout: string;
  [key: string]: unknown;
}

/**
 * Fetch a page by slug from WordPress REST API
 */
async function fetchPageBySlug(slug: string): Promise<WPRestPage | null> {
  try {
    // Handle home page slug
    const querySlug = slug === '/' || slug === 'home' ? 'home' : slug;

    const response = await fetch(`${WP_API_URL}/pages?slug=${querySlug}&_fields=id,slug,title,content,excerpt,acf,yoast_head_json`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.warn(`[WP REST] Failed to fetch page: ${response.status}`);
      return null;
    }

    const pages: WPRestPage[] = await response.json();

    if (!pages || pages.length === 0) {
      console.warn(`[WP REST] No page found for slug: ${slug}`);
      return null;
    }

    return pages[0];
  } catch (error) {
    console.error(`[WP REST] Error fetching page ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch all page slugs from WordPress REST API
 */
export async function getWordPressPageSlugsRest(): Promise<string[]> {
  try {
    const response = await fetch(`${WP_API_URL}/pages?per_page=100&_fields=slug`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    const pages: { slug: string }[] = await response.json();
    return pages.map((p) => p.slug);
  } catch (error) {
    console.error('[WP REST] Error fetching slugs:', error);
    return [];
  }
}

/**
 * Get image URL from ACF image field
 * ACF images can be ID, URL string, or object with url/sizes
 */
function getAcfImageUrl(image: unknown): string | undefined {
  if (!image) return undefined;
  if (typeof image === 'string') return image;
  if (typeof image === 'object' && image !== null) {
    const img = image as Record<string, unknown>;
    if (img.url) return img.url as string;
    if (img.sizes && typeof img.sizes === 'object') {
      const sizes = img.sizes as Record<string, string>;
      return sizes.large || sizes.medium_large || sizes.medium || sizes.full;
    }
  }
  return undefined;
}

/**
 * Transform array items, handling nested {text: "..."} objects and nested arrays
 */
function transformArray(arr: unknown[]): unknown[] {
  return arr.map((item) => {
    if (typeof item === 'object' && item !== null) {
      const keys = Object.keys(item);
      // Handle simple {text: "..."} objects from ACF repeaters - extract just the text
      if (keys.length === 1 && keys[0] === 'text') {
        return (item as Record<string, unknown>).text;
      }
      // Handle nested objects (may contain images or nested arrays)
      const transformed: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(item as Record<string, unknown>)) {
        if (k === 'image' || k === 'imageSrc' || k.endsWith('Image')) {
          transformed[k === 'image' ? 'imageSrc' : k] = getAcfImageUrl(v);
        } else if (Array.isArray(v)) {
          // Recursively transform nested arrays
          transformed[k] = transformArray(v);
        } else {
          transformed[k] = v;
        }
      }
      return transformed;
    }
    return item;
  });
}

/**
 * Transform ACF section to our Section type
 */
function transformAcfSection(acfSection: WPAcfSection): Section | null {
  const layoutType = acfSection.acf_fc_layout;

  if (!layoutType) {
    console.warn('[WP REST] Section missing acf_fc_layout');
    return null;
  }

  // Map ACF layout names to our section types
  const typeMap: Record<string, string> = {
    hero_image: 'hero_image',
    text_block: 'text_block',
    split_content: 'split_content',
    cta_section: 'cta_section',
    newsletter_section: 'newsletter_section',
    room_cards_section: 'room_cards_section',
    activity_cards_section: 'activity_cards_section',
    stats_strip: 'stats_strip',
    features_grid: 'features_grid',
    values_list: 'values_list',
    daily_schedule: 'daily_schedule',
    gallery: 'gallery',
    offers_list: 'offers_list',
    wildlife_grid: 'wildlife_grid',
    contact_info: 'contact_info',
    getting_here: 'getting_here',
    faq_accordion: 'faq_accordion',
    dining_experiences: 'dining_experiences',
    dietary_options: 'dietary_options',
    opening_info: 'opening_info',
    content_section: 'content_section',
  };

  const sectionType = typeMap[layoutType] || layoutType;

  // Build props from ACF fields
  const props: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(acfSection)) {
    if (key === 'acf_fc_layout') continue;

    // Handle image fields
    if (key === 'imageSrc' || key === 'image' || key.endsWith('Image')) {
      props[key === 'image' ? 'imageSrc' : key] = getAcfImageUrl(value);
      continue;
    }

    // Handle arrays (features, stats, etc.)
    if (Array.isArray(value)) {
      props[key] = transformArray(value);
      continue;
    }

    // Handle heading object
    if (key === 'heading' && typeof value === 'object' && value !== null) {
      props.heading = value;
      continue;
    }

    // Handle headingTitle/headingSubtitle -> heading conversion
    if (key === 'headingTitle' && value) {
      props.heading = {
        title: value,
        subtitle: acfSection.headingSubtitle || undefined,
      };
      continue;
    }
    if (key === 'headingSubtitle') continue; // Handled with headingTitle

    props[key] = value;
  }

  return {
    type: sectionType,
    props,
  } as Section;
}

/**
 * Get WordPress page data via REST API
 */
export async function getWordPressPageDataRest(slug: string): Promise<PageDefinition | null> {
  const page = await fetchPageBySlug(slug);

  if (!page) {
    return null;
  }

  // Transform ACF sections
  const sections: Section[] = [];

  if (page.acf?.sections && Array.isArray(page.acf.sections)) {
    for (const acfSection of page.acf.sections) {
      const section = transformAcfSection(acfSection);
      if (section) {
        sections.push(section);
      }
    }
  }

  // Get meta from Yoast or fallback to title
  const meta = {
    title: page.yoast_head_json?.title || page.title.rendered || 'Untitled',
    slug: page.slug,
    description: page.yoast_head_json?.description || page.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
  };

  return {
    meta,
    sections,
  };
}
