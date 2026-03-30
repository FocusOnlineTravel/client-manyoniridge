'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { ImageLightbox } from '@/components/ui/ImageLightbox';

interface ActivityGalleryProps {
  images: string[];
  title: string;
}

export function ActivityGallery({ images, title }: ActivityGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <>
      <Section background="off-white">
        <h2 className="font-heading text-3xl font-medium text-primary-dark mb-8 text-center">
          Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, i) => (
            <button
              key={i}
              onClick={() => {
                setLightboxIndex(i);
                setLightboxOpen(true);
              }}
              className="aspect-square relative overflow-hidden cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
            >
              <Image
                src={image}
                alt={`${title} gallery image ${i + 1}`}
                fill
                className="object-cover transition-transform group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </button>
          ))}
        </div>
      </Section>

      <ImageLightbox
        images={images}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        alt={title}
      />
    </>
  );
}
