import { PageDefinition, Section } from '@/lib/types';

/**
 * WordPress GraphQL Client
 *
 * This module provides functions to fetch data from a WordPress backend using WPGraphQL.
 */

/**
 * GraphQL API configuration
 */
const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_WP_GRAPHQL_URL ||
  'https://backend-manyoni.focusonlinetravel.co.za/graphql';

/**
 * Execute a GraphQL query
 */
async function fetchGraphQL<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 60 }, // ISR with 60 second revalidation
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status}`);
  }

  const json = await response.json();

  if (json.errors) {
    // Log specific error messages for debugging
    const errorMessages = json.errors.map((e: { message: string }) => e.message).join('; ');
    console.warn(`[WordPress GraphQL] Query warning: ${errorMessages}`);
    // Return null data to trigger fallback instead of throwing
    return { page: null } as T;
  }

  return json.data;
}

/**
 * GraphQL query to fetch a complete page with all section types
 * Note: Type names use format PageSectionsSections{Type}Layout
 */
const GET_PAGE_QUERY = `
query GetPageBySlug($slug: ID!) {
  page(id: $slug, idType: URI) {
    id
    title
    slug
    seo {
      title
      metaDesc
    }
    pageSections {
      sections {
        __typename

        ... on PageSectionsSectionsHeroImageLayout {
          subtitle
          title
          description
          ctaText
          ctaHref
          secondaryCtaText
          secondaryCtaHref
          scrollToId
          imageSrc {
            node {
              sourceUrl
              altText
            }
          }
          videoSrc
          size
          verticalAlign
          textBackground
          showScrollIndicator
        }

        ... on PageSectionsSectionsTextBlockLayout {
          title
          subtitle
          description
          ctaText
          ctaHref
          background
        }

        ... on PageSectionsSectionsSplitContentLayout {
          subtitle
          title
          description
          features {
            text
          }
          ctaText
          ctaHref
          imageSrc {
            node {
              sourceUrl
              altText
            }
          }
          imagePlaceholder
          imagePosition
          background
        }

        ... on PageSectionsSectionsCtaSectionLayout {
          title
          description
          ctaText
          ctaHref
          secondaryCtaText
          secondaryCtaHref
          background
          imageSrc {
            node {
              sourceUrl
              altText
            }
          }
        }

        ... on PageSectionsSectionsNewsletterSectionLayout {
          title
          description
          background
        }

        ... on PageSectionsSectionsRoomCardsSectionLayout {
          roomSlugs {
            slug
          }
          variant
          headingTitle
          headingSubtitle
          background
          showViewAllLink
          layout
        }

        ... on PageSectionsSectionsActivityCardsSectionLayout {
          activitySlugs {
            slug
          }
          variant
          headingTitle
          headingSubtitle
          background
          showViewAllLink
        }

        ... on PageSectionsSectionsStatsStripLayout {
          stats {
            value
            label
          }
          background
        }

        ... on PageSectionsSectionsFeaturesGridLayout {
          headingTitle
          headingSubtitle
          columns
          background
        }

        ... on PageSectionsSectionsValuesListLayout {
          headingTitle
          headingSubtitle
          values {
            title
            description
          }
          columns
          background
        }

        ... on PageSectionsSectionsDailyScheduleLayout {
          headingTitle
          headingSubtitle
          schedule {
            time
            title
            description
          }
          background
        }

        ... on PageSectionsSectionsGalleryLayout {
          headingTitle
          headingSubtitle
          items {
            id
            category
            image {
              node {
                sourceUrl
                altText
              }
            }
            alt
          }
          categories {
            id
            label
          }
          background
        }

        ... on PageSectionsSectionsOffersListLayout {
          offers {
            title
            subtitle
            description
            highlights {
              text
            }
            validUntil
            imageSrc {
              node {
                sourceUrl
                altText
              }
            }
          }
          background
        }

        ... on PageSectionsSectionsWildlifeGridLayout {
          headingTitle
          headingSubtitle
          wildlife {
            name
            description
          }
          background
        }

        ... on PageSectionsSectionsContactInfoLayout {
          background
        }

        ... on PageSectionsSectionsGettingHereLayout {
          headingTitle
          headingSubtitle
          directions {
            title
            description
          }
          background
        }

        ... on PageSectionsSectionsFaqAccordionLayout {
          background
        }

        ... on PageSectionsSectionsDiningExperiencesLayout {
          headingTitle
          headingSubtitle
          background
        }

        ... on PageSectionsSectionsDietaryOptionsLayout {
          headingTitle
          headingSubtitle
          description
          options {
            text
          }
          background
        }

        ... on PageSectionsSectionsOpeningInfoLayout {
          subtitle
          title
          description
          imageSrc {
            node {
              sourceUrl
              altText
            }
          }
          background
        }

        ... on PageSectionsSectionsContentSectionLayout {
          headingTitle
          headingSubtitle
          content
          centered
          background
        }
      }
    }
  }
}
`;

/**
 * GraphQL query to fetch all page slugs
 */
const GET_ALL_SLUGS_QUERY = `
query GetAllPageSlugs {
  pages(first: 100) {
    nodes {
      slug
    }
  }
}
`;

interface GraphQLPageResponse {
  page: {
    id: string;
    title: string;
    slug: string;
    seo?: {
      title?: string;
      metaDesc?: string;
    };
    pageSections?: {
      sections?: any[];
    };
  } | null;
}

interface GraphQLSlugsResponse {
  pages: {
    nodes: { slug: string }[];
  };
}

/**
 * Get WordPress page data by slug
 *
 * @param slug - The page slug
 * @returns PageDefinition if found, null otherwise
 */
export async function getWordPressPageData(slug: string): Promise<PageDefinition | null> {
  try {
    const data = await fetchGraphQL<GraphQLPageResponse>(GET_PAGE_QUERY, { slug });

    if (!data.page) {
      console.warn(`No WordPress page found for slug: ${slug}`);
      return null;
    }

    return transformWordPressPage(data.page);
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
    const data = await fetchGraphQL<GraphQLSlugsResponse>(GET_ALL_SLUGS_QUERY);
    return data.pages.nodes.map((node) => node.slug);
  } catch (error) {
    console.error('Error fetching WordPress slugs:', error);
    return [];
  }
}

/**
 * Helper to extract image URL from GraphQL image object
 * Handles various formats: string, { sourceUrl }, { node: { sourceUrl } }
 */
function getImageUrl(image: any): string | undefined {
  if (!image) return undefined;
  if (typeof image === 'string') return image;
  // Handle nested node structure: { node: { sourceUrl } }
  if (image.node?.sourceUrl) return image.node.sourceUrl;
  // Handle direct structure: { sourceUrl }
  if (image.sourceUrl) return image.sourceUrl;
  return undefined;
}

/**
 * Helper to extract image alt text from GraphQL image object
 */
function getImageAlt(image: any): string {
  if (!image) return '';
  if (image.node?.altText) return image.node.altText;
  if (image.altText) return image.altText;
  return '';
}

/**
 * Helper to extract value from field that might be array or string
 * ACF checkbox/select fields often return arrays
 */
function getFieldValue<T extends string>(field: any, defaultValue: T): T {
  if (!field) return defaultValue;
  if (Array.isArray(field)) return (field[0] || defaultValue) as T;
  return field as T;
}

/**
 * Transform WordPress page data to PageDefinition format
 *
 * @param wpPage - Raw WordPress page data from GraphQL
 * @returns Transformed PageDefinition
 */
function transformWordPressPage(wpPage: any): PageDefinition {
  const sections: Section[] = [];

  // GraphQL uses pageSections.sections
  const wpSections = wpPage.pageSections?.sections;
  if (wpSections && Array.isArray(wpSections)) {
    for (const wpSection of wpSections) {
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

  const seo = wpPage.seo;
  return {
    meta: {
      title: seo?.title || wpPage.title || 'Untitled',
      slug: wpPage.slug,
      description: seo?.metaDesc || '',
      canonical: seo?.canonical || undefined,
      ogTitle: seo?.opengraphTitle || undefined,
      ogDescription: seo?.opengraphDescription || undefined,
      ogImage: seo?.opengraphImage?.sourceUrl || undefined,
      twitterTitle: seo?.twitterTitle || undefined,
      twitterDescription: seo?.twitterDescription || undefined,
      twitterImage: seo?.twitterImage?.sourceUrl || undefined,
    },
    sections,
  };
}

/**
 * Extract section type from GraphQL __typename
 * e.g., "PageSectionsSectionsHeroImageLayout" -> "hero_image"
 */
function getSectionType(typename: string): string {
  // Handle format: PageSectionsSections{Type}Layout
  const match = typename.match(/PageSectionsSections(\w+?)Layout$/);
  if (!match) {
    // Fallback: try old format Page_Pagesections_Sections_{Type}
    const oldMatch = typename.match(/Sections_(\w+)$/);
    if (!oldMatch) return '';
    return oldMatch[1]
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase()
      .replace(/^_/, '');
  }

  // Convert PascalCase to snake_case
  return match[1]
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
}

/**
 * Transform a WordPress section to Section type
 *
 * @param wpSection - Raw WordPress section data from GraphQL
 * @returns Transformed Section
 */
function transformSection(wpSection: any): Section | null {
  const typename = wpSection.__typename;

  if (!typename) {
    console.warn('Section missing __typename:', wpSection);
    return null;
  }

  const layoutType = getSectionType(typename);

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
          imageSrc: getImageUrl(wpSection.imageSrc),
          videoSrc: wpSection.videoSrc,
          size: getFieldValue(wpSection.size, 'large'),
          verticalAlign: getFieldValue(wpSection.verticalAlign, 'center'),
          textBackground: wpSection.textBackground || false,
          showScrollIndicator: wpSection.showScrollIndicator ?? true,
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
          background: getFieldValue(wpSection.background, 'white'),
          id: wpSection.sectionId || wpSection.id,
        },
      };

    case 'split_content':
      return {
        type: 'split_content',
        props: {
          title: wpSection.title || '',
          subtitle: wpSection.subtitle,
          description: wpSection.description || '',
          features: Array.isArray(wpSection.features)
            ? wpSection.features.map((f: any) => f.text || f)
            : wpSection.features,
          ctaText: wpSection.ctaText,
          ctaHref: wpSection.ctaHref,
          imageSrc: getImageUrl(wpSection.imageSrc),
          imagePlaceholder: wpSection.imagePlaceholder,
          imagePosition: wpSection.imagePosition || 'right',
          background: getFieldValue(wpSection.background, 'white'),
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
          background: getFieldValue(wpSection.background, 'gold'),
          imageSrc: getImageUrl(wpSection.imageSrc),
        },
      };

    case 'newsletter_section':
      return {
        type: 'newsletter_section',
        props: {
          title: wpSection.title || '',
          description: wpSection.description || '',
          background: getFieldValue(wpSection.background, 'cream'),
        },
      };

    case 'room_cards_section':
      return {
        type: 'room_cards_section',
        props: {
          roomSlugs: wpSection.roomSlugs?.map((r: any) => r.slug) || [],
          variant: getFieldValue(wpSection.variant, 'default'),
          heading: wpSection.headingTitle
            ? {
                title: wpSection.headingTitle,
                subtitle: wpSection.headingSubtitle,
              }
            : undefined,
          background: getFieldValue(wpSection.background, 'white'),
          showViewAllLink: !!wpSection.showViewAllLink,
          layout: getFieldValue(wpSection.layout, 'grid'),
        },
      };

    case 'activity_cards_section':
      return {
        type: 'activity_cards_section',
        props: {
          activitySlugs: wpSection.activitySlugs?.map((a: any) => a.slug) || [],
          variant: getFieldValue(wpSection.variant, 'default'),
          heading: wpSection.headingTitle
            ? {
                title: wpSection.headingTitle,
                subtitle: wpSection.headingSubtitle,
              }
            : undefined,
          background: getFieldValue(wpSection.background, 'white'),
          showViewAllLink: !!wpSection.showViewAllLink,
        },
      };

    case 'stats_strip':
      return {
        type: 'stats_strip',
        props: {
          stats: wpSection.stats || [],
          background: getFieldValue(wpSection.background, 'cream'),
        },
      };

    case 'features_grid':
      return {
        type: 'features_grid',
        props: {
          heading: wpSection.headingTitle
            ? {
                title: wpSection.headingTitle,
                subtitle: wpSection.headingSubtitle,
              }
            : undefined,
          features:
            wpSection.features?.map((f: any) => ({
              title: f.featureTitle || f.title,
              description: f.featureDescription || f.description,
            })) || [],
          columns: wpSection.columns ? (parseInt(getFieldValue(wpSection.columns, '3')) as 2 | 3 | 4) : 3,
          background: getFieldValue(wpSection.background, 'white'),
        },
      };

    case 'values_list':
      return {
        type: 'values_list',
        props: {
          heading: wpSection.headingTitle
            ? {
                title: wpSection.headingTitle,
                subtitle: wpSection.headingSubtitle,
              }
            : undefined,
          values: wpSection.values || [],
          columns: wpSection.columns ? (parseInt(getFieldValue(wpSection.columns, '2')) as 2 | 3 | 4) : 2,
          background: getFieldValue(wpSection.background, 'white'),
        },
      };

    case 'daily_schedule':
      return {
        type: 'daily_schedule',
        props: {
          heading: wpSection.headingTitle
            ? {
                title: wpSection.headingTitle,
                subtitle: wpSection.headingSubtitle,
              }
            : undefined,
          schedule: wpSection.schedule || [],
          background: getFieldValue(wpSection.background, 'white'),
        },
      };

    case 'gallery':
      return {
        type: 'gallery',
        props: {
          heading: wpSection.headingTitle
            ? {
                title: wpSection.headingTitle,
                subtitle: wpSection.headingSubtitle,
              }
            : undefined,
          items:
            wpSection.items?.map((item: any) => ({
              id: item.id,
              category: item.category,
              image: getImageUrl(item.image) || '',
              alt: item.alt || item.image?.altText || '',
            })) || [],
          categories: wpSection.categories,
          background: getFieldValue(wpSection.background, 'white'),
        },
      };

    case 'offers_list':
      return {
        type: 'offers_list',
        props: {
          offers:
            wpSection.offers?.map((o: any) => ({
              title: o.title,
              subtitle: o.subtitle,
              description: o.description,
              highlights: o.highlights?.map((h: any) => h.text || h) || [],
              validUntil: o.validUntil,
              imageSrc: getImageUrl(o.imageSrc) || '',
            })) || [],
          background: getFieldValue(wpSection.background, 'white'),
        },
      };

    case 'wildlife_grid':
      return {
        type: 'wildlife_grid',
        props: {
          heading: wpSection.headingTitle
            ? {
                title: wpSection.headingTitle,
                subtitle: wpSection.headingSubtitle,
              }
            : undefined,
          wildlife: wpSection.wildlife || [],
          background: getFieldValue(wpSection.background, 'white'),
        },
      };

    case 'contact_info':
      return {
        type: 'contact_info',
        props: {
          background: getFieldValue(wpSection.background, 'white'),
        },
      };

    case 'getting_here':
      return {
        type: 'getting_here',
        props: {
          heading: wpSection.headingTitle
            ? {
                title: wpSection.headingTitle,
                subtitle: wpSection.headingSubtitle,
              }
            : undefined,
          directions: wpSection.directions || [],
          background: getFieldValue(wpSection.background, 'white'),
        },
      };

    case 'faq_accordion':
      return {
        type: 'faq_accordion',
        props: {
          categories:
            wpSection.categories?.map((cat: any) => ({
              title: cat.categoryTitle || cat.title,
              items:
                (cat.faqItems || cat.items)?.map((item: any) => ({
                  question: item.question,
                  answer: item.answer,
                })) || [],
            })) || [],
          background: getFieldValue(wpSection.background, 'white'),
        },
      };

    case 'dining_experiences':
      return {
        type: 'dining_experiences',
        props: {
          heading: wpSection.headingTitle
            ? {
                title: wpSection.headingTitle,
                subtitle: wpSection.headingSubtitle,
              }
            : undefined,
          experiences:
            wpSection.experiences?.map((exp: any) => ({
              title: exp.experienceTitle || exp.title,
              description: exp.experienceDescription || exp.description,
              placeholder: exp.placeholder,
            })) || [],
          background: getFieldValue(wpSection.background, 'white'),
        },
      };

    case 'dietary_options':
      return {
        type: 'dietary_options',
        props: {
          heading: wpSection.headingTitle
            ? {
                title: wpSection.headingTitle,
                subtitle: wpSection.headingSubtitle,
              }
            : undefined,
          description: wpSection.description,
          options: wpSection.options?.map((o: any) => o.text || o) || [],
          background: getFieldValue(wpSection.background, 'white'),
        },
      };

    case 'opening_info':
      return {
        type: 'opening_info',
        props: {
          subtitle: wpSection.subtitle || '',
          title: wpSection.title || '',
          description: wpSection.description || '',
          imageSrc: getImageUrl(wpSection.imageSrc) || '',
          background: getFieldValue(wpSection.background, 'white'),
        },
      };

    case 'content_section':
      return {
        type: 'content_section',
        props: {
          heading: wpSection.headingTitle
            ? {
                title: wpSection.headingTitle,
                subtitle: wpSection.headingSubtitle,
              }
            : undefined,
          content: wpSection.content || '',
          centered: wpSection.centered || false,
          background: getFieldValue(wpSection.background, 'white'),
        },
      };

    default:
      console.warn(`Unknown section type: ${layoutType} (from ${typename})`);
      return null;
  }
}

/**
 * Health check for WordPress GraphQL API
 *
 * @returns true if WordPress API is accessible, false otherwise
 */
export async function checkWordPressHealth(): Promise<boolean> {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ __typename }' }),
      cache: 'no-store',
    });
    return response.ok;
  } catch (error) {
    console.error('WordPress health check failed:', error);
    return false;
  }
}
