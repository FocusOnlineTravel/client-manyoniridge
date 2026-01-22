import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  background?: 'white' | 'cream' | 'dark' | 'off-white';
  size?: 'default' | 'narrow' | 'full';
  noPadding?: boolean;
  id?: string;
}

const backgroundStyles = {
  white: 'bg-white',
  cream: 'bg-primary-cream',
  dark: 'bg-primary-dark text-white',
  'off-white': 'bg-off-white',
};

export function Section({
  children,
  className,
  containerClassName,
  background = 'white',
  size = 'default',
  noPadding = false,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        backgroundStyles[background],
        !noPadding && 'section-padding',
        className
      )}
    >
      <div
        className={cn(
          size === 'default' && 'container-max',
          size === 'narrow' && 'container-narrow',
          size === 'full' && 'w-full',
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
