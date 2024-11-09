import { shopifyAdmin } from "@/lib/shopify/client";

// WooCommerce REST API endpoint configuration
// Base URL for WooCommerce API requests
const WOOCOMMERCE_API_URL =
  "https://www.musicalinstrumentcity.com/wp-json/wp/v2";

// Type definitions for WooCommerce data structures
interface WooCommerceProduct {
  id: number; // Unique product identifier
  name: string; // Product name/title
  description: string; // HTML product description
  price: string; // Product price as string
  categories: number[]; // Array of category IDs
  images: { src: string }[]; // Product images array
}

interface WooCommerceCategory {
  id: number; // Category identifier
  name: string; // Category name
}

// Shopify GraphQL mutation response type
// Defines the expected structure of product creation response
interface ProductCreateMutation {
  productCreate: {
    product: {
      id: string;
      title: string;
    } | null;
    userErrors: {
      field: string[];
      message: string;
    }[];
  };
}

// Fetches products and categories from WooCommerce
// Returns combined object with both data sets
// Throws error if either request fails
async function fetchWooCommerceData(): Promise<{
  products: WooCommerceProduct[];
  categories: WooCommerceCategory[];
}> {
  const productsResponse = await fetch(`${WOOCOMMERCE_API_URL}/products`);
  const categoriesResponse = await fetch(
    `${WOOCOMMERCE_API_URL}/products/categories`
  );

  if (!productsResponse.ok || !categoriesResponse.ok) {
    throw new Error("Failed to fetch data from WooCommerce");
  }

  const products: WooCommerceProduct[] = await productsResponse.json();
  const categories: WooCommerceCategory[] = await categoriesResponse.json();

  return { products, categories };
}

// Creates a new product in Shopify using the Admin API
// Transforms WooCommerce product data to Shopify format
// @param product - WooCommerce product data
// @param categories - Available WooCommerce categories for mapping
async function createShopifyProduct(
  product: WooCommerceProduct,
  categories: WooCommerceCategory[]
) {
  // Map WooCommerce categories to comma-separated string
  const productCategories = categories
    .filter((category) => product.categories.includes(category.id))
    .map((category) => category.name)
    .join(", ");

  // Construct Shopify product input object
  const shopifyProductInput = {
    title: product.name,
    bodyHtml: product.description,
    vendor: "WooCommerce Import", // Identifies imported products
    productType: productCategories,
    variants: [
      {
        price: product.price,
        sku: `WOO-${product.id}` // Prefix SKU to track origin
      }
    ],
    images: product.images.map((image) => ({ src: image.src }))
  };

  try {
    // Execute Shopify GraphQL mutation
    const response = await shopifyAdmin.request<ProductCreateMutation>(
      `
        mutation productCreate($input: ProductInput!) {
          productCreate(input: $input) {
            product {
              id
              title
            }
            userErrors {
              field
              message
            }
          }
        }
        `,
      {
        variables: {
          input: shopifyProductInput
        }
      }
    );

    const { productCreate } = response.body;

    // Handle validation errors from Shopify
    if (productCreate.userErrors.length > 0) {
      throw new Error(
        productCreate.userErrors.map((error) => error.message).join(", ")
      );
    }

    // Handle unexpected response structure
    if (!productCreate.product) {
      throw new Error("Product creation failed without specific errors");
    }

    return productCreate.product;
  } catch (error) {
    console.error("Error creating Shopify product:", error);
    throw error;
  }
}

// Main integration function
// Processes all WooCommerce products and creates them in Shopify
// Returns array of results with success/failure status for each product
export default async function integrateWooCommerceToShopify() {
  // Fetch all required data from WooCommerce
  const { products, categories } = await fetchWooCommerceData();
  const results = [];

  // Process each product sequentially
  // Continues processing even if individual products fail
  for (const product of products) {
    try {
      const shopifyProduct = await createShopifyProduct(product, categories);
      results.push({
        wooCommerceId: product.id,
        shopifyId: shopifyProduct.id,
        status: "success"
      });
    } catch (error) {
      results.push({
        wooCommerceId: product.id,
        status: "error",
        error: (error as Error).message
      });
    }
  }

  return results;
}

/* Usage example:
 *
 * try {
 *   const results = await integrateWooCommerceToShopify();
 *   console.log('Integration complete:', results);
 *
 *   // Log success/failure statistics
 *   const successful = results.filter(r => r.status === 'success').length;
 *   const failed = results.filter(r => r.status === 'error').length;
 *   console.log(`Successfully imported: ${successful}`);
 *   console.log(`Failed to import: ${failed}`);
 * } catch (error) {
 *   console.error('Integration failed:', error);
 * }
 */
