import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { OpeningInfoSectionProps } from '@/lib/types';

/**
 * OpeningInfoSection - Display opening information with image
 */
export function OpeningInfoSection({
  subtitle,
  title,
  description,
  imageSrc,
  background = 'white',
}: OpeningInfoSectionProps) {
  const sectionBackground =
    background === 'primary-dark'
      ? 'dark'
      : background === 'gold' || background === 'image'
        ? 'white'
        : background;

  return (
    <Section background={sectionBackground}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <Heading as="h2" subtitle={subtitle}>
            {title}
          </Heading>
          <p className="text-gray-600 leading-relaxed mt-6">{description}</p>
        </div>
        <div className="relative h-96 rounded-lg overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </Section>
  );
}
