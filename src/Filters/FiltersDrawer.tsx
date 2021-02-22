import { Transition } from '@headlessui/react';
import * as React from 'react';
import { ColumnDataType, ColumnModel, CompareOperators } from 'tubular-common';
import { OverlayItemProps } from '../Overlay/OverlayItemProps';
import { FiltersContainer } from './FiltersContainer';

export interface FiltersDrawerProps extends OverlayItemProps {
    columns: ColumnModel[];
    onApplyFeatures: (columns: ColumnModel[]) => void;
    togglePanel: () => void;
    open: boolean;
}

const resolveFilterOperator = (column: ColumnModel): CompareOperators =>
    (column.filterOperator =
        column.filterOperator === CompareOperators.None
            ? column.dataType === ColumnDataType.String
                ? CompareOperators.Contains
                : CompareOperators.Equals
            : column.filterOperator);

const copyColumns = (columns: ColumnModel[]): ColumnModel[] =>
    columns.map((column) => ({
        ...column,
        filterOperator: resolveFilterOperator(column),
    }));

export const FiltersDrawer: React.FunctionComponent<FiltersDrawerProps> = ({
    columns,
    onApplyFeatures,
    close,
}: FiltersDrawerProps) => {
    const [realOpen, setRealOpen] = React.useState(true);
    const tempColumns = copyColumns(columns);

    const onClose = () => {
        setRealOpen(false);
        setTimeout(() => {
            close();
        }, 301);
    };

    const onApplyClick = () => {
        onClose();
        onApplyFeatures(tempColumns);
    };

    return (
        <Transition
            appear={true}
            show={realOpen}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        aria-hidden="true"
                    ></div>
                    <section
                        className="absolute inset-y-0 right-0 pl-10 max-w-full flex"
                        aria-labelledby="slide-over-heading"
                    >
                        <Transition.Child
                            enter="transform transition ease-in-out duration-300 sm:duration-300"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-300 sm:duration-300"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="relative w-screen max-w-xs">
                                <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                                    <button
                                        onClick={onClose}
                                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                    >
                                        <span className="sr-only">Close panel</span>
                                        <svg
                                            className="h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-auto">
                                    <div className="px-4 sm:px-6">
                                        <h2 id="slide-over-heading" className="text-lg font-medium text-gray-900">
                                            Filters
                                        </h2>
                                    </div>
                                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                        <FiltersContainer
                                            filterableColumns={tempColumns.filter((c) => c.filterable && !c.isComputed)}
                                            onApply={onApplyClick}
                                        />
                                    </div>
                                    <div className="px-4 sm:px-6 mt-3">
                                        <button
                                            onClick={onApplyClick}
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <svg
                                                className="-ml-1 mr-2 h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </section>
                </div>
            </div>
        </Transition>
    );
};
