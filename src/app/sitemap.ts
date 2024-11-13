import { getProducts } from "@/services/fetch-data-within-app";
import { MetadataRoute } from "next";

// Generate dynamic sitemap for SEO optimization
// Combines static routes and dynamic product pages
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get base URL from environment variables
  const baseUrl = `${process.env.NEXT_PUBLIC_SITE_DOMAIN}`;

  // Fetch all products for dynamic routes
  const products = await getProducts();

  // Validate required data is available
  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SITE_DOMAIN is not defined in the environment variables."
    );
  }
  if (!products) {
    throw new Error("Could not retrieve products");
  }

  // Define core website pages
  // Each entry includes URL and last modification date
  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/about`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/contact`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/products`, lastModified: new Date().toISOString() }
  ];

  // Generate URLs for all product detail pages
  // Uses product handle for URL and update date for lastModified
  const productPages = products.products.map((product) => ({
    url: `${baseUrl}/products/${product.handle}`,
    lastModified: product.updatedAt || new Date().toISOString()
    // TODO: Add changeFrequency when content update patterns are established
    // TODO: Add priority based on product importance
    // changeFrequency:,
    // priority:"",
  }));

  // Merge all pages into single sitemap
  const allPages = [...staticPages, ...productPages];

  return allPages;
}
