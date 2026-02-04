#!/usr/bin/env node
/**
 * WordPress Full Import Script - Manyoni Ridge Safari Lodge
 *
 * This script imports all 11 pages with complete content to WordPress
 *
 * Usage:
 *   WORDPRESS_URL=https://backend-manyoni.focusonlinetravel.co.za \
 *   WORDPRESS_USER="Focus Online Dev" \
 *   WORDPRESS_APP_PASSWORD=lfBgXUD(PGED#g^evO8R(Jkq \
 *   node scripts/import-to-wordpress-full.mjs
 */

import fetch from 'node-fetch';

// Configuration
const config = {
  wpUrl: process.env.WORDPRESS_URL || 'https://backend-manyoni.focusonlinetravel.co.za',
  wpUser: process.env.WORDPRESS_USER || 'Focus Online Dev',
  wpPassword: process.env.WORDPRESS_APP_PASSWORD,
};

// Validate
if (!config.wpPassword) {
  console.error('❌ Error: WORDPRESS_APP_PASSWORD required');
  process.exit(1);
}

// Auth
const auth = Buffer.from(`${config.wpUser}:${config.wpPassword}`).toString('base64');
const headers = {
  'Authorization': `Basic ${auth}`,
  'Content-Type': 'application/json',
};

/**
 * Complete page data for all 11 pages
 */
