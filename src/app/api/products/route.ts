import { NextRequest, NextResponse } from "next/server";
import {
  fetchProduct,
  fetchProducts,
  fetchProductsByCategory
} from "@/services/shopify-client";
import { PRODUCTS_PER_PAGE } from "@/constants";
import {
  ProductProps,
  ProductVariant,
  ProductImage,
  ProductOption
} from "@/types";

/**
 * Maps Shopify product data to our ProductProps interface
 */
function mapShopifyProduct(shopifyProduct: any): ProductProps {
  return {
    id: shopifyProduct.id,
    title: shopifyProduct.title,
    handle: shopifyProduct.handle,
    description: shopifyProduct.description,
    publishedAt: shopifyProduct.publishedAt,
    createdAt: shopifyProduct.createdAt,
    updatedAt: shopifyProduct.updatedAt,
    vendor: shopifyProduct.vendor,
    productType: shopifyProduct.productType,
    tags: Array.isArray(shopifyProduct.tags) ? shopifyProduct.tags : [],
    variants: shopifyProduct.variants.map(
      (variant: any): ProductVariant => ({
        id: variant.id,
        title: variant.title,
        price: {
          amount: variant.price?.amount || "0",
          currencyCode: variant.price?.currencyCode || "USD"
        },
        compareAtPrice: variant.compareAtPrice
          ? {
              amount: variant.compareAtPrice.amount,
              currencyCode: variant.compareAtPrice.currencyCode
            }
          : null,
        inventoryQuantity: variant.quantityAvailable || 0,
        weight: variant.weight || 0,
        weightUnit: variant.weightUnit || "kg",
        availableForSale: variant.available || false,
        requiresShipping: variant.requiresShipping || true,
        barcode: variant.sku || "",
        available: variant.available || false,
        image: variant.image
          ? {
              url: variant.image.src,
              altText: variant.image.altText || ""
            }
          : undefined
      })
    ),
    options: shopifyProduct.options.map(
      (option: any): ProductOption => ({
        id: option.id,
        name: option.name,
        values: Array.isArray(option.values) ? option.values : [],
        type: Array.isArray(option.type) ? option.type : []
      })
    ),
    images: shopifyProduct.images.map(
      (image: any): ProductImage => ({
        id: image.id,
        src: image.src,
        altText: image.altText || "",
        width: image.width || 0,
        height: image.height || 0
      })
    )
  };
}

/**
 * Helper function to get product price
 * Extracts the price from the first variant if available
 */
function getProductPrice(product: ProductProps): number {
  if (product.variants && product.variants.length > 0) {
    const variant = product.variants[0];
    if (variant.price && variant.price.amount) {
      const price = parseFloat(variant.price.amount);
      return isNaN(price) ? 0 : price;
    }
  }
  return 0;
}

/**
 * Helper function to check product availability status
 */
function checkAvailability(product: ProductProps, status: string): boolean {
  if (!product.variants || product.variants.length === 0) return false;

  switch (status) {
    case "in-stock":
      return product.variants.some(
        (variant) => variant.availableForSale && variant.inventoryQuantity > 0
      );
    case "out-of-stock":
      return product.variants.every(
        (variant) => !variant.availableForSale || variant.inventoryQuantity <= 0
      );
    case "pre-order":
      return product.variants.some(
        (variant) => variant.availableForSale && variant.inventoryQuantity <= 0
      );
    default:
      return true;
  }
}

/**
 * GET - Advanced product fetching endpoint with filtering, sorting, and pagination
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;
  const availability = searchParams.get("availability");
  const sort = searchParams.get("sort");
  const page = Number(searchParams.get("page")) || 1;

  try {
    let products: ProductProps[];

    // Handle single product fetch by handle
    if (handle) {
      const shopifyProduct = await fetchProduct(handle);
      if (!shopifyProduct) {
        return NextResponse.json(
          { success: false, error: "Product not found" },
          { status: 404 }
        );
      }
      const mappedProduct = mapShopifyProduct(shopifyProduct);
      return NextResponse.json({ success: true, product: mappedProduct });
    }
    // Handle category-based product fetch
    else if (category) {
      const result = await fetchProductsByCategory(category);
      if (!result.exists) {
        return NextResponse.json(
          { success: false, error: "Category not found" },
          { status: 404 }
        );
      }
      products = result.products.map(mapShopifyProduct);
    }
    // Fetch all products if no handle or category specified
    else {
      const shopifyProducts = await fetchProducts();
      products = shopifyProducts.map(mapShopifyProduct);
    }

    // Initialize empty array if no products found
    if (!products) {
      products = [];
    }

    // Apply filters
    let filteredProducts = [...products];

    // Apply search filter across title, description, and vendor
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.vendor.toLowerCase().includes(searchLower)
      );
    }

    // Apply price range filter
    if (minPrice > 0 || maxPrice < Infinity) {
      filteredProducts = filteredProducts.filter((product) => {
        const price = getProductPrice(product);
        return price >= minPrice && price <= maxPrice;
      });
    }

    // Apply availability filter
    if (availability && availability !== "any") {
      filteredProducts = filteredProducts.filter((product) =>
        checkAvailability(product, availability)
      );
    }

    // Apply sorting
    if (sort) {
      filteredProducts = [...filteredProducts].sort((a, b) => {
        switch (sort) {
          case "price-asc":
            return getProductPrice(a) - getProductPrice(b);
          case "price-desc":
            return getProductPrice(b) - getProductPrice(a);
          case "name-asc":
            return a.title.localeCompare(b.title);
          case "name-desc":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
    }

    // Apply pagination
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(
      start,
      start + PRODUCTS_PER_PAGE
    );

    // Return paginated results with metadata
    return NextResponse.json({
      success: true,
      products: paginatedProducts,
      total: filteredProducts.length,
      page: page
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
