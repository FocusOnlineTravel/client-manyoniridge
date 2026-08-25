'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { m, useScroll, useTransform } from 'framer-motion';
import { cn, stripHtml } from '@/lib/utils';
import { analytics } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';

function trackCta(href: string, label: string) {
  if (href === '/contact' || href === '/reserve' || href.startsWith('/contact')) {
    analytics.reserveClick(`cta_section:${label}`);
  }
}

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
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const sectionRef = useRef<HTMLElement | null>(null);
  const setSectionRef = (el: HTMLElement | null) => {
    sectionRef.current = el;
    inViewRef(el);
  };
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  if (background === 'image') {
    return (
      <section
        ref={setSectionRef}
        className={cn(
          'relative overflow-hidden py-36 md:py-56',
          !imageSrc && placeholderClass
        )}
      >
        {imageSrc && (
          <m.div
            style={{ y: parallaxY }}
            className="absolute inset-x-0 -top-[15%] -bottom-[15%] will-change-transform"
            aria-hidden
          >
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </m.div>
        )}
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 container-max text-center">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-medium mb-4 bg-primary-gold/90 inline-block px-6 py-4">
              {title}
            </h2>
            {description && (
              <p className="text-white/90 text-lg mb-8">{stripHtml(description)}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={ctaHref} size="lg" onClick={() => trackCta(ctaHref, ctaText)}>
                {ctaText}
              </Button>
              {secondaryCtaText && secondaryCtaHref && (
                <Button
                  href={secondaryCtaHref}
                  variant="outline-light"
                  size="lg"
                  onClick={() => trackCta(secondaryCtaHref, secondaryCtaText)}
                >
                  {secondaryCtaText}
                </Button>
              )}
            </div>
          </m.div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={setSectionRef}
      className={cn(
        'section-padding',
        background === 'gold' ? 'bg-primary-gold' : 'bg-primary-dark'
      )}
    >
      <div className="container-max text-center">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h2
            className={cn(
              'font-heading text-3xl md:text-4xl lg:text-5xl font-medium mb-4',
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
              {stripHtml(description)}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={ctaHref}
              variant={background === 'gold' ? 'secondary' : 'primary'}
              size="lg"
              onClick={() => trackCta(ctaHref, ctaText)}
            >
              {ctaText}
            </Button>
            {secondaryCtaText && secondaryCtaHref && (
              <Button
                href={secondaryCtaHref}
                variant={background === 'gold' ? 'ghost' : 'outline-light'}
                size="lg"
                onClick={() => trackCta(secondaryCtaHref, secondaryCtaText)}
              >
                {secondaryCtaText}
              </Button>
            )}
          </div>
        </m.div>
      </div>
    </section>
  );
}
