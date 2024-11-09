import { MetadataRoute } from "next";

// Robots.txt configuration for search engine crawlers
// Defines which parts of the site can be crawled and indexed
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // Applies to all web crawlers
      allow: "/", // Allow crawling of main site
      disallow: [
        "/admin", // Prevent crawling of admin area
        "/privacy-policy", // Keep policy pages private
        "/payment-success" // Exclude transaction pages
      ]
    },
    // Link to sitemap for search engine indexing
    // Uses environment variable for dynamic domain
    sitemap: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/sitemap.xml`
  };
}
