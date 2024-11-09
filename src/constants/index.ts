/**
 * Application-wide constants for configuration and options
 * These values are used across different components for consistent behavior
 */

/**
 * Number of products to display per page in product listings
 * Used for pagination calculations and API requests
 */
export const PRODUCTS_PER_PAGE = 12;

/**
 * Product availability filter options
 * Used in product filters and search components
 * Typed as const for type safety and autocomplete
 */
export const AVAILABILITY_OPTIONS = [
  { label: "Any Availability", value: "any" }, // Default option, no filtering
  { label: "In Stock", value: "in-stock" }, // Currently available products
  { label: "Pre-order", value: "pre-order" }, // Future availability
  { label: "Out of Stock", value: "out-of-stock" } // Currently unavailable
] as const;

/**
 * Product sorting options
 * Used in product listings and search results
 * Values correspond to API sorting parameters
 * Typed as const for type safety and autocomplete
 */
export const SORT_OPTIONS = [
  { label: "Featured", value: "featured" }, // Default sorting, typically manually curated
  { label: "Price: Low to High", value: "price-asc" }, // Ascending price sort
  { label: "Price: High to Low", value: "price-desc" }, // Descending price sort
  { label: "Name: A to Z", value: "name-asc" }, // Alphabetical sort
  { label: "Name: Z to A", value: "name-desc" } // Reverse alphabetical sort
] as const;
