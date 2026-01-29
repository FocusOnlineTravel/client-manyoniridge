import { PageDefinition } from '@/lib/types';

/**
 * Reserve page content definition
 */
export const reservePage: PageDefinition = {
  meta: {
    title: 'The Reserve',
    slug: 'reserve',
    description:
      'Discover Manyoni Private Game Reserve - 23,000 hectares of pristine African wilderness, home to the Big 5 and critical conservation efforts.',
  },
  sections: [
    // Hero Section
    {
      type: 'hero_image',
      props: {
        subtitle: 'The Reserve',
        title: 'Manyoni Private Game Reserve',
        description:
          '23,000 hectares of pristine African wilderness in the heart of Zululand, home to the Big 5 and a thriving ecosystem of wildlife.',
        size: 'large',
        imageSrc: '/images/Birds and Wildlife/DSC00814.jpeg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
    },

    // Introduction
    {
      type: 'text_block',
      props: {
        title: 'A Wilderness Preserved',
        subtitle: 'Zululand, KwaZulu-Natal',
        description:
          'Manyoni Private Game Reserve is a testament to successful conservation in South Africa. Formed from 17 former cattle farms, this remarkable reserve in northern KwaZulu-Natal has been restored to its natural state, creating a sanctuary for Africa\'s most iconic wildlife.',
        background: 'cream',
      },
    },

    // Big 5 Section
    {
      type: 'split_content',
      props: {
        subtitle: 'Big 5 Territory',
        title: "Home to Africa's Most Iconic Wildlife",
        description:
          'Manyoni is one of the few Big 5 reserves in KwaZulu-Natal, offering exceptional opportunities to encounter lion, leopard, elephant, rhino, and buffalo in their natural habitat. Our expert guides and trackers ensure unforgettable wildlife encounters on every game drive.',
        features: [
          'All Big 5 species present',
          'Cheetah and wild dog populations',
          'Over 400 bird species recorded',
          'Diverse habitats and ecosystems',
        ],
        ctaText: 'View Activities',
        ctaHref: '/activities',
        imageSrc: '/images/Birds and Wildlife/Leopard Kruger SA AR-072 Edited.jpg',
        imagePosition: 'left',
      },
    },

    // Wildlife Grid
    {
      type: 'wildlife_grid',
      props: {
        heading: {
          title: 'Wildlife of Manyoni',
          subtitle:
            'From the Big 5 to the rare pangolin, discover the incredible diversity of wildlife at Manyoni.',
        },
        wildlife: [
          {
            name: 'Lion',
            description: 'The king of the African bush, often spotted during game drives.',
          },
          {
            name: 'Leopard',
            description: 'Elusive and majestic, frequently seen in the reserve.',
          },
          {
            name: 'Elephant',
            description: 'Majestic herds roam freely across the vast wilderness.',
          },
          {
            name: 'Rhino',
            description: 'Both black and white rhino, central to conservation efforts.',
          },
          {
            name: 'Buffalo',
            description: 'Large herds graze the open plains and woodlands.',
          },
          {
            name: 'Cheetah',
            description: 'The fastest land animal, thriving in the open savanna.',
          },
          {
            name: 'Wild Dog',
            description: 'Endangered painted wolves hunt in coordinated packs.',
          },
          {
            name: 'Pangolin',
            description: "One of the world's most elusive and endangered mammals.",
          },
        ],
        background: 'white',
      },
    },

    // Conservation Section
    {
      type: 'split_content',
      props: {
        subtitle: 'Conservation',
        title: "Protecting Africa's Heritage",
        description:
          'Conservation is at the heart of everything we do at Manyoni. The reserve is a critical sanctuary for endangered species, including black and white rhino, and the elusive pangolin. Our dedicated anti-poaching teams, K-9 units, and community programs work tirelessly to ensure these species have a future.',
        features: [
          'Active anti-poaching operations',
          'K-9 unit for wildlife protection',
          'Rhino monitoring programs',
          'Pangolin conservation research',
          'Community development initiatives',
        ],
        ctaText: 'Conservation Experiences',
        ctaHref: '/activities/rhino-conservation',
        imageSrc: '/images/Birds and Wildlife/DSC00814.jpeg',
        imagePosition: 'right',
        background: 'cream',
      },
    },

    // Sustainability
    {
      type: 'features_grid',
      props: {
        heading: {
          title: 'Sustainability',
          subtitle: 'Our commitment to preserving this wilderness for future generations.',
        },
        features: [
          {
            title: 'Eco-Conscious Design',
            description:
              'Our lodge is designed to minimize environmental impact, using sustainable materials and solar energy.',
          },
          {
            title: 'Water Conservation',
            description:
              'Advanced water recycling systems and rainwater harvesting reduce our freshwater consumption.',
          },
          {
            title: 'Community Partnership',
            description:
              'We support local communities through employment, education, and sustainable development programs.',
          },
          {
            title: 'Wildlife Corridors',
            description:
              'Manyoni connects to other reserves, allowing wildlife to roam freely across vast landscapes.',
          },
          {
            title: 'Zero Single-Use Plastic',
            description:
              'We have eliminated single-use plastics throughout the lodge and on game drives.',
          },
          {
            title: 'Carbon Footprint',
            description:
              'We offset our carbon emissions and encourage guests to participate in conservation contributions.',
          },
        ],
        columns: 3,
        background: 'white',
      },
    },

    // CTA Section
    {
      type: 'cta_section',
      props: {
        title: 'Experience the Wild',
        description: 'Discover the magic of Manyoni Private Game Reserve.',
        ctaText: 'Plan Your Safari',
        ctaHref: '/contact',
        secondaryCtaText: 'View Accommodations',
        secondaryCtaHref: '/accommodations',
        background: 'image',
        imageSrc: '/images/Birds and Wildlife/AR- BY8T9786(EDITED v2).jpg',
      },
    },
  ],
};
