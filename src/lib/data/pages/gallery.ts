import { PageDefinition } from '@/lib/types';

/**
 * Gallery page content definition.
 *
 * Serves as the fallback when WordPress has no gallery section content.
 * WordPress ACF fields on the /gallery page override these values via
 * mergeSectionWithFallback (see src/lib/wordpress/switch.ts).
 */
export const galleryPage: PageDefinition = {
  meta: {
    title: 'Gallery',
    slug: 'gallery',
    description:
      'Explore the beauty of Manyoni Ridge through our collection of images showcasing wildlife, accommodation, and unforgettable moments.',
  },
  sections: [
    {
      type: 'hero_image',
      props: {
        subtitle: 'Gallery',
        title: 'Capturing the Magic',
        description:
          'Explore the beauty of Manyoni Ridge through our collection of images showcasing wildlife, accommodation, and unforgettable moments.',
        size: 'large',
        imageSrc: '/images/gallery-banner.jpg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
    },

    {
      type: 'gallery',
      props: {
        heading: {
          title: 'Photo Gallery',
          subtitle: 'Browse our collection of images from the reserve and lodge.',
        },
        categories: [
          { id: 'wildlife', label: 'Wildlife' },
          { id: 'lodge', label: 'Lodge' },
          { id: 'suites', label: 'Suites' },
          { id: 'activities', label: 'Activities' },
          { id: 'landscape', label: 'Landscape' },
        ],
        items: [
          { id: 2, category: 'lodge', image: '/images/2-bed 1.jpg', alt: 'Main lodge exterior' },
          { id: 3, category: 'suites', image: '/images/1-bed 1.jpg', alt: 'One bedroom suite interior' },
          { id: 5, category: 'landscape', image: '/images/Birds and Wildlife/DSC00748.jpeg', alt: 'Sunset over the reserve' },
          { id: 6, category: 'wildlife', image: '/images/Birds and Wildlife/DSC00470.jpeg', alt: 'Wildlife on the reserve' },
          { id: 7, category: 'lodge', image: '/images/2-bed 5.jpg', alt: 'Dining area' },
          { id: 8, category: 'suites', image: '/images/1-bed 2.jpg', alt: 'Private suite with plunge pool' },
          { id: 10, category: 'landscape', image: '/images/Birds and Wildlife/DSC00595.jpeg', alt: 'African landscape' },
          { id: 12, category: 'lodge', image: '/images/2-bed 8.jpg', alt: 'Lodge interior' },
          { id: 14, category: 'suites', image: '/images/2-bed 2.jpg', alt: 'Two bedroom suite' },
          { id: 16, category: 'landscape', image: '/images/Birds and Wildlife/DSC00631.jpeg', alt: 'African bush landscape' },
          { id: 18, category: 'suites', image: '/images/1-bed 3.jpg', alt: 'Suite bedroom' },
          { id: 20, category: 'lodge', image: '/images/2-bed 10.jpg', alt: 'Lodge amenities' },
          { id: 21, category: 'activities', image: '/images/game-drive-gal-DAP05803.jpg', alt: 'Game drive experience' },
          { id: 22, category: 'activities', image: '/images/game-drive-gal-DAP05883.jpg', alt: 'Wildlife viewing' },
          { id: 23, category: 'activities', image: '/images/game-drive-gal-DAP05943.jpg', alt: 'Safari adventure' },
          { id: 24, category: 'wildlife', image: '/images/game-drive-gal-DAP06050.jpg', alt: 'Big 5 safari' },
        ],
        background: 'white',
      },
    },

    {
      type: 'content_section',
      props: {
        content:
          'Discover the incredible wildlife and luxury accommodation at Manyoni Ridge Safari Lodge. For media inquiries or high-resolution images, please contact us.',
        centered: true,
        background: 'cream',
      },
    },

    {
      type: 'cta_section',
      props: {
        title: 'Experience It In Person',
        description:
          'Pictures only tell part of the story. Book your stay to experience Manyoni Ridge for yourself.',
        ctaText: 'Make an Enquiry',
        ctaHref: '/contact',
        background: 'gold',
      },
    },
  ],
};
