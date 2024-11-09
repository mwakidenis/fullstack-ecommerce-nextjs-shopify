import { generateProductListingMetadata } from "@/components/meta-data";
import { ProductListingComponent } from "@/components/products/product-listing/product-listing";
import {
  getProducts,
  getProductsByCategory
} from "@/services/fetch-data-within-app";
import { PRODUCTS_PER_PAGE } from "@/constants";

// Generate SEO metadata for product listing page
export const metadata = generateProductListingMetadata();

// Main product listing page component
// Handles both filtered and unfiltered product views
export default async function ProductListing({
  searchParams
}: {
  // Search parameters for filtering and pagination
  searchParams: {
    page?: string; // Current page number
    search?: string; // Search query
    sort?: string; // Sort order
    category?: string; // Category filter
    availability?: string; // Stock status filter
    minPrice?: string; // Price range minimum
    maxPrice?: string; // Price range maximum
  };
}) {
  // Default to first page if not specified
  const page = Number(searchParams.page) || 1;

  let productsData;

  // Fetch products based on category filter
  if (searchParams.category) {
    productsData = await getProductsByCategory(
      searchParams.category,
      page,
      PRODUCTS_PER_PAGE
    );
  } else {
    // Fetch all products if no category specified
    productsData = await getProducts(page, PRODUCTS_PER_PAGE);
  }

  // Calculate pagination values
  const totalProducts = productsData.total || 0;
  const totalPages = Math.max(1, Math.ceil(totalProducts / PRODUCTS_PER_PAGE));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Page header section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-center">
            Our Products
          </h1>
          <p className="text-muted-foreground mt-2 text-center">
            Browse through our collection of products
          </p>
        </div>

        {/* Product listing with pagination */}
        <ProductListingComponent
          initialProducts={productsData.products}
          totalPages={totalPages}
          currentPage={page}
          totalProducts={totalProducts}
        />
      </div>
    </div>
  );
}
