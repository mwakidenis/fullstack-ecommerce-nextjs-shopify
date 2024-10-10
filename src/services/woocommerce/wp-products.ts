import { shopifyAdmin } from "@/lib/shopify";

// WooCommerce API configuration
const WOOCOMMERCE_API_URL =
  "https://www.musicalinstrumentcity.com/wp-json/wp/v2";

// Types for WooCommerce data
interface WooCommerceProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  categories: number[];
  images: { src: string }[];
}

interface WooCommerceCategory {
  id: number;
  name: string;
}

// Shopify GraphQL types
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

// Function to fetch data from WooCommerce
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

// Function to create product in Shopify
async function createShopifyProduct(
  product: WooCommerceProduct,
  categories: WooCommerceCategory[]
) {
  const productCategories = categories
    .filter((category) => product.categories.includes(category.id))
    .map((category) => category.name)
    .join(", ");

  const shopifyProductInput = {
    title: product.name,
    bodyHtml: product.description,
    vendor: "WooCommerce Import",
    productType: productCategories,
    variants: [
      {
        price: product.price,
        sku: `WOO-${product.id}`
      }
    ],
    images: product.images.map((image) => ({ src: image.src }))
  };

  try {
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

    if (productCreate.userErrors.length > 0) {
      throw new Error(
        productCreate.userErrors.map((error) => error.message).join(", ")
      );
    }

    if (!productCreate.product) {
      throw new Error("Product creation failed without specific errors");
    }

    return productCreate.product;
  } catch (error) {
    console.error("Error creating Shopify product:", error);
    throw error;
  }
}

// Main function to handle the integration
export default async function integrateWooCommerceToShopify() {
  const { products, categories } = await fetchWooCommerceData();
  const results = [];

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
