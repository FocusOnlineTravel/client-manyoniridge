import { Room } from '@/lib/types';
import { rooms as localRooms, getRoomBySlug as getLocalRoomBySlug } from '@/lib/data/rooms';

/**
 * WordPress Rooms Client
 *
 * Fetches room data from WordPress GraphQL API with fallback to local data.
 */

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_WP_GRAPHQL_URL ||
  'https://backend-manyoni.focusonlinetravel.co.za/graphql';

const USE_WORDPRESS = process.env.NEXT_PUBLIC_USE_WORDPRESS === 'true';

/**
 * GraphQL query to fetch all room pages (children of accommodations page)
 */
const GET_ALL_ROOMS_QUERY = `
query GetAllRoomPages {
  pages(where: { parent: "accommodations" }, first: 50) {
    nodes {
      slug
      title
      roomDetails {
        subtitle
        shortDescription
        description
        heroImage {
          node {
            sourceUrl
          }
        }
        images {
          node {
            sourceUrl
          }
        }
        capacityAdults
        capacityChildren
        bedrooms
        bathrooms
        size
        amenities {
          text
        }
        features {
          text
        }
      }
    }
  }
}
`;

/**
 * GraphQL query to fetch a single room page by slug
 */
const GET_ROOM_BY_SLUG_QUERY = `
query GetRoomPageBySlug($slug: ID!) {
  page(id: $slug, idType: URI) {
    slug
    title
    roomDetails {
      subtitle
      shortDescription
      description
      heroImage {
        node {
          sourceUrl
        }
      }
      images {
        node {
          sourceUrl
        }
      }
      capacityAdults
      capacityChildren
      bedrooms
      bathrooms
      size
      amenities {
        text
      }
      features {
        text
      }
    }
  }
}
`;

/**
 * Execute a GraphQL query
 */
async function fetchGraphQL<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status}`);
  }

  const json = await response.json();

  if (json.errors) {
    console.error('GraphQL errors:', json.errors);
    throw new Error('GraphQL query failed');
  }

  return json.data;
}

/**
 * Transform WordPress room data to Room type
 */
function transformWordPressRoom(wpRoom: any): Room {
  const details = wpRoom.roomDetails || {};

  return {
    slug: wpRoom.slug,
    title: wpRoom.title || '',
    subtitle: details.subtitle || '',
    description: details.description || '',
    shortDescription: details.shortDescription || '',
    capacity: {
      adults: details.capacityAdults || 2,
      children: details.capacityChildren || 0,
    },
    size: details.size || '',
    bedrooms: details.bedrooms || 1,
    bathrooms: details.bathrooms || 1,
    amenities: details.amenities?.map((a: any) => a.text) || [],
    features: details.features?.map((f: any) => f.text) || [],
    images: details.images?.map((img: any) => img.node?.sourceUrl).filter(Boolean) || [],
    heroImage: details.heroImage?.node?.sourceUrl,
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
    const data = await fetchGraphQL<{ pages: { nodes: any[] } }>(GET_ALL_ROOMS_QUERY);

    if (!data.pages?.nodes || data.pages.nodes.length === 0) {
      console.warn('[Rooms] No room pages found in WordPress, using local data');
      return localRooms;
    }

    // Transform and merge with local data
    return data.pages.nodes.map((wpRoom) => {
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
    // For child pages, we need to use the full URI path
    const uri = `/accommodations/${slug}/`;
    const data = await fetchGraphQL<{ page: any }>(GET_ROOM_BY_SLUG_QUERY, { slug: uri });

    if (!data.page) {
      console.warn(`[Rooms] Room page '${slug}' not found in WordPress, checking local data`);
      return getLocalRoomBySlug(slug);
    }

    const transformed = transformWordPressRoom(data.page);
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
