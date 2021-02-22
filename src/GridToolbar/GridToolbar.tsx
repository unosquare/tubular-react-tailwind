import * as React from 'react';
import { columnHasFilter, ColumnModel, CompareOperator, CompareOperators } from 'tubular-common';
import { FiltersDrawer } from '../Filters/FiltersDrawer';
import { overlayService } from '../Overlay/OverlayService';
import { GridActionsButton } from './GridActionsButton';
import { GridSearchText } from './GridSearchText';

interface GridToolbarProps {
    search: (term: string) => void;
    gridName: string;
    searchText: string;
    columns: ColumnModel[];
    setColumns: (columns: ColumnModel[]) => void;
    exportTo: (allRows: boolean, exportFunc: (payload: any[], columns: ColumnModel[]) => void) => void;
}

export const GridToolbar: React.FunctionComponent<GridToolbarProps> = ({
    columns,
    setColumns,
    search,
    searchText,
    exportTo,
    gridName,
}: GridToolbarProps) => {
    const filter = (column: ColumnModel, operator: CompareOperators, argument1: any, argument2?: any) => {
        const newColumns = columns.map((col) => {
            if (col.name === column.name) {
                return {
                    ...col,
                    filterOperator: operator,
                    filterText: argument1,
                    filterArgument: argument2 ? [argument2] : null,
                };
            }

            return col;
        });

        setColumns(newColumns);
    };

    const onShowFiltersDrawer = () => {
        overlayService.addItem(FiltersDrawer, { columns, onApplyFeatures });
    };

    const applyFilters = (columns: ColumnModel[]): ColumnModel[] => {
        columns.forEach((fColumn) => {
            const column = columns.find((c: ColumnModel) => c.name === fColumn.name);

            if (columnHasFilter(fColumn)) {
                column.filterText = fColumn.filterText;
                column.filterOperator = fColumn.filterOperator;
                column.filterArgument = fColumn.filterArgument;

                if (
                    column.filterOperator === CompareOperators.Between &&
                    (!column.filterArgument || !column.filterArgument[0])
                ) {
                    column.filterOperator = CompareOperators.Gte;
                    column.filterArgument = null;
                }
            } else {
                column.filterText = null;
                column.filterOperator = CompareOperators.None;
                column.filterArgument = null;
            }
        });

        return columns;
    };

    const onApplyFeatures = (columns: ColumnModel[]) => {
        const newColumns = applyFilters(columns);
        setColumns(newColumns);
    };

    return (
        <div className="flex justify-between mb-3">
            <div className="flex justify-start">
                <GridSearchText searchText={searchText} search={search} />
                <div className="relative">
                    <span className="hidden sm:block">
                        <button
                            type="button"
                            onClick={onShowFiltersDrawer}
                            className="inline-flex mr-2 items-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Filters
                        </button>
                    </span>
                </div>
            </div>

            <div className="relative self-end flex">
                <GridActionsButton exportTo={exportTo} gridName={gridName} />
            </div>
        </div>
    );
};
