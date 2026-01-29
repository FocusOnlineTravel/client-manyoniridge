import { Section } from '@/components/ui/Section';
import { StatsStripSectionProps } from '@/lib/types';

/**
 * StatsStrip - Component for displaying statistics in a horizontal strip
 *
 * Used on the homepage and other pages to showcase key numbers and facts
 * about the lodge and reserve.
 */
export function StatsStrip({ stats, background = 'primary-dark' }: StatsStripSectionProps) {
  if (!stats || stats.length === 0) {
    return null;
  }

  // Map background values to Section component's accepted values
  const sectionBackground = background === 'primary-dark' ? 'dark' : background === 'gold' || background === 'image' ? 'white' : background;

  return (
    <Section background={sectionBackground}>
      <div
        className={`grid grid-cols-2 md:grid-cols-${Math.min(
          stats.length,
          4
        )} gap-8 text-center`}
      >
        {stats.map((stat, index) => (
          <div key={index}>
            <p className="font-heading text-4xl md:text-5xl text-primary-gold font-medium mb-2">
              {stat.value}
            </p>
            <p className="text-white/80 text-sm uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
