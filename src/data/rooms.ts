import { Room } from '@/lib/types';

export const rooms: Room[] = [
  {
    slug: 'one-bedroom-suite',
    title: 'One Bedroom Suite',
    subtitle: 'Intimate luxury for two',
    description: `Experience the epitome of intimate luxury in our One Bedroom Suites. Each suite offers a private sanctuary where contemporary elegance meets the raw beauty of the African bush. Wake to the sounds of the wilderness and watch the sun rise over the reserve from your private deck.

The spacious bedroom features a king-size bed dressed in premium linens, positioned to maximize the breathtaking views. The en-suite bathroom includes both indoor and outdoor showers, allowing you to connect with nature while enjoying modern comforts. A private plunge pool invites you to cool off while watching wildlife pass by.`,
    shortDescription: 'Intimate suites perfect for couples, featuring private plunge pools and stunning bush views.',
    capacity: {
      adults: 2,
      children: 0,
    },
    size: '85 sqm',
    bedrooms: 1,
    bathrooms: 1,
    amenities: [
      'King-size bed',
      'Private plunge pool',
      'Indoor & outdoor shower',
      'Air conditioning',
      'Mini bar',
      'Coffee station',
      'Safe',
      'Complimentary Wi-Fi',
      'Ceiling fans',
      'Bathrobes & slippers',
    ],
    features: [
      'Private deck with bush views',
      'Floor-to-ceiling windows',
      'Fireplace',
      'Outdoor shower',
      'Twice-daily housekeeping',
      'Turn-down service',
    ],
    images: [
      '/images/1-bed 1.jpg',
      '/images/1-bed 2.jpg',
      '/images/1-bed 3.jpg',
      '/images/1-bed 4.jpg',
    ],
    placeholderClass: 'placeholder-room',
  },
  {
    slug: 'two-bedroom-suite',
    title: 'Two Bedroom Suite',
    subtitle: 'Spacious elegance for families',
    description: `Our Two Bedroom Suites offer the perfect blend of togetherness and privacy for families or small groups. The thoughtfully designed layout features two beautifully appointed bedrooms, each with its own en-suite bathroom, connected by a generous living area that opens onto a private deck.

The master bedroom includes a king-size bed, while the second bedroom can be configured with either a king bed or twin beds to accommodate your needs. The shared lounge area provides a comfortable space for the family to gather, while the expansive deck with private pool offers front-row seats to the African bush.`,
    shortDescription: 'Spacious family suites with two bedrooms, shared living space, and a private pool.',
    capacity: {
      adults: 4,
      children: 2,
    },
    size: '150 sqm',
    bedrooms: 2,
    bathrooms: 2,
    amenities: [
      'King-size bed in master',
      'Flexible second bedroom',
      'Private pool',
      'Indoor & outdoor showers',
      'Air conditioning',
      'Mini bar',
      'Coffee station',
      'Safe',
      'Complimentary Wi-Fi',
      'Bathrobes & slippers',
    ],
    features: [
      'Shared living area',
      'Private deck with panoramic views',
      'Two full en-suite bathrooms',
      'Fireplace',
      'Ideal for families',
      'Twice-daily housekeeping',
    ],
    images: [
      '/images/2-bed 1.jpg',
      '/images/2-bed 2.jpg',
      '/images/2-bed 3.jpg',
      '/images/2-bed 4.jpg',
      '/images/2-bed 5.jpg',
      '/images/2-bed 6.jpg',
      '/images/2-bed 7.jpg',
      '/images/2-bed 8.jpg',
    ],
    placeholderClass: 'placeholder-room',
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((room) => room.slug === slug);
}

export function getAllRoomSlugs(): string[] {
  return rooms.map((room) => room.slug);
}
