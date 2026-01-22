'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface TextBlockProps {
  title: string;
  subtitle?: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  background?: 'white' | 'cream' | 'dark';
  centered?: boolean;
  size?: 'default' | 'narrow';
}

const backgroundStyles = {
  white: 'bg-white',
  cream: 'bg-primary-cream',
  dark: 'bg-primary-dark',
};

export function TextBlock({
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  background = 'white',
  centered = true,
  size = 'default',
}: TextBlockProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className={cn('section-padding', backgroundStyles[background])}
    >
      <div
        className={cn(
          size === 'default' ? 'container-max' : 'container-narrow',
          centered && 'text-center'
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={cn(centered && 'max-w-3xl mx-auto')}
        >
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-primary-gold text-sm uppercase tracking-[0.2em] mb-4 font-medium"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn(
              'font-heading text-3xl md:text-4xl lg:text-5xl font-medium mb-6',
              background === 'dark' ? 'text-white' : 'text-primary-dark'
            )}
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={cn(
              'text-lg leading-relaxed',
              background === 'dark' ? 'text-gray-300' : 'text-gray-medium'
            )}
          >
            {description}
          </motion.p>

          {(ctaText || secondaryCtaText) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={cn(
                'flex flex-col sm:flex-row gap-4 mt-8',
                centered && 'justify-center'
              )}
            >
              {ctaText && ctaHref && (
                <Button href={ctaHref}>{ctaText}</Button>
              )}
              {secondaryCtaText && secondaryCtaHref && (
                <Button
                  href={secondaryCtaHref}
                  variant={background === 'dark' ? 'outline' : 'secondary'}
                >
                  {secondaryCtaText}
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
