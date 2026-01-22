import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({
  children,
  className,
  href,
  onClick,
  hover = true,
}: CardProps) {
  const baseStyles = cn(
    'block bg-white overflow-hidden',
    hover &&
      'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={cn(baseStyles, 'text-left w-full')}>
        {children}
      </button>
    );
  }

  return <div className={baseStyles}>{children}</div>;
}

interface CardImageProps {
  className?: string;
  placeholderClass?: string;
  alt?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'landscape';
}

const aspectRatioStyles = {
  video: 'aspect-video',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
};

export function CardImage({
  className,
  placeholderClass = 'placeholder-safari',
  alt,
  aspectRatio = 'landscape',
}: CardImageProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        aspectRatioStyles[aspectRatio],
        placeholderClass,
        className
      )}
      role="img"
      aria-label={alt}
    />
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('p-6', className)}>{children}</div>;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
}

export function CardTitle({ children, className, as: Component = 'h3' }: CardTitleProps) {
  return (
    <Component
      className={cn('font-heading text-xl md:text-2xl font-medium mb-2', className)}
    >
      {children}
    </Component>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('text-gray-medium text-sm leading-relaxed', className)}>
      {children}
    </p>
  );
}

interface CardLinkProps {
  children?: React.ReactNode;
  className?: string;
}

export function CardLink({ children = 'Learn More', className }: CardLinkProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-sm font-semibold text-primary-gold uppercase tracking-wider mt-4',
        'group-hover:gap-3 transition-all duration-300',
        className
      )}
    >
      {children}
      <ArrowRight className="w-4 h-4" />
    </span>
  );
}
