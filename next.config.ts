import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'content.manyoniridge.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
