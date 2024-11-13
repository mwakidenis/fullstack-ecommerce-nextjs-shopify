// import { Product, ProductVariant, Image, ProductOption } from "shopify-buy";

// export type ProductProps = Product;
// export type ShopifyVariant = ProductVariant;
// export type ShopifyImage = Image;
// export type ShopifyOption = ProductOption;
/**
 * Product-related type definitions
 * Represents the structure of product data from Shopify
 */

// Main product interface containing all product details
export interface ProductProps {
  id: string; // Unique identifier
  title: string; // Product name
  handle: string; // URL-friendly slug
  description: string; // Full product description (HTML allowed)
  publishedAt: string; // First publish date
  createdAt: string; // Creation timestamp
  updatedAt: string; // Last update timestamp
  vendor: string; // Manufacturer/brand
  productType: string; // Product category/type
  tags: string[]; // Array of product tags
  variants: ProductVariant[]; // Product variations (size, color, etc.)
  options: ProductOption[]; // Configurable options (size, color, etc.)
  images: ProductImage[]; // Product images array

  // Commented out fields for future implementation
  // status: "active" | "archived" | "draft";
  // priceRange: {
  //   minVariantPrice: MoneyV2;
  //   maxVariantPrice: MoneyV2;
  // };
}

// Product variant interface
// Represents different versions of the same product (e.g., different sizes/colors)
export interface ProductVariant {
  id: string; // Unique variant identifier
  title: string; // Variant name (e.g., "Small", "Blue")
  price: Money; // Current price
  compareAtPrice: Money | null; // Original/compare-at price
  inventoryQuantity: number; // Stock level
  weight: number; // Product weight
  weightUnit: "kg" | "g" | "lb" | "oz"; // Weight unit
  availableForSale: boolean; // Can be purchased
  requiresShipping: boolean; // Needs shipping
  barcode: string; // SKU/Barcode
  available: boolean; // In stock status
  image?: {
    url: string;
    altText: string;
  };
}

// Product option interface
// Represents configurable product attributes
export interface ProductOption {
  id: string; // Option identifier
  name: string; // Option name (e.g., "Size", "Color")
  values: string[]; // Possible values
  type: string[]; // Option types
}

// Product image interface
export interface ProductImage {
  id: string; // Image identifier
  src: string; // Image URL
  altText: string; // Accessibility text
  width: number; // Image width
  height: number; // Image height
}

// Money amount with currency
export interface MoneyV2 {
  amount: string; // Decimal amount as string
  currencyCode: string; // ISO currency code
}

// Meta information for SEO
export interface MetaProps {
  title: string; // Page title
  description: string; // Meta description
  image?: string; // OG image URL
  type?: "website" | "article" | "product"; // Content type
  canonical?: string; // Canonical URL
}

/**
 * Cart-related type definitions
 * Represents shopping cart structure and items
 */

// Basic money type for cart calculations
export type Money = {
  amount: string; // Decimal amount as string
  currencyCode: string; // ISO currency code
};

// Cart cost breakdown
export type CartCost = {
  totalAmount: Money; // Final amount including all fees
  subtotalAmount: Money; // Amount before tax/shipping
  totalTaxAmount: Money; // Tax amount
};

// Shopping cart item
export interface CartItem {
  id: string; // Cart item identifier
  quantity: number; // Number of items
  merchandise: {
    id: string; // Product variant ID
    title: string; // Variant title
    price: Money; // Item price
    image?: {
      url: string;
      altText: string;
    };
    product: {
      title: string; // Product title
      image?: {
        // Optional product image
        url: string;
        altText?: string;
      };
    };
  };
}

// Main cart interface
export interface Cart {
  id: string; // Cart identifier
  checkoutUrl: string; // Checkout page URL
  totalQuantity: number; // Total items in cart
  cost: {
    subtotalAmount: Money; // Amount before fees
    totalAmount: Money; // Final amount
    totalTaxAmount: Money; // Tax amount
  };
  // lines: CartItem[]; // Array of cart items
  lines: {
    edges: {
      node: CartItem;
    }[];
  };
}

export interface GetCartResponse {
  cart: Cart;
}

export interface CreateCartResponse {
  cartCreate: {
    cart: Cart;
  };
}

export interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: Cart;
  };
}

export interface CartLinesUpdateResponse {
  cartLinesUpdate: {
    cart: Cart;
  };
}

export interface CartLinesRemoveResponse {
  cartLinesRemove: {
    cart: Cart;
  };
}

// Shipping information type
export type ShippingDetails = {
  name: string; // Recipient name
  email: string; // Contact email
  address: string; // Street address
  city: string; // City
  state: string; // State/province
  postalCode: string; // ZIP/postal code
  country: string; // Country
};
