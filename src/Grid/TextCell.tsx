import * as React from 'react';
import { ColumnModel } from 'tubular-common';

export interface TextCellProps {
    column: ColumnModel;
    text: string;
    textAlign?: string;
}

export const TextCell: React.FunctionComponent<TextCellProps> = ({
    column,
    text,
    textAlign = 'text-left',
}: TextCellProps) => {
    return (
        <td role="cell" key={column.name} className={`px-6 py-4 whitespace-nowrap ${textAlign}`}>
            {text}
        </td>
    );
};
