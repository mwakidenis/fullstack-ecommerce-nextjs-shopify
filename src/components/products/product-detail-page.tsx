"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ProductProps } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, Share2, Truck } from "lucide-react";
import AddToCartButton from "./cart/add-to-cart-button";
import { Badge } from "../ui/badge";

interface ProductDetailProps {
  product: ProductProps; // Complete product data including variants and images
}

/**
 * Product detail page component displaying comprehensive product information
 * Includes image gallery, variant selection, pricing, and detailed product information
 */
const ProductDetailPageComponent = ({ product }: ProductDetailProps) => {
  // State for selected variant and image
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  /**
   * Calculate price ranges and variations across all product variants
   * Used for displaying price ranges when product has multiple variants
   */
  const priceRanges = useMemo(() => {
    const prices = product.variants.map((v) => parseFloat(v.price.amount));
    const comparePrices = product.variants
      .map((v) =>
        v.compareAtPrice ? parseFloat(v.compareAtPrice.amount) : null
      )
      .filter((p) => p !== null);

    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      minComparePrice:
        comparePrices.length > 0 ? Math.min(...comparePrices) : null,
      maxComparePrice:
        comparePrices.length > 0 ? Math.max(...comparePrices) : null,
      hasVariedPrices: Math.min(...prices) !== Math.max(...prices)
    };
  }, [product.variants]);

  // Check if selected variant has a discount price
  let hasDiscount = null;
  if (selectedVariant.compareAtPrice !== null) {
    hasDiscount = selectedVariant.compareAtPrice.amount;
  }

  /**
   * Calculate discount percentage between original and sale price
   * @param price - Current price
   * @param comparePrice - Original price to compare against
   * @returns Discount percentage or null if no discount
   */
  const calculateDiscount = (price: number, comparePrice: number | null) => {
    if (!comparePrice) return null;
    return Math.round(((comparePrice - price) / comparePrice) * 100);
  };

  /**
   * Price display component handling various pricing scenarios:
   * - Single variant price
   * - Price ranges for multiple variants
   * - Discount displays
   * - Compare at prices
   */
  const PriceDisplay = () => {
    // Display price for selected variant
    if (selectedVariant) {
      const discount = calculateDiscount(
        parseFloat(selectedVariant.price.amount),
        selectedVariant.compareAtPrice
          ? parseFloat(selectedVariant.compareAtPrice.amount)
          : null
      );

      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">
              ${parseFloat(selectedVariant.price.amount).toFixed(2)}
            </span>
            {selectedVariant.compareAtPrice && (
              <span className="text-xl text-gray-500 line-through">
                ${parseFloat(selectedVariant.compareAtPrice.amount).toFixed(2)}
              </span>
            )}
            {discount && (
              <Badge variant="destructive" className="text-sm">
                Save {discount}%
              </Badge>
            )}
          </div>
          {selectedVariant.title && (
            <span className="text-sm text-muted-foreground">
              Price for: {selectedVariant.title}
            </span>
          )}
        </div>
      );
    }

    // Display price range for multiple variants
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          {priceRanges.hasVariedPrices ? (
            <span className="text-3xl font-bold">
              ${priceRanges.minPrice.toFixed(2)} - $
              {priceRanges.maxPrice.toFixed(2)}
            </span>
          ) : (
            <span className="text-3xl font-bold">
              ${priceRanges.minPrice.toFixed(2)}
            </span>
          )}
          {priceRanges.minComparePrice && (
            <span className="text-xl text-gray-500 line-through">
              ${priceRanges.minComparePrice.toFixed(2)}
              {priceRanges.maxComparePrice !== priceRanges.minComparePrice &&
                ` - $${priceRanges.maxComparePrice.toFixed(2)}`}
            </span>
          )}
        </div>
        {priceRanges.hasVariedPrices && (
          <span className="text-sm text-muted-foreground">
            Price varies by variant
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery Section */}
        <div className="space-y-4">
          {/* Main product image */}
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={selectedImage.src}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Thumbnail gallery */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image) => (
              <div
                key={image.id}
                className={`relative aspect-square cursor-pointer overflow-hidden rounded-lg border-2 transition-colors ${
                  selectedImage.id === image.id
                    ? "border-primary"
                    : "border-transparent hover:border-primary/50"
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src}
                  alt={`${product.title} thumbnail`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Information Section */}
        <div className="space-y-6">
          {/* Title and Price */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <PriceDisplay />
          </div>

          {/* Product Options Section */}
          <div className="space-y-4">
            {/* Variant Selection Dropdown */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Select Variant
              </label>
              <Select
                value={selectedVariant.id}
                onValueChange={(value) => {
                  const variant = product.variants.find((v) => v.id === value);
                  if (variant) setSelectedVariant(variant);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a variant" />
                </SelectTrigger>
                <SelectContent>
                  {product.variants.map((variant) => (
                    <SelectItem
                      key={variant.id}
                      value={variant.id}
                      className="flex justify-between"
                    >
                      <span>{variant.title}</span>
                      <span className="ml-4 text-muted-foreground">
                        ${parseFloat(variant.price.amount).toFixed(2)}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons Group */}
            <div className="flex gap-4">
              <AddToCartButton
                variantId={selectedVariant.id}
                availableForSale={selectedVariant.available}
                maxQuantity={selectedVariant.inventoryQuantity}
                productTitle={product.title}
              />
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Shipping Information Card */}
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <Truck className="h-8 w-8 text-gray-400" />
                <div>
                  <h3 className="font-medium">Free Shipping</h3>
                  <p className="text-sm text-gray-600">
                    Free standard shipping on orders over $100
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            {/* Description Tab */}
            <TabsContent value="description" className="mt-4">
              <p className="text-gray-600">{product.description}</p>
            </TabsContent>
            {/* Specifications Tab */}
            <TabsContent value="specifications" className="mt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm font-medium">Brand</div>
                  <div className="text-sm text-gray-600">{product.vendor}</div>
                  <div className="text-sm font-medium">Type</div>
                  <div className="text-sm text-gray-600">
                    {product.productType}
                  </div>
                </div>
              </div>
            </TabsContent>
            {/* Shipping Tab */}
            <TabsContent value="shipping" className="mt-4">
              <div className="space-y-4 text-sm text-gray-600">
                <p>
                  Standard Shipping (5-7 business days): Free on orders over
                  $100
                </p>
                <p>Express Shipping (2-3 business days): $15</p>
                <p>Next Day Delivery: $25 (order before 2pm)</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPageComponent;
