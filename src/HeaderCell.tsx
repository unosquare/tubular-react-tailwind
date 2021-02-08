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
            className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            <div className={`relative inline-flex ${cursorClass}`}>
                <div>{column.label}</div>
                {column.sortable && column.sortDirection === ColumnSortDirection.None && (
                    <span>
                        <svg
                            className={`h-4 w-4 ml-1 opacity-30 transform rotate-180 group-hover:opacity-100`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                className="origin-center"
                                fillRule="evenodd"
                                d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                )}
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
                                fillRule="evenodd"
                                d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                )}
            </div>
        </th>
    );
};
