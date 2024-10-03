// import { getProduct } from "@/services/fetch-product";
import Image from "next/image";
import Link from "next/link";
import { ProductProps } from "@/types";
import { createMetadata } from "@/components/meta";

interface ProductDetailProps {
  params: {
    handle: string;
  };
}

// type Props = {
//   params: { slug: string };
// };

async function getPageData(slug: string) {
  return {
    title: `Page about ${slug}`,
    description: `This is a page all about ${slug}.`,
    image: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/images/${slug}.jpg`
  };
}

export async function generateMetadata({ params }: ProductDetailProps) {
  const pageData = await getPageData(params.handle);

  return createMetadata({
    title: pageData.title,
    description: pageData.description,
    image: pageData.image,
    canonical: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/product/${params.handle}`
  });
}

export default async function Product({ params }: ProductDetailProps) {
  // let productData: { product: ProductDetailProps } | null = null;
  let product: ProductProps | null = null;
  let error: string | null = null;
  // console.log(params.handle);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/products?handle=${params.handle}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch product detail");
    }
    product = await response.json();
    product = product?.product;
    // console.log("Products fetched:", productsData);
  } catch (err) {
    console.error("Error fetching products:", err);
    error = err instanceof Error ? err.message : "An unknown error occurred";
  }

  const pageData = await getPageData(params.handle);

  console.log(product);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && <p className="text-red-500">{error}</p>}
        {!product && !error && <p>Loading...</p>}
        {/* <StructuredData product={product} /> */}
        {product && (
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={product.images[0].src}
                  alt={product.images[0].altText}
                />
              </div>
              {/* <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                  Add to Cart
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                  Direct Checkout
                </button>
              </div>
            </div> */}
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {product?.title}
              </h2>
              {/* <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {product?.description}
              </p> */}
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {product.variants[0].price.amount}{" "}
                    {product.variants[0].price.currencyCode}
                  </span>
                </div>
                {product.availableForSale && (
                  <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Availability:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      In Stock
                    </span>
                  </div>
                )}
              </div>

              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {product?.description}
                </p>
              </div>
              <div className="flex -mx-2 mb-4 mt-6">
                <div className="w-1/2 px-2">
                  <Link
                    href={"/cart"}
                    className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    Add to Cart
                  </Link>
                </div>
                <div className="w-1/2 px-2">
                  <Link
                    href={"/checkout"}
                    className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Direct Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
