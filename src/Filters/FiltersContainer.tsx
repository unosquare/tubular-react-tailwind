import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { FilterControl } from './FilterControl';

interface FiltersContainerProps {
    filterableColumns: ColumnModel[];
    onApply: () => void;
}

export const FiltersContainer: React.FunctionComponent<FiltersContainerProps> = ({ filterableColumns, onApply }) => {
    return (
        <div>
            {filterableColumns.map((column) => (
                <FilterControl column={column} key={column.name} onApply={onApply} />
            ))}
        </div>
    );
};
