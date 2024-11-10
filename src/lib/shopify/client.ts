import Client from "shopify-buy";
import { LATEST_API_VERSION } from "@shopify/shopify-api";
import { createAdminApiClient } from "@shopify/admin-api-client";
import { GraphQLClient } from "graphql-request";

// Shopify store configuration
// These env variables should be set in .env.local file
const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STORE_ENDPOINT;
const admin_access_token = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN;
const storefront_access_token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Initialize Shopify Buy SDK client
// Used for storefront operations like product listing and cart management
// Provides high-level abstractions for common e-commerce operations
const shopify = Client.buildClient({
  domain: endpoint || "",
  storefrontAccessToken: storefront_access_token || "",
  apiVersion: LATEST_API_VERSION
});

// Initialize Shopify Admin API client
// Used for advanced operations like inventory management and order processing
// Requires admin access token with appropriate permissions
// Uncomment when admin operations are needed
const shopifyAdmin = createAdminApiClient({
  storeDomain: endpoint || "",
  apiVersion: LATEST_API_VERSION,
  accessToken: admin_access_token || ""
});

// Initialize raw GraphQL client for custom queries
// Useful for specific storefront operations not covered by the Buy SDK
// Provides more flexibility but requires manual query writing
const graphqlClient = new GraphQLClient(
  `https://${endpoint}/api/${LATEST_API_VERSION}/graphql.json`,
  {
    headers: {
      "X-Shopify-Storefront-Access-Token": storefront_access_token || "",
      "Content-Type": "application/json"
    }
  }
);

export { shopify, shopifyAdmin, graphqlClient };
