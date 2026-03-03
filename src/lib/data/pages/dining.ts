import { PageDefinition } from '@/lib/types';

/**
 * Dining page content definition
 */
export const diningPage: PageDefinition = {
  meta: {
    title: 'Dining',
    slug: 'dining',
    description:
      'Experience exceptional cuisine at Manyoni Ridge Safari Lodge. From bush breakfasts to boma dinners under the stars.',
  },
  sections: [
    // Hero Section
    {
      type: 'hero_image',
      props: {
        subtitle: 'Culinary Experience',
        title: 'Dining Under the African Sky',
        description:
          'Savor exceptional cuisine crafted from fresh, local ingredients, enjoyed in unforgettable settings from our elegant dining room to intimate bush dinners.',
        size: 'large',
        imageSrc: '/images/MANYONI RIDGE CLUBHOUSE RENDERS dark.jpg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
    },

    // Introduction
    {
      type: 'content_section',
      props: {
        heading: {
          title: 'A Culinary Journey',
        },
        content:
          "At Manyoni Ridge, dining is an integral part of your safari experience. Our talented chefs create dishes that celebrate the rich flavors of South Africa while incorporating international influences. Every meal is an opportunity to gather, share stories of the day's adventures, and create lasting memories.",
        centered: true,
        background: 'cream',
      },
    },

    // Main Lodge Dining
    {
      type: 'split_content',
      props: {
        subtitle: 'Main Lodge',
        title: 'Elegant Dining with Bush Views',
        description:
          'Our main dining area offers a sophisticated setting where guests are seated at separate tables, creating an intimate dining experience. For larger groups, we offer the option of a long communal table. Choose to dine on the Starlight Terrace, in the boma, on the deck, or inside the main lodge, all while enjoying panoramic views of the African bush.',
        features: [
          'Seasonal menus featuring local ingredients',
          'Extensive wine selection from South African estates',
          'Accommodations for all dietary requirements',
          'Multiple dining venues: Starlight Terrace, boma, deck, or inside',
          'Special wine cellar dinners available (advance booking required)',
        ],
        imageSrc: '/images/MANYONI RIDGE CLUBHOUSE RENDERS 32.jpg',
        imagePosition: 'left',
      },
    },

    // Dining Experiences
    {
      type: 'dining_experiences',
      props: {
        heading: {
          title: 'Dining Experiences',
          subtitle: 'From intimate bush dinners to starlit boma evenings, every meal is an experience.',
        },
        experiences: [
          {
            title: 'Boma Dining',
            description:
              'Dine around the fire in our boma, under a canopy of stars.',
            imageSrc: '/images/MANYONI RIDGE CLUBHOUSE RENDERS 24.jpg',
          },
          {
            title: 'Starlight Terrace',
            description:
              'Dine on our elevated Starlight Terrace with panoramic views. For cooler evenings, warm fireplaces create an intimate atmosphere.',
            imageSrc: '/images/MANYONI RIDGE CLUBHOUSE RENDERS 2.jpg',
          },
          {
            title: 'Private Dining',
            description:
              'Celebrate special occasions with a private dinner on your villa deck or a secluded bush location.',
            imageSrc: '/images/2-bed 1.jpg',
          },
        ],
        background: 'white',
      },
    },

    // Wine & Drinks
    {
      type: 'split_content',
      props: {
        subtitle: 'Wine & Beverages',
        title: 'A Cellar Worth Exploring',
        description:
          'Our carefully curated wine list showcases the best of South African viticulture, from the celebrated estates of Stellenbosch and Franschhoek to hidden gems from lesser-known regions. Our bar offers premium spirits, craft beers, and signature cocktails inspired by the African bush.',
        features: [
          'Award-winning South African wines',
          'Premium international spirits',
          'Local craft beers',
          'Signature safari cocktails',
          'Expertly paired wine dinners available',
        ],
        imageSrc: '/images/MANYONI RIDGE CLUBHOUSE RENDERS 32.jpg',
        imagePosition: 'right',
        background: 'cream',
      },
    },

    // CTA Section
    {
      type: 'cta_section',
      props: {
        title: 'Ready to Taste the Wild?',
        description:
          'Contact us to learn more about our dining experiences and special occasion packages.',
        ctaText: 'Make an Enquiry',
        ctaHref: '/contact',
        background: 'gold',
      },
    },
  ],
};
