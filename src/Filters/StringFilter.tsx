import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { handleFilterChange, onKeyDown } from './utils';

export interface StringFilterProps {
    column: ColumnModel;
    onApply: () => void;
}

export const StringFilter: React.FunctionComponent<StringFilterProps> = ({ column, onApply }: StringFilterProps) => {
    return (
        <>
            <input
                placeholder={''}
                defaultValue={column.filterText}
                onKeyDown={onKeyDown(onApply)}
                onChange={handleFilterChange(column)}
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
        </>
    );
};
