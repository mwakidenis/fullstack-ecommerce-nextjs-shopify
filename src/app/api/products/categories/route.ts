import { NextRequest, NextResponse } from "next/server";
// import { getCategories } from '@/lib/shopify';
// import { getCategories } from "@/services/fetch-data-within-app";
import { fetchCategories } from "@/services/shopify-client";

export async function GET(req: NextRequest) {
  try {
    const categories = await fetchCategories();
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    );
  }
}
