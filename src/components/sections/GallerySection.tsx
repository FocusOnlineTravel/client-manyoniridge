'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { GallerySectionProps } from '@/lib/types';
import { cn } from '@/lib/utils';

/**
 * GallerySection - Display filterable image gallery
 */
export function GallerySection({
  heading,
  items,
  categories,
  background = 'white',
}: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const sectionBackground =
    background === 'primary-dark'
      ? 'dark'
      : background === 'gold' || background === 'image'
        ? 'white'
        : background;

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <Section background={sectionBackground}>
      {heading && (
        <Heading as="h2" subtitle={heading.subtitle} centered>
          {heading.title}
        </Heading>
      )}

      {categories && categories.length > 0 && (
        <div className={`flex flex-wrap justify-center gap-4 ${heading ? 'mt-8' : ''}`}>
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'px-6 py-2 rounded-full text-sm font-medium transition-colors',
              selectedCategory === 'all'
                ? 'bg-primary-gold text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'px-6 py-2 rounded-full text-sm font-medium transition-colors',
                selectedCategory === category.id
                  ? 'bg-primary-gold text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="relative aspect-[4/3] rounded-lg overflow-hidden group"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
