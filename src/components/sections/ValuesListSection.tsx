import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { ValuesListSectionProps } from '@/lib/types';

/**
 * ValuesListSection - Display company values or principles
 */
export function ValuesListSection({
  heading,
  values,
  columns = 3,
  background = 'white',
}: ValuesListSectionProps) {
  const sectionBackground =
    background === 'primary-dark'
      ? 'dark'
      : background === 'gold' || background === 'image'
        ? 'white'
        : background;

  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <Section background={sectionBackground}>
      {heading && (
        <Heading as="h2" subtitle={heading.subtitle} centered>
          {heading.title}
        </Heading>
      )}

      <div className={`grid grid-cols-1 ${gridColsClass} gap-8 ${heading ? 'mt-12' : ''}`}>
        {values.map((value, index) => (
          <div key={index} className="text-center">
            <h3 className="font-heading text-xl text-primary-dark font-medium mb-3">
              {value.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{value.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
