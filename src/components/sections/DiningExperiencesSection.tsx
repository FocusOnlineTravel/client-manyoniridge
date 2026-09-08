import Image from 'next/image';
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

      <div className={`flex flex-wrap justify-center gap-8 ${heading ? 'mt-12' : ''}`}>
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="text-center w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
          >
            {experience.imageSrc && (
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={experience.imageSrc}
                  alt={experience.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            )}
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
