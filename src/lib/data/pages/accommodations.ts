import { PageDefinition } from '@/lib/types';

/**
 * Accommodations page content definition
 */
export const accommodationsPage: PageDefinition = {
  meta: {
    title: 'Accommodations',
    slug: 'accommodations',
    description:
      'Discover our luxurious one and two bedroom suites at Manyoni Ridge Safari Lodge. Each suite offers private pools, stunning bush views, and exceptional comfort.',
  },
  sections: [
    // Hero Section
    {
      type: 'hero_image',
      props: {
        subtitle: 'Accommodations',
        title: 'Suites in the Heart of the Bush',
        description:
          'Experience unparalleled comfort in our intimate collection of suites, each offering private pools, breathtaking views, and seamless harmony with the African wilderness.',
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
          'Manyoni Ridge offers just nine exclusive suites, ensuring an intimate and personalized experience. Choose between our romantic one bedroom suites or spacious two bedroom family suites, each thoughtfully designed to immerse you in luxury while celebrating the natural beauty that surrounds you.',
        centered: true,
        background: 'cream',
      },
    },

    // Room Listings
    {
      type: 'room_cards_section',
      props: {
        roomSlugs: ['one-bedroom-suite', 'two-bedroom-suite'],
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
          title: 'Suite Features',
          subtitle: 'Every suite at Manyoni Ridge comes with exceptional amenities and services.',
        },
        features: [
          {
            title: 'Private Plunge Pool',
            description:
              'Each suite features a private pool where you can cool off while watching wildlife pass by.',
          },
          {
            title: 'Indoor & Outdoor Showers',
            description:
              'Experience the freedom of showering under the African sky or retreat to your luxurious indoor bathroom.',
          },
          {
            title: 'Expansive Decks',
            description:
              'Generous private decks offer the perfect vantage point for game viewing from the comfort of your suite.',
          },
          {
            title: 'King-Size Beds',
            description:
              'Sink into premium linens and enjoy restful sleep in our handcrafted king-size beds.',
          },
          {
            title: 'Climate Control',
            description:
              'Stay comfortable year-round with air conditioning and ceiling fans in every suite.',
          },
          {
            title: 'Complimentary Amenities',
            description:
              'Mini bar, coffee station, safe, Wi-Fi, bathrobes, and slippers included in every suite.',
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
