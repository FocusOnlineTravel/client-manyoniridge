import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
