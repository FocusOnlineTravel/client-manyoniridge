'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, ArrowRight, Bed, Bath } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Room } from '@/lib/types';

interface RoomCardProps {
  room: Room;
  index?: number;
  variant?: 'default' | 'featured';
}

export function RoomCard({ room, index = 0, variant = 'default' }: RoomCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        href={`/accommodations/${room.slug}`}
        className={cn(
          'group block bg-white overflow-hidden',
          'transition-all duration-300 hover:shadow-xl',
          variant === 'featured' && 'lg:grid lg:grid-cols-2'
        )}
      >
        {/* Image */}
        <div
          className={cn(
            'relative overflow-hidden',
            variant === 'default' ? 'aspect-[4/3]' : 'aspect-[4/3] lg:aspect-auto lg:min-h-[400px]',
            room.placeholderClass
          )}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className={cn('p-6', variant === 'featured' && 'lg:p-10 lg:flex lg:flex-col lg:justify-center')}>
          <p className="text-primary-gold text-sm uppercase tracking-wider mb-2">
            {room.subtitle}
          </p>
          <h3 className="font-heading text-2xl md:text-3xl font-medium text-primary-dark mb-3 group-hover:text-primary-gold transition-colors">
            {room.title}
          </h3>
          <p className="text-gray-medium text-sm leading-relaxed mb-4 line-clamp-3">
            {room.shortDescription}
          </p>

          {/* Room Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-medium mb-4">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              {room.capacity.adults} Adults
              {room.capacity.children > 0 && `, ${room.capacity.children} Children`}
            </span>
            <span className="flex items-center gap-1.5">
              <Bed className="w-4 h-4" />
              {room.bedrooms} Bedroom{room.bedrooms > 1 && 's'}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4" />
              {room.bathrooms} Bathroom{room.bathrooms > 1 && 's'}
            </span>
          </div>

          {/* Link */}
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-gold uppercase tracking-wider group-hover:gap-3 transition-all">
            View Details
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
