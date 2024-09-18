import Image from "next/image";

const ProductCardLight = () => {
  return (
    <>
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <Image
            src={"/images/products/1.jpg"}
            width={500}
            height={500}
            alt={"product.title"}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href={"product/detail"}>
                <span aria-hidden="true" className="absolute inset-0" />
                {/* {product.title} */}
                Product Title
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              $999
              {/* {product.description} */}
              {/* {product.variants[0].price.amount}{" "} */}
              {/* {product.variants[0].price.currencyCode} */}
            </p>
          </div>
          {/* <p className="text-sm font-medium text-gray-900">
                    {product.variants[0].price.amount} {product.variants[0].price.currencyCode}
                </p> */}
        </div>
      </div>
    </>
  );
};

export default ProductCardLight;
