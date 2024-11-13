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
  product: ProductProps;
}

const ProductDetailPageComponent = ({ product }: ProductDetailProps) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  // Existing price calculation logic remains the same
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

  let hasDiscount = selectedVariant.compareAtPrice?.amount ?? null;

  const calculateDiscount = (price: number, comparePrice: number | null) => {
    if (!comparePrice) return null;
    return Math.round(((comparePrice - price) / comparePrice) * 100);
  };

  const PriceDisplay = () => {
    if (selectedVariant) {
      const discount = calculateDiscount(
        parseFloat(selectedVariant.price.amount),
        selectedVariant.compareAtPrice
          ? parseFloat(selectedVariant.compareAtPrice.amount)
          : null
      );

      return (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl font-bold">
              ${parseFloat(selectedVariant.price.amount).toFixed(2)}
            </span>
            {selectedVariant.compareAtPrice && (
              <span className="text-lg sm:text-xl text-gray-500 line-through">
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

    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {priceRanges.hasVariedPrices ? (
            <span className="text-2xl sm:text-3xl font-bold">
              ${priceRanges.minPrice.toFixed(2)} - $
              {priceRanges.maxPrice.toFixed(2)}
            </span>
          ) : (
            <span className="text-2xl sm:text-3xl font-bold">
              ${priceRanges.minPrice.toFixed(2)}
            </span>
          )}
          {priceRanges.minComparePrice && (
            <span className="text-lg sm:text-xl text-gray-500 line-through">
              ${priceRanges.minComparePrice.toFixed(2)}
              {priceRanges.maxComparePrice &&
                priceRanges.maxComparePrice !== priceRanges.minComparePrice &&
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
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Image Gallery Section */}
        <div className="space-y-3 sm:space-y-4">
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
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
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
        <div className="space-y-4 sm:space-y-6">
          {/* Title and Price */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold">{product.title}</h1>
            <PriceDisplay />
          </div>

          {/* Product Options Section */}
          <div className="space-y-4">
            {/* Variant Selection */}
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

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <div className="w-full sm:w-auto">
                <AddToCartButton
                  variantId={selectedVariant.id}
                  availableForSale={selectedVariant.available}
                  maxQuantity={selectedVariant.inventoryQuantity}
                  productTitle={product.title}
                />
              </div>
              <div className="flex gap-2">
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Shipping Card */}
            <Card>
              <CardContent className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
                <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                <div>
                  <h3 className="text-sm sm:text-base font-medium">
                    Free Shipping
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Free standard shipping on orders over $100
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="mt-6 sm:mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description" className="text-xs sm:text-sm">
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="text-xs sm:text-sm"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger value="shipping" className="text-xs sm:text-sm">
                Shipping
              </TabsTrigger>
            </TabsList>
            {/* Description Tab */}
            <TabsContent value="description" className="mt-3 sm:mt-4">
              <p className="text-sm sm:text-base text-gray-600">
                {product.description}
              </p>
            </TabsContent>
            {/* Specifications Tab */}
            <TabsContent value="specifications" className="mt-3 sm:mt-4">
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="text-xs sm:text-sm font-medium">Brand</div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {product.vendor}
                  </div>
                  <div className="text-xs sm:text-sm font-medium">Type</div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {product.productType}
                  </div>
                </div>
              </div>
            </TabsContent>
            {/* Shipping Tab */}
            <TabsContent value="shipping" className="mt-3 sm:mt-4">
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-600">
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
