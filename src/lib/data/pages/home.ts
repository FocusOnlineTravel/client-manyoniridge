import { PageDefinition } from '@/lib/types';
import { SITE_CONFIG } from '@/lib/constants';

/**
 * Homepage content definition
 *
 * This file contains all content for the homepage, structured for easy
 * editing and potential WordPress integration.
 */
export const homePage: PageDefinition = {
  meta: {
    title: 'Home',
    slug: 'home',
    description:
      'Experience the magic of the African bush at our boutique safari lodge in Manyoni Private Game Reserve. Big 5 encounters, exceptional service, and unforgettable moments await.',
  },
  sections: [
    // Hero Section
    {
      type: 'hero_image',
      props: {
        subtitle: 'Opening September 2026',
        title: 'Intimate Luxury in the Wild',
        description:
          'Experience the magic of the African bush at our boutique safari lodge in Manyoni Private Game Reserve. Big 5 encounters, exceptional service, and unforgettable moments await.',
        ctaText: 'Enquire Now',
        ctaHref: '/contact',
        secondaryCtaText: 'Explore',
        secondaryCtaHref: '/accommodations',
        scrollToId: 'intro',
        videoSrc: '/videos/manynoi.mp4',
        verticalAlign: 'bottom',
        textBackground: true,
      },
    },

    // Introduction Section
    {
      type: 'text_block',
      props: {
        title: 'Welcome to Manyoni Ridge',
        subtitle: 'Your Safari Awaits',
        description:
          "Nestled in the heart of Manyoni Private Game Reserve, Manyoni Ridge offers an intimate safari experience where luxury meets wilderness. With only nine exclusive suites, we provide personalized service and unforgettable encounters with Africa's most iconic wildlife.",
        ctaText: 'Discover Our Story',
        ctaHref: '/about',
        background: 'cream',
      },
    },

    // About Split Content
    {
      type: 'split_content',
      props: {
        subtitle: 'The Experience',
        title: 'Where Luxury Meets Wilderness',
        description:
          'Every detail at Manyoni Ridge has been carefully considered to create an experience that honors both the magnificence of the African bush and your desire for comfort. From your private plunge pool overlooking the reserve to our exceptional cuisine, every moment is crafted to exceed expectations.',
        features: [
          'Big 5 private game reserve',
          'Only 9 intimate suites',
          'All-inclusive luxury experience',
          'Expert guides and trackers',
          'Conservation-focused activities',
        ],
        ctaText: 'View Accommodations',
        ctaHref: '/accommodations',
        imageSrc: '/images/Birds and Wildlife/DSC00844.jpeg',
        imagePosition: 'left',
      },
    },

    // Accommodations Section
    {
      type: 'room_cards_section',
      props: {
        roomSlugs: ['one-bedroom-suite', 'two-bedroom-suite'],
        variant: 'featured',
        heading: {
          title: 'Our Suites',
          subtitle:
            'Choose from our luxurious one and two bedroom suites, each offering private pools, stunning views, and unparalleled comfort in the heart of the bush.',
        },
        background: 'off-white',
        layout: 'grid',
      },
    },

    // Reserve Info Strip
    {
      type: 'stats_strip',
      props: {
        stats: [
          {
            value: '23,000',
            label: 'Hectares of Wilderness',
          },
          {
            value: 'Big 5',
            label: 'Game Reserve',
          },
          {
            value: '9',
            label: 'Exclusive Suites',
          },
          {
            value: '400+',
            label: 'Bird Species',
          },
        ],
        background: 'primary-dark',
      },
    },

    // Activities Section
    {
      type: 'activity_cards_section',
      props: {
        activitySlugs: ['game-drives', 'rhino-conservation', 'pangolin-experiences'],
        heading: {
          title: 'Safari Activities',
          subtitle:
            'From thrilling game drives to meaningful conservation experiences, discover the many ways to connect with the African wilderness.',
        },
        background: 'white',
        showViewAllLink: true,
      },
    },

    // Conservation Content
    {
      type: 'split_content',
      props: {
        subtitle: 'Conservation',
        title: "Protecting Africa's Heritage",
        description:
          'At Manyoni Ridge, conservation is at the heart of everything we do. The reserve is home to critical populations of rhino and the elusive pangolin. By staying with us, you directly support anti-poaching efforts, habitat restoration, and community development initiatives.',
        ctaText: 'Learn About Conservation',
        ctaHref: '/reserve',
        imageSrc: '/images/Birds and Wildlife/DSC00470.jpeg',
        imagePosition: 'right',
        background: 'cream',
      },
    },

    // Newsletter Section
    {
      type: 'newsletter_section',
      props: {
        title: 'Be the First to Know',
        description: `${SITE_CONFIG.name} opens in ${SITE_CONFIG.opening}. Subscribe to receive exclusive early booking offers and news from the bush.`,
      },
    },

    // CTA Section
    {
      type: 'cta_section',
      props: {
        title: 'Begin Your Safari Journey',
        description:
          'Contact us to start planning your unforgettable experience at Manyoni Ridge Safari Lodge.',
        ctaText: 'Make an Enquiry',
        ctaHref: '/contact',
        secondaryCtaText: 'View FAQ',
        secondaryCtaHref: '/faq',
        background: 'image',
        imageSrc: '/images/MANYONI RIDGE CLUBHOUSE RENDERS 22.jpg',
      },
    },
  ],
};
