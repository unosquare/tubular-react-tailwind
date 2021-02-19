import classNames = require('classnames');
import * as React from 'react';
import { ColumnDataType, columnHasFilter, ColumnModel } from 'tubular-common';
import { BooleanFilterEditor } from './BooleanFilterEditor';
import { StandardFilterEditor } from './StandardFilterEditor';
import { ChevronDownIcon, ChevronRightIcon } from './SvgIcons/HeroIcons';

interface FilterControlProps {
    column: ColumnModel;
    onApply: () => void;
}

export interface FilterEditorProps {
    column: ColumnModel;
    onApply: () => void;
}

export const FilterControl: React.FunctionComponent<FilterControlProps> = ({ column, onApply }: FilterControlProps) => {
    const [isExpanded, expand] = React.useState(false);
    const hasFilter = columnHasFilter(column);
    const FilterEditor = column.dataType === ColumnDataType.Boolean ? BooleanFilterEditor : StandardFilterEditor;

    const contentClassName = classNames('h-auto bg-gray-100 p-1', {
        hidden: !isExpanded,
    });
    return (
        <>
            <div className="flex py-2 cursor-pointer select-none" onClick={() => expand(!isExpanded)}>
                <span className="flex items-center">{isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}</span>
                <span className="text-indigo font-thin text-xl">{column.label}</span>
                {hasFilter && (
                    <span className="flex items-center ml-1">
                        <svg
                            className="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                )}
            </div>

            <div className={contentClassName}>
                <FilterEditor column={column} onApply={onApply} />
            </div>
        </>
    );
};
