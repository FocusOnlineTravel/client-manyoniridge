import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { GettingHereSectionProps } from '@/lib/types';

/**
 * GettingHereSection - Display directions and travel information
 */
export function GettingHereSection({
  heading,
  directions,
  background = 'white',
}: GettingHereSectionProps) {
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

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto ${heading ? 'mt-12' : ''}`}>
        {directions.map((direction, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-heading text-xl text-primary-dark font-medium mb-3">
              {direction.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{direction.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
