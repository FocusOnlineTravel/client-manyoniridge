'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

interface NewsletterSectionProps {
  background?: 'cream' | 'dark';
  title?: string;
  description?: string;
}

export function NewsletterSection({
  background = 'cream',
  title = 'Stay Connected',
  description = 'Subscribe to receive exclusive offers, news from the bush, and updates on our opening in July 2026.',
}: NewsletterSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className={cn(
        'section-padding',
        background === 'dark' ? 'bg-primary-dark' : 'bg-primary-cream'
      )}
    >
      <div className="container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            className={cn(
              'font-heading text-3xl md:text-4xl font-medium mb-4',
              background === 'dark' ? 'text-white' : 'text-primary-dark'
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              'text-lg mb-8 max-w-xl mx-auto',
              background === 'dark' ? 'text-gray-300' : 'text-gray-medium'
            )}
          >
            {description}
          </p>

          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
