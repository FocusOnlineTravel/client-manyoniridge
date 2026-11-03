import type { MetadataRoute } from 'next';
import { SITE_CONFIG, HIDDEN_ACTIVITY_SLUGS } from '@/lib/constants';
import { getAllRooms } from '@/lib/wordpress/rooms';
import { getAllActivities } from '@/lib/wordpress/activities';

// Villas and experiences come from WordPress, so a page that is unpublished or
// moved out of Accommodations/Activities there drops out of the sitemap too.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [rooms, activities] = await Promise.all([getAllRooms(), getAllActivities()]);
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/accommodations', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/activities', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/main-lodge', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/dining', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/gallery', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/rates', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/offers', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/reserve', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms-and-conditions', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const roomRoutes = rooms.map((room) => ({
    url: `${base}/accommodations/${room.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const activityRoutes = activities
    .filter((activity) => !HIDDEN_ACTIVITY_SLUGS.includes(activity.slug))
    .map((activity) => ({
    url: `${base}/activities/${activity.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...roomRoutes,
    ...activityRoutes,
  ];
}
