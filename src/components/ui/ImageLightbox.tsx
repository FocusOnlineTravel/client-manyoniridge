'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  alt?: string;
}

export function ImageLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  alt = 'Gallery image',
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Update current index when initial index changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className={cn(
          'absolute top-4 right-4 z-10 p-2 text-white hover:text-primary-gold transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold'
        )}
        aria-label="Close lightbox"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className={cn(
            'absolute left-4 z-10 p-3 bg-black/50 text-white hover:bg-primary-gold/90 transition-all',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold'
          )}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Image Container */}
      <div
        className="relative w-full h-full max-w-7xl max-h-[90vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className={cn(
            'absolute right-4 z-10 p-3 bg-black/50 text-white hover:bg-primary-gold/90 transition-all',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold'
          )}
          aria-label="Next image"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-black/70 text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
