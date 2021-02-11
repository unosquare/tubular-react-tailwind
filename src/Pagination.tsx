import classNames = require('classnames');
import * as React from 'react';
import { Link } from './components/Link';
import { getPages } from 'tubular-common';
import { PaginationRowsPerPageDropDown } from './PaginationRowsPerPageDropDown';

interface PaginationProps {
    isLoading: boolean;
    page: number;
    filteredRecordCount: number;
    itemsPerPage: number;
    goToPage: (page: number) => void;
    updateItemsPerPage: (newValue: number) => void;
}

export const Pagination: React.FunctionComponent<PaginationProps> = ({
    isLoading,
    page,
    filteredRecordCount,
    itemsPerPage,
    goToPage,
    updateItemsPerPage,
}: PaginationProps) => {
    const pages = getPages(page, filteredRecordCount, itemsPerPage);
    const lastPage = Math.ceil(filteredRecordCount / itemsPerPage) - 1;
    const gotoPage = (value: number) => () => goToPage(value);
    const gotoFirstPage = gotoPage(0);
    const gotoPrevPage = gotoPage(page - 1);
    const gotoNextPage = gotoPage(page + 1);
    const gotoLastPage = gotoPage(Math.max(0, lastPage));

    const canNotBack = page === 0 || isLoading;
    const canNotFwd = page >= lastPage || isLoading;

    return (
        <div className="relative bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-end">
                <div className="sm:flex sm:items-center sm:justify-end mr-4">
                    <p className="text-sm text-gray-700 mr-1">Rows per page:</p>{' '}
                    <PaginationRowsPerPageDropDown
                        updateItemsPerPage={updateItemsPerPage}
                        itemsPerPage={itemsPerPage}
                    />
                </div>
                <div className="sm:flex sm:items-center sm:justify-end mr-4">
                    <p className="text-sm text-gray-700 mr-1">
                        {page + 1}-{page + itemsPerPage} of {filteredRecordCount}
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
                        <Link
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            onClick={gotoFirstPage}
                            isDisabled={canNotBack}
                        >
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                        <Link
                            className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            onClick={gotoPrevPage}
                            isDisabled={canNotBack}
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
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                        {pages.map((value) => {
                            const linkClassName = classNames(
                                'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-50',
                                {
                                    'font-black': page === value,
                                    'font-normal': page !== value,
                                },
                            );

                            return (
                                <Link
                                    key={value}
                                    isDisabled={isLoading}
                                    onClick={gotoPage(value)}
                                    className={linkClassName}
                                >
                                    {value + 1}
                                </Link>
                            );
                        })}
                        <Link
                            onClick={gotoNextPage}
                            isDisabled={canNotFwd}
                            className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
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
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                        <Link
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            onClick={gotoLastPage}
                            isDisabled={canNotFwd}
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
};
