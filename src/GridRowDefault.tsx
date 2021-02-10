import { ColumnModel } from 'tubular-common';
import * as React from 'react';
import { ITbSelection } from 'tubular-react-common';
import { SelectionCell } from './SelectionCell';

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
            {columns
                .filter((col) => col.visible)
                .map((col) => (
                    <td role="cell" key={col.name} className="px-6 py-4 whitespace-nowrap">
                        {row[col.name]}
                    </td>
                ))}
        </tr>
    );
};
