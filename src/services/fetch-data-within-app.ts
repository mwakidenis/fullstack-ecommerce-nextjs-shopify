import { ProductProps } from "@/types";

// Fetches paginated list of products
// @param page - Page number for pagination (default: 1)
// @param limit - Number of products per page (default: 12)
// @returns Object containing product array and total count
export async function getProducts(
  page: number = 1,
  limit: number = 12
): Promise<{ products: ProductProps[]; total: number }> {
  try {
    // Fetch products with pagination params
    // Using no-store to prevent caching and ensure fresh data
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/products?page=${page}`,
      {
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // Return empty array if API indicates failure
    if (!data.success) {
      return { products: [], total: 0 };
    }

    return {
      products: data.products || [],
      total: data.total || 0
    };
  } catch (error) {
    // Gracefully handle errors by returning empty data
    return { products: [], total: 0 };
  }
}

// Fetches single product details by handle (slug)
// @param handle - Product unique identifier/slug
// @returns Single product object or throws error
export async function getProduct(handle: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/products?handle=${handle}`,
      {
        cache: "no-store"
      }
    );
    const data = await response.json();
    const product = data.product;
    return product;
  } catch (error) {
    console.error("Error fetching product details", error);
    throw error;
  }
}

// Retrieves most recent products
// @param count - Number of products to fetch (default: 5)
// @returns Array of latest products
export async function getLatestProducts(
  count: number = 5
): Promise<ProductProps[]> {
  try {
    // Add error handling for undefined NEXT_PUBLIC_SITE_DOMAIN
    if (!process.env.NEXT_PUBLIC_SITE_DOMAIN) {
      console.warn("NEXT_PUBLIC_SITE_DOMAIN is not defined");
      return [];
    }

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_SITE_DOMAIN
        : "http://localhost:3000";

    console.log("Base URL: ", baseUrl);

    const response = await fetch(
      `${baseUrl}/api/products/latest-products?limit=${count}`,
      {
        cache: "force-cache", // or 'no-store' if you always need fresh data
        next: { revalidate: 3600 }, // revalidate every hour
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      console.error("Response not ok:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching latest products", error);
    return [];
  }
}

// Fetches all available product categories
// @returns Array of category objects
export async function getCategories() {
  try {
    const res = await fetch("/api/product/categories");
    const data = await res.json();
    if (data.success) {
      return data.categories;
    }
    throw new Error("Failed to fetch categories");
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
}

// Retrieves limited products for a specific category (For home page use in my case)
// @param category - Category identifier
// @param limit - Maximum number of products to return (default: 5)
// @returns Array of products in the specified category
export async function getHomeProductsByCategory(
  category: string,
  limit: number = 5
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/products/home-products-by-category/?category=${category}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    console.log("API Response: ", data);
    const products = data.products;
    return products;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
}

// Fetches paginated products for a specific category
// @param category - Category identifier
// @param page - Page number for pagination (default: 1)
// @param limit - Products per page (default: 20)
// @returns Object containing products, total count, and category existence flag
export async function getProductsByCategory(
  category: string,
  page: number = 1,
  limit: number = 20
): Promise<{
  products: ProductProps[];
  total: number;
  categoryExists: boolean;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/products?category=${category}&page=${page}&limit=${limit}`,
      {
        cache: "no-store"
      }
    );

    const data = await response.json();

    // Handle case where category doesn't exist
    if (response.status === 404 && data.error === "Category not found") {
      return {
        products: [],
        total: 0,
        categoryExists: false
      };
    }

    // Handle other error responses
    if (!response.ok) {
      throw new Error(
        `Failed to fetch category products: ${response.status} ${response.statusText}`
      );
    }

    return {
      products: data.products || [],
      total: data.total || 0,
      categoryExists: true // Category exists even if no products found
    };
  } catch (error) {
    console.error("Error fetching category products:", error);
    throw error;
  }
}
