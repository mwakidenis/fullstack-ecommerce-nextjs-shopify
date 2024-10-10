import { shopify, shopifyAdmin } from "@/lib/shopify";

export async function fetchProducts(page = 1, limit = 20) {
  try {
    // const products = await shopify.product.fetchQuery(options);
    const products = await shopify.product.fetchAll(limit * page);
    if (!products) {
      return null;
    }
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    // throw error; // Re-throw the error for proper handling in the calling component
    return [];
  }
}

export async function fetchProduct(handle: string) {
  try {
    const product = await shopify.product.fetchByHandle(handle);
    if (!product) {
      return null;
    }
    return product;
  } catch (error) {
    console.error("Error fetching product details", error);
    throw error;
  }
}

export async function fetchLatestProducts(limit = 6) {
  //   return shopify.product.fetchAll({
  //     first: limit,
  //     sortKey: "CREATED_AT",
  //     reverse: true
  //   });
  try {
    const products = await shopify.product.fetchAll();
    if (!products) {
      return null;
    }
    const latestProducts = products.slice(0, limit);
    // return NextResponse.json(latestProducts);
    return latestProducts;
  } catch (error) {
    console.error("Error fetching latest products", error);
    throw error;
  }
}

export async function fetchCategories() {
  const collections = await shopify.collection.fetchAllWithProducts();
  if (!collections) {
    return null;
  }
  return collections;
}

export async function fetchHomeProductsbyCategory(
  category: string,
  limit = 10
) {
  // const collection = await shopify.collection.fetchWithProducts(categoryId, {
  //   productsFirst: limit
  // });
  // const collection = await shopify.product.fetchQuery({
  //   query: category ? `product_type:${category}` : ""
  // });
  try {
    const collections = await shopify.collection.fetchAllWithProducts();
    if (!collections) {
      return null;
    }
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
// export async function fetchCategoryProducts(lastCategory: string, limit = 10) {
//   // const collection = await shopify.collection.fetchWithProducts(categoryId, {
//   //   productsFirst: limit
//   // });
//   const collection = await shopify.product.fetchQuery({
//     query: `product_type:${lastCategory}`
//     // query: lastCategory ? `product_type:${lastCategory}` : ""
//   });
//   return collection;
//   // return collection.products;
// }

export const fetchProductsByCategory = async (slug: string) => {
  const categories = slug.split("/");
  const targetCategory = categories[categories.length - 1].toLowerCase();

  // Fetch all collections and filter by targetCategory
  const collections = await shopify.collection.fetchAllWithProducts();
  if (!collections) {
    return null;
  }
  const collection = collections.find(
    (col) => col.title.toLowerCase() === targetCategory
  );

  if (!collection) {
    return null;
  }

  return collection.products;
};
