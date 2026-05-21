import { NavLink } from '@/lib/types';
import { NAV_LINKS, MOBILE_NAV_LINKS } from '@/lib/constants';

/**
 * WordPress Menu GraphQL Client
 *
 * Fetches navigation menus from WordPress using WPGraphQL.
 */

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_WP_GRAPHQL_URL ||
  'https://backend-manyoni.focusonlinetravel.co.za/graphql';

/**
 * GraphQL query to fetch a menu by location
 * WordPress menus are registered with locations like 'PRIMARY', 'MAIN_MENU', etc.
 */
const GET_MENU_BY_LOCATION_QUERY = `
query GetMenuByLocation($location: MenuLocationEnum!) {
  menuItems(where: { location: $location }, first: 50) {
    nodes {
      id
      label
      url
      path
      order
      parentId
      childItems {
        nodes {
          id
          label
          url
          path
          order
        }
      }
    }
  }
}
`;

/**
 * GraphQL query to fetch a menu by name/slug
 */
const GET_MENU_BY_NAME_QUERY = `
query GetMenuByName($name: ID!) {
  menu(id: $name, idType: NAME) {
    id
    name
    menuItems(first: 50) {
      nodes {
        id
        label
        url
        path
        order
        parentId
        childItems {
          nodes {
            id
            label
            url
            path
            order
          }
        }
      }
    }
  }
}
`;

interface WPMenuItem {
  id: string;
  label: string;
  url: string;
  path: string;
  order: number;
  parentId: string | null;
  childItems?: {
    nodes: WPMenuItem[];
  };
}

interface MenuByLocationResponse {
  menuItems: {
    nodes: WPMenuItem[];
  };
}

interface MenuByNameResponse {
  menu: {
    id: string;
    name: string;
    menuItems: {
      nodes: WPMenuItem[];
    };
  } | null;
}

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
    next: { revalidate: 60 }, // ISR with 60 second revalidation
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
 * Transform WordPress menu item URL to relative path
 * Converts absolute WordPress URLs to relative paths for Next.js Link
 */
function transformMenuUrl(url: string, path: string): string {
  // If path is available and looks correct, use it
  if (path && path.startsWith('/')) {
    // Remove trailing slash except for home
    return path === '/' ? '/' : path.replace(/\/$/, '');
  }

  // Otherwise, extract path from URL
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    // Remove trailing slash except for home
    return pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  } catch {
    // If URL parsing fails, return as-is or path
    return path || url;
  }
}

/**
 * Transform WordPress menu items to NavLink format
 */
function transformMenuItems(items: WPMenuItem[]): NavLink[] {
  return items
    .filter((item) => !item.parentId) // Only top-level items
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      href: transformMenuUrl(item.url, item.path),
      label: item.label,
    }));
}

/**
 * Fetch main menu from WordPress by location
 *
 * @param location - Menu location (e.g., 'PRIMARY', 'MAIN_MENU', 'HEADER')
 * @returns Array of NavLink items
 */
export async function getMenuByLocation(location: string): Promise<NavLink[]> {
  try {
    const data = await fetchGraphQL<MenuByLocationResponse>(GET_MENU_BY_LOCATION_QUERY, {
      location: location.toUpperCase(),
    });

    if (!data.menuItems?.nodes?.length) {
      console.warn(`No menu items found for location: ${location}`);
      return [];
    }

    return transformMenuItems(data.menuItems.nodes);
  } catch (error) {
    console.error(`Error fetching menu by location ${location}:`, error);
    return [];
  }
}

/**
 * Fetch menu from WordPress by name/slug
 *
 * @param name - Menu name (e.g., 'Main Menu', 'Mobile Menu')
 * @returns Array of NavLink items
 */
export async function getMenuByName(name: string): Promise<NavLink[]> {
  try {
    const data = await fetchGraphQL<MenuByNameResponse>(GET_MENU_BY_NAME_QUERY, {
      name,
    });

    if (!data.menu?.menuItems?.nodes?.length) {
      console.warn(`No menu found with name: ${name}`);
      return [];
    }

    return transformMenuItems(data.menu.menuItems.nodes);
  } catch (error) {
    console.error(`Error fetching menu by name ${name}:`, error);
    return [];
  }
}

/**
 * Fetch navigation menus with fallback to constants
 *
 * Tries to fetch from WordPress first, falls back to hardcoded constants if unavailable.
 */
export async function getNavigationMenus(): Promise<{
  navLinks: NavLink[];
  mobileNavLinks: NavLink[];
}> {
  const useWordPress = process.env.NEXT_PUBLIC_USE_WORDPRESS === 'true';

  if (!useWordPress) {
    return {
      navLinks: [...NAV_LINKS],
      mobileNavLinks: [...MOBILE_NAV_LINKS],
    };
  }

  try {
    // Try fetching by name first (more reliable across WordPress setups)
    const [mainMenu, mobileMenu] = await Promise.all([
      getMenuByName('Main Menu'),
      getMenuByName('Mobile Menu'),
    ]);

    return {
      navLinks: mainMenu.length > 0 ? mainMenu : [...NAV_LINKS],
      mobileNavLinks: mobileMenu.length > 0 ? mobileMenu : [...MOBILE_NAV_LINKS],
    };
  } catch (error) {
    console.error('Error fetching WordPress menus, using fallback:', error);
    return {
      navLinks: [...NAV_LINKS],
      mobileNavLinks: [...MOBILE_NAV_LINKS],
    };
  }
}
