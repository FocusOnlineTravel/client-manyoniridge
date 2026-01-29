import { PageDefinition } from '@/lib/types';

/**
 * Offers page content definition
 */
export const offersPage: PageDefinition = {
  meta: {
    title: 'Special Offers',
    slug: 'offers',
    description:
      'Discover special packages and exclusive offers at Manyoni Ridge Safari Lodge. Early booking discounts, honeymoon packages, and more.',
  },
  sections: [
    // Hero Section
    {
      type: 'hero_image',
      props: {
        subtitle: 'Special Offers',
        title: 'Exclusive Packages & Offers',
        description: 'Discover our special packages designed to enhance your Manyoni Ridge experience.',
        size: 'medium',
        imageSrc:
          '/images/Birds and Wildlife/Sunbird, Scarlet-chested Cape Vidal SA AR-2 Edited.jpg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
    },

    // Introduction
    {
      type: 'content_section',
      props: {
        heading: {
          title: 'Value Without Compromise',
        },
        content:
          'While Manyoni Ridge represents the pinnacle of luxury safari experiences, we offer a range of packages and offers to help you plan your perfect stay. All our rates are fully inclusive of accommodation, meals, beverages, and game activities.',
        centered: true,
        background: 'cream',
      },
    },

    // Offers Grid
    {
      type: 'offers_list',
      props: {
        offers: [
          {
            title: 'Early Bird Offer',
            subtitle: 'Book 6+ months in advance',
            description:
              'Plan ahead and save. Book your stay at least 6 months in advance and receive a special early booking discount on your accommodation.',
            highlights: [
              '10% discount on accommodation',
              'Complimentary spa treatment',
              'Priority room selection',
            ],
            validUntil: 'Valid for stays from July 2026',
            imageSrc: '/images/Birds and Wildlife/DSC00569.jpeg',
          },
          {
            title: 'Honeymoon Package',
            subtitle: 'Celebrate your love',
            description:
              'Begin your married life with an unforgettable safari honeymoon. Our romantic package includes special touches to make your celebration extraordinary.',
            highlights: [
              'Private dinner under the stars',
              'Couples spa treatment',
              'Champagne & chocolate on arrival',
              'Late checkout',
            ],
            validUntil: 'Available year-round',
            imageSrc: '/images/1-bed 1.jpg',
          },
          {
            title: 'Family Safari',
            subtitle: 'Create lasting memories',
            description:
              'Bring the family together for an African adventure. Our family package includes activities designed for all ages and special rates for children.',
            highlights: [
              'Free stays for children under 6',
              '50% discount for children 6-12',
              'Junior ranger programs',
              'Family game drive vehicle',
            ],
            validUntil: 'Available year-round',
            imageSrc: '/images/Birds and Wildlife/DSC00816.jpeg',
          },
          {
            title: 'Extended Stay',
            subtitle: '5 nights or more',
            description:
              'Immerse yourself in the bush with an extended stay. The longer you stay, the more you save, and the deeper your connection with the African wilderness.',
            highlights: [
              '5 nights: 10% discount',
              '7 nights: 15% discount',
              'Complimentary laundry service',
              'Private bush dinner included',
            ],
            validUntil: 'Available year-round',
            imageSrc: '/images/Birds and Wildlife/DSC00600.jpeg',
          },
        ],
        background: 'white',
      },
    },

    // Terms
    {
      type: 'content_section',
      props: {
        heading: {
          title: 'Terms & Conditions',
        },
        content:
          'All offers are subject to availability and cannot be combined with other promotions unless specified. Offers may be withdrawn or modified at any time. Full terms and conditions will be provided at the time of booking. For detailed information about any offer, please contact our reservations team.',
        centered: true,
        background: 'off-white',
      },
    },

    // CTA Section
    {
      type: 'cta_section',
      props: {
        title: 'Ready to Book?',
        description: 'Contact us to discuss which offer best suits your plans.',
        ctaText: 'Make an Enquiry',
        ctaHref: '/contact',
        background: 'gold',
      },
    },
  ],
};
