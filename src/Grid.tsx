import * as React from 'react';
import { useTbSelection, useTbTable, ITbGridProps } from 'tubular-react-common';

import { GridHeader } from './GridHeader';
import { GridBody } from './GridBody';
import { Pagination } from './Pagination';
import { GridToolbar } from './GridToolbar';
import { CompareOperators } from 'tubular-common';
import { ChipFilterBar } from './ChipFilterBar';
import './styles.css';

export const Grid: React.FunctionComponent<ITbGridProps> = ({
    columns,
    dataSource,
    gridName,
    rowSelectionEnabled = false,
}) => {
    const { state, api } = useTbTable(columns, dataSource);
    const selection = useTbSelection({ state, api }, true);

    const applyOrResetFilter = (columnName: string, value?: string) => {
        const newColumns = state.columns.map((column) => {
            if (column.name === columnName) {
                return {
                    ...column,
                    filterText: value,
                    filterOperator: !!value ? CompareOperators.Equals : CompareOperators.None,
                    filterArgument: !!value ? [] : null,
                };
            }

            return column;
        });

        api.setColumns(newColumns);
    };

    return (
        <div className="flex flex-col">
            <GridToolbar
                gridName={gridName}
                columns={state.columns}
                exportTo={api.exportTo}
                setColumns={api.setColumns}
                search={api.updateSearchText}
                searchText={state.searchText}
            />
            <ChipFilterBar columns={state.columns} onClearFilter={applyOrResetFilter} />
            <div className="-my-2 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <GridHeader
                                rowSelectionEnabled={rowSelectionEnabled}
                                selection={selection}
                                columns={state.columns}
                                sortColumn={api.sortColumn}
                                rows={state.data}
                                isLoading={state.isLoading}
                            />
                            <GridBody
                                itemsPerPage={state.itemsPerPage}
                                columns={state.columns}
                                data={state.data}
                                isLoading={state.isLoading}
                                rowSelectionEnabled={rowSelectionEnabled}
                                selection={selection}
                            />
                        </table>
                        <Pagination
                            isLoading={state.isLoading}
                            filteredRecordCount={state.filteredRecordCount}
                            itemsPerPage={state.itemsPerPage}
                            page={state.page}
                            goToPage={api.goToPage}
                            updateItemsPerPage={api.updateItemsPerPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
