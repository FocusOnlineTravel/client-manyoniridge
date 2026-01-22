import { Activity } from '@/lib/types';

export const activities: Activity[] = [
  {
    slug: 'game-drives',
    title: 'Game Drives',
    subtitle: 'Discover the Big 5',
    description: `Embark on an unforgettable journey through Manyoni Private Game Reserve with our expert guides. Our morning and afternoon game drives offer the best opportunities to witness the Big 5 and countless other species in their natural habitat.

Travel in open 4x4 vehicles specifically designed for wildlife viewing, with elevated seating ensuring unobstructed views and incredible photographic opportunities. Our experienced guides share their deep knowledge of the bush, tracking animals and interpreting the subtle signs of the wilderness.`,
    shortDescription: 'Experience thrilling Big 5 encounters on morning and afternoon safari drives.',
    duration: '3-4 hours',
    difficulty: 'Easy',
    includes: [
      'Professional guide',
      'Open 4x4 vehicle',
      'Refreshments',
      'Blankets & ponchos',
      'Binoculars available',
    ],
    highlights: [
      'Big 5 game viewing',
      'Sunrise & sunset drives',
      'Expert tracking',
      'Bird watching',
      'Photography opportunities',
    ],
    images: [],
    icon: 'Binoculars',
    placeholderClass: 'placeholder-nature',
  },
  {
    slug: 'rhino-conservation',
    title: 'Rhino Conservation',
    subtitle: 'Protecting a species',
    description: `Join us for a meaningful experience that goes beyond typical safari activities. Our Rhino Conservation Experience offers an intimate look at the critical work being done to protect one of Africa's most endangered species.

Learn about the challenges facing rhinos today and the innovative approaches being used to ensure their survival. You'll have the opportunity to observe these magnificent creatures up close while our conservation team shares insights into their behavior, biology, and the ongoing efforts to secure their future.`,
    shortDescription: 'Witness conservation efforts and learn about rhino protection initiatives.',
    duration: '2-3 hours',
    difficulty: 'Easy',
    includes: [
      'Conservation guide',
      'Educational materials',
      'Refreshments',
      'Conservation contribution',
    ],
    highlights: [
      'Meet conservation team',
      'Learn about anti-poaching efforts',
      'Close rhino encounters',
      'Support conservation work',
      'Educational insights',
    ],
    images: [],
    icon: 'Shield',
    placeholderClass: 'placeholder-nature',
  },
  {
    slug: 'pangolin-experiences',
    title: 'Pangolin Experiences',
    subtitle: 'Meet the elusive pangolin',
    description: `Manyoni is home to a small population of these extraordinarily rare creatures. Our Pangolin Experience offers a once-in-a-lifetime opportunity to observe one of Africa's most elusive mammals in its natural environment.

Our specialized guides will take you into the reserve during optimal viewing times, sharing fascinating facts about pangolin behavior, diet, and the conservation challenges they face. Witnessing a wild pangolin is a privilege few will ever experience.`,
    shortDescription: 'Rare opportunity to observe one of Africa\'s most elusive mammals.',
    duration: '2-3 hours',
    difficulty: 'Moderate',
    minAge: 12,
    includes: [
      'Specialist guide',
      'Tracking equipment',
      'Refreshments',
      'Conservation contribution',
    ],
    highlights: [
      'Rare wildlife encounter',
      'Night-time tracking',
      'Conservation education',
      'Expert interpretation',
      'Unforgettable experience',
    ],
    images: [],
    icon: 'Search',
    placeholderClass: 'placeholder-nature',
  },
  {
    slug: 'k9-unit-training',
    title: 'K9 Unit Training',
    subtitle: 'Heroes on four legs',
    description: `Meet the four-legged heroes of Manyoni's anti-poaching efforts. Our K9 Unit Training Experience gives you behind-the-scenes access to the dogs and handlers who work tirelessly to protect our wildlife.

Watch training demonstrations, learn about the specialized skills these remarkable dogs possess, and understand the vital role they play in wildlife protection. This unique experience offers insight into the cutting-edge approaches being used in modern conservation.`,
    shortDescription: 'Meet the anti-poaching dogs protecting Manyoni\'s wildlife.',
    duration: '1.5-2 hours',
    difficulty: 'Easy',
    includes: [
      'K9 handler guide',
      'Training demonstration',
      'Educational talk',
      'Refreshments',
    ],
    highlights: [
      'Meet the K9 team',
      'Training demonstrations',
      'Learn tracking techniques',
      'Support anti-poaching',
      'Unique experience',
    ],
    images: [],
    icon: 'Dog',
    placeholderClass: 'placeholder-safari',
  },
  {
    slug: 'spa-services',
    title: 'Spa Services',
    subtitle: 'Wellness in the wild',
    description: `Indulge in restorative treatments that draw inspiration from the African landscape. Our spa services offer a sanctuary of calm where you can unwind after exhilarating game drives and reconnect with your inner peace.

Choose from a menu of massages, body treatments, and facials using natural, locally-sourced ingredients. Treatments can be enjoyed in the privacy of your suite or at our dedicated spa facility, always with the sounds and scents of the bush as your backdrop.`,
    shortDescription: 'Rejuvenating spa treatments inspired by the African bush.',
    duration: '1-2 hours',
    difficulty: 'Easy',
    includes: [
      'Professional therapist',
      'Natural products',
      'Relaxation area',
      'Refreshments',
    ],
    highlights: [
      'African-inspired treatments',
      'Natural ingredients',
      'In-suite options',
      'Couples treatments',
      'Complete relaxation',
    ],
    images: [],
    icon: 'Sparkles',
    placeholderClass: 'placeholder-gold',
  },
  {
    slug: 'family-experiences',
    title: 'Family Experiences',
    subtitle: 'Safari for all ages',
    description: `Create lasting family memories with our specially designed experiences for younger guests. From junior ranger programs to nature walks and creative activities, we ensure children of all ages are engaged, educated, and entertained.

Our experienced team creates age-appropriate adventures that ignite a passion for wildlife and conservation. While parents enjoy their safari, children can participate in tracking lessons, arts and crafts, and stargazing sessions designed to inspire the next generation of conservationists.`,
    shortDescription: 'Specially designed safari adventures for families with children.',
    duration: 'Varies',
    difficulty: 'Easy',
    includes: [
      'Trained guides',
      'Age-appropriate activities',
      'Educational materials',
      'Snacks & refreshments',
    ],
    highlights: [
      'Junior ranger program',
      'Nature walks',
      'Arts & crafts',
      'Stargazing',
      'Wildlife education',
    ],
    images: [],
    icon: 'Users',
    placeholderClass: 'placeholder-safari',
  },
];

export function getActivityBySlug(slug: string): Activity | undefined {
  return activities.find((activity) => activity.slug === slug);
}

export function getAllActivitySlugs(): string[] {
  return activities.map((activity) => activity.slug);
}