const pages = [
  // 1. HOME PAGE
  {
    slug: 'home',
    title: 'Home',
    meta_description: 'Experience the magic of the African bush at our boutique safari lodge in Manyoni Private Game Reserve. Big 5 encounters, exceptional service, and unforgettable moments await.',
    status: 'publish',
    sections: [
      {
        acf_fc_layout: 'hero_image',
        subtitle: 'Opening September 2026',
        title: 'Intimate Luxury in the Wild',
        description: 'Experience the magic of the African bush at our boutique safari lodge in Manyoni Private Game Reserve. Big 5 encounters, exceptional service, and unforgettable moments await.',
        ctaText: 'Enquire Now',
        ctaHref: '/contact',
        secondaryCtaText: 'Explore',
        secondaryCtaHref: '/accommodations',
        scrollToId: 'intro',
        videoSrc: '/videos/manynoi.mp4',
        verticalAlign: 'bottom',
        textBackground: true,
      },
      {
        acf_fc_layout: 'text_block',
        title: 'Welcome to Manyoni Ridge',
        subtitle: 'Your Safari Awaits',
        description: "Nestled in the heart of Manyoni Private Game Reserve, Manyoni Ridge offers an intimate safari experience where luxury meets wilderness. With only nine exclusive suites, we provide personalized service and unforgettable encounters with Africa's most iconic wildlife.",
        ctaText: 'Discover Our Story',
        ctaHref: '/about',
        background: 'cream',
      },
      {
        acf_fc_layout: 'split_content',
        subtitle: 'The Experience',
        title: 'Where Luxury Meets Wilderness',
        description: 'Every detail at Manyoni Ridge has been carefully considered to create an experience that honors both the magnificence of the African bush and your desire for comfort. From your private plunge pool overlooking the reserve to our exceptional cuisine, every moment is crafted to exceed expectations.',
        features: [
          { text: 'Big 5 private game reserve' },
          { text: 'Only 9 intimate suites' },
          { text: 'All-inclusive luxury experience' },
          { text: 'Expert guides and trackers' },
          { text: 'Conservation-focused activities' },
        ],
        ctaText: 'View Accommodations',
        ctaHref: '/accommodations',
        imageSrc: '/images/Birds and Wildlife/DSC00844.jpeg',
        imagePosition: 'left',
      },
      {
        acf_fc_layout: 'room_cards_section',
        roomSlugs: [
          { slug: 'one-bedroom-suite' },
          { slug: 'two-bedroom-suite' },
        ],
        variant: 'featured',
        headingTitle: 'Our Suites',
        headingSubtitle: 'Choose from our luxurious one and two bedroom suites, each offering private pools, stunning views, and unparalleled comfort in the heart of the bush.',
        background: 'off-white',
        layout: 'grid',
      },
      {
        acf_fc_layout: 'stats_strip',
        stats: [
          { value: '23,000', label: 'Hectares of Wilderness' },
          { value: 'Big 5', label: 'Game Reserve' },
          { value: '9', label: 'Exclusive Suites' },
          { value: '400+', label: 'Bird Species' },
        ],
        background: 'primary-dark',
      },
      {
        acf_fc_layout: 'activity_cards_section',
        activitySlugs: [
          { slug: 'game-drives' },
          { slug: 'rhino-conservation' },
          { slug: 'pangolin-experiences' },
        ],
        headingTitle: 'Safari Activities',
        headingSubtitle: 'From thrilling game drives to meaningful conservation experiences, discover the many ways to connect with the African wilderness.',
        background: 'white',
        showViewAllLink: true,
      },
      {
        acf_fc_layout: 'split_content',
        subtitle: 'Conservation',
        title: "Protecting Africa's Heritage",
        description: 'At Manyoni Ridge, conservation is at the heart of everything we do. The reserve is home to critical populations of rhino and the elusive pangolin. By staying with us, you directly support anti-poaching efforts, habitat restoration, and community development initiatives.',
        ctaText: 'Learn About Conservation',
        ctaHref: '/reserve',
        imageSrc: '/images/Birds and Wildlife/DSC00470.jpeg',
        imagePosition: 'right',
        background: 'cream',
      },
      {
        acf_fc_layout: 'newsletter_section',
        title: 'Be the First to Know',
        description: 'Manyoni Ridge Safari Lodge opens in September 2026. Subscribe to receive exclusive early booking offers and news from the bush.',
      },
      {
        acf_fc_layout: 'cta_section',
        title: 'Begin Your Safari Journey',
        description: 'Contact us to start planning your unforgettable experience at Manyoni Ridge Safari Lodge.',
        ctaText: 'Make an Enquiry',
        ctaHref: '/contact',
        secondaryCtaText: 'View FAQ',
        secondaryCtaHref: '/faq',
        background: 'image',
        imageSrc: '/images/MANYONI RIDGE CLUBHOUSE RENDERS 22.jpg',
      },
    ],
  },

  // 2. ABOUT PAGE
  {
    slug: 'about',
    title: 'About Us',
    meta_description: 'Learn about Manyoni Ridge Safari Lodge - our story, vision, and commitment to exceptional safari experiences.',
    status: 'publish',
    sections: [
      {
        acf_fc_layout: 'hero_image',
        subtitle: 'About Us',
        title: 'Our Story',
        description: "A vision born from a passion for Africa's wilderness and a commitment to sharing its magic.",
        size: 'large',
        imageSrc: '/images/Birds and Wildlife/DSC00748.jpeg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
      {
        acf_fc_layout: 'text_block',
        title: 'Intimate Luxury in the Wild',
        subtitle: 'Our Philosophy',
        description: 'Manyoni Ridge was created with a singular vision: to offer an intimate safari experience where exceptional service meets authentic wilderness. We believe that the best safari experiences are personal, meaningful, and deeply connected to the land and its people.',
        background: 'cream',
      },
      {
        acf_fc_layout: 'split_content',
        subtitle: 'The Beginning',
        title: 'A Dream Realized',
        description: 'Manyoni Ridge emerged from years of planning and a deep love for the African bush. Set within the renowned Manyoni Private Game Reserve, our lodge represents a new chapter in sustainable luxury tourism in KwaZulu-Natal. Every aspect of our design and operation reflects our commitment to conservation, community, and unforgettable guest experiences.',
        imageSrc: '/images/2-bed 1.jpg',
        imagePosition: 'left',
      },
      {
        acf_fc_layout: 'values_list',
        headingTitle: 'Our Values',
        headingSubtitle: 'The principles that guide everything we do at Manyoni Ridge.',
        values: [
          {
            title: 'Authenticity',
            description: 'Genuine experiences rooted in the traditions and rhythms of the African bush.',
          },
          {
            title: 'Conservation',
            description: 'Active participation in protecting wildlife and their habitats for future generations.',
          },
          {
            title: 'Excellence',
            description: 'Uncompromising commitment to quality in every detail of your experience.',
          },
          {
            title: 'Community',
            description: 'Supporting local communities through employment, education, and sustainable development.',
          },
        ],
        columns: 4,
        background: 'white',
      },
      {
        acf_fc_layout: 'split_content',
        subtitle: 'Our People',
        title: 'Expert Guides & Dedicated Team',
        description: "Behind every exceptional safari experience is a team of passionate professionals. Our guides are among the most experienced in KwaZulu-Natal, with deep knowledge of the bush and its inhabitants. Our hospitality team brings warmth and attention to detail that transforms a stay into a cherished memory.",
        features: [
          { text: 'FGASA qualified field guides' },
          { text: 'Multi-lingual staff' },
          { text: 'Expert trackers' },
          { text: 'Dedicated conservation team' },
          { text: 'Professional hospitality training' },
        ],
        imageSrc: '/images/Birds and Wildlife/Secretarybird Kgalagadi Transfrontier NP SA AR-061 Edited.jpg',
        imagePosition: 'right',
        background: 'cream',
      },
      {
        acf_fc_layout: 'opening_info',
        subtitle: 'Coming Soon',
        title: 'Opening September 2026',
        description: 'Manyoni Ridge Safari Lodge is currently under construction and will welcome its first guests in September 2026. We invite you to register your interest and be among the first to experience our new lodge.',
        imageSrc: '/images/2-bed 6.jpg',
        background: 'white',
      },
    ],
  },

  // 3. ACCOMMODATIONS PAGE
  {
    slug: 'accommodations',
    title: 'Accommodations',
    meta_description: 'Discover our luxurious one and two bedroom suites at Manyoni Ridge Safari Lodge. Each suite offers private pools, stunning bush views, and exceptional comfort.',
    status: 'publish',
    sections: [
      {
        acf_fc_layout: 'hero_image',
        subtitle: 'Accommodations',
        title: 'Suites in the Heart of the Bush',
        description: 'Experience unparalleled comfort in our intimate collection of suites, each offering private pools, breathtaking views, and seamless harmony with the African wilderness.',
        size: 'large',
        imageSrc: '/images/2-bed 1.jpg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
      {
        acf_fc_layout: 'content_section',
        headingTitle: 'Your Private Sanctuary',
        content: 'Manyoni Ridge offers just nine exclusive suites, ensuring an intimate and personalized experience. Choose between our romantic one bedroom suites or spacious two bedroom family suites, each thoughtfully designed to immerse you in luxury while celebrating the natural beauty that surrounds you.',
        centered: true,
        background: 'cream',
      },
      {
        acf_fc_layout: 'room_cards_section',
        roomSlugs: [
          { slug: 'one-bedroom-suite' },
          { slug: 'two-bedroom-suite' },
        ],
        variant: 'featured',
        background: 'white',
        layout: 'stack',
      },
      {
        acf_fc_layout: 'features_grid',
        headingTitle: 'Suite Features',
        headingSubtitle: 'Every suite at Manyoni Ridge comes with exceptional amenities and services.',
        features: [
          {
            title: 'Private Plunge Pool',
            description: 'Each suite features a private pool where you can cool off while watching wildlife pass by.',
          },
          {
            title: 'Indoor & Outdoor Showers',
            description: 'Experience the freedom of showering under the African sky or retreat to your luxurious indoor bathroom.',
          },
          {
            title: 'Expansive Decks',
            description: 'Generous private decks offer the perfect vantage point for game viewing from the comfort of your suite.',
          },
          {
            title: 'King-Size Beds',
            description: 'Sink into premium linens and enjoy restful sleep in our handcrafted king-size beds.',
          },
          {
            title: 'Climate Control',
            description: 'Stay comfortable year-round with air conditioning and ceiling fans in every suite.',
          },
          {
            title: 'Complimentary Amenities',
            description: 'Mini bar, coffee station, safe, Wi-Fi, bathrobes, and slippers included in every suite.',
          },
        ],
        columns: 3,
        background: 'off-white',
      },
      {
        acf_fc_layout: 'cta_section',
        title: 'Ready to Book Your Stay?',
        description: 'Contact us to check availability and start planning your safari experience.',
        ctaText: 'Make an Enquiry',
        ctaHref: '/contact',
        secondaryCtaText: 'View FAQ',
        secondaryCtaHref: '/faq',
        background: 'gold',
      },
    ],
  },

  // 4. ACTIVITIES PAGE
  {
    slug: 'activities',
    title: 'Safari Activities',
    meta_description: 'Discover unforgettable safari experiences at Manyoni Ridge. From Big 5 game drives to rhino conservation and family adventures.',
    status: 'publish',
    sections: [
      {
        acf_fc_layout: 'hero_image',
        subtitle: 'Safari Activities',
        title: 'Experiences That Define Your Safari',
        description: 'From thrilling game drives to meaningful conservation encounters, discover the many ways to connect with the African wilderness at Manyoni Ridge.',
        size: 'large',
        imageSrc: '/images/Birds and Wildlife/DSC00631.jpeg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
      {
        acf_fc_layout: 'content_section',
        headingTitle: 'Unforgettable Encounters',
        content: 'At Manyoni Ridge, we believe the best safari experiences go beyond game viewing. Our activities are designed to create deep connections with the African wilderness, its wildlife, and the communities working to protect it. Each experience is guided by our expert team who share their passion and knowledge of this remarkable ecosystem.',
        centered: true,
        background: 'cream',
      },
      {
        acf_fc_layout: 'activity_cards_section',
        activitySlugs: [
          { slug: 'game-drives' },
          { slug: 'rhino-conservation' },
          { slug: 'pangolin-experiences' },
          { slug: 'k9-unit-training' },
          { slug: 'spa-services' },
          { slug: 'family-experiences' },
        ],
        background: 'white',
      },
      {
        acf_fc_layout: 'daily_schedule',
        headingTitle: 'Your Day at Manyoni Ridge',
        headingSubtitle: 'A typical day at Manyoni Ridge is filled with adventure and relaxation.',
        schedule: [
          { time: '05:30', title: 'Wake Up Call', description: 'Rise with the sun and enjoy tea or coffee in your suite.' },
          { time: '06:00', title: 'Morning Game Drive', description: 'Set out on an early morning safari to catch the wildlife at its most active.' },
          { time: '09:30', title: 'Breakfast', description: 'Return to the lodge for a hearty breakfast with bush views.' },
          { time: '11:00', title: 'Optional Activities', description: 'Join a conservation experience, spa treatment, or relax by your pool.' },
          { time: '13:00', title: 'Lunch', description: 'Enjoy a light lunch at the main lodge or your private deck.' },
          { time: '15:30', title: 'High Tea', description: 'Refresh with afternoon tea and treats before your evening drive.' },
          { time: '16:00', title: 'Afternoon Game Drive', description: 'Head out as the day cools, returning after a sundowner stop in the bush.' },
          { time: '19:30', title: 'Dinner', description: 'Dine under the stars or in our boma, sharing stories of the day.' },
        ],
        background: 'off-white',
      },
    ],
  },

  // 5. DINING PAGE
  {
    slug: 'dining',
    title: 'Dining',
    meta_description: 'Experience exceptional cuisine at Manyoni Ridge Safari Lodge. From bush breakfasts to boma dinners under the stars.',
    status: 'publish',
    sections: [
      {
        acf_fc_layout: 'hero_image',
        subtitle: 'Culinary Experience',
        title: 'Dining Under the African Sky',
        description: 'Savor exceptional cuisine crafted from fresh, local ingredients, enjoyed in unforgettable settings from our elegant dining room to intimate bush dinners.',
        size: 'large',
        imageSrc: '/images/MANYONI RIDGE CLUBHOUSE RENDERS dark.jpg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
      {
        acf_fc_layout: 'content_section',
        headingTitle: 'A Culinary Journey',
        content: "At Manyoni Ridge, dining is an integral part of your safari experience. Our talented chefs create dishes that celebrate the rich flavors of South Africa while incorporating international influences. Every meal is an opportunity to gather, share stories of the day's adventures, and create lasting memories.",
        centered: true,
        background: 'cream',
      },
      {
        acf_fc_layout: 'split_content',
        subtitle: 'Main Lodge',
        title: 'Elegant Dining with Bush Views',
        description: 'Our main dining area offers a sophisticated setting where you can enjoy breakfast, lunch, and dinner while overlooking the African bush. Floor-to-ceiling windows ensure uninterrupted views, while the open-plan kitchen allows you to watch our chefs at work.',
        features: [
          { text: 'Seasonal menus featuring local ingredients' },
          { text: 'Extensive wine selection from South African estates' },
          { text: 'Accommodations for all dietary requirements' },
          { text: 'À la carte and set menu options' },
        ],
        imageSrc: '/images/MANYONI RIDGE CLUBHOUSE RENDERS 32.jpg',
        imagePosition: 'left',
      },
      {
        acf_fc_layout: 'dining_experiences',
        headingTitle: 'Dining Experiences',
        headingSubtitle: 'From intimate bush dinners to starlit boma evenings, every meal is an experience.',
        experiences: [
          {
            title: 'Bush Breakfast',
            description: 'After your morning game drive, enjoy a hearty breakfast served in a scenic location in the bush.',
            placeholder: 'placeholder-nature',
          },
          {
            title: 'Sundowner Drinks',
            description: 'Pause during your afternoon drive to toast the African sunset with drinks and canapés.',
            placeholder: 'placeholder-gold',
          },
          {
            title: 'Boma Dinner',
            description: 'Dine around the fire in our traditional boma, under a canopy of stars.',
            placeholder: 'placeholder-safari',
          },
          {
            title: 'Private Dining',
            description: 'Celebrate special occasions with a private dinner on your suite deck or a secluded bush location.',
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
      {
        acf_fc_layout: 'split_content',
        subtitle: 'Wine & Beverages',
        title: 'A Cellar Worth Exploring',
        description: 'Our carefully curated wine list showcases the best of South African viticulture, from the celebrated estates of Stellenbosch and Franschhoek to hidden gems from lesser-known regions. Our bar offers premium spirits, craft beers, and signature cocktails inspired by the African bush.',
        features: [
          { text: 'Award-winning South African wines' },
          { text: 'Premium international spirits' },
          { text: 'Local craft beers' },
          { text: 'Signature safari cocktails' },
          { text: 'Expertly paired wine dinners available' },
        ],
        imagePlaceholder: 'placeholder-gold',
        imagePosition: 'right',
        background: 'cream',
      },
      {
        acf_fc_layout: 'dietary_options',
        headingTitle: 'Dietary Accommodations',
        description: 'We understand that every guest has unique dietary needs and preferences. Please inform us in advance of any allergies, intolerances, or dietary requirements, and our chefs will ensure your meals are prepared with the utmost care.',
        options: [
          { text: 'Vegetarian' },
          { text: 'Vegan' },
          { text: 'Gluten-Free' },
          { text: 'Halal' },
          { text: 'Kosher' },
          { text: 'Low-Sodium' },
          { text: 'Dairy-Free' },
          { text: 'Nut-Free' },
        ],
        background: 'white',
      },
    ],
  },

  // 6. RESERVE PAGE
  {
    slug: 'reserve',
    title: 'The Reserve',
    meta_description: 'Discover Manyoni Private Game Reserve - 23,000 hectares of pristine African wilderness, home to the Big 5 and critical conservation efforts.',
    status: 'publish',
    sections: [
      {
        acf_fc_layout: 'hero_image',
        subtitle: 'The Reserve',
        title: 'Manyoni Private Game Reserve',
        description: '23,000 hectares of pristine African wilderness in the heart of Zululand, home to the Big 5 and a thriving ecosystem of wildlife.',
        size: 'large',
        imageSrc: '/images/Birds and Wildlife/DSC00814.jpeg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
      {
        acf_fc_layout: 'text_block',
        title: 'A Wilderness Preserved',
        subtitle: 'Zululand, KwaZulu-Natal',
        description: "Manyoni Private Game Reserve is a testament to successful conservation in South Africa. Formed from 17 former cattle farms, this remarkable reserve in northern KwaZulu-Natal has been restored to its natural state, creating a sanctuary for Africa's most iconic wildlife.",
        background: 'cream',
      },
      {
        acf_fc_layout: 'split_content',
        subtitle: 'Big 5 Territory',
        title: "Home to Africa's Most Iconic Wildlife",
        description: 'Manyoni is one of the few Big 5 reserves in KwaZulu-Natal, offering exceptional opportunities to encounter lion, leopard, elephant, rhino, and buffalo in their natural habitat. Our expert guides and trackers ensure unforgettable wildlife encounters on every game drive.',
        features: [
          { text: 'All Big 5 species present' },
          { text: 'Cheetah and wild dog populations' },
          { text: 'Over 400 bird species recorded' },
          { text: 'Diverse habitats and ecosystems' },
        ],
        ctaText: 'View Activities',
        ctaHref: '/activities',
        imageSrc: '/images/Birds and Wildlife/Leopard Kruger SA AR-072 Edited.jpg',
        imagePosition: 'left',
      },
      {
        acf_fc_layout: 'wildlife_grid',
        headingTitle: 'Wildlife of Manyoni',
        headingSubtitle: 'From the Big 5 to the rare pangolin, discover the incredible diversity of wildlife at Manyoni.',
        wildlife: [
          { name: 'Lion', description: 'The king of the African bush, often spotted during game drives.' },
          { name: 'Leopard', description: 'Elusive and majestic, frequently seen in the reserve.' },
          { name: 'Elephant', description: 'Majestic herds roam freely across the vast wilderness.' },
          { name: 'Rhino', description: 'Both black and white rhino, central to conservation efforts.' },
          { name: 'Buffalo', description: 'Large herds graze the open plains and woodlands.' },
          { name: 'Cheetah', description: 'The fastest land animal, thriving in the open savanna.' },
          { name: 'Wild Dog', description: 'Endangered painted wolves hunt in coordinated packs.' },
          { name: 'Pangolin', description: "One of the world's most elusive and endangered mammals." },
        ],
        background: 'white',
      },
      {
        acf_fc_layout: 'split_content',
        subtitle: 'Conservation',
        title: "Protecting Africa's Heritage",
        description: 'Conservation is at the heart of everything we do at Manyoni. The reserve is a critical sanctuary for endangered species, including black and white rhino, and the elusive pangolin. Our dedicated anti-poaching teams, K-9 units, and community programs work tirelessly to ensure these species have a future.',
        features: [
          { text: 'Active anti-poaching operations' },
          { text: 'K-9 unit for wildlife protection' },
          { text: 'Rhino monitoring programs' },
          { text: 'Pangolin conservation research' },
          { text: 'Community development initiatives' },
        ],
        ctaText: 'Conservation Experiences',
        ctaHref: '/activities/rhino-conservation',
        imageSrc: '/images/Birds and Wildlife/DSC00814.jpeg',
        imagePosition: 'right',
        background: 'cream',
      },
      {
        acf_fc_layout: 'features_grid',
        headingTitle: 'Sustainability',
        headingSubtitle: 'Our commitment to preserving this wilderness for future generations.',
        features: [
          { title: 'Eco-Conscious Design', description: 'Our lodge is designed to minimize environmental impact, using sustainable materials and solar energy.' },
          { title: 'Water Conservation', description: 'Advanced water recycling systems and rainwater harvesting reduce our freshwater consumption.' },
          { title: 'Community Partnership', description: 'We support local communities through employment, education, and sustainable development programs.' },
          { title: 'Wildlife Corridors', description: 'Manyoni connects to other reserves, allowing wildlife to roam freely across vast landscapes.' },
          { title: 'Zero Single-Use Plastic', description: 'We have eliminated single-use plastics throughout the lodge and on game drives.' },
          { title: 'Carbon Footprint', description: 'We offset our carbon emissions and encourage guests to participate in conservation contributions.' },
        ],
        columns: 3,
        background: 'white',
      },
    ],
  },

  // 7. GALLERY PAGE
  {
    slug: 'gallery',
    title: 'Gallery',
    meta_description: 'Explore the beauty of Manyoni Ridge through our collection of images showcasing wildlife, accommodation, and unforgettable moments.',
    status: 'publish',
    sections: [
      {
        acf_fc_layout: 'hero_image',
        subtitle: 'Gallery',
        title: 'Capturing the Magic',
        description: 'Explore the beauty of Manyoni Ridge through our collection of images showcasing wildlife, accommodation, and unforgettable moments.',
        size: 'large',
        imageSrc: '/images/Birds and Wildlife/Roller, Lilac-breasted Kruger SA AR-016 Edited.jpg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
      {
        acf_fc_layout: 'gallery',
        headingTitle: 'Photo Gallery',
        headingSubtitle: 'Browse our collection of images from the reserve and lodge.',
        categories: [
          { id: 'all', label: 'All' },
          { id: 'wildlife', label: 'Wildlife' },
          { id: 'lodge', label: 'Lodge' },
          { id: 'suites', label: 'Suites' },
          { id: 'activities', label: 'Activities' },
          { id: 'landscape', label: 'Landscape' },
        ],
        items: [
          { id: 1, category: 'wildlife', image: '/images/Birds and Wildlife/leopard 2 - ar.jpg', alt: 'Leopard in the African bush' },
          { id: 2, category: 'lodge', image: '/images/2-bed 1.jpg', alt: 'Main lodge exterior' },
          { id: 3, category: 'suites', image: '/images/1-bed 1.jpg', alt: 'One bedroom suite interior' },
          { id: 4, category: 'activities', image: '/images/Birds and Wildlife/Secretarybird Kgalagadi Transfrontier NP SA AR-061 Edited.jpg', alt: 'Secretarybird on safari' },
          { id: 5, category: 'landscape', image: '/images/Birds and Wildlife/DSC00748.jpeg', alt: 'Sunset over the reserve' },
          { id: 6, category: 'wildlife', image: '/images/Birds and Wildlife/DSC00470.jpeg', alt: 'Wildlife on the reserve' },
          { id: 7, category: 'lodge', image: '/images/2-bed 5.jpg', alt: 'Dining area' },
          { id: 8, category: 'suites', image: '/images/1-bed 2.jpg', alt: 'Private suite with plunge pool' },
          { id: 9, category: 'activities', image: '/images/Birds and Wildlife/Roller, Lilac-breasted Kruger SA AR-016 Edited.jpg', alt: 'Lilac-breasted Roller' },
          { id: 10, category: 'landscape', image: '/images/Birds and Wildlife/DSC00595.jpeg', alt: 'African landscape' },
          { id: 11, category: 'wildlife', image: '/images/Birds and Wildlife/Leopard Kruger SA AR-072 Edited.jpg', alt: 'Leopard resting' },
          { id: 12, category: 'lodge', image: '/images/2-bed 8.jpg', alt: 'Lodge interior' },
          { id: 13, category: 'wildlife', image: '/images/Birds and Wildlife/Eagle, Martial Kruger SA AR-010 Edited.jpg', alt: 'Martial Eagle' },
          { id: 14, category: 'suites', image: '/images/2-bed 2.jpg', alt: 'Two bedroom suite' },
          { id: 15, category: 'wildlife', image: '/images/Birds and Wildlife/Sunbird, Scarlet-chested Cape Vidal SA AR-2 Edited.jpg', alt: 'Scarlet-chested Sunbird' },
          { id: 16, category: 'landscape', image: '/images/Birds and Wildlife/DSC00631.jpeg', alt: 'African bush landscape' },
          { id: 17, category: 'wildlife', image: '/images/Birds and Wildlife/Kingfisher, Malachite Midmar SA AR-001 Edited.jpg', alt: 'Malachite Kingfisher' },
          { id: 18, category: 'suites', image: '/images/1-bed 3.jpg', alt: 'Suite bedroom' },
          { id: 19, category: 'wildlife', image: '/images/Birds and Wildlife/roller, lilac-breasted ar.jpg', alt: 'Lilac-breasted Roller' },
          { id: 20, category: 'lodge', image: '/images/2-bed 10.jpg', alt: 'Lodge amenities' },
        ],
        background: 'white',
      },
      {
        acf_fc_layout: 'content_section',
        content: 'Discover the incredible wildlife and luxury accommodations at Manyoni Ridge Safari Lodge. For media inquiries or high-resolution images, please contact us.',
        centered: true,
        background: 'cream',
      },
      {
        acf_fc_layout: 'cta_section',
        title: 'Experience It In Person',
        description: 'Pictures only tell part of the story. Book your stay to experience Manyoni Ridge for yourself.',
        ctaText: 'Make an Enquiry',
        ctaHref: '/contact',
        background: 'gold',
      },
    ],
  },

  // 8. CONTACT PAGE
  {
    slug: 'contact',
    title: 'Contact Us',
    meta_description: 'Get in touch with Manyoni Ridge Safari Lodge. Make a booking enquiry or contact our team for more information.',
    status: 'publish',
    sections: [
      {
        acf_fc_layout: 'hero_image',
        subtitle: 'Contact',
        title: 'Get in Touch',
        description: "We'd love to hear from you. Reach out to start planning your safari adventure.",
        size: 'medium',
        imageSrc: '/images/2-bed 8.jpg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
      {
        acf_fc_layout: 'contact_info',
        background: 'white',
      },
      {
        acf_fc_layout: 'getting_here',
        headingTitle: 'Getting Here',
        headingSubtitle: 'Manyoni Ridge is accessible by road from Durban or Richards Bay, or via charter flight.',
        directions: [
          { title: 'From Durban', description: 'Approximately 3 hours by road from King Shaka International Airport. Self-drive or private transfer available.' },
          { title: 'From Richards Bay', description: 'Approximately 1.5 hours by road. The closest commercial airport. Private transfers can be arranged.' },
          { title: 'Charter Flight', description: 'Charter flights can be arranged to nearby airstrips. Please contact us for recommendations and arrangements.' },
        ],
        background: 'cream',
      },
    ],
  },

  // 9. FAQ PAGE
  {
    slug: 'faq',
    title: 'Frequently Asked Questions',
    meta_description: 'Find answers to common questions about Manyoni Ridge Safari Lodge - rates, bookings, activities, and more.',
    status: 'publish',
    sections: [
      {
        acf_fc_layout: 'hero_image',
        subtitle: 'FAQ',
        title: 'Frequently Asked Questions',
        description: 'Find answers to common questions about your stay at Manyoni Ridge Safari Lodge.',
        size: 'large',
        imageSrc: '/images/Birds and Wildlife/DSC00595.jpeg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
      {
        acf_fc_layout: 'faq_accordion',
        categories: [
          {
            title: 'Rates & Inclusions',
            items: [
              { question: 'What is included in the rates?', answer: 'Our all-inclusive rates cover accommodation, all meals, selected beverages (house wines, local beers, spirits, and soft drinks), two game drives daily, and Wi-Fi. Premium beverages and spa treatments are available at additional cost.' },
              { question: 'Are there different rates for children?', answer: 'Yes, we offer reduced rates for children. Children under 6 stay free when sharing with parents. Children 6-12 receive a 50% discount. Please note that children under 6 are only permitted in the Two Bedroom Suites.' },
              { question: 'Is there a minimum stay requirement?', answer: 'We recommend a minimum stay of 2 nights to fully experience Manyoni Ridge and the reserve. During peak seasons, a 3-night minimum may apply.' },
              { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards (Visa, MasterCard, American Express), bank transfers, and cash in South African Rand. A 50% deposit is required to confirm your booking.' },
            ],
          },
          {
            title: 'Cancellation Policy',
            items: [
              { question: 'What is your cancellation policy?', answer: 'Cancellations made more than 30 days before arrival receive a full refund minus admin fees. Cancellations 15-30 days before arrival forfeit 50% of the deposit. Cancellations within 14 days of arrival forfeit the full deposit.' },
              { question: 'Can I reschedule my booking?', answer: 'Yes, we understand plans can change. Rescheduling requests made more than 30 days before arrival are accommodated subject to availability at no additional charge. Requests within 30 days may incur a rebooking fee.' },
              { question: 'Do you recommend travel insurance?', answer: 'Yes, we strongly recommend comprehensive travel insurance that covers trip cancellation, medical expenses, and evacuation. Safari destinations can be remote, and insurance provides peace of mind.' },
            ],
          },
          {
            title: 'Children & Family',
            items: [
              { question: 'Is Manyoni Ridge suitable for children?', answer: 'Absolutely! Our Two Bedroom Suites are perfect for families. We offer dedicated family experiences, junior ranger programs, and child-friendly menus. Children must be supervised at all times due to the presence of wildlife.' },
              { question: 'What age restrictions apply to activities?', answer: 'Children of all ages can enjoy game drives in the Two Bedroom Suites\' private vehicle. The Pangolin Experience has a minimum age of 12. Walking safaris require guests to be at least 16. Our family experiences are designed for children 4 and above.' },
              { question: 'Is babysitting available?', answer: 'Yes, we can arrange qualified babysitting services with advance notice. This allows parents to enjoy activities unsuitable for younger children. Please inform us of your requirements when booking.' },
            ],
          },
          {
            title: 'Wildlife & Safari',
            items: [
              { question: 'What wildlife can we expect to see?', answer: 'Manyoni Private Game Reserve is home to the Big 5 (lion, leopard, elephant, rhino, and buffalo), as well as cheetah, wild dog, giraffe, zebra, hippo, and numerous antelope species. Over 400 bird species have been recorded.' },
              { question: 'How many game drives are included?', answer: 'Two game drives are included daily: a morning drive departing at sunrise and an afternoon drive returning after sunset. Each drive lasts approximately 3-4 hours. Additional drives can be arranged at extra cost.' },
              { question: 'What should I wear on game drives?', answer: 'Neutral-colored clothing (khaki, olive, brown) is recommended. Layers are essential as mornings can be cool. Closed shoes, a hat, and sunglasses are advisable. We provide blankets, ponchos, and binoculars.' },
            ],
          },
          {
            title: 'Weather & Best Times to Visit',
            items: [
              { question: 'What is the best time to visit?', answer: 'Manyoni is excellent year-round. Dry winter months (May-September) offer superb game viewing as animals gather at water sources. Summer (October-April) brings lush landscapes, baby animals, and migratory birds.' },
              { question: 'What is the weather like?', answer: 'KwaZulu-Natal enjoys a subtropical climate. Summer temperatures range from 25-35°C with afternoon thunderstorms. Winter days are warm (20-28°C) but mornings and evenings can be cool (8-15°C). Pack layers year-round.' },
              { question: 'Is malaria a concern?', answer: 'Manyoni Private Game Reserve is in a low-risk malaria area. However, we recommend consulting your doctor before travel about prophylactics. We also suggest using insect repellent, especially during summer months.' },
            ],
          },
          {
            title: 'Getting There',
            items: [
              { question: 'How do we get to Manyoni Ridge?', answer: 'The nearest airport is Richards Bay (1.5 hours) or King Shaka International in Durban (3 hours). We can arrange road transfers or charter flights. Detailed directions are provided upon booking confirmation.' },
              { question: 'Do you offer airport transfers?', answer: 'Yes, we offer private road transfers from Richards Bay and Durban airports. Charter flights can also be arranged to nearby airstrips. Transfer rates are available upon request.' },
              { question: 'Can we self-drive to the lodge?', answer: 'Yes, the lodge is accessible by sedan car on tarred and well-maintained gravel roads. We provide detailed driving directions and GPS coordinates. The scenic drive through KwaZulu-Natal is part of the experience.' },
            ],
          },
        ],
        background: 'white',
      },
      {
        acf_fc_layout: 'content_section',
        headingTitle: 'Still Have Questions?',
        content: "Our team is here to help. Get in touch and we'll respond within 24 hours.",
        centered: true,
        background: 'cream',
      },
    ],
  },

  // 10. OFFERS PAGE
  {
    slug: 'offers',
    title: 'Special Offers',
    meta_description: 'Discover special packages and exclusive offers at Manyoni Ridge Safari Lodge. Early booking discounts, honeymoon packages, and more.',
    status: 'publish',
    sections: [
      {
        acf_fc_layout: 'hero_image',
        subtitle: 'Special Offers',
        title: 'Exclusive Packages & Offers',
        description: 'Discover our special packages designed to enhance your Manyoni Ridge experience.',
        size: 'medium',
        imageSrc: '/images/Birds and Wildlife/Sunbird, Scarlet-chested Cape Vidal SA AR-2 Edited.jpg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
      {
        acf_fc_layout: 'content_section',
        headingTitle: 'Value Without Compromise',
        content: 'While Manyoni Ridge represents the pinnacle of luxury safari experiences, we offer a range of packages and offers to help you plan your perfect stay. All our rates are fully inclusive of accommodation, meals, beverages, and game activities.',
        centered: true,
        background: 'cream',
      },
      {
        acf_fc_layout: 'offers_list',
        offers: [
          {
            title: 'Early Bird Offer',
            subtitle: 'Book 6+ months in advance',
            description: 'Plan ahead and save. Book your stay at least 6 months in advance and receive a special early booking discount on your accommodation.',
            highlights: [
              { text: '10% discount on accommodation' },
              { text: 'Complimentary spa treatment' },
              { text: 'Priority room selection' },
            ],
            validUntil: 'Valid for stays from September 2026',
            imageSrc: '/images/Birds and Wildlife/DSC00569.jpeg',
          },
          {
            title: 'Honeymoon Package',
            subtitle: 'Celebrate your love',
            description: 'Begin your married life with an unforgettable safari honeymoon. Our romantic package includes special touches to make your celebration extraordinary.',
            highlights: [
              { text: 'Private dinner under the stars' },
              { text: 'Couples spa treatment' },
              { text: 'Champagne & chocolate on arrival' },
              { text: 'Late checkout' },
            ],
            validUntil: 'Available year-round',
            imageSrc: '/images/1-bed 1.jpg',
          },
          {
            title: 'Family Safari',
            subtitle: 'Create lasting memories',
            description: 'Bring the family together for an African adventure. Our family package includes activities designed for all ages and special rates for children.',
            highlights: [
              { text: 'Free stays for children under 6' },
              { text: '50% discount for children 6-12' },
              { text: 'Junior ranger programs' },
              { text: 'Family game drive vehicle' },
            ],
            validUntil: 'Available year-round',
            imageSrc: '/images/Birds and Wildlife/DSC00816.jpeg',
          },
          {
            title: 'Extended Stay',
            subtitle: '5 nights or more',
            description: 'Immerse yourself in the bush with an extended stay. The longer you stay, the more you save, and the deeper your connection with the African wilderness.',
            highlights: [
              { text: '5 nights: 10% discount' },
              { text: '7 nights: 15% discount' },
              { text: 'Complimentary laundry service' },
              { text: 'Private bush dinner included' },
            ],
            validUntil: 'Available year-round',
            imageSrc: '/images/Birds and Wildlife/DSC00600.jpeg',
          },
        ],
        background: 'white',
      },
      {
        acf_fc_layout: 'content_section',
        headingTitle: 'Terms & Conditions',
        content: 'All offers are subject to availability and cannot be combined with other promotions unless specified. Offers may be withdrawn or modified at any time. Full terms and conditions will be provided at the time of booking. For detailed information about any offer, please contact our reservations team.',
        centered: true,
        background: 'off-white',
      },
    ],
  },

  // 11. MAIN LODGE PAGE
  {
    slug: 'main-lodge',
    title: 'Main Lodge',
    meta_description: 'Discover the heart of Manyoni Ridge Safari Lodge. Our Main Lodge offers elegant shared spaces including a lounge, bar, dining area, viewing deck, and games room.',
    status: 'publish',
    sections: [
      {
        acf_fc_layout: 'hero_image',
        subtitle: 'Main Lodge',
        title: 'The Heart of Manyoni Ridge',
        description: 'Where comfort meets elegance in the heart of the African bush. Our Main Lodge offers beautifully designed spaces for relaxation, dining, and connection.',
        size: 'large',
        imageSrc: '/images/MANYONI RIDGE CLUBHOUSE RENDERS 7.jpg',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
      {
        acf_fc_layout: 'text_block',
        title: 'A Sanctuary of Shared Experiences',
        subtitle: 'Welcome',
        description: "The Main Lodge at Manyoni Ridge serves as the social heart of your safari experience. Designed to blend seamlessly with the surrounding landscape, our lodge offers a collection of inviting spaces where guests can gather, share stories of the day's adventures, and immerse themselves in the spirit of the African bush.",
        background: 'cream',
      },
      {
        acf_fc_layout: 'split_content',
        subtitle: 'Relax & Unwind',
        title: 'The Lounge',
        description: "Our elegant lounge provides a comfortable retreat with plush seating, a roaring fireplace, and floor-to-ceiling windows offering panoramic views of the reserve. Whether you're enjoying your morning coffee, reading a book from our curated library, or simply watching wildlife pass by, the lounge creates the perfect environment for relaxation.",
        features: [
          { text: 'Comfortable seating areas' },
          { text: 'Fireplace for cool evenings' },
          { text: 'Panoramic bush views' },
          { text: 'Curated book library' },
          { text: 'Wi-Fi available' },
        ],
        imageSrc: '/images/MANYONI RIDGE CLUBHOUSE RENDERS 1.jpg',
        imagePosition: 'right',
        background: 'white',
      },
      {
        acf_fc_layout: 'features_grid',
        headingTitle: 'Main Lodge Amenities',
        headingSubtitle: 'Everything you need for the perfect safari experience',
        features: [
          { title: 'Complimentary Wi-Fi', description: 'Stay connected with high-speed internet throughout the Main Lodge.' },
          { title: 'Air Conditioning', description: 'Climate-controlled comfort in all indoor spaces.' },
          { title: 'Curated Library', description: 'Wildlife guides, fiction, and non-fiction for all interests.' },
          { title: 'Daily Housekeeping', description: 'Immaculate spaces maintained throughout the day.' },
          { title: 'Fireplace', description: 'Cozy warmth for cooler evenings in the bush.' },
          { title: 'Wildlife Viewing', description: 'Prime position for observing animals visiting the waterhole.' },
        ],
        columns: 3,
        background: 'off-white',
      },
      {
        acf_fc_layout: 'cta_section',
        title: 'Experience the Main Lodge',
        description: 'Book your stay at Manyoni Ridge and discover the perfect blend of luxury and wilderness.',
        ctaText: 'Make an Enquiry',
        ctaHref: '/contact',
        secondaryCtaText: 'View Accommodations',
        secondaryCtaHref: '/accommodations',
        background: 'image',
        imageSrc: '/images/Birds and Wildlife/DSC00748.jpeg',
      },
    ],
  },
];

/**
 * Make authenticated request to WordPress REST API
 */
async function wpRequest(endpoint, method = 'GET', body = null) {
  const url = `${config.wpUrl}/wp-json/wp/v2${endpoint}`;

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      let errorMsg = `HTTP ${response.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.message) {
          errorMsg += `: ${errorJson.message}`;
        }
      } catch (e) {
        errorMsg += `: ${errorText}`;
      }
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ Request failed: ${endpoint} - ${error.message}`);
    throw error;
  }
}

/**
 * Check if WordPress is accessible
 */
async function checkConnection() {
  console.log('🔌 Testing WordPress connection...');

  try {
    const response = await fetch(`${config.wpUrl}/wp-json`);
    if (!response.ok) {
      throw new Error(`WordPress not accessible: ${response.status}`);
    }
    console.log('✅ WordPress is accessible\n');
    return true;
  } catch (error) {
    console.error('❌ Cannot connect to WordPress');
    console.error(error.message);
    return false;
  }
}

/**
 * Test authentication
 */
async function testAuth() {
  console.log('🔐 Testing authentication...');

  try {
    await wpRequest('/users/me');
    console.log('✅ Authentication successful\n');
    return true;
  } catch (error) {
    console.error('❌ Authentication failed');
    console.error('Please check your username and Application Password\n');
    return false;
  }
}

/**
 * Check if page exists
 */
async function pageExists(slug) {
  try {
    const pages = await wpRequest(`/pages?slug=${slug}`);
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    return null;
  }
}

/**
 * Create or update a page
 */
async function createPage(pageData) {
  const { slug, title, meta_description, status, sections } = pageData;

  console.log(`\n📄 Processing page: ${title} (${slug})`);

  // Check if page already exists
  const existing = await pageExists(slug);

  const pagePayload = {
    title,
    slug,
    status,
    excerpt: meta_description,
    meta: {
      description: meta_description,
    },
  };

  let page;

  if (existing) {
    console.log(`   ℹ️  Page already exists (ID: ${existing.id})`);
    console.log(`   🔄 Updating...`);
    page = await wpRequest(`/pages/${existing.id}`, 'POST', pagePayload);
    console.log(`   ✅ Updated`);
  } else {
    console.log(`   ➕ Creating new page...`);
    page = await wpRequest('/pages', 'POST', pagePayload);
    console.log(`   ✅ Created (ID: ${page.id})`);
  }

  // Update ACF fields
  if (sections && sections.length > 0) {
    console.log(`   📝 Adding ${sections.length} sections...`);
    await updateACFFields(page.id, sections);
    console.log(`   ✅ Sections processed`);
  }

  return page;
}

/**
 * Update ACF fields for a page
 */
async function updateACFFields(pageId, sections) {
  // Use ACF to REST API plugin endpoint
  const url = `${config.wpUrl}/wp-json/acf/v3/pages/${pageId}`;

  const updateData = {
    fields: {
      sections: sections,
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    console.log(`   ✅ ACF sections successfully added!`);
    return true;
  } catch (error) {
    console.warn(`   ⚠️  ACF update failed: ${error.message}`);
    console.log(`   ℹ️  Sections will need to be added manually via WordPress Admin`);
    return false;
  }
}

/**
 * Main import function
 */
async function main() {
  console.log('================================================================================');
  console.log('WordPress Content Import - Manyoni Ridge Safari Lodge');
  console.log('================================================================================\n');
  console.log(`WordPress URL: ${config.wpUrl}`);
  console.log(`User: ${config.wpUser}\n`);

  // Step 1: Check connection
  if (!await checkConnection()) {
    process.exit(1);
  }

  // Step 2: Test authentication
  if (!await testAuth()) {
    process.exit(1);
  }

  // Step 3: Import pages
  console.log('📦 Importing pages...\n');
  console.log('=' .repeat(80));

  const createdPages = [];

  for (const pageData of pages) {
    try {
      const page = await createPage(pageData);
      createdPages.push(page);
    } catch (error) {
      console.error(`\n❌ Failed to create page: ${pageData.title}`);
      console.error(error.message);
    }
  }

  // Step 4: Summary
  console.log('\n' + '='.repeat(80));
  console.log('\n✅ Import Complete!\n');
  console.log(`Pages created/updated: ${createdPages.length} of ${pages.length}`);
  console.log('\nCreated pages:');
  createdPages.forEach(page => {
    console.log(`   ✓ ${page.title.rendered} - ${config.wpUrl}/${page.slug}`);
  });

  console.log('\n📋 Next Steps:\n');
  console.log('1. Go to WordPress Admin and verify pages were created');
  console.log('2. Check that ACF sections are populated (may need manual entry)');
  console.log('3. Upload images to Media Library (see IMAGE_MIGRATION_GUIDE.md)');
  console.log('4. Link images to appropriate ACF image fields');
  console.log('5. Set homepage: Settings > Reading > Static page > Home');
  console.log('6. Enable WordPress mode in Next.js (.env.local: NEXT_PUBLIC_USE_WORDPRESS=true)');
  console.log('7. Test frontend: npm run dev\n');

  console.log('================================================================================\n');
}

// Run the import
main().catch((error) => {
  console.error('\n❌ Fatal error during import:');
  console.error(error);
  process.exit(1);
});
