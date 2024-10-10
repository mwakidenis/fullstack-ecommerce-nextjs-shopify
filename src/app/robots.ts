import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/privacy-policy", "/payment-success"]
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/sitemap.xml`
  };
}
