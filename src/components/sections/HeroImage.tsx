'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface HeroImageProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  placeholderClass?: string;
  showScrollIndicator?: boolean;
  scrollToId?: string;
  size?: 'full' | 'large' | 'medium';
  overlay?: 'dark' | 'light' | 'gradient';
  textAlign?: 'center' | 'left';
}

const sizeStyles = {
  full: 'min-h-screen',
  large: 'min-h-[80vh]',
  medium: 'min-h-[60vh]',
};

const overlayStyles = {
  dark: 'bg-black/50',
  light: 'bg-black/30',
  gradient: 'bg-gradient-to-b from-black/60 via-black/40 to-black/60',
};

export function HeroImage({
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  placeholderClass = 'placeholder-hero',
  showScrollIndicator = true,
  scrollToId,
  size = 'full',
  overlay = 'gradient',
  textAlign = 'center',
}: HeroImageProps) {
  const handleScrollClick = () => {
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section
      className={cn(
        'relative flex items-center justify-center',
        sizeStyles[size],
        placeholderClass
      )}
    >
      {/* Overlay */}
      <div className={cn('absolute inset-0', overlayStyles[overlay])} />

      {/* Content */}
      <div
        className={cn(
          'relative z-10 container-max py-20',
          textAlign === 'center' && 'text-center',
          textAlign === 'left' && 'text-left'
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={cn(textAlign === 'center' && 'max-w-4xl mx-auto')}
        >
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-primary-gold text-sm md:text-base uppercase tracking-[0.2em] mb-4 font-medium"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl text-white font-medium leading-tight mb-6"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8"
            >
              {description}
            </motion.p>
          )}

          {(ctaText || secondaryCtaText) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={cn(
                'flex flex-col sm:flex-row gap-4',
                textAlign === 'center' && 'justify-center'
              )}
            >
              {ctaText && ctaHref && (
                <Button href={ctaHref} size="lg">
                  {ctaText}
                </Button>
              )}
              {secondaryCtaText && secondaryCtaHref && (
                <Button href={secondaryCtaHref} variant="outline" size="lg">
                  {secondaryCtaText}
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          onClick={handleScrollClick}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white hover:text-primary-gold transition-colors z-10"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.button>
      )}
    </section>
  );
}
