// Base URL from environment variables for generating absolute URLs
const baseUrl = `${process.env.NEXT_PUBLIC_SITE_DOMAIN}`;

/**
 * Metadata generator functions for various pages
 * These functions generate SEO-optimized metadata including Open Graph and Twitter cards
 * Follow best practices for title lengths, descriptions, and image dimensions
 */

/**
 * Generates metadata for the home page
 * Title optimized for 60 characters max (Source: https://socialsharepreview.com/)
 * Description between 55-200 characters (Source: https://socialsharepreview.com/)
 */
export function generateHomePageMetadata() {
  return {
    title: "Welcome to OneStopShop - Shopping Made Easier",
    description: "Shop the best products at affordable prices.",
    openGraph: {
      title: "Welcome to My E-Commerce Store",
      description: "Find the best deals and offers on our store.",
      url: baseUrl,
      // OG image ratio 1.91:1 (1200x630) for optimal display
      images: [
        {
          url: "/homepage-og-image.jpg",
          width: 1200,
          height: 630,
          alt: "E-Commerce Store Home Page"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Welcome to My E-Commerce Store",
      description: "Shop for high-quality products.",
      images: ["/homepage-og-image.jpg"],
      site: "@onestopshop"
    }
  };
}

/**
 * Generates metadata for privacy policy page
 * Can be configured to control indexing with robots meta
 */
export function generatePrivacyPageMetadata() {
  return {
    title: "Privacy Policy - My E-Commerce Store",
    // Optional robots control
    // robots: {
    //   index: false,
    //   follow: true,
    // }
    description: "Get in touch with us for any queries or support.",
    openGraph: {
      title: "Privacy Policy - My E-Commerce Store",
      description: "Get in touch with us for any queries or support.",
      url: `${baseUrl}/contact/`,
      images: [
        {
          url: "/contact-og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Privacy Policy"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Privacy Policy - My E-Commerce Store",
      description: "We are here to help you.",
      images: ["/contact-og-image.jpg"],
      site: "@onestopshop"
    }
  };
}

/**
 * Generates metadata for product listing page
 * Optimized for product discovery and SEO
 */
export function generateProductListingMetadata() {
  return {
    title: "Products - My E-Commerce Store",
    description: "Browse through our wide range of amazing products.",
    openGraph: {
      title: "Products - My E-Commerce Store",
      description: "Browse through our wide range of amazing products.",
      url: `${baseUrl}/products`,
      images: [
        {
          url: "/products-og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Products"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Products - My E-Commerce Store",
      description: "Find high-quality products.",
      images: ["/products-og-image.jpg"],
      site: "@onestopshop"
    }
  };
}

/**
 * Generates dynamic metadata for individual product pages
 * Uses product data to create unique meta descriptions and titles
 */
export async function generateProductDetailMetadata(product: any) {
  return {
    title: `${product.title} | OneStopShop - Shopping Made Easier`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      url: `${baseUrl}/product/${product.handle}`,
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 600,
          alt: product.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
      site: "@onestopshop"
    }
  };
}

/**
 * Generates metadata for category pages
 * Formats category names and creates breadcrumb-style titles
 */
export function generateCategoryMetadata(category: string) {
  // Format category name for display (e.g., "mens/shoes" -> "Mens > Shoes")
  const formattedCategory = category
    .split("/")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" > ");

  return {
    title: `${formattedCategory} - My E-Commerce Store`,
    description: `Browse our collection of ${category} products.`,
    openGraph: {
      title: `${formattedCategory} - My E-Commerce Store`,
      description: `Browse our collection of ${category} products.`,
      type: "website"
    }
  };
}

/**
 * Generates metadata for cart page
 * Non-indexable by default as it's a user-specific page
 */
export function generateCartPageMetadata() {
  return {
    title: "Cart - My E-Commerce Store",
    description: "Learn more about our company, mission, and values.",
    openGraph: {
      title: "Cart - My E-Commerce Store",
      description: "Learn more about our company, mission, and values.",
      url: `${baseUrl}/about`,
      images: [
        {
          url: "/about-og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Cart"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Cart - My E-Commerce Store",
      description: "Discover our journey and mission.",
      images: ["/about-og-image.jpg"],
      site: "@onestopshop"
    }
  };
}

/**
 * Generates metadata for checkout page
 * Should be non-indexable and include nofollow directives
 */
export function generateCheckouttPageMetadata() {
  return {
    title: "Checkout - My E-Commerce Store",
    description: "Learn more about our company, mission, and values.",
    openGraph: {
      title: "Checkout - My E-Commerce Store",
      description: "Learn more about our company, mission, and values.",
      url: `${baseUrl}/about`,
      images: [
        {
          url: "/about-og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Checkout"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Checkout - My E-Commerce Store",
      description: "Discover our journey and mission.",
      images: ["/about-og-image.jpg"],
      site: "@onestopshop"
    }
  };
}

/**
 * Generates metadata for payment success page
 * Should be non-indexable and include nofollow directives
 */
export function generatePaymentSuccesstPageMetadata() {
  return {
    title: "Payment Success - My E-Commerce Store",
    description: "Learn more about our company, mission, and values.",
    openGraph: {
      title: "Payment Success - My E-Commerce Store",
      description: "Learn more about our company, mission, and values.",
      url: `${baseUrl}/about`,
      images: [
        {
          url: "/about-og-image.jpg",
          width: 1200,
          height: 630,
          alt: "PaymentSuccess"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Payment Success - My E-Commerce Store",
      description: "Discover our journey and mission.",
      images: ["/about-og-image.jpg"],
      site: "@onestopshop"
    }
  };
}

/**
 * Generates metadata for about page
 * Includes company information and mission statement
 */
export function generateAboutPageMetadata() {
  return {
    title: "About Us - My E-Commerce Store",
    description: "Learn more about our company, mission, and values.",
    openGraph: {
      title: "About Us - My E-Commerce Store",
      description: "Learn more about our company, mission, and values.",
      url: `${baseUrl}/about`,
      images: [
        {
          url: "/about-og-image.jpg",
          width: 1200,
          height: 630,
          alt: "About Us"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "About Us - My E-Commerce Store",
      description: "Discover our journey and mission.",
      images: ["/about-og-image.jpg"],
      site: "@onestopshop"
    }
  };
}

/**
 * Generates metadata for contact page
 * Includes contact information and support details
 */
export function generateContactPageMetadata() {
  return {
    title: "Contact Us - My E-Commerce Store",
    description: "Get in touch with us for any queries or support.",
    openGraph: {
      title: "Contact Us - My E-Commerce Store",
      description: "Get in touch with us for any queries or support.",
      url: `${baseUrl}/contact/`,
      images: [
        {
          url: "/contact-og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Contact Us"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Us - My E-Commerce Store",
      description: "We are here to help you.",
      images: ["/contact-og-image.jpg"],
      site: "@onestopshop"
    }
  };
}
