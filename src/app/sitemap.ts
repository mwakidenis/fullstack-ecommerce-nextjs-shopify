import { getProducts } from "@/services/fetch-data-within-app";
import { MetadataRoute } from "next";
// import { NextResponse } from "next/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `${process.env.NEXT_PUBLIC_SITE_DOMAIN}`;
  const products = await getProducts();

  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SITE_DOMAIN is not defined in the environment variables."
    );
  }
  if (!products) {
    throw new Error("Could not retrieve products");
  }

  // console.log("Base URL:", baseUrl);
  // console.log("Products:", products);

  // Static pages
  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/about`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/contact`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/products`, lastModified: new Date().toISOString() }
  ];

  // Generate dynamic product detail pages
  const productPages = products.map((product) => ({
    url: `${baseUrl}/products/${product.handle}`,
    lastModified: product.updatedAt || new Date().toISOString()
    // changeFrequency:,
    // priority:"",
  }));

  // Combine static and dynamic pages
  const allPages = [...staticPages, ...productPages];

  return allPages;

  //   // Generate XML string
  //   const sitemap = `
  //     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  //       ${allPages
  //         .map((page) => {
  //           return `
  //             <url>
  //               <loc>${page.url}</loc>
  //               <lastmod>${page.lastModified}</lastmod>
  //             </url>
  //           `;
  //         })
  //         .join("")}
  //     </urlset>
  //   `;

  //   // Return the response as XML
  //   return new NextResponse(sitemap, {
  //     headers: {
  //       "Content-Type": "application/xml"
  //     }
  //   });
}
