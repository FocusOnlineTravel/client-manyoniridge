'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  background?: 'white' | 'cream' | 'dark' | 'off-white';
  size?: 'default' | 'narrow' | 'full';
  noPadding?: boolean;
  id?: string;
  animate?: boolean;
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
  animate = true,
}: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={animate ? { opacity: 0, y: 40 } : false}
      animate={animate && isInView ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.6, ease: 'easeOut' }}
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
    </motion.section>
  );
}
