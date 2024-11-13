"use client";
import React, { memo, useState, useMemo } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ProductProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { useCart } from "@/hooks/cart/use-cart";
import AddToCartButton from "./cart/add-to-cart-button";

interface ProductCardProps {
  product: ProductProps; // Product data object containing all product information
}

/**
 * Memoized product card component that displays product information and handles user interactions
 * Includes quick view functionality and variant selection
 */
const ProductCard = memo(function ProductCard({
  product
}: {
  product: ProductProps;
}) {
  // State management for component features
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  // const [selectedVariant, setSelectedVariant] = useState(() => {
  //   const availableVariant = product.variants.find((v) => v.available);
  //   return availableVariant || product.variants[0];
  // });
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const { addToCart, isLoading } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Check if any variant is available for sale
  const hasAvailableVariants = product.variants.some((v) => v.available);

  /**
   * Handles adding product to cart
   * Sets loading state during API call
   */
  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await addToCart(selectedVariant.id, 1);
    } finally {
      setIsAddingToCart(false);
    }
  };

  /**
   * Calculate price-related information for the product
   * Includes min/max prices, compare prices, and discount percentage
   */
  const priceInfo = useMemo(() => {
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
      hasVariedPrices: Math.min(...prices) !== Math.max(...prices),
      currentDiscount: selectedVariant.compareAtPrice
        ? Math.round(
            ((parseFloat(selectedVariant.compareAtPrice.amount) -
              parseFloat(selectedVariant.price.amount)) /
              parseFloat(selectedVariant.compareAtPrice.amount)) *
              100
          )
        : 0
    };
  }, [product.variants, selectedVariant]);

  // console.log("Selected Variant: ", selectedVariant);

  /**
   * Reusable price display component
   * Handles different price scenarios (varied prices, compare prices, discounts)
   */
  const PriceDisplay = ({ isQuickView = false }: { isQuickView?: boolean }) => {
    const textSizeClass = isQuickView ? "text-2xl" : "text-xl";

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {/* Show price range if variants have different prices */}
          {priceInfo.hasVariedPrices ? (
            <span className={`${textSizeClass} font-bold text-gray-900`}>
              ${priceInfo.minPrice.toFixed(2)} - $
              {priceInfo.maxPrice.toFixed(2)}
            </span>
          ) : (
            <span className={`${textSizeClass} font-bold text-gray-900`}>
              ${parseFloat(selectedVariant.price.amount).toFixed(2)}
            </span>
          )}
          {/* Show compare price if available */}
          {selectedVariant.compareAtPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${parseFloat(selectedVariant.compareAtPrice.amount).toFixed(2)}
            </span>
          )}
        </div>
        {priceInfo.hasVariedPrices && (
          <span className="text-xs text-muted-foreground">
            Price varies by variant
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Main Product Card */}
      <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
        {/* Discount Badge - Only shown if there's a discount */}
        {priceInfo.currentDiscount > 0 && (
          <Badge className="absolute left-2 top-2 z-10 bg-red-500">
            -{priceInfo.currentDiscount}%
          </Badge>
        )}

        {/* Quick Action Buttons - Shown on hover */}
        <div className="absolute right-2 top-2 z-10 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full"
            onClick={() => setIsQuickViewOpen(true)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Product Image with Zoom Effect */}
        <Link href={`/product/${product.handle}`}>
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={selectedVariant.image?.url || product.images[0].src}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </Link>

        <CardContent className="p-4">
          {/* Product Rating Display */}
          <div className="mb-2 flex items-center gap-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">(24)</span>
          </div>

          {/* Product Title with Link */}
          <Link href={`/product/${product.handle}`}>
            <h3 className="line-clamp-1 text-lg font-semibold hover:text-blue-600">
              {product.title}
            </h3>
          </Link>

          {/* Product Description - Limited to 2 lines */}
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
            {product.description}
          </p>

          {/* Variant Selector - Only shown if product has multiple variants */}
          {product.variants.length > 1 && (
            <div className="mt-3">
              <Select
                value={selectedVariant.id}
                onValueChange={(value) => {
                  const variant = product.variants.find((v) => v.id === value);
                  if (variant) setSelectedVariant(variant);
                }}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select variant" />
                </SelectTrigger>
                <SelectContent>
                  {product.variants.map((variant) => (
                    <SelectItem
                      key={variant.id}
                      value={variant.id}
                      className="flex justify-between"
                    >
                      <span>
                        {variant.title}
                        {!variant.available && " (Out of Stock)"}
                      </span>
                      <span className="ml-4 text-muted-foreground">
                        ${parseFloat(variant.price.amount).toFixed(2)}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Price Display */}
          <div className="mt-3">
            <PriceDisplay />
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <AddToCartButton
            variantId={selectedVariant.id}
            availableForSale={selectedVariant.available}
            maxQuantity={selectedVariant.inventoryQuantity}
            isProductCard={true}
            productTitle={product.title}
          />
        </CardFooter>
      </Card>

      {/* Quick View Dialog */}
      <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Quick View</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto flex-grow pr-2">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Product Images Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={selectedImage.src}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(0, 4).map((image) => (
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

              {/* Quick View Product Details */}
              <div className="space-y-4">
                {/* Product Title and Rating */}
                <div>
                  <h2 className="text-2xl font-bold">{product.title}</h2>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">(24)</span>
                  </div>
                </div>

                <p className="text-gray-600">{product.description}</p>

                {/* Quick View Variant Selection */}
                {product.variants.length > 1 && (
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Select Variant
                    </label>
                    <Select
                      value={selectedVariant.id}
                      onValueChange={(value) => {
                        const variant = product.variants.find(
                          (v) => v.id === value
                        );
                        if (variant) setSelectedVariant(variant);
                      }}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select variant" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.variants.map((variant) => (
                          <SelectItem
                            key={variant.id}
                            value={variant.id}
                            className="flex justify-between"
                          >
                            <span>
                              {variant.title}
                              {!variant.available && " (Out of Stock)"}
                            </span>
                            <span className="ml-4 text-muted-foreground">
                              ${parseFloat(variant.price.amount).toFixed(2)}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Quick View Price Display */}
                <PriceDisplay isQuickView />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <AddToCartButton
                    variantId={selectedVariant.id}
                    availableForSale={selectedVariant.available}
                    maxQuantity={selectedVariant.inventoryQuantity}
                    isProductCard={true}
                    productTitle={product.title}
                  />
                  <Link href={`/product/${product.handle}`}>
                    <Button variant="outline" className="w-full">
                      View Full Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});

export default ProductCard;
