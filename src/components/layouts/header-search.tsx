"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HeaderSearch() {
  const router = useRouter();
  // State for search input and mobile dialog visibility
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Handle form submission for search
  // Prevents default form behavior, validates input, and navigates to search results
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileSearchOpen(false); // Close mobile dialog after search
    }
  };

  // Handle keyboard events for search input
  // Allows users to trigger search with Enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchQuery.trim()) {
        router.push(
          `/products?search=${encodeURIComponent(searchQuery.trim())}`
        );
      }
    }
  };

  return (
    <>
      {/* Desktop Search Section
          - Hidden on mobile (md:block)
          - Includes search icon button (visible only on mobile) 
          - Contains search input with icon */}
      <div className="flex space-x-3">
        {/* Mobile search trigger button
            - Only visible on mobile screens
            - Opens search dialog when clicked */}
        <button
          type="button"
          onClick={() => setIsMobileSearchOpen(true)}
          className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
          aria-label="Open search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Desktop search form
            - Hidden on mobile screens
            - Includes search icon and input field */}
        <form onSubmit={handleSearch} className="relative hidden md:block">
          {/* Search icon wrapper
              - Positioned absolutely within input
              - Non-interactive decoration */}
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          {/* Search input field
              - Includes padding for icon
              - Supports dark mode
              - Has focus states */}
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </form>
      </div>

      {/* Mobile Search Dialog
          - Opens as modal on mobile devices
          - Contains search form with auto-focus
          - Managed by isMobileSearchOpen state */}
      <Dialog open={isMobileSearchOpen} onOpenChange={setIsMobileSearchOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
            {/* Search icon in mobile dialog
                - Positioned similarly to desktop for consistency */}
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
