// import { shopify, shopifyAdmin } from "@/lib/shopify";
import { shopify } from "@/lib/shopify/client";

// Fetches all products from Shopify
// Note: Currently fetches all products at once - consider implementing cursor-based pagination
// for large catalogs to improve performance
// @param page - Page number (currently unused, handled by API route)
// @param limit - Products per page (currently unused, handled by API route)
export async function fetchProducts(page = 1, limit = 20) {
  try {
    // Fetch complete product catalog
    const products = await shopify.product.fetchAll();

    if (!products) {
      return [];
    }

    return products.map((product) => {
      // Ensure variants have availableForSale property
      const variants = product.variants.map((variant) => ({
        ...variant,
        availableForSale: variant.availableForSale, // Buy SDK uses 'available' instead of 'availableForSale'
        quantityAvailable: variant.quantityAvailable || 0
      }));

      return {
        ...product,
        variants
      };
    });

    // Debugging log for monitoring data
    // console.log("Total products from Shopify:", products.length);
    // console.log("Products from Shopify:", products);

    // Return full product list for API route to handle pagination
    // return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Retrieves a single product by its handle (slug)
// @param handle - Product's unique handle/slug identifier
// @returns Product object or null if not found
export async function fetchProduct(handle: string) {
  try {
    const product = await shopify.product.fetchByHandle(handle);
    if (!product) {
      return null;
    }

    const variants = product.variants.map((variant) => ({
      ...variant,
      availableForSale: variant.availableForSale,
      quantityAvailable: variant.quantityAvailable || 0
    }));

    return {
      ...product,
      variants
    };
    // return product;
  } catch (error) {
    console.error("Error fetching product details", error);
    throw error;
  }
}

// Fetches most recent products
// Uses simple array slicing for limitation
// @param limit - Maximum number of products to return (default: 6)
// @returns Array of latest products or null if fetch fails
export async function fetchLatestProducts(limit = 6) {
  try {
    const products = await shopify.product.fetchAll();
    if (!products) {
      return null;
    }
    const latestProducts = products.slice(0, limit);
    return latestProducts;
  } catch (error) {
    console.error("Error fetching latest products", error);
    throw error;
  }
}

// Retrieves all collections (categories) with their associated products
// @returns Array of collections or null if fetch fails
export async function fetchCategories() {
  const collections = await shopify.collection.fetchAllWithProducts();
  if (!collections) {
    return null;
  }
  return collections;
}

// Fetches products from a specific category for homepage display
// @param category - Category name to filter by (case-insensitive)
// @param limit - Maximum number of products to return (default: 10)
// @returns Array of products in the category or null if not found
export async function fetchHomeProductsbyCategory(
  category: string,
  limit = 10
) {
  try {
    // Fetch all collections with their products
    const collections = await shopify.collection.fetchAllWithProducts();
    if (!collections) {
      return null;
    }

    // Find matching collection by name (case-insensitive)
    const collection = collections.find(
      (col) => col.title.toLowerCase() === category
    );
    if (!collection) {
      return null;
    }

    return collection.products;
  } catch (error) {
    console.error("Error fetching latest products", error);
    throw error;
  }
}

// Fetches products by category slug
// Handles nested category paths and returns existence status
// @param slug - Category path (can be nested, e.g., "parent/child")
// @returns Object with existence flag and products array
export const fetchProductsByCategory = async (slug: string) => {
  try {
    // Extract target category from potentially nested path
    const categories = slug.split("/");
    const targetCategory = categories[categories.length - 1].toLowerCase();

    // Fetch and filter collections by target category
    const collections = await shopify.collection.fetchAllWithProducts();
    if (!collections) {
      return { exists: false, products: [] };
    }

    // Find matching collection (case-insensitive)
    const collection = collections.find(
      (col) => col.title.toLowerCase() === targetCategory
    );

    // Handle non-existent category
    if (!collection) {
      return { exists: false, products: [] };
    }

    // Return products with existence flag
    return { exists: true, products: collection.products || [] };
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

/*  Note: Consider implementing cursor-based pagination for large catalogs
 * and caching frequently accessed data to improve performance.
 */
