import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.dashboard360.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
