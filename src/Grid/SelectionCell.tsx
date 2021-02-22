import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { ITbSelection } from 'tubular-react-common';
import { TinyCheckbox } from '../components/TinyCheckbox';

export interface SelectionCellProps {
    selection?: ITbSelection;
    isLoading: boolean;
    row: any;
    columns: ColumnModel[];
}

export const SelectionCell: React.FunctionComponent<SelectionCellProps> = ({
    selection,
    isLoading,
    row,
    columns,
}: SelectionCellProps) => {
    const onChange = () => {
        selection.toggleRowSelection(row[columns.find((c) => c.isKey).name]);
    };
    const checked = selection.rowSelection[row[columns.find((c) => c.isKey).name]];
    return (
        <td
            scope="col"
            className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            <div className={`relative inline-flex cursor-pointer`}>
                <TinyCheckbox checked={checked} disabled={isLoading} onChange={onChange} />
            </div>
        </td>
    );
};
