import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    '*',
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: '10MB',
    },
  },
  async headers() {
    return [
      {
        source: '/:path*(.)(jpg|jpeg|png|gif|ico|svg|webp)', // Match image file extensions
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Cache for 1 year, immutable
          },
        ],
      },
    ];
  },
};
export default nextConfig;
