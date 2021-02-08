import * as React from 'react';
import { useTubular } from 'tubular-react-common';

import columns from './columns';
// import { Pagination } from "./Pagination";
import { GridHeader } from './GridHeader';
import { GridBody } from './GridBody';
import { Pagination } from './Pagination';
// import { GridToolbar } from "./GridToolbar";

export const Grid: React.FunctionComponent<any> = () => {
    const { state, api } = useTubular(columns, 'https://tubular.azurewebsites.net/api/orders/paged');
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        {/* <GridToolbar
              search={api.updateSearchText}
              searchText={state.searchText}
            /> */}
                        <table className="min-w-full divide-y divide-gray-200">
                            <GridHeader columns={state.columns} sortColumn={api.sortColumn} />
                            <GridBody columns={state.columns} data={state.data} isLoading={state.isLoading} />
                        </table>
                        <Pagination
                            isLoading={state.isLoading}
                            filteredRecordCount={state.filteredRecordCount}
                            itemsPerPage={state.itemsPerPage}
                            page={state.page}
                            goToPage={api.goToPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
