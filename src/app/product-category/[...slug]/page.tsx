import { generateCategoryMetadata } from "@/components/meta-data";
import { CategoryProductListingComponent } from "@/components/products/product-listing/category-product-listing";
import { getProductsByCategory } from "@/services/fetch-data-within-app";
import { PRODUCTS_PER_PAGE } from "@/constants";
import { notFound } from "next/navigation";

// Props interface for category product page
interface CategoryProductPageProps {
  params: {
    slug: string[]; // URL segments for category path
  };
  searchParams: {
    page?: string; // Pagination
    search?: string; // Search query
    sort?: string; // Sort order
    availability?: string; // Filter by availability
    minPrice?: string; // Price range filter
    maxPrice?: string; // Price range filter
  };
}

// Generate metadata for category pages
// Uses category slug to create appropriate titles and descriptions
export async function generateMetadata({
  params: { slug }
}: CategoryProductPageProps) {
  const category = slug.join("/");
  return generateCategoryMetadata(category);
}

// Category product listing page component
// Handles product filtering, pagination and display
export default async function CategoryProductPage({
  params,
  searchParams
}: CategoryProductPageProps) {
  // Convert nested category path to single string
  const categorySlug = params.slug.join("/");
  // Default to first page if not specified
  const page = Number(searchParams.page) || 1;

  try {
    // Fetch products for current category with pagination
    const productsData = await getProductsByCategory(
      categorySlug,
      page,
      PRODUCTS_PER_PAGE
    );

    // Show 404 if category doesn't exist
    if (!productsData.categoryExists) {
      return notFound();
    }

    // Calculate pagination values
    const totalProducts = productsData.total || 0;
    const totalPages = Math.max(
      1,
      Math.ceil(totalProducts / PRODUCTS_PER_PAGE)
    );

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          {/* Category header section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-center capitalize">
              {categorySlug.split("/").join(" > ")}
            </h1>
            <p className="text-muted-foreground mt-2 text-center">
              Browse through our {categorySlug} collection
            </p>
          </div>

          {/* Product listing component with pagination and filters */}
          <CategoryProductListingComponent
            initialProducts={productsData.products}
            category={categorySlug}
            totalPages={totalPages}
            currentPage={page}
            totalProducts={totalProducts}
          />
        </div>
      </div>
    );
  } catch (error) {
    // Log error and let Next.js error boundary handle display
    console.error("Error loading category page:", error);
    throw error;
  }
}
