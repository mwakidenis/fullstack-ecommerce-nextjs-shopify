import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ReadonlyURLSearchParams } from "next/navigation";
import { Cart } from "@/types";

// Merges Tailwind CSS classes while handling conflicts
// Uses clsx for conditional classes and twMerge for deduplication
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Converts currency amount to subcurrency (cents)
// Example: 10.99 -> 1099
// @param amount - The amount to convert
// @param factor - Multiplication factor (default: 100 for cents)
export function convertToSubcurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}

// Formats price amount according to locale and currency
// Example: formatPrice(29.99, "CAD") -> "$29.99"
// @param amount - The price amount
// @param currencyCode - ISO currency code (e.g., "CAD", "USD", "EUR")
export function formatPrice(amount: number, currencyCode: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode
  }).format(amount);
}

// Calculates cart totals including subtotal, shipping, tax, and final total
// Returns zeroed object if cart is null
// @param cart - Cart object containing cost information
// TODO: Implement dynamic shipping calculation based on method/weight
export const calculateTotalCartAmount = (cart: Cart | null) => {
  if (!cart) return { subtotal: 0, shipping: 0, tax: 0, total: 0 };

  const subtotal = parseFloat(cart.cost?.subtotalAmount?.amount) || 0;
  const shipping = 12.99; // Static shipping cost - needs to be made dynamic
  const tax = parseFloat(cart.cost?.totalTaxAmount?.amount) || 0;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number((subtotal + shipping + tax).toFixed(2))
  };
};

// Utility function to create delay in async operations
// Useful for loading states, animations, or rate limiting
// @param ms - Delay duration in milliseconds
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Combines pathname and URL parameters into a complete URL
// Handles empty params and proper query string formatting
// @param pathname - Base URL path
// @param params - URL search parameters to append
export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

// Ensures a string starts with a specified prefix
// Commonly used for URL or path formatting
// @param stringToCheck - String to verify/modify
// @param startsWith - Prefix that should appear at start
export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

// Validates required environment variables for Shopify integration
// Throws detailed errors if variables are missing or malformed
// Should be called during app initialization
export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = [
    "NEXT_PUBLIC_SHOPIFY_STORE_ENDPOINT",
    "SHOPIFY_STOREFRONT_ACCESS_TOKEN"
  ];
  const missingEnvironmentVariables = [] as string[];

  // Check for missing environment variables
  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  // Throw error with missing variables
  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        "\n"
      )}\n`
    );
  }

  // Validate store endpoint format
  if (
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_ENDPOINT?.includes("[") ||
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_ENDPOINT?.includes("]")
  ) {
    throw new Error(
      "Your `NEXT_PUBLIC_SHOPIFY_STORE_ENDPOINT` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them."
    );
  }
};
