import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/services/fetch-data-within-app";
import { ProductProps } from "@/types";
import ProductCard from "@/components/products/product-card";

interface CategoryProductPageProps {
  params: {
    slug: string[];
  };
  searchParams: {
    page?: string;
  };
}

export default async function CategoryProductPage({
  params,
  searchParams
}: CategoryProductPageProps) {
  const slug = params.slug.join("/");
  const page = searchParams.page || "1";

  // Fetch products based on the category slug
  const productsData = await getProductsByCategory(params.slug, page);

  // Handle case when no products are found for the category
  if (!productsData || productsData.length === 0) {
    return notFound();
  }
  //   if (
  //     !productsData ||
  //     !productsData.products ||
  //     productsData.products.length === 0
  //   ) {
  //     return <div>No products found for this category.</div>;
  //   }

  const { products, total, limit } = productsData;
  const currentPage = parseInt(page, 10);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Products in {slug}</h1>

      {/* Product Listing */}
      <div className="grid grid-cols-3 gap-4">
        {products.map((product: ProductProps) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-8">
        {currentPage > 1 && (
          <a
            href={`/product-category/${slug}/?page=${currentPage - 1}`}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Previous
          </a>
        )}
        {currentPage < totalPages && (
          <a
            href={`/product-category/${slug}/?page=${currentPage + 1}`}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Next
          </a>
        )}
      </div>
    </div>
  );
}
