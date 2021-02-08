import { ColumnModel, ColumnSortDirection } from 'tubular-common';
import * as React from 'react';
import classNames = require('classnames');

interface HeaderCellProps {
    column: ColumnModel;
    sortColumn: (colName: string) => void;
}

export const HeaderCell: React.FunctionComponent<HeaderCellProps> = ({ column, sortColumn }) => {
    const cursorClass = classNames({
        'cursor-pointer': column.sortable,
    });

    const sortIconClassNames = classNames({
        'rotate-180': column.sortDirection === ColumnSortDirection.Ascending,
    });

    return (
        <th
            key={column.name}
            onClick={() => {
                if (column.sortable) {
                    sortColumn(column.name);
                }
            }}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            <div className={`relative inline-flex ${cursorClass}`}>
                <div>{column.label}</div>
                {column.sortDirection !== ColumnSortDirection.None && (
                    <span>
                        <svg
                            className={`h-4 w-4 ml-1 transform duration-300 transition-transform ${sortIconClassNames}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                className="origin-center"
                                d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
                            ></path>
                        </svg>
                    </span>
                )}
            </div>
        </th>
    );
};
