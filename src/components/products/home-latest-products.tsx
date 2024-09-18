"use client";
import { useEffect, useState } from "react";
import ProductCard from "./product-card";
// import { fetchProducts } from "@/app/api/products";
// import fetchProducts from "@/app/api/products"

// console.log(process.env.NEXT_PUBLIC_SHOPIFY_STORE_ENDPOINT);

export default function HomeLatestProducts() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch("/api/products", {
          method: "GET",
          headers: {
            Accept: "application/json"
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    };
    fetchProductData();
  }, []);

  console.log(products);

  ////////////////////////////////////////////////////////////////////

  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch("/api/products");
  //       if (response) {
  //         const data = await response.json();
  //         // console.log(data);
  //         setProducts(data);
  //       }
  //       const data = await response.json();
  //       setProducts(data.products);
  //     } catch (error) {
  //       console.error("Error fetching productssss:", error);
  //       throw error;
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);
  // console.log(products);

  //////////////////////////////////////////////////////////
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const fetchDataFromAPI = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch("/api/test/users", {
  //         method: "GET",
  //         headers: {
  //           Accept: "application/json"
  //         }
  //       });
  //       if (response) {
  //         const data = await response.json();
  //         console.log(data);
  //         setProducts(data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchDataFromAPI();
  // }, []);
  // console.log(products);
  //
  //////////////////////////////////////////////////////////

  // const products = fetchProducts();
  // console.log(products);
  // const [products, setProducts] = useState([]);
  // const fetchProductData = async () => {
  //   try {
  //     const fetchedProducts = await fetchProducts();
  //     setProducts(fetchedProducts);
  //   } catch (error) {
  //     console.error('Error fetching products:', error);

  //   }
  // };
  // fetchProductData();
  // console.log(products);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">
          Introducing Our Latest Product
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))} */}
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
