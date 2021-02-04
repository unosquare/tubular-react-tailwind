import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import { buttonLinkStyle } from "./styles/common";

const paginationStyles = {
  pagination: {
    display: "flex",
    justifyContent: "center",
    "& button": {
      extend: buttonLinkStyle,
    },
  },
};

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

interface PaginationProps extends WithStylesProps<typeof paginationStyles> {
  isLoading: boolean;
  page: number;
  filteredRecordCount: number;
  itemsPerPage: number;
  goToPage: (page: number) => void;
}

const PaginationComponent: React.FunctionComponent<PaginationProps> = ({
  classes,
  isLoading,
  page,
  filteredRecordCount,
  itemsPerPage,
  goToPage,
}: PaginationProps) => {
  const pages = getPages(page, filteredRecordCount, itemsPerPage);
  const lastPage = Math.ceil(filteredRecordCount / itemsPerPage) - 1;
  const gotoPage = (value: number) => (e: any) => goToPage(value);
  const gotoFirstPage = gotoPage(0);
  const gotoPrevPage = gotoPage(page - 1);
  const gotoNextPage = gotoPage(page + 1);
  const gotoLastPage = gotoPage(Math.max(0, lastPage));

  const canNotBack = page === 0 || isLoading;
  const canNotFwd = page >= lastPage || isLoading;

  return (
    <div className={classes.pagination}>
      <button onClick={gotoFirstPage} disabled={canNotBack}>
        <FontAwesomeIcon icon="angle-double-left" />
      </button>
      <button onClick={gotoPrevPage} disabled={canNotBack}>
        <FontAwesomeIcon icon="chevron-left" />
      </button>
      {pages.map((value) => (
        <button
          onClick={gotoPage(value)}
          disabled={
            value >= Math.ceil(filteredRecordCount / itemsPerPage) || isLoading
          }
          className={value === page ? "primary" : "default"}
        >
          {value + 1}
        </button>
      ))}
      <button onClick={gotoNextPage} disabled={canNotFwd}>
        <FontAwesomeIcon icon="chevron-right" />
      </button>
      <button onClick={gotoLastPage} disabled={canNotFwd}>
        <FontAwesomeIcon icon="angle-double-right" />
      </button>
    </div>
  );
};

export const Pagination = withStyles(paginationStyles)(PaginationComponent);
