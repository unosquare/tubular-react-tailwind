import { ColumnModel } from 'tubular-common';
import * as React from 'react';
import { HeaderCell } from './HeaderCell';
interface GridHeaderProps {
    columns: ColumnModel[];
    sortColumn: (colName: string) => void;
}

export const GridHeader: React.FunctionComponent<GridHeaderProps> = ({ columns, sortColumn }: GridHeaderProps) => {
    return (
        <thead className="bg-gray-50">
            <tr role="rowheader">
                {columns
                    .filter((col) => col.visible)
                    .map((col) => (
                        <HeaderCell key={col.name} column={col} sortColumn={sortColumn} />
                    ))}
            </tr>
        </thead>
    );
};
