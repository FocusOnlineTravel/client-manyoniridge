import { PageDefinition } from '@/lib/types';

/**
 * Contact page content definition
 *
 * Note: This page uses special ContactInfo and GettingHere section types
 * that render the contact forms and information.
 */
export const contactPage: PageDefinition = {
  meta: {
    title: 'Contact Us',
    slug: 'contact',
    description:
      'Get in touch with Manyoni Ridge Safari Lodge. Make a booking enquiry or contact our team for more information.',
  },
  sections: [
    // Hero Section
    {
      type: 'hero_image',
      props: {
        subtitle: 'Contact',
        title: 'Get in Touch',
        description: "We'd love to hear from you. Reach out to start planning your safari adventure.",
        size: 'medium',
        imageSrc: '/images/2-bed 8.jpg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
    },

    // Contact Section (includes forms and contact info)
    {
      type: 'contact_info',
      props: {
        background: 'white',
      },
    },

    // Getting Here
    {
      type: 'getting_here',
      props: {
        heading: {
          title: 'Getting Here',
          subtitle:
            'Manyoni Ridge is accessible by road from Durban or Richards Bay, or via charter flight.',
        },
        directions: [
          {
            title: 'From Durban',
            description:
              'Approximately 3 hours by road from King Shaka International Airport. Self-drive or private transfer available.',
          },
          {
            title: 'From Richards Bay',
            description:
              'Approximately 1.5 hours by road. The closest commercial airport. Private transfers can be arranged.',
          },
          {
            title: 'Charter Flight',
            description:
              'Charter flights can be arranged to nearby airstrips. Please contact us for recommendations and arrangements.',
          },
        ],
        background: 'cream',
      },
    },
  ],
};
