'use client';

import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface CTASectionProps {
  title: string;
  description?: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  background?: 'gold' | 'dark' | 'image';
  placeholderClass?: string;
  imageSrc?: string;
}

export function CTASection({
  title,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  background = 'gold',
  placeholderClass = 'placeholder-safari',
  imageSrc,
}: CTASectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  if (background === 'image') {
    return (
      <section
        ref={ref}
        className={cn(
          'relative py-20 md:py-32',
          !imageSrc && placeholderClass
        )}
      >
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-medium mb-4">
              {title}
            </h2>
            {description && (
              <p className="text-white/90 text-lg mb-8">{description}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={ctaHref} size="lg">
                {ctaText}
              </Button>
              {secondaryCtaText && secondaryCtaHref && (
                <Button href={secondaryCtaHref} variant="outline" size="lg">
                  {secondaryCtaText}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className={cn(
        'section-padding',
        background === 'gold' ? 'bg-primary-gold' : 'bg-primary-dark'
      )}
    >
      <div className="container-max text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h2
            className={cn(
              'font-heading text-3xl md:text-4xl font-medium mb-4',
              background === 'gold' ? 'text-primary-dark' : 'text-white'
            )}
          >
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                'text-lg mb-8',
                background === 'gold' ? 'text-primary-dark/80' : 'text-gray-300'
              )}
            >
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={ctaHref}
              variant={background === 'gold' ? 'secondary' : 'primary'}
              size="lg"
            >
              {ctaText}
            </Button>
            {secondaryCtaText && secondaryCtaHref && (
              <Button
                href={secondaryCtaHref}
                variant={background === 'gold' ? 'ghost' : 'outline'}
                size="lg"
              >
                {secondaryCtaText}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
