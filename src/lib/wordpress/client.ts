import { PageDefinition, Section } from '@/lib/types';

/**
 * WordPress REST API Client
 *
 * This module provides functions to fetch data from a WordPress backend.
 */

/**
 * WordPress API configuration
 */
const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'http://localhost:8000/wp-json';
const WP_API_NAMESPACE = process.env.NEXT_PUBLIC_WP_API_NAMESPACE || 'wp/v2';

/**
 * Get WordPress page data by slug
 *
 * @param slug - The page slug
 * @returns PageDefinition if found, null otherwise
 */
export async function getWordPressPageData(slug: string): Promise<PageDefinition | null> {
  try {
    const response = await fetch(
      `${WP_API_URL}/${WP_API_NAMESPACE}/pages?slug=${slug}`,
      {
        next: { revalidate: 60 }, // ISR with 60 second revalidation
      }
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const pages = await response.json();

    if (!pages || pages.length === 0) {
      console.warn(`No WordPress page found for slug: ${slug}`);
      return null;
    }

    const wpPage = pages[0];

    // Transform WordPress page data to PageDefinition format
    return transformWordPressPage(wpPage);
  } catch (error) {
    console.error('Error fetching WordPress page:', error);
    return null;
  }
}

/**
 * Get all page slugs from WordPress
 *
 * @returns Array of page slugs
 */
export async function getWordPressSlugs(): Promise<string[]> {
  try {
    const response = await fetch(
      `${WP_API_URL}/${WP_API_NAMESPACE}/pages?per_page=100`
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const pages = await response.json();
    return pages.map((page: any) => page.slug);
  } catch (error) {
    console.error('Error fetching WordPress slugs:', error);
    return [];
  }
}

/**
 * Transform WordPress page data to PageDefinition format
 *
 * @param wpPage - Raw WordPress page data
 * @returns Transformed PageDefinition
 */
function transformWordPressPage(wpPage: any): PageDefinition {
  const sections: Section[] = [];

  // Check if ACF sections exist
  if (wpPage.acf && wpPage.acf.sections && Array.isArray(wpPage.acf.sections)) {
    for (const wpSection of wpPage.acf.sections) {
      try {
        const transformed = transformSection(wpSection);
        if (transformed) {
          sections.push(transformed);
        }
      } catch (error) {
        console.error(`Error transforming section:`, error, wpSection);
      }
    }
  }

  return {
    meta: {
      title: wpPage.title?.rendered || wpPage.title || 'Untitled',
      slug: wpPage.slug,
      description: wpPage.acf?.meta_description || wpPage.excerpt?.rendered || '',
    },
    sections,
  };
}

/**
 * Transform a WordPress section to Section type
 *
 * @param wpSection - Raw WordPress section data from ACF
 * @returns Transformed Section
 */
function transformSection(wpSection: any): Section | null {
  const layoutType = wpSection.acf_fc_layout;

  if (!layoutType) {
    console.warn('Section missing acf_fc_layout:', wpSection);
    return null;
  }

  switch (layoutType) {
    case 'hero_image':
      return {
        type: 'hero_image',
        props: {
          title: wpSection.title || '',
          subtitle: wpSection.subtitle,
          description: wpSection.description,
          ctaText: wpSection.ctaText,
          ctaHref: wpSection.ctaHref,
          secondaryCtaText: wpSection.secondaryCtaText,
          secondaryCtaHref: wpSection.secondaryCtaHref,
          scrollToId: wpSection.scrollToId,
          imageSrc: wpSection.imageSrc,
          videoSrc: wpSection.videoSrc,
          size: wpSection.size || 'large',
          verticalAlign: wpSection.verticalAlign || 'center',
          textBackground: wpSection.textBackground || false,
          showScrollIndicator: wpSection.showScrollIndicator || false,
        },
      };

    case 'text_block':
      return {
        type: 'text_block',
        props: {
          title: wpSection.title || '',
          subtitle: wpSection.subtitle,
          description: wpSection.description || '',
          ctaText: wpSection.ctaText,
          ctaHref: wpSection.ctaHref,
          background: wpSection.background || 'white',
          id: wpSection.id,
        },
      };

    case 'split_content':
      return {
        type: 'split_content',
        props: {
          title: wpSection.title || '',
          subtitle: wpSection.subtitle,
          description: wpSection.description || '',
          features: wpSection.features?.map((f: any) => f.text) || wpSection.features,
          ctaText: wpSection.ctaText,
          ctaHref: wpSection.ctaHref,
          imageSrc: wpSection.imageSrc,
          imagePlaceholder: wpSection.imagePlaceholder,
          imagePosition: wpSection.imagePosition || 'right',
          background: wpSection.background || 'white',
        },
      };

    case 'cta_section':
      return {
        type: 'cta_section',
        props: {
          title: wpSection.title || '',
          description: wpSection.description || '',
          ctaText: wpSection.ctaText || '',
          ctaHref: wpSection.ctaHref || '',
          secondaryCtaText: wpSection.secondaryCtaText,
          secondaryCtaHref: wpSection.secondaryCtaHref,
          background: wpSection.background || 'gold',
          imageSrc: wpSection.imageSrc,
        },
      };

    case 'newsletter_section':
      return {
        type: 'newsletter_section',
        props: {
          title: wpSection.title || '',
          description: wpSection.description || '',
          background: wpSection.background || 'cream',
        },
      };

    case 'room_cards_section':
      return {
        type: 'room_cards_section',
        props: {
          roomSlugs: wpSection.roomSlugs?.map((r: any) => r.slug) || [],
          variant: wpSection.variant || 'default',
          heading: wpSection.heading_title ? {
            title: wpSection.heading_title,
            subtitle: wpSection.heading_subtitle,
          } : undefined,
          background: wpSection.background || 'white',
          showViewAllLink: wpSection.showViewAllLink || false,
          layout: wpSection.layout || 'grid',
        },
      };

    case 'activity_cards_section':
      return {
        type: 'activity_cards_section',
        props: {
          activitySlugs: wpSection.activitySlugs?.map((a: any) => a.slug) || [],
          variant: wpSection.variant || 'default',
          heading: wpSection.heading_title ? {
            title: wpSection.heading_title,
            subtitle: wpSection.heading_subtitle,
          } : undefined,
          background: wpSection.background || 'white',
          showViewAllLink: wpSection.showViewAllLink || false,
        },
      };

    case 'stats_strip':
      return {
        type: 'stats_strip',
        props: {
          stats: wpSection.stats || [],
          background: wpSection.background || 'cream',
        },
      };

    case 'features_grid':
      return {
        type: 'features_grid',
        props: {
          heading: wpSection.heading_title ? {
            title: wpSection.heading_title,
            subtitle: wpSection.heading_subtitle,
          } : undefined,
          features: wpSection.features || [],
          columns: wpSection.columns ? parseInt(wpSection.columns) : 3,
          background: wpSection.background || 'white',
        },
      };

    case 'values_list':
      return {
        type: 'values_list',
        props: {
          heading: wpSection.heading_title ? {
            title: wpSection.heading_title,
            subtitle: wpSection.heading_subtitle,
          } : undefined,
          values: wpSection.values || [],
          columns: wpSection.columns ? parseInt(wpSection.columns) : 2,
          background: wpSection.background || 'white',
        },
      };

    case 'daily_schedule':
      return {
        type: 'daily_schedule',
        props: {
          heading: wpSection.heading_title ? {
            title: wpSection.heading_title,
            subtitle: wpSection.heading_subtitle,
          } : undefined,
          schedule: wpSection.schedule || [],
          background: wpSection.background || 'white',
        },
      };

    case 'gallery':
      return {
        type: 'gallery',
        props: {
          heading: wpSection.heading_title ? {
            title: wpSection.heading_title,
            subtitle: wpSection.heading_subtitle,
          } : undefined,
          items: wpSection.items || [],
          categories: wpSection.categories,
          background: wpSection.background || 'white',
        },
      };

    case 'offers_list':
      return {
        type: 'offers_list',
        props: {
          offers: wpSection.offers?.map((o: any) => ({
            ...o,
            highlights: o.highlights?.map((h: any) => h.text) || o.highlights,
          })) || [],
          background: wpSection.background || 'white',
        },
      };

    case 'wildlife_grid':
      return {
        type: 'wildlife_grid',
        props: {
          heading: wpSection.heading_title ? {
            title: wpSection.heading_title,
            subtitle: wpSection.heading_subtitle,
          } : undefined,
          wildlife: wpSection.wildlife || [],
          background: wpSection.background || 'white',
        },
      };

    case 'contact_info':
      return {
        type: 'contact_info',
        props: {
          background: wpSection.background || 'white',
        },
      };

    case 'getting_here':
      return {
        type: 'getting_here',
        props: {
          heading: wpSection.heading_title ? {
            title: wpSection.heading_title,
            subtitle: wpSection.heading_subtitle,
          } : undefined,
          directions: wpSection.directions || [],
          background: wpSection.background || 'white',
        },
      };

    case 'faq_accordion':
      return {
        type: 'faq_accordion',
        props: {
          categories: wpSection.categories || [],
          background: wpSection.background || 'white',
        },
      };

    case 'dining_experiences':
      return {
        type: 'dining_experiences',
        props: {
          heading: wpSection.heading_title ? {
            title: wpSection.heading_title,
            subtitle: wpSection.heading_subtitle,
          } : undefined,
          experiences: wpSection.experiences || [],
          background: wpSection.background || 'white',
        },
      };

    case 'dietary_options':
      return {
        type: 'dietary_options',
        props: {
          heading: wpSection.heading_title ? {
            title: wpSection.heading_title,
            subtitle: wpSection.heading_subtitle,
          } : undefined,
          description: wpSection.description,
          options: wpSection.options?.map((o: any) => o.text) || wpSection.options || [],
          background: wpSection.background || 'white',
        },
      };

    case 'opening_info':
      return {
        type: 'opening_info',
        props: {
          subtitle: wpSection.subtitle || '',
          title: wpSection.title || '',
          description: wpSection.description || '',
          imageSrc: wpSection.imageSrc || '',
          background: wpSection.background || 'white',
        },
      };

    case 'content_section':
      return {
        type: 'content_section',
        props: {
          heading: wpSection.heading_title ? {
            title: wpSection.heading_title,
            subtitle: wpSection.heading_subtitle,
          } : undefined,
          content: wpSection.content || '',
          centered: wpSection.centered || false,
          background: wpSection.background || 'white',
        },
      };

    default:
      console.warn(`Unknown section type: ${layoutType}`);
      return null;
  }
}

/**
 * Health check for WordPress API
 *
 * @returns true if WordPress API is accessible, false otherwise
 */
export async function checkWordPressHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${WP_API_URL}`, {
      method: 'HEAD',
      cache: 'no-store',
    });
    return response.ok;
  } catch (error) {
    console.error('WordPress health check failed:', error);
    return false;
  }
}
