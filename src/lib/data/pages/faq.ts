import { PageDefinition } from '@/lib/types';
import { faqCategories } from '@/lib/data/faq';

/**
 * FAQ page content definition
 *
 * Note: FAQ categories are imported from the faq data file
 */
export const faqPage: PageDefinition = {
  meta: {
    title: 'Frequently Asked Questions',
    slug: 'faq',
    description:
      'Find answers to common questions about Manyoni Ridge Safari Lodge - rates, bookings, activities, and more.',
  },
  sections: [
    // Hero Section
    {
      type: 'hero_image',
      props: {
        subtitle: 'FAQ',
        title: 'Frequently Asked Questions',
        description: 'Find answers to common questions about your stay at Manyoni Ridge Safari Lodge.',
        size: 'large',
        imageSrc: '/images/Birds and Wildlife/DSC00595.jpeg',
        showScrollIndicator: false,
      },
    },

    // FAQ Section - uses data from faq.ts
    {
      type: 'faq_accordion',
      props: {
        categories: faqCategories,
        background: 'white',
      },
    },

    // Still Have Questions
    {
      type: 'content_section',
      props: {
        heading: {
          title: 'Still Have Questions?',
        },
        content:
          "Our team is here to help. Get in touch and we'll respond within 24 hours.",
        centered: true,
        background: 'cream',
      },
    },

    // CTA Section
    {
      type: 'cta_section',
      props: {
        title: 'Ready to Book?',
        description: 'Start planning your unforgettable safari experience at Manyoni Ridge.',
        ctaText: 'Make an Enquiry',
        ctaHref: '/contact',
        background: 'gold',
      },
    },
  ],
};
