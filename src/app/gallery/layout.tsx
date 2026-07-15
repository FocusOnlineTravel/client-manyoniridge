import type { Metadata } from 'next';
import { buildStaticMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildStaticMetadata({
  title: 'Gallery | Manyoni Ridge Safari Lodge',
  slug: 'gallery',
});

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
