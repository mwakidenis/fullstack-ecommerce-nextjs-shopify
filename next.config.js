// module.exports = {
//     // reactStrictMode: true,
//     images: {
//         domains: ["cdn.shopify.com", "images.unsplash.com", "via.placeholder.com"]
//     }
// }
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // dirs: ['src'],
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  images: {
    domains: ["cdn.shopify.com", "images.unsplash.com", "via.placeholder.com"]
  }
};

module.exports = nextConfig;
