const nextConfig = {
  typescript: {
    ignoreBuildErrors: true // Disables TypeScript build errors
  },
  eslint: {
    ignoreDuringBuilds: true // Disables ESLint build errors
  },
  images: {
    domains: ["cdn.shopify.com", "images.unsplash.com", "via.placeholder.com"]
  }
};

export default nextConfig;
