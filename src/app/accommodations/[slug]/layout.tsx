import type { Metadata } from 'next';
import { buildStaticMetadata } from '@/lib/metadata';
import { ROOM_SEO } from '@/lib/seo';
import { getRoomBySlug } from '@/lib/data/rooms';

/**
 * The villa page itself is a client component, so its metadata is generated
 * here. Without it, every villa inherits the site-wide default title.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seo = ROOM_SEO[slug];
  const room = getRoomBySlug(slug);

  return buildStaticMetadata({
    title: seo?.title ?? room?.title ?? 'Accommodation',
    description: seo?.description ?? room?.shortDescription,
    slug: `accommodations/${slug}`,
  });
}

export default function RoomLayout({ children }: { children: React.ReactNode }) {
  return children;
}
