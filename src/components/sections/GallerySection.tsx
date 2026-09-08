'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { ImageLightbox } from '@/components/ui/ImageLightbox';
import { GallerySectionProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export function GallerySection({
  heading,
  items,
  categories,
  background = 'white',
}: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const sectionBackground =
    background === 'primary-dark'
      ? 'dark'
      : background === 'gold' || background === 'image'
        ? 'white'
        : background;

  // Filter out any editor-supplied "all" entry — the All button is rendered here.
  const definedCategories = (categories ?? []).filter((c) => c.id !== 'all');

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const buttonClasses = (isActive: boolean) =>
    cn(
      'px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors',
      isActive
        ? 'bg-primary-gold text-primary-dark'
        : 'bg-gray-light text-gray-medium hover:bg-primary-cream'
    );

  return (
    <Section background={sectionBackground}>
      {heading && (
        <Heading as="h2" subtitle={heading.subtitle} centered>
          {heading.title}
        </Heading>
      )}

      {definedCategories.length > 0 && (
        <div className={cn('flex flex-wrap justify-center gap-2 mb-12', heading ? 'mt-8' : '')}>
          <button
            onClick={() => setSelectedCategory('all')}
            className={buttonClasses(selectedCategory === 'all')}
          >
            All
          </button>
          {definedCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={buttonClasses(selectedCategory === category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => {
              setLightboxIndex(index);
              setLightboxOpen(true);
            }}
            className="aspect-square overflow-hidden group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
            aria-label={`View ${item.alt}`}
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover transition-transform group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                View
              </span>
            </div>
          </button>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="text-center text-gray-medium py-12">
          No images found in this category.
        </p>
      )}

      <ImageLightbox
        images={filteredItems.map((item) => item.image)}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        alt="Gallery"
      />
    </Section>
  );
}
