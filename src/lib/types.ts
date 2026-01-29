export interface NavLink {
  href: string;
  label: string;
}

export interface Room {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  capacity: {
    adults: number;
    children: number;
  };
  size: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  features: string[];
  images: string[];
  heroImage?: string;
  placeholderClass: string;
}

export interface Activity {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  duration: string;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging';
  minAge?: number;
  includes: string[];
  highlights: string[];
  images: string[];
  icon: string;
  placeholderClass: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  items: FAQItem[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: 'wildlife' | 'lodge' | 'suites' | 'activities' | 'landscape';
  placeholderClass: string;
}

export interface Offer {
  slug: string;
  title: string;
  description: string;
  validFrom?: string;
  validTo?: string;
  discountPercent?: number;
  highlights: string[];
  terms: string[];
  placeholderClass: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  placeholderClass: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  arrivalDate?: string;
  departureDate?: string;
  guests?: number;
}

export interface NewsletterFormData {
  firstName: string;
  lastName: string;
  email: string;
  consent: boolean;
}

export interface EnquiryFormData {
  name: string;
  email: string;
  phone?: string;
  arrivalDate: string;
  departureDate: string;
  adults: number;
  children: number;
  roomPreference?: string;
  specialRequests?: string;
}

// ============================================================================
// Page System Types - For WordPress Integration
// ============================================================================

/**
 * Background color options for sections
 */
export type SectionBackground = 'white' | 'cream' | 'off-white' | 'primary-dark' | 'gold' | 'image';

/**
 * Image position for split content sections
 */
export type ImagePosition = 'left' | 'right';

/**
 * Hero image size variants
 */
export type HeroSize = 'medium' | 'large';

/**
 * Hero image vertical alignment
 */
export type HeroVerticalAlign = 'center' | 'bottom';

/**
 * Card variants for room and activity cards
 */
export type CardVariant = 'default' | 'featured';

/**
 * Props for HeroImage section
 */
export interface HeroImageSectionProps {
  subtitle?: string;
  title: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  scrollToId?: string;
  imageSrc?: string;
  videoSrc?: string;
  size?: HeroSize;
  verticalAlign?: HeroVerticalAlign;
  textBackground?: boolean;
  showScrollIndicator?: boolean;
}

/**
 * Props for TextBlock section
 */
export interface TextBlockSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  background?: SectionBackground;
  id?: string;
}

/**
 * Props for SplitContent section
 */
export interface SplitContentSectionProps {
  subtitle?: string;
  title: string;
  description: string;
  features?: string[];
  ctaText?: string;
  ctaHref?: string;
  imageSrc?: string;
  imagePlaceholder?: string;
  imagePosition?: ImagePosition;
  background?: SectionBackground;
}

/**
 * Props for CTASection
 */
export interface CTASectionProps {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  background: 'gold' | 'image';
  imageSrc?: string;
}

/**
 * Props for NewsletterSection
 */
export interface NewsletterSectionProps {
  title: string;
  description: string;
  background?: SectionBackground;
}

/**
 * Props for RoomCardsSection (wrapper that fetches room data)
 */
export interface RoomCardsSectionProps {
  roomSlugs: string[];
  variant?: CardVariant;
  heading?: {
    title: string;
    subtitle?: string;
  };
  background?: SectionBackground;
  showViewAllLink?: boolean;
  layout?: 'grid' | 'stack';
}

/**
 * Props for ActivityCardsSection (wrapper that fetches activity data)
 */
export interface ActivityCardsSectionProps {
  activitySlugs: string[];
  variant?: CardVariant;
  heading?: {
    title: string;
    subtitle?: string;
  };
  background?: SectionBackground;
  showViewAllLink?: boolean;
}

/**
 * Individual stat item
 */
export interface StatItem {
  value: string;
  label: string;
}

/**
 * Props for StatsStrip section
 */
export interface StatsStripSectionProps {
  stats: StatItem[];
  background?: SectionBackground;
}

/**
 * Individual feature item
 */
export interface FeatureItem {
  title: string;
  description: string;
}

/**
 * Props for FeaturesGrid section
 */
export interface FeaturesGridSectionProps {
  heading?: {
    title: string;
    subtitle?: string;
  };
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  background?: SectionBackground;
}

/**
 * Props for ValuesList section (used in about page)
 */
export interface ValuesListSectionProps {
  heading?: {
    title: string;
    subtitle?: string;
  };
  values: Array<{
    title: string;
    description: string;
  }>;
  columns?: 2 | 3 | 4;
  background?: SectionBackground;
}

/**
 * Props for DailySchedule section (used in activities page)
 */
export interface DailyScheduleSectionProps {
  heading?: {
    title: string;
    subtitle?: string;
  };
  schedule: Array<{
    time: string;
    title: string;
    description: string;
  }>;
  background?: SectionBackground;
}

/**
 * Props for Gallery section
 */
