const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STORE_ENDPOINT;
const admin_access_token = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN;
const storefront_access_token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;


//////////////////////////////////////////////////////////////

import Client from 'shopify-buy';
import { LATEST_API_VERSION } from '@shopify/shopify-api'
import {createAdminApiClient} from '@shopify/admin-api-client';


// query for shopify-buy

const shopify = Client.buildClient({
  domain: endpoint || "",
  storefrontAccessToken: storefront_access_token || "",
  apiVersion: LATEST_API_VERSION
});
// console.log("Shopify Client: ", shopify);


// query for admin-api-client

const shopifyAdmin = createAdminApiClient({
  storeDomain: endpoint || "",
  apiVersion: LATEST_API_VERSION,
  accessToken: admin_access_token || "",
});

export {shopify, shopifyAdmin};

//////////////////////////////////////////////////////////////

// import { createAdminApiClient } from "@shopify/admin-api-client";
// import { LATEST_API_VERSION } from '@shopify/shopify-api'

// const shopifyAdminApi = createAdminApiClient({
//   storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_ENDPOINT || "",
//   apiVersion: LATEST_API_VERSION,
//   accessToken: process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN || ""
// });

// console.log("Latest API Version: ", LATEST_API_VERSION);

// export const fetchShopifyData = async (endpoint: string) => {
//   try {
//     const response = await shopifyAdminApi.request(endpoint);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching Shopify data:", error);
//     throw error;
//   }
// };

//////////////////////////////////////////////////////////////////

// import Client from 'shopify-buy';

// const shopify = Client.buildClient({
//   domain: endpoint as string,
//   storefrontAccessToken: access_token as string,
//   apiVersion: '2024-09'
// });

// const getProducts = async () => {
//   try {
//     const products = await client.product.fetchAll()
//     return products
//   } catch (error) {
//     console.error("Error fetching products:", error)
//     throw error // Re-throw the error for proper handling in the calling component
//   }
// }

// export { getProducts }

// export default shopify;
