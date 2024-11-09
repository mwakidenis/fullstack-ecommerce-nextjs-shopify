import { ProductProps } from "@/types";
import { generateProductDetailMetadata } from "@/components/meta-data";
import { getProduct, getProducts } from "@/services/fetch-data-within-app";
import { notFound } from "next/navigation";
import { delay } from "@/lib/utils";
import ProductDetailPageComponent from "@/components/products/product-detail-page";

// Props interface for product detail page
interface ProductDetailProps {
  params: {
    handle: string; // Product URL handle/slug
  };
}

// Static path generation commented out for now
// Will be used for static site generation optimization
/*
export async function generateStaticParams() {
 let productsData: ProductProps[] = [];
 productsData = await getProducts();
 const products = productsData;
 return products.map(({ handle }) => handle);
}
*/

// Generate metadata for each product page dynamically
// Returns default metadata if product not found
export async function generateMetadata({ params }: ProductDetailProps) {
  const { handle } = params;
  const product = await getProduct(handle);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you're looking for does not exist."
    };
  }

  return generateProductDetailMetadata(product);
}

// Product detail page component
// Fetches and displays individual product information
export default async function Product({ params }: ProductDetailProps) {
  const { handle } = params;
  const product: ProductProps | null = await getProduct(handle);

  // Redirect to 404 if product doesn't exist
  if (!product) {
    notFound();
  }

  // Artificial delay to demonstrate loading state
  // TODO: Remove in production
  // await delay(1000);

  // Render product detail component with fetched data
  return <ProductDetailPageComponent product={product} />;
}
