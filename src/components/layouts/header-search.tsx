"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HeaderSearch() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <>
      <div className="flex space-x-3">
        {/* Mobile search trigger */}
        <button
          type="button"
          onClick={() => setIsMobileSearchOpen(true)}
          className="md:hidden text-gray-500 hover:bg-gray-100 rounded-lg text-sm p-2.5 me-1"
          aria-label="Open search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Desktop search form */}
        <form
          onSubmit={handleSearch}
          className="relative hidden md:block w-full"
        >
          <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
            <Search className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full py-3 ps-12 pe-4 text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Mobile search dialog */}
      <Dialog open={isMobileSearchOpen} onOpenChange={setIsMobileSearchOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 ps-12 pe-4 text-base border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              autoFocus
            />
            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
