'use client';

import { useState } from 'react';
import Image from 'next/image';
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

// Gallery items with actual images
const galleryItems = [
  { id: 1, category: 'wildlife', image: '/images/Birds and Wildlife/leopard 2 - ar.jpg', alt: 'Leopard in the African bush' },
  { id: 2, category: 'lodge', image: '/images/2-bed 1.jpg', alt: 'Main lodge exterior' },
  { id: 3, category: 'suites', image: '/images/1-bed 1.jpg', alt: 'One bedroom suite interior' },
  { id: 4, category: 'activities', image: '/images/Birds and Wildlife/Secretarybird Kgalagadi Transfrontier NP SA AR-061 Edited.jpg', alt: 'Secretarybird on safari' },
  { id: 5, category: 'landscape', image: '/images/Birds and Wildlife/DSC00748.jpeg', alt: 'Sunset over the reserve' },
  { id: 6, category: 'wildlife', image: '/images/Birds and Wildlife/DSC00470.jpeg', alt: 'Wildlife on the reserve' },
  { id: 7, category: 'lodge', image: '/images/2-bed 5.jpg', alt: 'Dining area' },
  { id: 8, category: 'suites', image: '/images/1-bed 2.jpg', alt: 'Private suite with plunge pool' },
  { id: 9, category: 'activities', image: '/images/Birds and Wildlife/Roller, Lilac-breasted Kruger SA AR-016 Edited.jpg', alt: 'Lilac-breasted Roller' },
  { id: 10, category: 'landscape', image: '/images/Birds and Wildlife/DSC00595.jpeg', alt: 'African landscape' },
  { id: 11, category: 'wildlife', image: '/images/Birds and Wildlife/Leopard Kruger SA AR-072 Edited.jpg', alt: 'Leopard resting' },
  { id: 12, category: 'lodge', image: '/images/2-bed 8.jpg', alt: 'Lodge interior' },
  { id: 13, category: 'wildlife', image: '/images/Birds and Wildlife/Eagle, Martial Kruger SA AR-010 Edited.jpg', alt: 'Martial Eagle' },
  { id: 14, category: 'suites', image: '/images/2-bed 2.jpg', alt: 'Two bedroom suite' },
  { id: 15, category: 'wildlife', image: '/images/Birds and Wildlife/Sunbird, Scarlet-chested Cape Vidal SA AR-2 Edited.jpg', alt: 'Scarlet-chested Sunbird' },
  { id: 16, category: 'landscape', image: '/images/Birds and Wildlife/DSC00631.jpeg', alt: 'African bush landscape' },
  { id: 17, category: 'wildlife', image: '/images/Birds and Wildlife/Kingfisher, Malachite Midmar SA AR-001 Edited.jpg', alt: 'Malachite Kingfisher' },
  { id: 18, category: 'suites', image: '/images/1-bed 3.jpg', alt: 'Suite bedroom' },
  { id: 19, category: 'wildlife', image: '/images/Birds and Wildlife/roller, lilac-breasted ar.jpg', alt: 'Lilac-breasted Roller' },
  { id: 20, category: 'lodge', image: '/images/2-bed 10.jpg', alt: 'Lodge amenities' },
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
        imageSrc="/images/Birds and Wildlife/Roller, Lilac-breasted Kruger SA AR-016 Edited.jpg"
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
              className="aspect-square overflow-hidden group relative"
              aria-label={`View ${item.alt}`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover"
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
      </Section>

      {/* Note about images */}
      <Section background="cream">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-medium">
            Discover the incredible wildlife and luxury accommodations at Manyoni Ridge Safari Lodge.
            For media inquiries or high-resolution images, please contact us.
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
