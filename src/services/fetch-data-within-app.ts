import { ProductProps } from "@/types";

export async function getProducts(
  page: number = 1,
  limit: number = 20
): Promise<ProductProps[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/products?page=${page}&limit=${limit}`,
      {
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }
    // const products: ProductProps[] = await response.json();
    // return products;
    const data = await response.json();
    const products = data.products;
    return products as ProductProps[];
  } catch (error) {
    console.error("Error fetching products:", error);
    // throw error; // Re-throw the error for proper handling in the calling component
    return [];
  }
}

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

// Fetch latest products
export async function getLatestProducts(
  count: number = 5
): Promise<ProductProps[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/products/latest-products?limit=${count}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch latest products");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching latest products", error);
    throw error;
  }
}

// Get all categories
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

// Fetch products by category
export async function getHomeProductsByCategory(
  category: string,
  limit: number = 5
) {
  // export const getHomeProductsByCategory = async (
  //   category: string,
  //   limit: number = 5
  // ) => {
  try {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/products/home-products-by-category/?category=${category}&limit=${limit}`
    // );
    // console.log("API Response: ", response);
    // if (!response.ok) {
    //   throw new Error(`Failed to fetch products in category ${category}`);
    // }
    // const data = response.json();
    // return data;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/products/home-products-by-category/?category=${category}&limit=${limit}`
    );
    // const data = await res.json();
    // console.log("API Response: ", data);

    // if (data.success) {
    //   return data.products;
    // }
    // throw new Error("Failed to fetch products");

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }
    // const products: ProductProps[] = await response.json();
    // return products;
    const data = await response.json();
    console.log("API Response: ", data);
    const products = data.products;
    return products;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
}

// // Get products by category
// export async function getCategoryProducts(
//   category: string,
//   limit: number = 5
// ): Promise<ProductProps[]> {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/products/category-products/?category=${category}&limit=${limit}`
//     );
//     if (!response.ok) {
//       throw new Error(`Failed to fetch products in category ${category}`);
//     }
//     return response.json();
//   } catch (error) {
//     console.error("Error fetching products", error);
//     throw error;
//   }
// }

export const getProductsByCategory = async (slug: string[], page: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/products?category=${
        Array.isArray(slug) ? slug.join("/") : slug
      }&page=${page}`,
      { cache: "no-store" }
    );
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/products/category-products/?category=${category}&limit=${limit}`
    // );
    if (!response.ok) {
      // throw new Error(`Failed to fetch products in category`);
      return null;
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

// // const productQuery = `
// //   query ProductQuery($id: ID!) {
// //     product(id: $id) {
// //       id
// //       title
// //       handle
// //     }
// //   }
// // `;

// // const shopQuery = `
// //   query shop {
// //     shop {
// //       name
// //     }
// //   }
// // `;

// // const query = `
// //     {
// //       products(first: 10) {
// //         edges {
// //           node {
// //             id
// //             title
// //             handle
// //             variants(first: 1) {
// //               edges {
// //                 node {
// //                   price
// //                 }
// //               }
// //             }
// //           }
// //         }
// //       }
// //     }
// //   `;

// // export async function getProducts() {
// //   try {
// //     // const products = await shopifyAdmin.product.list();
// //     const products = await shopifyAdmin.request(query);
// //     return products;
// //   } catch (error) {
// //     console.error("Error fetching productssss:", error);
// //     throw error; // Re-throw the error for proper handling in the calling component
// //   }
// // }

// // export async function getProduct(handle: string) {
// //   try {
// //     const product = await shopifyAdmin.request(productQuery, {
// //       variables: {
// //         // id: "gid://shopify/Product/9626848854309",
// //         id: handle
// //         // handle: handle
// //       }
// //     });
// //     return product;
// //   } catch (error) {
// //     console.error("Error fetching product details", error);
// //     throw error;
// //   }
// // }
