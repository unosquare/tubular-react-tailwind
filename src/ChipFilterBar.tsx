import * as React from 'react';
import { ColumnModel, columnHasFilter } from 'tubular-common';
import { ChipFilter } from './components/ChipFilter';

export interface ChipFilterBarProps {
    columns: ColumnModel[];
    onClearFilter: (columnName: string) => void;
}

export const ChipFilterBar: React.FunctionComponent<ChipFilterBarProps> = ({
    columns,
    onClearFilter,
}: ChipFilterBarProps) => {
    const filteredColumns = columns.filter((c) => columnHasFilter(c) && c.filterable);
    const onRemove = (columnName: string) => () => onClearFilter(columnName);

    return (
        <div className="flex flex-wrap mb-3">
            {filteredColumns.map((column) => (
                <ChipFilter key={column.name} column={column} onRemoveFilter={onRemove(column.name)} />
            ))}
        </div>
    );
};
