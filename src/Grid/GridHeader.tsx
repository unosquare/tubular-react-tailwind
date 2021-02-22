import { ColumnModel } from 'tubular-common';
import { ITbSelection } from 'tubular-react-common';
import * as React from 'react';
import { HeaderCell } from './HeaderCell';
import { HeaderSelectionCell } from './HeaderSelectionCell';

interface GridHeaderProps {
    columns: ColumnModel[];
    sortColumn: (colName: string) => void;
    rowSelectionEnabled: boolean;
    selection?: ITbSelection;
    isLoading: boolean;
    rows: any[];
}

export const GridHeader: React.FunctionComponent<GridHeaderProps> = ({
    columns,
    sortColumn,
    rowSelectionEnabled,
    selection,
    isLoading,
    rows,
}: GridHeaderProps) => {
    return (
        <thead className="bg-gray-50">
            <tr role="rowheader">
                {rowSelectionEnabled && <HeaderSelectionCell rows={rows} isLoading={isLoading} selection={selection} />}
                {columns
                    .filter((col) => col.visible)
                    .map((col) => (
                        <HeaderCell key={col.name} column={col} sortColumn={sortColumn} />
                    ))}
            </tr>
        </thead>
    );
};
