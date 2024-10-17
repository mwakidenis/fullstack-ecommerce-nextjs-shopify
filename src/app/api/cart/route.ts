import { NextApiRequest, NextApiResponse } from "next";
import { getServerCart } from "@/lib/utils/server-cart-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const cart = await getServerCart();
      res.status(200).json(cart);
    } catch (error) {
      console.error("Error in cart API route:", error);
      res.status(500).json({ error: "Error fetching cart" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
