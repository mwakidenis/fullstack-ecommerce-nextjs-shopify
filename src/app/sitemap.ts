import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    }
  ];
}