export interface GallerySectionProps {
  heading?: {
    title: string;
    subtitle?: string;
  };
  items: Array<{
    id: number | string;
    category: string;
    image: string;
    alt: string;
  }>;
  categories?: Array<{
    id: string;
    label: string;
  }>;
  background?: SectionBackground;
}

/**
 * Props for OffersList section
 */
export interface OffersListSectionProps {
  offers: Array<{
    title: string;
    subtitle: string;
    description: string;
    highlights: string[];
    validUntil: string;
    imageSrc: string;
  }>;
  background?: SectionBackground;
}

/**
 * Props for WildlifeGrid section (used in reserve page)
 */
export interface WildlifeGridSectionProps {
  heading?: {
    title: string;
    subtitle?: string;
  };
  wildlife: Array<{
    name: string;
    description: string;
  }>;
  background?: SectionBackground;
}

/**
 * Props for ContactInfo section
 */
export interface ContactInfoSectionProps {
  background?: SectionBackground;
}

/**
 * Props for GettingHere section
 */
export interface GettingHereSectionProps {
  heading?: {
    title: string;
    subtitle?: string;
  };
  directions: Array<{
    title: string;
    description: string;
  }>;
  background?: SectionBackground;
}

/**
 * Props for FAQAccordion section
 */
export interface FAQAccordionSectionProps {
  categories: FAQCategory[];
  background?: SectionBackground;
}

/**
 * Props for DiningExperiences section
 */
export interface DiningExperiencesSectionProps {
  heading?: {
    title: string;
    subtitle?: string;
  };
  experiences: Array<{
    title: string;
    description: string;
    placeholder?: string;
  }>;
  background?: SectionBackground;
}

/**
 * Props for DietaryOptions section
 */
export interface DietaryOptionsSectionProps {
  heading?: {
    title: string;
    subtitle?: string;
  };
  description?: string;
  options: string[];
  background?: SectionBackground;
}

/**
 * Props for OpeningInfo section (used in about page)
 */
export interface OpeningInfoSectionProps {
  subtitle: string;
  title: string;
  description: string;
  imageSrc: string;
  background?: SectionBackground;
}

/**
 * Generic content section for simple text content
 */
export interface ContentSectionProps {
  heading?: {
    title: string;
    subtitle?: string;
  };
  content: string; // HTML or markdown content
  centered?: boolean;
  background?: SectionBackground;
}

/**
 * All possible section types
 */
export type SectionType =
  | 'hero_image'
  | 'text_block'
  | 'split_content'
  | 'cta_section'
  | 'newsletter_section'
  | 'room_cards_section'
  | 'activity_cards_section'
  | 'stats_strip'
  | 'features_grid'
  | 'values_list'
  | 'daily_schedule'
  | 'gallery'
  | 'offers_list'
  | 'wildlife_grid'
  | 'contact_info'
  | 'getting_here'
  | 'faq_accordion'
  | 'dining_experiences'
  | 'dietary_options'
  | 'opening_info'
  | 'content_section';

/**
 * Section definition with discriminated union for type safety
 */
export type Section =
  | { type: 'hero_image'; props: HeroImageSectionProps }
  | { type: 'text_block'; props: TextBlockSectionProps }
  | { type: 'split_content'; props: SplitContentSectionProps }
  | { type: 'cta_section'; props: CTASectionProps }
  | { type: 'newsletter_section'; props: NewsletterSectionProps }
  | { type: 'room_cards_section'; props: RoomCardsSectionProps }
  | { type: 'activity_cards_section'; props: ActivityCardsSectionProps }
  | { type: 'stats_strip'; props: StatsStripSectionProps }
  | { type: 'features_grid'; props: FeaturesGridSectionProps }
  | { type: 'values_list'; props: ValuesListSectionProps }
  | { type: 'daily_schedule'; props: DailyScheduleSectionProps }
  | { type: 'gallery'; props: GallerySectionProps }
  | { type: 'offers_list'; props: OffersListSectionProps }
  | { type: 'wildlife_grid'; props: WildlifeGridSectionProps }
  | { type: 'contact_info'; props: ContactInfoSectionProps }
  | { type: 'getting_here'; props: GettingHereSectionProps }
  | { type: 'faq_accordion'; props: FAQAccordionSectionProps }
  | { type: 'dining_experiences'; props: DiningExperiencesSectionProps }
  | { type: 'dietary_options'; props: DietaryOptionsSectionProps }
  | { type: 'opening_info'; props: OpeningInfoSectionProps }
  | { type: 'content_section'; props: ContentSectionProps };

/**
 * Page metadata
 */
export interface PageMeta {
  title: string;
  slug: string;
  description: string;
}

/**
 * Complete page definition
 */
export interface PageDefinition {
  meta: PageMeta;
  sections: Section[];
}

/**
 * Data source type
 */
export type DataSource = 'local' | 'wordpress';
