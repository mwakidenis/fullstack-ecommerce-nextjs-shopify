/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true // Disables TypeScript build errors
  },
  eslint: {
    ignoreDuringBuilds: true // Disables ESLint build errors
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/**"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com"
      }
    ]
  }
};

module.exports = nextConfig;
