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
          'Our main dining area offers a sophisticated setting where you can enjoy breakfast, lunch, and dinner while overlooking the African bush. Floor-to-ceiling windows ensure uninterrupted views, while the open-plan kitchen allows you to watch our chefs at work.',
        features: [
          'Seasonal menus featuring local ingredients',
          'Extensive wine selection from South African estates',
          'Accommodations for all dietary requirements',
          'À la carte and set menu options',
        ],
        imageSrc: '/images/MANYONI RIDGE CLUBHOUSE RENDERS 12.jpg',
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
            title: 'Bush Breakfast',
            description:
              'After your morning game drive, enjoy a hearty breakfast served in a scenic location in the bush.',
            placeholder: 'placeholder-nature',
          },
          {
            title: 'Sundowner Drinks',
            description:
              'Pause during your afternoon drive to toast the African sunset with drinks and canapés.',
            placeholder: 'placeholder-gold',
          },
          {
            title: 'Boma Dinner',
            description:
              'Dine around the fire in our traditional boma, under a canopy of stars.',
            placeholder: 'placeholder-safari',
          },
          {
            title: 'Private Dining',
            description:
              'Celebrate special occasions with a private dinner on your suite deck or a secluded bush location.',
            placeholder: 'placeholder-room',
          },
          {
            title: 'Pool Deck Lunch',
            description: 'Enjoy a light lunch by the pool during the heat of the day.',
            placeholder: 'placeholder-room',
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
        imagePlaceholder: 'placeholder-gold',
        imagePosition: 'right',
        background: 'cream',
      },
    },

    // Dietary Requirements
    {
      type: 'dietary_options',
      props: {
        heading: {
          title: 'Dietary Accommodations',
        },
        description:
          'We understand that every guest has unique dietary needs and preferences. Please inform us in advance of any allergies, intolerances, or dietary requirements, and our chefs will ensure your meals are prepared with the utmost care.',
        options: [
          'Vegetarian',
          'Vegan',
          'Gluten-Free',
          'Halal',
          'Kosher',
          'Low-Sodium',
          'Dairy-Free',
          'Nut-Free',
        ],
        background: 'white',
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
