import { getNavigationMenus } from '@/lib/wordpress/menus';
import { Header } from './Header';

/**
 * Server component wrapper for Header
 *
 * Fetches navigation menus from WordPress and passes them to the Header client component.
 * Falls back to hardcoded constants if WordPress is unavailable.
 */
export async function HeaderWrapper() {
  const { navLinks, mobileNavLinks } = await getNavigationMenus();

  return <Header navLinks={navLinks} mobileNavLinks={mobileNavLinks} />;
}
