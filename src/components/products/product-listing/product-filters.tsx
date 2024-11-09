"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // State for mobile filter sheet visibility
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Updates URL parameters based on selected filters
   * Preserves existing parameters while updating specified ones
   * @param filters - Object containing filter key-value pairs
   */
  const handleFilterChange = (filters: Record<string, string | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    // Update or remove filter parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        current.set(key, value);
      } else {
        current.delete(key);
      }
    });

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`/products${query}`);
    setIsOpen(false); // Close mobile filter sheet after applying filters
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      {/* Mobile Filter Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="lg:hidden">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Refine your product search with these filters
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block w-[250px] mr-6">
        <FilterContent />
      </div>

      {/* Search Input */}
      <div className="flex-1">
        <Input
          placeholder="Search products..."
          className="max-w-sm"
          onChange={(e) => handleFilterChange({ search: e.target.value })}
          defaultValue={searchParams.get("search") ?? ""}
        />
      </div>

      {/* Sort Options Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Sort By</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => handleFilterChange({ sort: "price-asc" })}
          >
            Price: Low to High
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleFilterChange({ sort: "price-desc" })}
          >
            Price: High to Low
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleFilterChange({ sort: "name-asc" })}
          >
            Name: A to Z
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleFilterChange({ sort: "name-desc" })}
          >
            Name: Z to A
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/**
 * Filter content component used in both mobile and desktop views
 * Contains price range slider, category checkboxes, and availability filters
 */
function FilterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // State for price range slider
  const [priceRange, setPriceRange] = useState([0, 1000]);

  /**
   * Updates URL parameters for filter changes
   * Shared logic with parent component but scoped to filter content
   */
  const handleFilterChange = (filters: Record<string, string | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        current.set(key, value);
      } else {
        current.delete(key);
      }
    });

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`/products${query}`);
  };

  return (
    <div className="space-y-6">
      {/* Price Range Filter */}
      <div className="space-y-2">
        <Label>Price Range</Label>
        <Slider
          defaultValue={priceRange}
          max={1000}
          step={10}
          className="mt-2"
          onValueChange={(value) => {
            setPriceRange(value);
            handleFilterChange({
              minPrice: value[0].toString(),
              maxPrice: value[1].toString()
            });
          }}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <Label>Category</Label>
        <div className="space-y-1">
          {["Electronics", "Clothing", "Books", "Home & Garden"].map(
            (category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  defaultChecked={searchParams.get("category") === category}
                  onChange={(e) =>
                    handleFilterChange({
                      category: e.target.checked ? category : null
                    })
                  }
                />
                <span className="text-sm">{category}</span>
              </label>
            )
          )}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="space-y-2">
        <Label>Availability</Label>
        <div className="space-y-1">
          {["In Stock", "Pre-order", "Out of Stock"].map((status) => (
            <label key={status} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox"
                defaultChecked={searchParams.get("availability") === status}
                onChange={(e) =>
                  handleFilterChange({
                    availability: e.target.checked ? status : null
                  })
                }
              />
              <span className="text-sm">{status}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
