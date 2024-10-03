import Head from "next/head";

import { MetaProps } from "@/types";

import { Metadata } from "next";

export const defaultMetadata = {
  title: "Fullstack Ecommerce Project",
  description: "Shopping Made Easier",
  openGraph: {
    title: "Fullstack Ecommerce Project",
    description: "Shopping Made Easier",
    url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}`,
    siteName: "Ecommerce Platform",
    images: [
      {
        url: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
        width: 1200,
        height: 630
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Fullstack Ecommerce Project",
    description: "Shopping Made Easier"
  }
};

type MetadataProps = {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article" | "product";
  canonical?: string;
};

export function createMetadata({
  title,
  description,
  image,
  type = "website",
  canonical
}: MetadataProps): Metadata {
  const metadata: Metadata = {
    ...defaultMetadata,
    openGraph: {
      ...defaultMetadata.openGraph,
      type
    }
  };

  if (title) {
    metadata.title = title;
    metadata.openGraph.title = title;
    metadata.twitter.title = title;
  }

  if (description) {
    metadata.description = description;
    metadata.openGraph.description = description;
    metadata.twitter.description = description;
  }

  if (image) {
    metadata.openGraph.images = [{ url: image, width: 1200, height: 630 }];
    metadata.twitter.images = [image];
  }

  if (canonical) {
    metadata.openGraph.url = canonical;
    metadata.alternates = { canonical };
  }

  return metadata;
}
