'use client';

import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface SplitContentProps {
  title: string;
  subtitle?: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  imagePlaceholder?: string;
  imageSrc?: string;
  imagePosition?: 'left' | 'right';
  background?: 'white' | 'cream' | 'dark';
  features?: string[];
}

const backgroundStyles = {
  white: 'bg-white',
  cream: 'bg-primary-cream',
  dark: 'bg-primary-dark text-white',
};

export function SplitContent({
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
  imagePlaceholder = 'placeholder-safari',
  imageSrc,
  imagePosition = 'left',
  background = 'white',
  features,
}: SplitContentProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const imageContent = (
    <motion.div
      initial={{ opacity: 0, x: imagePosition === 'left' ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={cn(
        'relative aspect-[4/3] lg:aspect-auto lg:absolute lg:inset-0',
        !imageSrc && imagePlaceholder
      )}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      )}
    </motion.div>
  );

  const textContent = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="py-12 lg:py-20"
    >
      {subtitle && (
        <p className="text-primary-gold text-sm uppercase tracking-[0.2em] mb-3 font-medium">
          {subtitle}
        </p>
      )}
      <h2
        className={cn(
          'font-heading text-3xl md:text-4xl lg:text-5xl font-medium mb-6',
          background === 'dark' ? 'text-white' : 'text-primary-dark'
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          'text-lg leading-relaxed mb-6',
          background === 'dark' ? 'text-gray-300' : 'text-gray-medium'
        )}
      >
        {description}
      </p>

      {features && features.length > 0 && (
        <ul className="space-y-2 mb-8">
          {features.map((feature, index) => (
            <li
              key={index}
              className={cn(
                'flex items-center gap-3 text-sm',
                background === 'dark' ? 'text-gray-300' : 'text-gray-medium'
              )}
            >
              <span className="w-1.5 h-1.5 bg-primary-gold rounded-full flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      {ctaText && ctaHref && (
        <Button
          href={ctaHref}
          variant={background === 'dark' ? 'primary' : 'primary'}
        >
          {ctaText}
        </Button>
      )}
    </motion.div>
  );

  return (
    <section ref={ref} className={cn('relative', backgroundStyles[background])}>
      <div className="lg:grid lg:grid-cols-2 lg:min-h-[600px]">
        {/* Image */}
        <div
          className={cn(
            'relative lg:h-auto',
            imagePosition === 'right' && 'lg:order-2'
          )}
        >
          {imageContent}
        </div>

        {/* Content */}
        <div
          className={cn(
            'container-max lg:flex lg:items-center',
            imagePosition === 'left' && 'lg:pl-16',
            imagePosition === 'right' && 'lg:pr-16'
          )}
        >
          <div className="max-w-xl">{textContent}</div>
        </div>
      </div>
    </section>
  );
}
