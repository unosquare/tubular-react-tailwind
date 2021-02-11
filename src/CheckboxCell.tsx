import * as React from 'react';
import { ColumnModel } from 'tubular-common';

export interface CheckboxCellProps {
    column: ColumnModel;
    checked: boolean;
}

export const CheckboxCell: React.FunctionComponent<CheckboxCellProps> = ({ column, checked }: CheckboxCellProps) => {
    return (
        <td role="cell" key={column.name} className="px-6 py-4 whitespace-nowrap flex justify-center">
            {checked && (
                <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            )}
        </td>
    );
};
