const baseUrl = `${process.env.NEXT_PUBLIC_SITE_DOMAIN}`;

export function generateHomePageMetadata() {
  return {
    // title should not be longer than 60 characters. Source: https://socialsharepreview.com/
    title: "Welcome to OneStopShop - Shopping Made Easier",
    // title: {
    //   default: "Welcome to OneStopShop",
    //   template: "%s - Shopping Made Easier"
    // },

    // description should be between 55 and 200 characters long, with a maximum of 300. Source: https://socialsharepreview.com/
    description: "Shop the best products at affordable prices.",
    openGraph: {
      title: "Welcome to My E-Commerce Store",
      description: "Find the best deals and offers on our store.",
      url: baseUrl,

      // The recommended image ratio for an og:image is 1.91:1. The optimal size would be 1200 x 630. Source: https://socialsharepreview.com/
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

export function generatePrivacyPageMetadata() {
  return {
    title: "Privacy Policy - My E-Commerce Store",
    //   robots: {
    //     index: false,
    //     follow: true,
    //   }
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
