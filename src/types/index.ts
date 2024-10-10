export interface ProductProps {
  id: string;
  title: string;
  handle: string;
  description: string;
  //   publishedAt: string;
  createdAt: string;
  updatedAt: string;
  vendor: string;
  productType: string;
  //   tags: string[];
  variants: ProductVariant[];
  options: ProductOption[];
  images: ProductImage[];
  //   status: "active" | "archived" | "draft";
  //   priceRange: {
  //     minVariantPrice: MoneyV2;
  //     maxVariantPrice: MoneyV2;
  //   };
  //   id: string;
  //   title: string;
  //   description: string;
  //   handle: string;
  //   price: number;
  //   status: string;
  //   variants: ProductVariant[];
  //   images: ProductImage[];
}

interface ProductVariant {
  id: string;
  title: string;
  price: string;
  compareAtPrice: string | null;
  inventoryQuantity: number;
  weight: number;
  weightUnit: "kg" | "g" | "lb" | "oz";
  availableForSale: boolean;
  requiresShipping: boolean;
  barcode: string;
  available: boolean;
}
export interface ProductOption {
  id: string;
  name: string;
  values: string[];
  type: string[];
}
interface ProductImage {
  id: string;
  src: string;
  altText: string;
  width: number;
  height: number;
}
export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

// export interface ProductDetailProps {
//   id: string;
//   title: string;
//   description: string;
//   handle: string;
//   price: number;
//   status: string;
// }

export interface MetaProps {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article" | "product";
  canonical?: string;
}
