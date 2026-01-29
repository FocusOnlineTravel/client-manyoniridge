import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { ContentSectionProps } from '@/lib/types';

/**
 * ContentSection - Generic content section for simple text content
 */
export function ContentSection({
  heading,
  content,
  centered = false,
  background = 'white',
}: ContentSectionProps) {
  const sectionBackground =
    background === 'primary-dark'
      ? 'dark'
      : background === 'gold' || background === 'image'
        ? 'white'
        : background;

  return (
    <Section background={sectionBackground}>
      <div className={centered ? 'max-w-3xl mx-auto text-center' : 'max-w-4xl mx-auto'}>
        {heading && (
          <Heading as="h2" subtitle={heading.subtitle} centered={centered}>
            {heading.title}
          </Heading>
        )}
        <div
          className={`prose prose-lg max-w-none ${heading ? 'mt-8' : ''} ${
            sectionBackground === 'dark' ? 'prose-invert' : ''
          }`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </Section>
  );
}
