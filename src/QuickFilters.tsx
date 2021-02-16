import * as React from 'react';
import { ColumnDataType, ColumnModel, CompareOperators } from 'tubular-common';
import { QuickDateFilter } from './QuickDateFilter';

interface QuickFiltersProps {
    columns: ColumnModel[];
    filter: (column: ColumnModel, operator: CompareOperators, argument1: any, argument2?: any) => any;
}

export const QuickFilters: React.FunctionComponent<QuickFiltersProps> = ({ columns, filter }: QuickFiltersProps) => {
    return (
        <>
            {columns.map((col) => {
                switch (col.dataType) {
                    case ColumnDataType.DateTime:
                        return <QuickDateFilter column={col} filter={filter} />;
                    default:
                        return <div></div>;
                }
            })}
        </>
    );
};
