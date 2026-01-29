import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { DietaryOptionsSectionProps } from '@/lib/types';

/**
 * DietaryOptionsSection - Display dietary accommodation options
 */
export function DietaryOptionsSection({
  heading,
  description,
  options,
  background = 'white',
}: DietaryOptionsSectionProps) {
  const sectionBackground =
    background === 'primary-dark'
      ? 'dark'
      : background === 'gold' || background === 'image'
        ? 'white'
        : background;

  return (
    <Section background={sectionBackground}>
      <div className="max-w-3xl mx-auto">
        {heading && (
          <Heading as="h2" subtitle={heading.subtitle} centered>
            {heading.title}
          </Heading>
        )}

        {description && (
          <p className={`text-center text-gray-600 leading-relaxed ${heading ? 'mt-6' : ''}`}>
            {description}
          </p>
        )}

        <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${heading || description ? 'mt-8' : ''}`}>
          {options.map((option, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 text-center"
            >
              <span className="text-primary-dark font-medium">{option}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
