import type { NextConfig } from "next";
import { HIDDEN_ACTIVITY_SLUGS } from "./src/lib/constants";

const nextConfig: NextConfig = {
  // Hidden experiences would otherwise still render from the bundled
  // fallback data in src/data/activities.ts.
  async redirects() {
    return HIDDEN_ACTIVITY_SLUGS.map((slug) => ({
      source: `/activities/${slug}`,
      destination: '/activities',
      permanent: true,
    }));
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend-manyoni.focusonlinetravel.co.za',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
