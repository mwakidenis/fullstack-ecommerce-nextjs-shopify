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