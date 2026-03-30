import { Room } from '@/lib/types';
import { rooms as localRooms, getRoomBySlug as getLocalRoomBySlug } from '@/lib/data/rooms';

/**
 * WordPress Rooms Client
 *
 * Fetches room data from WordPress REST API with fallback to local data.
 */

const WP_API_URL =
  process.env.NEXT_PUBLIC_WP_API_URL ||
  'https://backend-manyoni.focusonlinetravel.co.za/wp-json/wp/v2';

const ACCOMMODATIONS_PAGE_ID = 336; // Parent page ID for room child pages

const USE_WORDPRESS = process.env.NEXT_PUBLIC_USE_WORDPRESS === 'true';

interface WPRoomPage {
  id: number;
  slug: string;
  title: { rendered: string };
  parent: number;
  acf?: {
    subtitle?: string;
    shortDescription?: string;
    description?: string;
    heroImage?: { url?: string; sizes?: Record<string, string> } | string | number;
    images?: Array<{ url?: string; sizes?: Record<string, string> } | string | number> | false;
    capacityAdults?: string | number;
    capacityChildren?: string | number;
    bedrooms?: string | number;
    bathrooms?: string | number;
    size?: string;
    amenities?: Array<{ text: string }>;
    features?: Array<{ text: string }>;
  };
}

/**
 * Get image URL from ACF image field (can be ID, URL, or object)
 */
function getImageUrl(image: unknown): string | undefined {
  if (!image) return undefined;
  if (typeof image === 'string') return image;
  if (typeof image === 'object' && image !== null) {
    const img = image as Record<string, unknown>;
    if (img.url) return img.url as string;
    if (img.sizes && typeof img.sizes === 'object') {
      const sizes = img.sizes as Record<string, string>;
      return sizes.large || sizes.medium_large || sizes.full;
    }
  }
  return undefined;
}

/**
 * Transform WordPress room data to Room type
 */
function transformWordPressRoom(wpRoom: WPRoomPage): Room {
  const acf = wpRoom.acf || {};

  // Handle images array - can be gallery or array of image objects, or false if empty
  let images: string[] = [];
  if (acf.images && Array.isArray(acf.images)) {
    images = acf.images.map(getImageUrl).filter((url): url is string => !!url);
  }

  return {
    slug: wpRoom.slug,
    title: wpRoom.title?.rendered || '',
    subtitle: acf.subtitle || '',
    description: acf.description || '',
    shortDescription: acf.shortDescription || '',
    capacity: {
      adults: Number(acf.capacityAdults) || 2,
      children: Number(acf.capacityChildren) || 0,
    },
    size: acf.size || '',
    bedrooms: Number(acf.bedrooms) || 1,
    bathrooms: Number(acf.bathrooms) || 1,
    amenities: Array.isArray(acf.amenities) ? acf.amenities.map((a) => a.text) : [],
    features: Array.isArray(acf.features) ? acf.features.map((f) => f.text) : [],
    images,
    heroImage: getImageUrl(acf.heroImage),
    placeholderClass: 'placeholder-room',
  };
}

/**
 * Merge WordPress room with local room data for missing fields
 */
function mergeRoomWithLocal(wpRoom: Room, localRoom?: Room): Room {
  if (!localRoom) return wpRoom;

  return {
    ...wpRoom,
    // Use local data for missing fields
    subtitle: wpRoom.subtitle || localRoom.subtitle,
    description: wpRoom.description || localRoom.description,
    shortDescription: wpRoom.shortDescription || localRoom.shortDescription,
    size: wpRoom.size || localRoom.size,
    amenities: wpRoom.amenities.length > 0 ? wpRoom.amenities : localRoom.amenities,
    features: wpRoom.features.length > 0 ? wpRoom.features : localRoom.features,
    images: wpRoom.images.length > 0 ? wpRoom.images : localRoom.images,
    heroImage: wpRoom.heroImage || localRoom.heroImage,
    placeholderClass: localRoom.placeholderClass,
  };
}

/**
 * Get all rooms from WordPress or local data
 */
export async function getAllRooms(): Promise<Room[]> {
  if (!USE_WORDPRESS) {
    return localRooms;
  }

  try {
    // Fetch child pages of accommodations (parent ID 336)
    const response = await fetch(
      `${WP_API_URL}/pages?parent=${ACCOMMODATIONS_PAGE_ID}&per_page=50&_fields=id,slug,title,parent,acf`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      console.warn('[Rooms] Failed to fetch from WordPress, using local data');
      return localRooms;
    }

    const pages: WPRoomPage[] = await response.json();

    if (!pages || pages.length === 0) {
      console.warn('[Rooms] No room pages found in WordPress, using local data');
      return localRooms;
    }

    // Transform and merge with local data
    return pages.map((wpRoom) => {
      const transformed = transformWordPressRoom(wpRoom);
      const localRoom = localRooms.find((r) => r.slug === wpRoom.slug);
      return mergeRoomWithLocal(transformed, localRoom);
    });
  } catch (error) {
    console.error('[Rooms] Error fetching from WordPress:', error);
    return localRooms;
  }
}

/**
 * Get a single room by slug from WordPress or local data
 */
export async function getRoomBySlug(slug: string): Promise<Room | undefined> {
  if (!USE_WORDPRESS) {
    return getLocalRoomBySlug(slug);
  }

  try {
    const response = await fetch(
      `${WP_API_URL}/pages?slug=${slug}&parent=${ACCOMMODATIONS_PAGE_ID}&_fields=id,slug,title,parent,acf`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      console.warn(`[Rooms] Failed to fetch room '${slug}' from WordPress, checking local data`);
      return getLocalRoomBySlug(slug);
    }

    const pages: WPRoomPage[] = await response.json();

    if (!pages || pages.length === 0) {
      console.warn(`[Rooms] Room page '${slug}' not found in WordPress, checking local data`);
      return getLocalRoomBySlug(slug);
    }

    const transformed = transformWordPressRoom(pages[0]);
    const localRoom = getLocalRoomBySlug(slug);
    return mergeRoomWithLocal(transformed, localRoom);
  } catch (error) {
    console.error(`[Rooms] Error fetching room page '${slug}' from WordPress:`, error);
    return getLocalRoomBySlug(slug);
  }
}

/**
 * Get all room slugs
 */
export async function getAllRoomSlugs(): Promise<string[]> {
  const rooms = await getAllRooms();
  return rooms.map((room) => room.slug);
}
