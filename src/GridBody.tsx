import { ColumnModel } from 'tubular-common';
import * as React from 'react';
import { GridRowDefault } from './GridRowDefault';
import { GridBodyShimmer } from './GridBodyShimmer';
import { ITbSelection } from 'tubular-react-common';

export interface GridBodyProps {
    columns: ColumnModel[];
    isLoading: boolean;
    data: any[];
    itemsPerPage: number;
    rowSelectionEnabled: boolean;
    selection: ITbSelection;
}

export const GridBody: React.FunctionComponent<GridBodyProps> = ({
    isLoading,
    data,
    columns,
    itemsPerPage,
    rowSelectionEnabled,
    selection,
}: GridBodyProps) => {
    if (isLoading) {
        return <GridBodyShimmer columns={columns} itemsPerPage={itemsPerPage} />;
    }

    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {!isLoading &&
                data.map((row, index) => (
                    <GridRowDefault
                        rowSelectionEnabled={rowSelectionEnabled}
                        selection={selection}
                        isLoading={isLoading}
                        row={row}
                        columns={columns}
                        key={index}
                    />
                ))}
        </tbody>
    );
};
