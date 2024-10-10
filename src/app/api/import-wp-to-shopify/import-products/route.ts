import { NextRequest, NextResponse } from "next/server";
// import integrateWooCommerceToShopify from "@/services/woocommerce";
import integrateWooCommerceToShopify from "@/services/woocommerce/wp-products";

export async function GET(req: NextRequest) {
  try {
    const results = await integrateWooCommerceToShopify();
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Integration error:", error);
    return NextResponse.json({ error: "Integration failed" }, { status: 500 });
  }
}
