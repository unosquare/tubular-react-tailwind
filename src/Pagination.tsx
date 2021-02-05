import * as React from "react";

const getPages = (
  currentPage: number,
  totalRows: number,
  rowsPerPage: number
) => {
  const pages = [];

  // Default page limits
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  let startPage = 1;
  let endPage = totalPages;
  const maxSize = 6;
  const isMaxSized = maxSize < totalPages;

  // recompute if maxSize
  if (isMaxSized) {
    // Current page is displayed in the middle of the visible ones
    startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
    endPage = startPage + maxSize - 1;

    // Adjust if limit is exceeded
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - maxSize + 1;
    }
  }

  // Add page number links
  for (let num = startPage; num <= endPage; num++) {
    pages.push(num - 1);
  }

  return pages;
};

interface PaginationProps {
  isLoading: boolean;
  page: number;
  filteredRecordCount: number;
  itemsPerPage: number;
  goToPage: (page: number) => void;
}

export const Pagination: React.FunctionComponent<PaginationProps> = ({
  isLoading,
  page,
  filteredRecordCount,
  itemsPerPage,
  goToPage,
}: PaginationProps) => {
  const pages = getPages(page, filteredRecordCount, itemsPerPage);
  // const lastPage = Math.ceil(filteredRecordCount / itemsPerPage) - 1;
  const gotoPage = (value: number) => () => goToPage(value);
  const gotoFirstPage = gotoPage(0);
  // const gotoPrevPage = gotoPage(page - 1);
  const gotoNextPage = gotoPage(page + 1);
  // const gotoLastPage = gotoPage(Math.max(0, lastPage));

  // const canNotBack = page === 0 || isLoading;
  // const canNotFwd = page >= lastPage || isLoading;

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
        >
          Previous
        </a>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing 
            <span className="font-medium"> 1 </span>
            to 
            <span className="font-medium"> 10 </span>
            of 
            <span className="font-medium"> 97 </span>
            results 
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              onClick={gotoFirstPage}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            {pages.map((value) => (
              <a
                onClick={gotoPage(value)}
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {value + 1}
              </a>
            ))}
            <a
              href="#"
              onClick={gotoNextPage}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};
