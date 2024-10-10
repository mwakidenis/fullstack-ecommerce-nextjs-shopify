import { NextRequest, NextResponse } from "next/server";
// import { getProduct, getProducts } from "@/services/shopify-client";
import {
  fetchProduct,
  fetchProducts,
  fetchProductsByCategory
} from "@/services/shopify-client";

export async function GET(request: NextRequest) {
  // console.log("API request received: ", request.method);

  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");
  const category = searchParams.get("category");
  // const page = searchParams.get("page") || "1";
  // const limit = searchParams.get("limit") || "10";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  try {
    if (handle) {
      const product = await fetchProduct(handle);
      if (!product) {
        return NextResponse.json(
          { success: false, error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, product });
    } else if (category) {
      const products = await fetchProductsByCategory(category);
      if (!products || products.length === 0) {
        return NextResponse.json(
          { success: false, error: "No products found in this category" },
          { status: 404 }
        );
      }

      const pageNumber = page;
      const pageSize = limit;
      // const pageNumber = parseInt(page, 10);
      // const pageSize = parseInt(limit, 10);
      const start = (pageNumber - 1) * pageSize;
      const paginatedProducts = products.slice(start, start + pageSize);

      return NextResponse.json({
        success: true,
        products: paginatedProducts,
        total: products.length,
        page: pageNumber,
        limit: pageSize
      });
    } else {
      const products = await fetchProducts(page, limit);

      if (!products || products.length === 0) {
        return NextResponse.json(
          { success: false, error: "No products found" },
          { status: 404 }
        );
      }

      const pageNumber = page;
      const pageSize = limit;
      const start = (pageNumber - 1) * pageSize;
      const paginatedProducts = products.slice(start, start + pageSize);

      return NextResponse.json({
        success: true,
        products: paginatedProducts,
        total: products.length,
        page: pageNumber,
        limit: pageSize
      });
    }

    // const page = Number(searchParams.get("page")) || 1;
    // const limit = Number(searchParams.get("limit")) || 20;
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
    // res.status(500).json({ error: 'Failed to fetch products' });
    // console.error("Error fetching products:", error);
    // return NextResponse.json(
    //   { error: "Error fetching products" },
    //   { status: 500 }
    // );
    // throw error; // Re-throw the error for proper handling in the calling component
  }
}
