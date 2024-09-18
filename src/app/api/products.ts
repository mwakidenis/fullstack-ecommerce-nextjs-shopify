// import shopify from "@/lib/shopify";
// import { NextApiRequest, NextApiResponse } from "next";

import type { NextApiRequest, NextApiResponse } from "next";
import { fetchShopifyData } from "@/lib/shopify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("API request received: ", req.method);
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const products = await fetchShopifyData("/admin/api/2024-09/products.json");
    // const products: ShopifyProduct[] = await fetchShopifyData("/admin/api/2024-09/products.json");
    res.status(200).json(products);
    console.log(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
