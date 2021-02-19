import * as React from 'react';
import { CompareOperators } from 'tubular-common';
import { FilterEditorProps } from './FilterControl';
import { onKeyDown } from './utils';

export const NumericFilter = ({ column, onApply }: FilterEditorProps) => {
    const handleFilterChange = (isSecondInput?: boolean) => (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        const newValue = event.target.value;
        if (isSecondInput) {
            column.filterArgument = [];
            column.filterArgument[0] = newValue;
        } else {
            column.filterText = newValue;
        }
    };

    const isBetween = column.filterOperator === CompareOperators.Between;

    return (
        <div className="flex">
            <div>
                <input
                    placeholder={isBetween ? 'From' : 'Type a number'}
                    defaultValue={column.filterText}
                    onKeyDown={onKeyDown(onApply)}
                    onChange={handleFilterChange()}
                    type="number"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            {isBetween && (
                <div>
                    <input
                        type="number"
                        placeholder="To"
                        onChange={handleFilterChange(true)}
                        defaultValue={column.filterArgument ? column.filterArgument[0] : ''}
                        onKeyDown={onKeyDown(onApply)}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            )}
        </div>
    );
};
