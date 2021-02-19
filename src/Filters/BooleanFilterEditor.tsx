import * as React from 'react';
import { CompareOperators } from 'tubular-common';
import { FilterEditorProps } from './FilterControl';

export const BooleanFilterEditor: React.FunctionComponent<FilterEditorProps> = ({ column }: FilterEditorProps) => {
    const onChoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        if (value === 'all') {
            column.filterOperator = CompareOperators.None;
            column.filterText = null;
            return;
        }

        column.filterOperator = CompareOperators.Equals;
        column.filterText = value;
    };
    return (
        <div className="p-2 space-y-4">
            <div className="flex items-center">
                <input
                    onChange={onChoiceChange}
                    name={`${column.name}_filter`}
                    value="true"
                    type="radio"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label htmlFor="true" className="ml-3 block text-sm font-medium text-gray-700">
                    True
                </label>
            </div>
            <div className="flex items-center">
                <input
                    name={`${column.name}_filter`}
                    value="false"
                    type="radio"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label htmlFor="false" className="ml-3 block text-sm font-medium text-gray-700">
                    False
                </label>
            </div>
            <div className="flex items-center">
                <input
                    name={`${column.name}_filter`}
                    value="all"
                    type="radio"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label htmlFor="all" className="ml-3 block text-sm font-medium text-gray-700">
                    All
                </label>
            </div>
        </div>
    );
};
