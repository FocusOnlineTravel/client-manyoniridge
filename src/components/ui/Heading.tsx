import { cn } from '@/lib/utils';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps {
  as?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
  subtitleClassName?: string;
  centered?: boolean;
}

const headingStyles: Record<HeadingLevel, string> = {
  h1: 'text-5xl md:text-6xl lg:text-7xl',
  h2: 'text-4xl md:text-5xl',
  h3: 'text-3xl md:text-4xl',
  h4: 'text-2xl md:text-3xl',
  h5: 'text-xl md:text-2xl',
  h6: 'text-lg md:text-xl',
};

export function Heading({
  as: Component = 'h2',
  children,
  className,
  subtitle,
  subtitleClassName,
  centered = false,
}: HeadingProps) {
  return (
    <div className={cn(centered && 'text-center', 'mb-8')}>
      <Component
        className={cn(
          'font-heading font-medium tracking-tight',
          headingStyles[Component],
          className
        )}
      >
        {children}
      </Component>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-lg text-gray-medium max-w-2xl',
            centered && 'mx-auto',
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
