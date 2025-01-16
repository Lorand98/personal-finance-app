import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
} from "../ui/pagination";
import { Transaction } from "./types";

const TransactionPagination = ({
  table,
  isMobile,
}: {
  table: Table<Transaction>;
  isMobile: boolean;
}) => {
  // Helper function to get visible page numbers
  const getVisiblePages = () => {
    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex;
    const pages: (number | "ellipsis")[] = [];

    const maxPageNumbersToShow = isMobile ? 3 : 7;
    const siblingsCount = isMobile ? 1 : 2;

    if (totalPages <= maxPageNumbersToShow) {
      // Show all pages
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(currentPage - siblingsCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingsCount,
        totalPages - 2
      );

      const showLeftEllipsis = leftSiblingIndex > 1;
      const showRightEllipsis = rightSiblingIndex < totalPages - 2;

      // First page
      pages.push(0);

      // Left ellipsis
      if (showLeftEllipsis) {
        pages.push("ellipsis");
      }

      // Left sibling pages
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pages.push(i);
      }

      // Right ellipsis
      if (showRightEllipsis) {
        pages.push("ellipsis");
      }

      // Last page
      pages.push(totalPages - 1);
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="group p-0 sm:p-2 w-8 h-8 sm:w-auto sm:h-auto"
            aria-label="Previous Page"
          >
            <CaretLeftIcon className="group-hover:fill-white" />
            <span className="hidden sm:block">Prev</span>
          </Button>
        </PaginationItem>

        <div className="flex gap-2">
          {getVisiblePages().map((page, index) =>
            page === "ellipsis" ? (
              <PaginationEllipsis key={`ellipsis-${index}`} className="w-3" />
            ) : (
              <PaginationItem key={page} className="flex items-center">
                <Button
                  variant={
                    table.getState().pagination.pageIndex === page
                      ? "default"
                      : "outline"
                  }
                  onClick={() => table.setPageIndex(page)}
                  className="w-8 h-8 sm:w-10 sm:h-10"
                >
                  {page + 1}
                </Button>
              </PaginationItem>
            )
          )}
        </div>

        {/* TODO: CHECK: hover animation timing different between button and icon */}

        <PaginationItem>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="group p-0 sm:p-2 w-8 h-8 sm:w-auto sm:h-auto"
            aria-label="Next Page"
          >
            <span className="hidden sm:block">Next</span>
            <CaretRightIcon className="group-hover:fill-white" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TransactionPagination;
