import Image from "next/image";
import Link from "next/link";
import { ProductProps } from "@/types";
import { generateProductDetailMetadata } from "@/components/meta-data";
import { getProduct, getProducts } from "@/services/fetch-data-within-app";
import { notFound } from "next/navigation";
import { delay } from "@/lib/utils";
import { redirect } from "next/navigation";
import AddToCartButton from "@/components/products/cart/add-to-cart";
import DirectCheckoutButton from "@/components/products/checkout/direct-checkout-button";

interface ProductDetailProps {
  params: {
    handle: string;
  };
}

async function addToCart(data: FormData) {
  const id = data.get("id");
  const name = data.get("name");
  const price = data.get("price");
  const quantity = parseInt(data.get("quantity") as string);

  await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id, name, price, quantity })
  });

  redirect("/cart");
}

export async function generateStaticParams() {
  let productsData: ProductProps[] = [];
  productsData = await getProducts();
  const products = productsData;
  return products.map(({ handle }) => handle);
}

export async function generateMetadata({ params }: ProductDetailProps) {
  const { handle } = params;
  const product = await getProduct(handle);
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you're looking for does not exist."
    };
  }
  return generateProductDetailMetadata(product);
}

export default async function Product({ params }: ProductDetailProps) {
  const { handle } = params;
  const product: ProductProps | null = await getProduct(handle);

  if (!product) {
    notFound();
  }

  await delay(1000);

  // console.log("Product Variants: ", product.variants);

  // const pageData = await getPageData(params.handle);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* {error && <p className="text-red-500">{error}</p>}
        {!product && !error && <p>Loading...</p>} */}
        {/* <StructuredData product={product} /> */}
        {product && (
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                {/* <img
                  className="w-full h-full object-cover"
                  src={product.images[0].src}
                  alt={product.images[0].altText}
                /> */}
                <Image
                  className="w-full h-full object-cover"
                  src={product.images[0].src}
                  alt={product.images[0].altText}
                  height={500}
                  width={500}
                ></Image>
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
                  {/* <Link
                    href={`${process.env.NEXT_PUBLIC_SITE_DOMAIN}/cart`}
                    className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    Add to Cart
                  </Link> */}
                  {/* <AddToCartButton
                    id={product.id}
                    name={product.title}
                    price={product.variants[0].price.amount}
                  /> */}
                  {product.variants.map((variant) => (
                    <div key={variant.id}>
                      <h3>{variant.title}</h3>
                      <AddToCartButton
                        variantId={variant.id}
                        availableForSale={variant.available}
                      />
                    </div>
                  ))}
                  {/* <DirectCheckoutButton
                    productId={product?.handle}
                    name={product?.title}
                    price={product?.variants[0].price.amount}
                  /> */}
                </div>
                {/* <div className="w-1/2 px-2">
                  <Link
                    href={"/checkout"}
                    className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Direct Checkout
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
