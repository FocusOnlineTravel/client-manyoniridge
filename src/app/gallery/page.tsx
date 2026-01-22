'use client';

import { useState } from 'react';
import { HeroImage } from '@/components/sections/HeroImage';
import { CTASection } from '@/components/sections/CTASection';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'wildlife', label: 'Wildlife' },
  { id: 'lodge', label: 'Lodge' },
  { id: 'suites', label: 'Suites' },
  { id: 'activities', label: 'Activities' },
  { id: 'landscape', label: 'Landscape' },
];

// Placeholder gallery items
const galleryItems = [
  { id: 1, category: 'wildlife', placeholder: 'placeholder-nature', alt: 'Lion in the bush' },
  { id: 2, category: 'lodge', placeholder: 'placeholder-room', alt: 'Main lodge exterior' },
  { id: 3, category: 'suites', placeholder: 'placeholder-room', alt: 'One bedroom suite interior' },
  { id: 4, category: 'activities', placeholder: 'placeholder-safari', alt: 'Game drive vehicle' },
  { id: 5, category: 'landscape', placeholder: 'placeholder-nature', alt: 'Sunset over the reserve' },
  { id: 6, category: 'wildlife', placeholder: 'placeholder-nature', alt: 'Elephant herd' },
  { id: 7, category: 'lodge', placeholder: 'placeholder-gold', alt: 'Dining area' },
  { id: 8, category: 'suites', placeholder: 'placeholder-room', alt: 'Private pool' },
  { id: 9, category: 'activities', placeholder: 'placeholder-safari', alt: 'Bush breakfast' },
  { id: 10, category: 'landscape', placeholder: 'placeholder-nature', alt: 'African sunrise' },
  { id: 11, category: 'wildlife', placeholder: 'placeholder-nature', alt: 'Leopard in tree' },
  { id: 12, category: 'lodge', placeholder: 'placeholder-room', alt: 'Pool deck' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <HeroImage
        subtitle="Gallery"
        title="Capturing the Magic"
        description="Explore the beauty of Manyoni Ridge through our collection of images showcasing wildlife, accommodation, and unforgettable moments."
        size="large"
        placeholderClass="placeholder-safari"
        showScrollIndicator={false}
      />

      {/* Gallery Section */}
      <Section background="white">
        <Heading
          as="h2"
          subtitle="Browse our collection of images from the reserve and lodge."
          centered
        >
          Photo Gallery
        </Heading>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors',
                activeCategory === category.id
                  ? 'bg-primary-gold text-primary-dark'
                  : 'bg-gray-light text-gray-medium hover:bg-primary-cream'
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              className={cn(
                'aspect-square overflow-hidden group',
                item.placeholder
              )}
              aria-label={`View ${item.alt}`}
            >
              <div className="w-full h-full bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
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
      </Section>

      {/* Note about images */}
      <Section background="cream">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-medium">
            <strong>Note:</strong> This gallery uses placeholder images. Professional
            photography will be added as the lodge is completed. For media
            inquiries or high-resolution images, please contact us.
          </p>
        </div>
      </Section>

      {/* CTA Section */}
      <CTASection
        title="Experience It In Person"
        description="Pictures only tell part of the story. Book your stay to experience Manyoni Ridge for yourself."
        ctaText="Make an Enquiry"
        ctaHref="/contact"
        background="gold"
      />
    </>
  );
}
