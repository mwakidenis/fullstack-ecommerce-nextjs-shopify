import ProductCard from "./product-card";
// import { fetchProducts } from "@/app/api/products";
// import fetchProducts from "@/app/api/products"
import { getProducts } from "@/services/fetch-product";
import Loader from "../layouts/loader";
import { ProductProps } from "@/types";

interface LatestProductProps {
  id: string;
  product: ProductProps;
}

export default async function HomeLatestProducts() {
  let productsData: { products: ProductProps[] } | null = null;
  let error: string | null = null;
  const loading: boolean | null = false;

  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/products`
  // );
  // products = await response.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/products`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    productsData = await response.json();
    // console.log("Products fetched:", productsData);
  } catch (err) {
    console.error("Error fetching products:", err);
    error = err instanceof Error ? err.message : "An unknown error occurred";
  }

  if (error) {
    return <div className="text-white">Error: {error}</div>;
  }

  const filteredProducts = productsData?.products || [];
  const products = filteredProducts.slice(0, 6);

  // console.log(products);
  console.log(products.length);

  return (
    <>
      {loading === false && (
        <div className="bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8">
              Introducing Our Latest Product
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products && Array.isArray(products) && products.length > 0 ? (
                products.map((data) => (
                  <li key={data.id}>
                    <ProductCard product={data} />
                  </li>
                ))
              ) : (
                <p className="text-white">No products available now.</p>
              )}
              {/* {products &&
                Array.isArray(products) &&
                products.map((data) => (
                  <li key={data.id}>
                    <ProductCard product={data} />
                  </li>
                ))} */}

              {/* <ProductCard />
              <ProductCard />
              <ProductCard /> */}
            </div>
          </div>
        </div>
      )}
      {/* {loading === true && <Loader />} */}
    </>
  );
}
