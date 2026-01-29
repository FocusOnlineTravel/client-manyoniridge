import { PageDefinition } from '@/lib/types';

/**
 * About page content definition
 */
export const aboutPage: PageDefinition = {
  meta: {
    title: 'About Us',
    slug: 'about',
    description:
      'Learn about Manyoni Ridge Safari Lodge - our story, vision, and commitment to exceptional safari experiences.',
  },
  sections: [
    // Hero Section
    {
      type: 'hero_image',
      props: {
        subtitle: 'About Us',
        title: 'Our Story',
        description:
          "A vision born from a passion for Africa's wilderness and a commitment to sharing its magic.",
        size: 'large',
        imageSrc: '/images/Birds and Wildlife/DSC00748.jpeg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
    },

    // Introduction
    {
      type: 'text_block',
      props: {
        title: 'Intimate Luxury in the Wild',
        subtitle: 'Our Philosophy',
        description:
          'Manyoni Ridge was created with a singular vision: to offer an intimate safari experience where exceptional service meets authentic wilderness. We believe that the best safari experiences are personal, meaningful, and deeply connected to the land and its people.',
        background: 'cream',
      },
    },

    // Our Story
    {
      type: 'split_content',
      props: {
        subtitle: 'The Beginning',
        title: 'A Dream Realized',
        description:
          'Manyoni Ridge emerged from years of planning and a deep love for the African bush. Set within the renowned Manyoni Private Game Reserve, our lodge represents a new chapter in sustainable luxury tourism in KwaZulu-Natal. Every aspect of our design and operation reflects our commitment to conservation, community, and unforgettable guest experiences.',
        imageSrc: '/images/2-bed 1.jpg',
        imagePosition: 'left',
      },
    },

    // Vision & Values
    {
      type: 'values_list',
      props: {
        heading: {
          title: 'Our Values',
          subtitle: 'The principles that guide everything we do at Manyoni Ridge.',
        },
        values: [
          {
            title: 'Authenticity',
            description:
              'Genuine experiences rooted in the traditions and rhythms of the African bush.',
          },
          {
            title: 'Conservation',
            description:
              'Active participation in protecting wildlife and their habitats for future generations.',
          },
          {
            title: 'Excellence',
            description:
              'Uncompromising commitment to quality in every detail of your experience.',
          },
          {
            title: 'Community',
            description:
              'Supporting local communities through employment, education, and sustainable development.',
          },
        ],
        columns: 4,
        background: 'white',
      },
    },

    // The Team
    {
      type: 'split_content',
      props: {
        subtitle: 'Our People',
        title: 'Expert Guides & Dedicated Team',
        description:
          "Behind every exceptional safari experience is a team of passionate professionals. Our guides are among the most experienced in KwaZulu-Natal, with deep knowledge of the bush and its inhabitants. Our hospitality team brings warmth and attention to detail that transforms a stay into a cherished memory.",
        features: [
          'FGASA qualified field guides',
          'Multi-lingual staff',
          'Expert trackers',
          'Dedicated conservation team',
          'Professional hospitality training',
        ],
        imageSrc: '/images/Birds and Wildlife/Secretarybird Kgalagadi Transfrontier NP SA AR-061 Edited.jpg',
        imagePosition: 'right',
        background: 'cream',
      },
    },

    // Opening Information
    {
      type: 'opening_info',
      props: {
        subtitle: 'Coming Soon',
        title: 'Opening July 2026',
        description:
          'Manyoni Ridge Safari Lodge is currently under construction and will welcome its first guests in July 2026. We invite you to register your interest and be among the first to experience our new lodge.',
        imageSrc: '/images/2-bed 6.jpg',
        background: 'white',
      },
    },

    // CTA Section
    {
      type: 'cta_section',
      props: {
        title: 'Be Part of Our Story',
        description: 'Register your interest and be among the first to experience Manyoni Ridge.',
        ctaText: 'Contact Us',
        ctaHref: '/contact',
        secondaryCtaText: 'Subscribe for Updates',
        secondaryCtaHref: '#newsletter',
        background: 'gold',
      },
    },
  ],
};
