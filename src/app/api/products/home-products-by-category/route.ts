import { NextResponse } from "next/server";
// import { fetchCategoryProducts } from '@/lib/shopify';
import { fetchHomeProductsbyCategory } from "@/services/shopify-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = Number(searchParams.get("limit")) || 10;

  if (!category) {
    return NextResponse.json(
      { error: "Category slug is required" },
      { status: 400 }
    );
  }

  try {
    const products = await fetchHomeProductsbyCategory(category, limit);
    // return NextResponse.json(products);
    return NextResponse.json({
      success: true,
      products: products
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching category products" },
      { status: 500 }
    );
  }
}
