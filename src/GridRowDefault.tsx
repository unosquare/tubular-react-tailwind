import { ColumnModel } from 'tubular-common';
import * as React from 'react';
import { ITbSelection } from 'tubular-react-common';
import { SelectionCell } from './SelectionCell';
import { renderCell } from './utils';

interface GridRowDefaultProps {
    row: any;
    columns: ColumnModel[];
    rowSelectionEnabled?: boolean;
    selection?: ITbSelection;
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
