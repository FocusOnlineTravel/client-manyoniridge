import { PageDefinition } from '@/lib/types';

/**
 * Accommodation page content definition
 */
export const accommodationsPage: PageDefinition = {
  meta: {
    title: 'Accommodation',
    slug: 'accommodations',
    description:
      'Discover our luxurious one and two bedroom villas at Manyoni Ridge Safari Lodge. Each villa offers private swimming areas, stunning bush views, and exceptional comfort.',
  },
  sections: [
    // Hero Section
    {
      type: 'hero_image',
      props: {
        subtitle: 'Accommodation',
        title: 'Villas in the Heart of the Bush',
        description:
          'Experience unparalleled comfort in our intimate collection of villas, each offering private swimming areas, breathtaking views, and seamless harmony with the African wilderness.',
        size: 'large',
        imageSrc: '/images/2-bed 1.jpg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
    },

    // Introduction
    {
      type: 'content_section',
      props: {
        heading: {
          title: 'Your Private Sanctuary',
        },
        content:
          'Manyoni Ridge offers just nine exclusive villas, ensuring an intimate and personalized experience. Choose between our romantic one bedroom villas or spacious two bedroom family villas, each thoughtfully designed to immerse you in luxury while celebrating the natural beauty that surrounds you.',
        centered: true,
        background: 'cream',
      },
    },

    // Room Listings
    {
      type: 'room_cards_section',
      props: {
        roomSlugs: ['one-bedroom-villa', 'two-bedroom-villa'],
        variant: 'featured',
        background: 'white',
        layout: 'stack',
      },
    },

    // Features Section
    {
      type: 'features_grid',
      props: {
        heading: {
          title: 'Villa Features',
          subtitle: 'Every villa at Manyoni Ridge comes with exceptional amenities and services.',
        },
        features: [
          {
            title: 'Private Tubs & Plunge Pools',
            description:
              'Each villa features its own private outdoor retreat, a soaking tub for our one-bedroom villas or a heated plunge pool for our two-bedroom villas.',
          },
          {
            title: 'Indoor & Outdoor Showers',
            description:
              'Experience the freedom of showering under the African sky or retreat to your luxurious indoor bathroom.',
          },
          {
            title: 'Expansive Decks',
            description:
              'Generous private decks offer the perfect vantage point for game viewing from the comfort of your villa.',
          },
          {
            title: 'Extra Length King-Size Beds',
            description:
              'Sink into premium linens and enjoy restful sleep in our extra length king-size beds.',
          },
          {
            title: 'Climate Control',
            description:
              'Stay comfortable year-round with air conditioning and ceiling fans in every villa.',
          },
          {
            title: 'Complimentary Amenities',
            description:
              'Mini bar, coffee station, safe, and Wi-Fi included in every villa.',
          },
        ],
        columns: 3,
        background: 'off-white',
      },
    },

    // CTA Section
    {
      type: 'cta_section',
      props: {
        title: 'Ready to Book Your Stay?',
        description: 'Contact us to check availability and start planning your safari experience.',
        ctaText: 'Make an Enquiry',
        ctaHref: '/contact',
        secondaryCtaText: 'View FAQ',
        secondaryCtaHref: '/faq',
        background: 'gold',
      },
    },
  ],
};
