import * as React from 'react';
import { ColumnDataType, ColumnModel, CompareOperators } from 'tubular-common';
import { CloseIcon } from './SvgIcons/HeroIcons';
import { getOperatorIcon } from './utils';

const convertToFriendlyDateString = (date: string | number) => new Date(date).toDateString();

const getFilterText = (column: ColumnModel) => {
    const isDate =
        column.dataType === ColumnDataType.Date ||
        column.dataType === ColumnDataType.DateTime ||
        column.dataType === ColumnDataType.DateTimeUtc;

    const filterText = isDate ? convertToFriendlyDateString(column.filterText) : column.filterText;

    if (column.filterOperator === CompareOperators.Between) {
        let argument = column.filterArgument[0];
        if (isDate) {
            argument = convertToFriendlyDateString(argument);
        }
        return `${filterText} - ${argument}`;
    }

    if (column.dataType === ColumnDataType.Boolean) {
        return filterText === 'true' ? <span>Check</span> : <span>NoCheck</span>;
    }

    return filterText;
};

export interface ChipFilterProps {
    column: ColumnModel;
    onRemoveFilter: () => void;
}

export const ChipFilter: React.FunctionComponent<ChipFilterProps> = ({ column, onRemoveFilter }: ChipFilterProps) => {
    const filterValue = getFilterText(column);
    return (
        <div className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-gray-700 bg-gray-100 border border-gray-300 ">
            <div className="text-xs font-normal leading-none max-w-full flex-initial">{column.label}</div>
            <div className="flex flex-auto flex-row-reverse mx-1">
                <div>{getOperatorIcon(column.filterOperator)}</div>
            </div>
            <div className="text-xs font-normal leading-none max-w-full flex-initial">{filterValue}</div>
            <div className="flex flex-auto flex-row-reverse">
                <div onClick={onRemoveFilter}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-x cursor-pointer hover:text-yellow-400 rounded-full w-4 h-4 ml-2"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
            </div>
        </div>
    );
};
