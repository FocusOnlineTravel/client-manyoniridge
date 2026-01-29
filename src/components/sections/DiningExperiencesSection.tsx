import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { DiningExperiencesSectionProps } from '@/lib/types';

/**
 * DiningExperiencesSection - Display dining experience options
 */
export function DiningExperiencesSection({
  heading,
  experiences,
  background = 'white',
}: DiningExperiencesSectionProps) {
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

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${heading ? 'mt-12' : ''}`}>
        {experiences.map((experience, index) => (
          <div key={index} className="text-center">
            <div
              className={`h-48 mb-4 rounded-lg ${experience.placeholder || 'bg-gray-200'}`}
            />
            <h3 className="font-heading text-xl text-primary-dark font-medium mb-2">
              {experience.title}
            </h3>
            <p className="text-gray-600">{experience.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
