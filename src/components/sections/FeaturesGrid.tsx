import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { FeaturesGridSectionProps } from '@/lib/types';

/**
 * FeaturesGrid - Component for displaying features in a grid layout
 *
 * Used on various pages to showcase amenities, features, or benefits
 * in a structured grid format.
 */
export function FeaturesGrid({
  heading,
  features,
  columns = 3,
  background = 'white',
}: FeaturesGridSectionProps) {
  if (!features || features.length === 0) {
    return null;
  }

  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  // Map background values to Section component's accepted values
  const sectionBackground = background === 'primary-dark' ? 'dark' : background === 'gold' || background === 'image' ? 'white' : background;

  return (
    <Section background={sectionBackground}>
      {heading && (
        <Heading as="h2" subtitle={heading.subtitle} centered>
          {heading.title}
        </Heading>
      )}

      <div className={`grid grid-cols-1 ${gridColsClass} gap-8 ${heading ? 'mt-12' : ''}`}>
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <h3 className="font-heading text-xl text-primary-dark font-medium mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
