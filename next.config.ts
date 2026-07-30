import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
