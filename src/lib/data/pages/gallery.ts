import { PageDefinition } from '@/lib/types';

/**
 * Gallery page content definition
 *
 * Note: This page uses a client-side component for filtering,
 * so it may need special handling in the renderer.
 */
export const galleryPage: PageDefinition = {
  meta: {
    title: 'Gallery',
    slug: 'gallery',
    description:
      'Explore the beauty of Manyoni Ridge through our collection of images showcasing wildlife, accommodation, and unforgettable moments.',
  },
  sections: [
    // Hero Section
    {
      type: 'hero_image',
      props: {
        subtitle: 'Gallery',
        title: 'Capturing the Magic',
        description:
          'Explore the beauty of Manyoni Ridge through our collection of images showcasing wildlife, accommodation, and unforgettable moments.',
        size: 'large',
        imageSrc:
          '/images/Birds and Wildlife/Roller, Lilac-breasted Kruger SA AR-016 Edited.jpg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
    },

    // Gallery Section
    {
      type: 'gallery',
      props: {
        heading: {
          title: 'Photo Gallery',
          subtitle: 'Browse our collection of images from the reserve and lodge.',
        },
        categories: [
          { id: 'all', label: 'All' },
          { id: 'wildlife', label: 'Wildlife' },
          { id: 'lodge', label: 'Lodge' },
          { id: 'suites', label: 'Suites' },
          { id: 'activities', label: 'Activities' },
          { id: 'landscape', label: 'Landscape' },
        ],
        items: [
          {
            id: 1,
            category: 'wildlife',
            image: '/images/Birds and Wildlife/leopard 2 - ar.jpg',
            alt: 'Leopard in the African bush',
          },
          {
            id: 2,
            category: 'lodge',
            image: '/images/2-bed 1.jpg',
            alt: 'Main lodge exterior',
          },
          {
            id: 3,
            category: 'suites',
            image: '/images/1-bed 1.jpg',
            alt: 'One bedroom suite interior',
          },
          {
            id: 4,
            category: 'activities',
            image:
              '/images/Birds and Wildlife/Secretarybird Kgalagadi Transfrontier NP SA AR-061 Edited.jpg',
            alt: 'Secretarybird on safari',
          },
          {
            id: 5,
            category: 'landscape',
            image: '/images/Birds and Wildlife/DSC00748.jpeg',
            alt: 'Sunset over the reserve',
          },
          {
            id: 6,
            category: 'wildlife',
            image: '/images/Birds and Wildlife/DSC00470.jpeg',
            alt: 'Wildlife on the reserve',
          },
          {
            id: 7,
            category: 'lodge',
            image: '/images/2-bed 5.jpg',
            alt: 'Dining area',
          },
          {
            id: 8,
            category: 'suites',
            image: '/images/1-bed 2.jpg',
            alt: 'Private suite with plunge pool',
          },
          {
            id: 9,
            category: 'activities',
            image:
              '/images/Birds and Wildlife/Roller, Lilac-breasted Kruger SA AR-016 Edited.jpg',
            alt: 'Lilac-breasted Roller',
          },
          {
            id: 10,
            category: 'landscape',
            image: '/images/Birds and Wildlife/DSC00595.jpeg',
            alt: 'African landscape',
          },
          {
            id: 11,
            category: 'wildlife',
            image: '/images/Birds and Wildlife/Leopard Kruger SA AR-072 Edited.jpg',
            alt: 'Leopard resting',
          },
          {
            id: 12,
            category: 'lodge',
            image: '/images/2-bed 8.jpg',
            alt: 'Lodge interior',
          },
          {
            id: 13,
            category: 'wildlife',
            image: '/images/Birds and Wildlife/Eagle, Martial Kruger SA AR-010 Edited.jpg',
            alt: 'Martial Eagle',
          },
          {
            id: 14,
            category: 'suites',
            image: '/images/2-bed 2.jpg',
            alt: 'Two bedroom suite',
          },
          {
            id: 15,
            category: 'wildlife',
            image:
              '/images/Birds and Wildlife/Sunbird, Scarlet-chested Cape Vidal SA AR-2 Edited.jpg',
            alt: 'Scarlet-chested Sunbird',
          },
          {
            id: 16,
            category: 'landscape',
            image: '/images/Birds and Wildlife/DSC00631.jpeg',
            alt: 'African bush landscape',
          },
          {
            id: 17,
            category: 'wildlife',
            image: '/images/Birds and Wildlife/Kingfisher, Malachite Midmar SA AR-001 Edited.jpg',
            alt: 'Malachite Kingfisher',
          },
          {
            id: 18,
            category: 'suites',
            image: '/images/1-bed 3.jpg',
            alt: 'Suite bedroom',
          },
          {
            id: 19,
            category: 'wildlife',
            image: '/images/Birds and Wildlife/roller, lilac-breasted ar.jpg',
            alt: 'Lilac-breasted Roller',
          },
          {
            id: 20,
            category: 'lodge',
            image: '/images/2-bed 10.jpg',
            alt: 'Lodge amenities',
          },
        ],
        background: 'white',
      },
    },

    // Note about images
    {
      type: 'content_section',
      props: {
        content:
          'Discover the incredible wildlife and luxury accommodations at Manyoni Ridge Safari Lodge. For media inquiries or high-resolution images, please contact us.',
        centered: true,
        background: 'cream',
      },
    },

    // CTA Section
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
