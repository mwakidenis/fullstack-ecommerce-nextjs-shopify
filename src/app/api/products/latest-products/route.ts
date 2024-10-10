import { NextResponse } from "next/server";
// import { fet } from '@/lib/shopify';
import { fetchLatestProducts } from "@/services/shopify-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || 5;

  try {
    const products = await fetchLatestProducts(limit);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching latest products" },
      { status: 500 }
    );
  }
}
