import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductProps } from "@/types";
import Link from "next/link";

interface ProductCardProps {
  product: ProductProps;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // const ProductCard = ({product: ProductProps}) => {
  // console.log(product);
  return (
    <>
      {/* {product } */}
      {/* <div className="flex flex-col space-y-3 bg-white">
        <Skeleton className="h-full w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div> */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="relative overflow-hidden">
          <Image
            className="object-cover w-full h-full"
            width={500}
            height={500}
            src={product.images[0]?.src}
            alt={product.title}
          />
          {/* <Image
            src={"/images/products/1.jpg"}
            width={500}
            height={500}
            alt={"product.title"}
            className="object-cover w-full h-full"
          /> */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* <button className="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-300">
              View Product
            </button> */}
            <Link
              href={`${process.env.NEXT_PUBLIC_SITE_DOMAIN}/product/${product.handle}`}
              className="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-300"
            >
              View Product
            </Link>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mt-4">
          <Link
            href={`${process.env.NEXT_PUBLIC_SITE_DOMAIN}/product/${product.handle}`}
          >
            {product.title}
          </Link>
        </h3>
        <p className="text-gray-500 text-sm mt-2">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-900 font-bold text-lg">
            $20
            {/* {product.variants[0].price.amount}{" "}
            {product.variants[0].price.currencyCode} */}
          </span>
          <button className="bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
