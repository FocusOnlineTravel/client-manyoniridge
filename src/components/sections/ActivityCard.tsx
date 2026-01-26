'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Clock, Binoculars, Shield, Search, Sparkles, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Activity } from '@/lib/types';

// Icon mapping for activities
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Binoculars,
  Shield,
  Search,
  Sparkles,
  Users,
  Dog: Users, // Using Users as fallback since Dog isn't in lucide-react by default
};

interface ActivityCardProps {
  activity: Activity;
  index?: number;
  variant?: 'default' | 'compact';
}

export function ActivityCard({ activity, index = 0, variant = 'default' }: ActivityCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const IconComponent = iconMap[activity.icon] || Binoculars;

  if (variant === 'compact') {
    return (
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Link
          href={`/activities/${activity.slug}`}
          className="group block p-6 bg-white border border-gray-light hover:border-primary-gold hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary-cream text-primary-gold rounded-full">
              <IconComponent className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-xl font-medium text-primary-dark mb-1 group-hover:text-primary-gold transition-colors">
                {activity.title}
              </h3>
              <p className="text-gray-medium text-sm">{activity.subtitle}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-light group-hover:text-primary-gold group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        href={`/activities/${activity.slug}`}
        className="group block bg-white overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        {/* Image */}
        <div
          className={cn(
            'relative aspect-square overflow-hidden',
            !activity.images || activity.images.length === 0 ? activity.placeholderClass : ''
          )}
        >
          {activity.images && activity.images.length > 0 && (
            <Image
              src={activity.images[0]}
              alt={activity.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          {/* Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
              <IconComponent className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-primary-gold text-xs uppercase tracking-wider mb-1">
            {activity.subtitle}
          </p>
          <h3 className="font-heading text-xl md:text-2xl font-medium text-primary-dark mb-2 group-hover:text-primary-gold transition-colors">
            {activity.title}
          </h3>
          <p className="text-gray-medium text-sm leading-relaxed mb-4 line-clamp-2">
            {activity.shortDescription}
          </p>

          {/* Duration */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm text-gray-medium">
              <Clock className="w-4 h-4" />
              {activity.duration}
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-gold uppercase tracking-wider group-hover:gap-3 transition-all">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
