import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { DailyScheduleSectionProps } from '@/lib/types';

/**
 * DailyScheduleSection - Display a daily schedule/timeline
 */
export function DailyScheduleSection({
  heading,
  schedule,
  background = 'white',
}: DailyScheduleSectionProps) {
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

      <div className={`max-w-3xl mx-auto ${heading ? 'mt-12' : ''}`}>
        <div className="space-y-8">
          {schedule.map((item, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="font-heading text-lg text-primary-gold font-medium">
                  {item.time}
                </span>
              </div>
              <div className="flex-grow border-l-2 border-primary-gold/30 pl-6 pb-8">
                <h3 className="font-heading text-xl text-primary-dark font-medium mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
