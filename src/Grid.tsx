import * as React from 'react';
import { useTbSelection, useTbTable, useTubular } from 'tubular-react-common';

import columns from './columns';
import { GridHeader } from './GridHeader';
import { GridBody } from './GridBody';
import { Pagination } from './Pagination';
import { GridToolbar } from './GridToolbar';

export const Grid: React.FunctionComponent<any> = () => {
    const { state, api } = useTbTable(columns, 'https://tubular.azurewebsites.net/api/orders/paged');
    const selection = useTbSelection({ state, api }, true);
    return (
        <div className="flex flex-col">
            <div className="-my-2 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <GridToolbar search={api.updateSearchText} searchText={state.searchText} />
                    <div className="shadow border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <GridHeader
                                rowSelectionEnabled={true}
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
                                rowSelectionEnabled={true}
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
