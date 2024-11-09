"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number; // Currently active page
  totalPages: number; // Total number of available pages
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Updates URL with new page number while preserving other search parameters
   * @param page - The page number to navigate to
   */
  const handlePageChange = (page: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", page.toString());
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`/products${query}`);
  };

  /**
   * Generates the array of page numbers to display
   * Implements smart pagination with ellipsis for large page counts
   * Rules:
   * - Always show first and last page
   * - Show ellipsis when there are gaps
   * - Show current page and 1-2 pages before/after
   * - Keep total numbers shown reasonable (max 7 numbers)
   */
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    // If few pages, show all numbers
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Show ellipsis after first page if current page is far enough
      if (currentPage > 3) {
        pageNumbers.push("...");
      }

      // Calculate visible page range around current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust range for edge cases
      if (currentPage <= 3) {
        end = 4;
      }
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      // Add visible page numbers
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      // Show ellipsis before last page if needed
      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <PaginationRoot>
      <PaginationContent>
        {/* Previous page button - only shown if not on first page */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
        )}

        {/* Page numbers and ellipsis */}
        {getPageNumbers().map((pageNum, i) => (
          <PaginationItem key={i}>
            {pageNum === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(pageNum as number);
                }}
                isActive={currentPage === pageNum}
              >
                {pageNum}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next page button - only shown if not on last page */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationRoot>
  );
}
