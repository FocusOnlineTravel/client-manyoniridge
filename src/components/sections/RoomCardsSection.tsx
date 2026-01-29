import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { RoomCard } from '@/components/sections/RoomCard';
import { rooms } from '@/lib/data/rooms';
import { RoomCardsSectionProps } from '@/lib/types';

/**
 * RoomCardsSection - Wrapper component that fetches room data by slugs
 * and renders them in a grid layout.
 *
 * This component is used in the page section system to dynamically render
 * room cards based on slug references rather than hardcoded data.
 */
export function RoomCardsSection({
  roomSlugs,
  variant = 'default',
  heading,
  background = 'white',
  showViewAllLink = false,
  layout = 'grid',
}: RoomCardsSectionProps) {
  // Filter rooms based on provided slugs, maintaining order
  const selectedRooms = roomSlugs
    .map((slug) => rooms.find((room) => room.slug === slug))
    .filter((room): room is NonNullable<typeof room> => room !== undefined);

  if (selectedRooms.length === 0) {
    return null;
  }

  // Map background values to Section component's accepted values
  const sectionBackground = background === 'primary-dark' ? 'dark' : background === 'gold' || background === 'image' ? 'white' : background;

  return (
    <Section background={sectionBackground} id="accommodations">
      {heading && (
        <Heading as="h2" subtitle={heading.subtitle} centered>
          {heading.title}
        </Heading>
      )}

      <div
        className={`grid grid-cols-1 lg:grid-cols-${
          layout === 'stack' ? '1' : '2'
        } gap-8 mt-12`}
      >
        {selectedRooms.map((room, index) => (
          <RoomCard key={room.slug} room={room} index={index} variant={variant} />
        ))}
      </div>

      {showViewAllLink && (
        <div className="text-center mt-12">
          <Link
            href="/accommodations"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-gold uppercase tracking-wider hover:gap-3 transition-all"
          >
            View All Accommodations
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
