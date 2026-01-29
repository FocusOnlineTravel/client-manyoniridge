import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { ActivityCard } from '@/components/sections/ActivityCard';
import { activities } from '@/lib/data/activities';
import { ActivityCardsSectionProps } from '@/lib/types';

/**
 * ActivityCardsSection - Wrapper component that fetches activity data by slugs
 * and renders them in a grid layout.
 *
 * This component is used in the page section system to dynamically render
 * activity cards based on slug references rather than hardcoded data.
 */
export function ActivityCardsSection({
  activitySlugs,
  variant = 'default',
  heading,
  background = 'white',
  showViewAllLink = false,
}: ActivityCardsSectionProps) {
  // Filter activities based on provided slugs, maintaining order
  const selectedActivities = activitySlugs
    .map((slug) => activities.find((activity) => activity.slug === slug))
    .filter((activity): activity is NonNullable<typeof activity> => activity !== undefined);

  if (selectedActivities.length === 0) {
    return null;
  }

  // Map background values to Section component's accepted values
  const sectionBackground = background === 'primary-dark' ? 'dark' : background === 'gold' || background === 'image' ? 'white' : background;

  return (
    <Section background={sectionBackground} id="activities">
      {heading && (
        <Heading as="h2" subtitle={heading.subtitle} centered>
          {heading.title}
        </Heading>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {selectedActivities.map((activity, index) => (
          <ActivityCard key={activity.slug} activity={activity} index={index} />
        ))}
      </div>

      {showViewAllLink && (
        <div className="text-center mt-12">
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-gold uppercase tracking-wider hover:gap-3 transition-all"
          >
            View All Activities
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      )}
    </Section>
  );
}
