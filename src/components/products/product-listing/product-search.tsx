"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { AVAILABILITY_OPTIONS } from "@/constants";
import { SORT_OPTIONS } from "@/constants";

interface ProductSearchProps {
  categorySlug?: string; // Optional category for filtered searches
}

export function ProductSearch({ categorySlug }: ProductSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for advanced search panel visibility and price range
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Get current filter values from URL or use defaults
  const currentAvailability = searchParams.get("availability") || "any";
  const currentSort = searchParams.get("sort") || "featured";

  /**
   * Handles form submission and updates URL with search parameters
   * Collects all active filters and constructs the search URL
   */
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const current = new URLSearchParams();

    // Add basic search query if present
    const searchQuery = formData.get("search");
    if (searchQuery) current.set("search", searchQuery.toString());

    // Add advanced filters if the panel is expanded
    if (showAdvanced) {
      const availability = formData.get("availability");
      const sort = formData.get("sort");

      // Only add non-default filter values
      if (availability && availability !== "any")
        current.set("availability", availability.toString());
      if (sort && sort !== "featured") current.set("sort", sort.toString());

      // Always include price range when advanced search is shown
      current.set("minPrice", priceRange[0].toString());
      current.set("maxPrice", priceRange[1].toString());
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    // Route to category-specific or general product page
    const basePath = categorySlug
      ? `/product-category/${categorySlug}`
      : "/products";

    router.push(`${basePath}${query}`);
  };

  /**
   * Resets all filters and search parameters
   * Returns to base product or category page
   */
  const handleReset = () => {
    setShowAdvanced(false);
    setPriceRange([0, 1000]);

    const basePath = categorySlug
      ? `/product-category/${categorySlug}`
      : "/products";

    router.push(basePath);
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSearch}>
        <CardHeader>
          <CardTitle>
            {categorySlug
              ? `Search ${categorySlug} Products`
              : "Search Products"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Basic Search Bar */}
          <div className="flex gap-2">
            <Input
              name="search"
              placeholder="Search products..."
              defaultValue={searchParams.get("search") ?? ""}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Advanced Search Toggle Button */}
          <Button
            type="button"
            variant="ghost"
            className="w-full justify-between"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            Advanced Search
            {showAdvanced ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </Button>

          {/* Advanced Search Panel */}
          <div
            className={cn(
              "space-y-4 overflow-hidden transition-all",
              showAdvanced ? "opacity-100" : "hidden opacity-0"
            )}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Availability Filter */}
              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select name="availability" defaultValue={currentAvailability}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABILITY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Order Selection */}
              <div className="space-y-2">
                <Label htmlFor="sort">Sort By</Label>
                <Select name="sort" defaultValue={currentSort}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sorting" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2">
              <Label>Price Range</Label>
              <Slider
                defaultValue={priceRange}
                max={1000}
                step={10}
                className="mt-2"
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Filter Actions Footer */}
        {showAdvanced && (
          <CardFooter className="flex justify-between border-t pt-4">
            <Button type="button" variant="ghost" onClick={handleReset}>
              Reset Filters
            </Button>
            <Button type="submit">Apply Filters</Button>
          </CardFooter>
        )}
      </form>
    </Card>
  );
}
