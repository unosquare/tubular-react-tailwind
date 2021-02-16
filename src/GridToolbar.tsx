import * as React from 'react';
import { ColumnModel, CompareOperator, CompareOperators } from 'tubular-common';
import { GridActionsButton } from './GridActionsButton';
import { GridSearchText } from './GridSearchText';
import { QuickFilters } from './QuickFilters';
interface GridToolbarProps {
    search: (term: string) => void;
    gridName: string;
    searchText: string;
    columns: ColumnModel[];
    setColumns: (columns: ColumnModel[]) => void;
    quickFilters: string[];
    exportTo: (allRows: boolean, exportFunc: (payload: any[], columns: ColumnModel[]) => void) => void;
}

export const GridToolbar: React.FunctionComponent<GridToolbarProps> = ({
    columns,
    setColumns,
    search,
    searchText,
    quickFilters,
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
    const quickFiltersColumns = quickFilters.map((col) => columns.find((c) => c.name === col));
    return (
        <div className="flex justify-between mb-4 relative">
            <div className="flex justify-start">
                <GridSearchText searchText={searchText} search={search} />
                <div className="relative">
                    <QuickFilters columns={quickFiltersColumns} filter={filter} />
                </div>
            </div>

            <div className="relative self-end">
                <GridActionsButton exportTo={exportTo} gridName={gridName} />
            </div>
        </div>
    );
};
