import { PageDefinition } from '@/lib/types';

/**
 * Main Lodge page content definition
 *
 * Showcases the shared lodge facilities
 */
export const mainLodgePage: PageDefinition = {
  meta: {
    title: 'Main Lodge',
    slug: 'main-lodge',
    description:
      'Discover the heart of Manyoni Ridge Safari Lodge. Our Main Lodge offers elegant shared spaces including a lounge, bar, dining area, viewing deck, and games room.',
  },
  sections: [
    // Hero Section
    {
      type: 'hero_image',
      props: {
        subtitle: 'Main Lodge',
        title: 'The Heart of Manyoni Ridge',
        description:
          'Where comfort meets elegance in the heart of the African bush. Our Main Lodge offers beautifully designed spaces for relaxation, dining, and connection.',
        size: 'large',
        imageSrc: '/images/2-bed 5.jpg',
        showScrollIndicator: false,
      },
    },

    // Introduction
    {
      type: 'text_block',
      props: {
        title: 'A Sanctuary of Shared Experiences',
        subtitle: 'Welcome',
        description:
          'The Main Lodge at Manyoni Ridge serves as the social heart of your safari experience. Designed to blend seamlessly with the surrounding landscape, our lodge offers a collection of inviting spaces where guests can gather, share stories of the day\'s adventures, and immerse themselves in the spirit of the African bush.',
        background: 'cream',
      },
    },

    // Lounge Area
    {
      type: 'split_content',
      props: {
        subtitle: 'Relax & Unwind',
        title: 'The Lounge',
        description:
          'Our elegant lounge provides a comfortable retreat with plush seating, a roaring fireplace, and floor-to-ceiling windows offering panoramic views of the reserve. Whether you\'re enjoying your morning coffee, reading a book from our curated library, or simply watching wildlife pass by, the lounge creates the perfect environment for relaxation.',
        features: [
          'Comfortable seating areas',
          'Fireplace for cool evenings',
          'Panoramic bush views',
          'Curated book library',
          'Wi-Fi available',
        ],
        imageSrc: '/images/2-bed 7.jpg',
        imagePosition: 'right',
        background: 'white',
      },
    },

    // Bar
    {
      type: 'split_content',
      props: {
        subtitle: 'Craft Cocktails & Fine Wines',
        title: 'The Bar',
        description:
          'Our well-stocked bar features an impressive selection of South African wines, premium spirits, and craft beers. Our experienced bartenders are ready to mix your favorite cocktail or recommend a local wine to perfectly complement your sundowner experience. Enjoy your drink on the deck or by the fire.',
        features: [
          'Premium South African wines',
          'Top-shelf spirits',
          'Craft beers',
          'Expert bartenders',
          'Signature safari cocktails',
          'Sundowner service',
        ],
        imageSrc: '/images/2-bed 8.jpg',
        imagePosition: 'left',
        background: 'cream',
      },
    },

    // Dining Area
    {
      type: 'split_content',
      props: {
        subtitle: 'Culinary Excellence',
        title: 'Dining Area',
        description:
          'Our elegant dining area seats all guests comfortably at one long communal table, fostering a sense of camaraderie and shared experience. The open kitchen allows you to watch our talented chefs at work, while the surrounding windows ensure you never miss a moment of the bush spectacle, even during meals.',
        features: [
          'Communal dining experience',
          'Open-plan kitchen',
          'Bush views while dining',
          'Seasonal menus',
          'Indoor and outdoor options',
          'Special dietary accommodations',
        ],
        imageSrc: '/images/2-bed 2.jpg',
        imagePosition: 'right',
        background: 'white',
      },
    },

    // Viewing Deck
    {
      type: 'split_content',
      props: {
        subtitle: 'Front Row to the Wilderness',
        title: 'Viewing Deck',
        description:
          'Extending out into the landscape, our expansive viewing deck offers uninterrupted views across the reserve. Furnished with comfortable seating and shaded areas, it\'s the perfect spot for game viewing, bird watching, or simply soaking in the African atmosphere. A waterhole located nearby attracts regular wildlife visitors.',
        features: [
          'Expansive deck area',
          'Comfortable seating',
          'Shaded and sun areas',
          'Waterhole views',
          'Binoculars provided',
          'Perfect for sundowners',
        ],
        imageSrc: '/images/2-bed 6.jpg',
        imagePosition: 'left',
        background: 'cream',
      },
    },

    // Games Room
    {
      type: 'split_content',
      props: {
        subtitle: 'Entertainment & Leisure',
        title: 'Games Room',
        description:
          'For moments of indoor leisure, our games room provides entertainment for all ages. Challenge fellow guests to a game of pool, browse through wildlife guides, or enjoy board games. It\'s a wonderful space for families and a great way to unwind between safari activities.',
        features: [
          'Pool table',
          'Board games',
          'Wildlife reference library',
          'Comfortable seating',
          'Air-conditioned',
          'Perfect for families',
        ],
        imageSrc: '/images/2-bed 3.jpg',
        imagePosition: 'right',
        background: 'white',
      },
    },

    // Swimming Pool
    {
      type: 'split_content',
      props: {
        subtitle: 'Outdoor Refreshment',
        title: 'Swimming Pool',
        description:
          'Our sparkling swimming pool offers a refreshing retreat from the African sun. Surrounded by comfortable loungers and shaded areas, the pool deck provides the perfect spot to cool off between game drives. Enjoy a swim while watching wildlife at the nearby waterhole, or simply relax poolside with a cold drink from the bar.',
        features: [
          'Heated swimming pool',
          'Comfortable sun loungers',
          'Shaded seating areas',
          'Pool towels provided',
          'Poolside service available',
          'Stunning bush views',
        ],
        imageSrc: '/images/2-bed 4.jpg',
        imagePosition: 'left',
        background: 'cream',
      },
    },

    // Lodge Features Grid
    {
      type: 'features_grid',
      props: {
        heading: {
          title: 'Main Lodge Amenities',
          subtitle: 'Everything you need for the perfect safari experience',
        },
        features: [
          {
            title: 'Complimentary Wi-Fi',
            description: 'Stay connected with high-speed internet throughout the Main Lodge.',
          },
          {
            title: 'Air Conditioning',
            description: 'Climate-controlled comfort in all indoor spaces.',
          },
          {
            title: 'Curated Library',
            description: 'Wildlife guides, fiction, and non-fiction for all interests.',
          },
          {
            title: 'Daily Housekeeping',
            description: 'Immaculate spaces maintained throughout the day.',
          },
          {
            title: 'Fireplace',
            description: 'Cozy warmth for cooler evenings in the bush.',
          },
          {
            title: 'Wildlife Viewing',
            description: 'Prime position for observing animals visiting the waterhole.',
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
        title: 'Experience the Main Lodge',
        description:
          'Book your stay at Manyoni Ridge and discover the perfect blend of luxury and wilderness.',
        ctaText: 'Make an Enquiry',
        ctaHref: '/contact',
        secondaryCtaText: 'View Accommodations',
        secondaryCtaHref: '/accommodations',
        background: 'image',
        imageSrc: '/images/Birds and Wildlife/DSC00748.jpeg',
      },
    },
  ],
};
