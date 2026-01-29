import { PageDefinition } from '@/lib/types';

/**
 * Activities page content definition
 */
export const activitiesPage: PageDefinition = {
  meta: {
    title: 'Safari Activities',
    slug: 'activities',
    description:
      'Discover unforgettable safari experiences at Manyoni Ridge. From Big 5 game drives to rhino conservation and family adventures.',
  },
  sections: [
    // Hero Section
    {
      type: 'hero_image',
      props: {
        subtitle: 'Safari Activities',
        title: 'Experiences That Define Your Safari',
        description:
          'From thrilling game drives to meaningful conservation encounters, discover the many ways to connect with the African wilderness at Manyoni Ridge.',
        size: 'large',
        imageSrc: '/images/Birds and Wildlife/DSC00631.jpeg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
    },

    // Introduction
    {
      type: 'content_section',
      props: {
        heading: {
          title: 'Unforgettable Encounters',
        },
        content:
          'At Manyoni Ridge, we believe the best safari experiences go beyond game viewing. Our activities are designed to create deep connections with the African wilderness, its wildlife, and the communities working to protect it. Each experience is guided by our expert team who share their passion and knowledge of this remarkable ecosystem.',
        centered: true,
        background: 'cream',
      },
    },

    // Activities Grid
    {
      type: 'activity_cards_section',
      props: {
        activitySlugs: [
          'game-drives',
          'rhino-conservation',
          'pangolin-experiences',
          'k9-unit-training',
          'spa-services',
          'family-experiences',
        ],
        background: 'white',
      },
    },

    // Daily Schedule
    {
      type: 'daily_schedule',
      props: {
        heading: {
          title: 'Your Day at Manyoni Ridge',
          subtitle: 'A typical day at Manyoni Ridge is filled with adventure and relaxation.',
        },
        schedule: [
          {
            time: '05:30',
            title: 'Wake Up Call',
            description: 'Rise with the sun and enjoy tea or coffee in your suite.',
          },
          {
            time: '06:00',
            title: 'Morning Game Drive',
            description:
              'Set out on an early morning safari to catch the wildlife at its most active.',
          },
          {
            time: '09:30',
            title: 'Breakfast',
            description: 'Return to the lodge for a hearty breakfast with bush views.',
          },
          {
            time: '11:00',
            title: 'Optional Activities',
            description:
              'Join a conservation experience, spa treatment, or relax by your pool.',
          },
          {
            time: '13:00',
            title: 'Lunch',
            description: 'Enjoy a light lunch at the main lodge or your private deck.',
          },
          {
            time: '15:30',
            title: 'High Tea',
            description: 'Refresh with afternoon tea and treats before your evening drive.',
          },
          {
            time: '16:00',
            title: 'Afternoon Game Drive',
            description:
              'Head out as the day cools, returning after a sundowner stop in the bush.',
          },
          {
            time: '19:30',
            title: 'Dinner',
            description: 'Dine under the stars or in our boma, sharing stories of the day.',
          },
        ],
        background: 'off-white',
      },
    },

    // CTA Section
    {
      type: 'cta_section',
      props: {
        title: 'Ready for Adventure?',
        description: 'Contact us to learn more about our activities and start planning your safari.',
        ctaText: 'Make an Enquiry',
        ctaHref: '/contact',
        secondaryCtaText: 'View Accommodations',
        secondaryCtaHref: '/accommodations',
        background: 'image',
        imageSrc:
          '/images/Birds and Wildlife/Roller, Lilac-breasted Kruger SA AR-042 Edited.jpg',
      },
    },
  ],
};
