import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { WildlifeGridSectionProps } from '@/lib/types';

/**
 * WildlifeGridSection - Display wildlife species information
 */
export function WildlifeGridSection({
  heading,
  wildlife,
  background = 'white',
}: WildlifeGridSectionProps) {
  const sectionBackground =
    background === 'primary-dark'
      ? 'dark'
      : background === 'gold' || background === 'image'
        ? 'white'
        : background;

  return (
    <Section background={sectionBackground}>
      {heading && (
        <Heading as="h2" subtitle={heading.subtitle} centered>
          {heading.title}
        </Heading>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${heading ? 'mt-12' : ''}`}>
        {wildlife.map((animal, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-primary-gold transition-colors"
          >
            <h3 className="font-heading text-lg text-primary-dark font-medium mb-2">
              {animal.name}
            </h3>
            <p className="text-gray-600 text-sm">{animal.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
