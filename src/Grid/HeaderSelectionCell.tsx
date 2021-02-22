import * as React from 'react';
import { ITbSelection } from 'tubular-react-common';
import { TinyCheckbox } from '../components/TinyCheckbox';

export interface HeaderSelectionCellProps {
    selection?: ITbSelection;
    isLoading: boolean;
    rows: any[];
}

export const HeaderSelectionCell: React.FunctionComponent<HeaderSelectionCellProps> = ({
    selection,
    isLoading,
    rows,
}: HeaderSelectionCellProps) => {
    const toggleRowsSelection = () => selection.toggleAllRowsSelection();
    const isIndeterminate = selection.isIndeterminateSelection();
    const checked = selection.getUnSelectedCount() === 0 && rows.length > 0;
    return (
        <th
            scope="col"
            className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            <div className={`relative inline-flex cursor-pointer`}>
                <TinyCheckbox
                    checked={checked || null}
                    isIndeterminate={isIndeterminate}
                    disabled={isLoading}
                    onChange={toggleRowsSelection}
                />
            </div>
        </th>
    );
};
