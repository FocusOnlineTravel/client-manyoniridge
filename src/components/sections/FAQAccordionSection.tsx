import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Accordion } from '@/components/ui/Accordion';
import { FAQAccordionSectionProps } from '@/lib/types';

/**
 * FAQAccordionSection - Display FAQ items in accordion format
 */
export function FAQAccordionSection({
  categories,
  background = 'white',
}: FAQAccordionSectionProps) {
  const sectionBackground =
    background === 'primary-dark'
      ? 'dark'
      : background === 'gold' || background === 'image'
        ? 'white'
        : background;

  return (
    <Section background={sectionBackground}>
      <div className="max-w-4xl mx-auto space-y-12">
        {categories.map((category, index) => (
          <div key={index}>
            <Heading as="h2" className="mb-6">
              {category.title}
            </Heading>
            <Accordion
              items={category.items.map((item, idx) => ({
                id: `faq-${index}-${idx}`,
                title: item.question,
                content: item.answer,
              }))}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
