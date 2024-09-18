import shopify from "@/lib/shopify";

const getProducts = async () => {
  // const products: Product[] = await client.product.fetchAll();
  // return products;
  try {
    const products = await shopify.product.fetchAll();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Re-throw the error for proper handling in the calling component
  }
};

export { getProducts };
