/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nautical-gopher-830.convex.cloud',
      },
    ],
  },
};

export default nextConfig;
