import * as React from 'react';
import { ColumnModel } from 'tubular-common';

interface GridBodyShimmerProps {
    columns: ColumnModel[];
    itemsPerPage: number;
}
export const GridBodyShimmer: React.FunctionComponent<GridBodyShimmerProps> = ({
    columns,
    itemsPerPage,
}: GridBodyShimmerProps) => {
    return (
        <tbody className="bg-white divide-y divide-gray-200 animate-pulse">
            {[...Array(itemsPerPage)].map((_row, index) => (
                <tr key={index}>
                    {columns
                        .filter((c) => c.isComputed || c.visible)
                        .map((c) => (
                            <td role="cell" key={c.name} className="px-6 py-4 whitespace-nowrap">
                                <div className="bg-gray-200">&nbsp;</div>
                            </td>
                        ))}
                </tr>
            ))}
        </tbody>
    );
};
