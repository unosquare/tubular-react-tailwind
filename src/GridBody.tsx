import { ColumnModel } from 'tubular-common';
import * as React from 'react';
import { GridRowDefault } from './GridRowDefault';
import { GridBodyShimmer } from './GridBodyShimmer';

export interface GridBodyProps {
    columns: ColumnModel[];
    isLoading: boolean;
    data: any[];
    itemsPerPage: number;
}

export const GridBody: React.FunctionComponent<GridBodyProps> = ({
    isLoading,
    data,
    columns,
    itemsPerPage,
}: GridBodyProps) => {
    if (isLoading) {
        return <GridBodyShimmer columns={columns} itemsPerPage={itemsPerPage} />;
    }

    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {!isLoading && data.map((row, index) => <GridRowDefault row={row} columns={columns} key={index} />)}
        </tbody>
    );
};
