import React from 'react';
import { Section as SectionType } from '@/lib/types';

// Import all section components
import { HeroImage } from '@/components/sections/HeroImage';
import { TextBlock } from '@/components/sections/TextBlock';
import { SplitContent } from '@/components/sections/SplitContent';
import { CTASection } from '@/components/sections/CTASection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { RoomCardsSection } from '@/components/sections/RoomCardsSection';
import { ActivityCardsSection } from '@/components/sections/ActivityCardsSection';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { FeaturesGrid } from '@/components/sections/FeaturesGrid';
import { ValuesListSection } from '@/components/sections/ValuesListSection';
import { DailyScheduleSection } from '@/components/sections/DailyScheduleSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { OffersListSection } from '@/components/sections/OffersListSection';
import { WildlifeGridSection } from '@/components/sections/WildlifeGridSection';
import { ContactInfoSection } from '@/components/sections/ContactInfoSection';
import { GettingHereSection } from '@/components/sections/GettingHereSection';
import { FAQAccordionSection } from '@/components/sections/FAQAccordionSection';
import { DiningExperiencesSection } from '@/components/sections/DiningExperiencesSection';
import { DietaryOptionsSection } from '@/components/sections/DietaryOptionsSection';
import { OpeningInfoSection } from '@/components/sections/OpeningInfoSection';
import { ContentSection } from '@/components/sections/ContentSection';

/**
 * Component map for rendering sections based on their type
 *
 * This map links section type strings to their corresponding React components.
 * When adding new section types, register them here.
 */
const COMPONENT_MAP = {
  hero_image: HeroImage,
  text_block: TextBlock,
  split_content: SplitContent,
  cta_section: CTASection,
  newsletter_section: NewsletterSection,
  room_cards_section: RoomCardsSection,
  activity_cards_section: ActivityCardsSection,
  stats_strip: StatsStrip,
  features_grid: FeaturesGrid,
  values_list: ValuesListSection,
  daily_schedule: DailyScheduleSection,
  gallery: GallerySection,
  offers_list: OffersListSection,
  wildlife_grid: WildlifeGridSection,
  contact_info: ContactInfoSection,
  getting_here: GettingHereSection,
  faq_accordion: FAQAccordionSection,
  dining_experiences: DiningExperiencesSection,
  dietary_options: DietaryOptionsSection,
  opening_info: OpeningInfoSection,
  content_section: ContentSection,
} as const;

/**
 * Fallback component for unimplemented section types
 *
 * This helps with debugging and ensures the app doesn't crash when
 * a section type hasn't been implemented yet.
 */
function UnimplementedSection({ type }: { type: string }) {
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-8 my-8">
        <div className="text-center">
          <p className="text-yellow-800 font-semibold mb-2">
            Section type &quot;{type}&quot; not yet implemented
          </p>
          <p className="text-yellow-700 text-sm">
            Create a component for this section type and add it to the COMPONENT_MAP in
            renderSections.tsx
          </p>
        </div>
      </div>
    );
  }
  return null;
}

/**
 * Renders a single section based on its type and props
 *
 * @param section - The section definition with type and props
 * @param index - The section index (used for React key)
 * @returns React element for the section
 */
function renderSection(section: SectionType, index: number): React.ReactElement {
  const Component = COMPONENT_MAP[section.type as keyof typeof COMPONENT_MAP];

  if (!Component) {
    return <UnimplementedSection key={index} type={section.type} />;
  }

  // TypeScript can't infer the correct props type here, so we use 'any'
  // The type safety is maintained at the section definition level
  return <Component key={index} {...(section.props as any)} />;
}

/**
 * Renders an array of sections
 *
 * This is the main function used by page components to render their content.
 * It maps over the sections array and renders each section with the appropriate component.
 *
 * @param sections - Array of section definitions
 * @returns React element containing all rendered sections
 *
 * @example
 * ```tsx
 * export default function HomePage() {
 *   const page = getPageData('home');
 *   return <>{renderSections(page.sections)}</>;
 * }
 * ```
 */
export function renderSections(sections: SectionType[]): React.ReactElement {
  return <>{sections.map((section, index) => renderSection(section, index))}</>;
}

/**
 * Async version of renderSections for use in server components
 *
 * Currently this is identical to renderSections, but it's separated
 * to allow for future async data fetching within sections if needed.
 */
export async function renderSectionsAsync(
  sections: SectionType[]
): Promise<React.ReactElement> {
  return renderSections(sections);
}
