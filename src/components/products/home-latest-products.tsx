"use client";
import { useEffect, useState } from "react";
import ProductCard from "./product-card";
// import { fetchProducts } from "@/app/api/products";
// import fetchProducts from "@/app/api/products"
import Loader from "../layouts/loader";

interface ProductProps {
  id: string;
  title: string;
  description: string;
  handle: string;
  price: number;
  status: string;
}

export default function HomeLatestProducts() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const products = await fetchProducts()

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, []);

  console.log(products);

  return (
    <>
      {loading === false && (
        <div className="bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8">
              Introducing Our Latest Product
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products?.map((data: ProductProps) => (
                <li key={data.id}>
                  <ProductCard product={data} />
                </li>
              ))}

              {/* <ProductCard />
              <ProductCard />
              <ProductCard /> */}
            </div>
          </div>
        </div>
      )}
      {loading === true && <Loader />}
    </>
  );
}
