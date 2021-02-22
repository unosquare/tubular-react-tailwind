import * as React from 'react';
import { ITbRowProps } from 'tubular-react-common';
import { SelectionCell } from './SelectionCell';
import { renderCell } from './utils';

export interface GridRowDefaultProps extends ITbRowProps {
    isLoading: boolean;
}

export const GridRowDefault: React.FunctionComponent<GridRowDefaultProps> = ({
    columns,
    row,
    rowSelectionEnabled,
    selection,
    isLoading,
}: GridRowDefaultProps) => {
    return (
        <tr>
            {rowSelectionEnabled && (
                <SelectionCell isLoading={isLoading} selection={selection} row={row} columns={columns} />
            )}
            {columns.filter((col) => col.visible).map((col) => renderCell(col, row[col.name]))}
        </tr>
    );
};
