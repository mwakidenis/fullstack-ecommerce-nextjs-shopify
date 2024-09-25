// import shopify from "@/lib/shopify";
import { NextApiRequest, NextApiResponse } from "next";

// import { NextRequest, NextResponse } from "next/server";
// import { fetchShopifyData } from "@/lib/shopify";
// import test from "@/app/api/test.json";

///////////////////////////////////////////////////////////

// import {createAdminApiClient} from '@shopify/admin-api-client';

// const client = createAdminApiClient({
//   storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_ENDPOINT || '',
//   apiVersion: '2024-10',
//   accessToken: process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN || '',
// });

///////////////////////////////////////////////////////////

// export async function GET(request: Request) {
//   const data = await request.json();

//   return NextResponse.json({
//     data
//   });
// }

/////////////////////////////////////////////////////////

// import shopify from "@/lib/shopify";
import { NextRequest, NextResponse } from "next/server";
import { getProduct, getProducts } from "@/services/fetch-product";

export async function GET(request: NextRequest) {
  // console.log("API request received: ", request.method);
  try {
    // const handle = await request.nextUrl.searchParams.get("handle");

    const {searchParams}=new URL(request.url);
    const handle=searchParams.get('handle');

    if (handle) {
      // console.log(handle);
      const product = await getProduct(handle);
      // console.log(product);

      // Check if product exist
      if (!product) {
        console.error("No product found");
        return NextResponse.json(
          { error: "No product found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          product
        },
        { status: 200 }
      );
    }

    const products = await getProducts();
    // res.status(200).json(products);
    console.log("Product list: ", products);

    // Check if products exist
    if (!products) {
      console.error("No products found");
      return NextResponse.json(
        { error: "No products available" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        products
      },
      { status: 200 }
    );
  } catch (error) {
    // res.status(500).json({ error: 'Failed to fetch products' });
    console.error("Error fetching products:", error);
    // return NextResponse.json(
    //   { error: "Error fetching products" },
    //   { status: 500 }
    // );
    throw error; // Re-throw the error for proper handling in the calling component
  }
}

//////////////////////////////////////////////////////////

// import shopify from "@/lib/shopify";

// export async function GET() {
//   // console.log("API request received: ", request.method);
//   try {
//     const products = await shopify.product.fetchAll();
//     // const products = await shopify.product.fetch("/admin/api/2024-07/products.json");
//     // const products = await client.request("endpoint");
//     // console.log("All Products: ", products);
//     return products;
//     // return NextResponse.json({
//     //   products
//     // });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     // response.status(500).json({ error: "Failed to fetch products" });
//     throw error;
//   }
// }

////////////////////////////////////////////////////////////

// export async function GET(request: NextRequest) {
//   console.log("API request received: ", request.method);
//   try {
//     // const products = await fetchShopifyData("/api/2024-07/graphql.json");
//     const products = await fetchShopifyData("/admin/api/2024-07/products.json");
//     // const products = await client.request("endpoint");
//     // return response.data;
//     return NextResponse.json({
//       products
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     // response.status(500).json({ error: "Failed to fetch products" });
//     throw error;
//   }
// }

///////////////////////////////////////////////////////////

// import type { NextApiRequest, NextApiResponse } from "next";
// import { fetchShopifyData } from "@/lib/shopify";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   console.log("API request received: ", req.method);
//   if (req.method !== "GET") {
//     res.setHeader("Allow", ["GET"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//     return;
//   }

//   try {
//     const products = await fetchShopifyData("/admin/api/2024-09/products.json");
//     // const products: ShopifyProduct[] = await fetchShopifyData("/admin/api/2024-09/products.json");
//     res.status(200).json(products);
//     console.log(products);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// }
