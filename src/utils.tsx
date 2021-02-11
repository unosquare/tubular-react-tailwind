import { ColumnDataType, ColumnModel, parseDateColumnValue } from 'tubular-common';
import * as React from 'react';
import { CheckboxCell } from './CheckboxCell';
import { TextCell } from './TextCell';

export const renderCell = (column: ColumnModel, value: any): React.ReactNode => {
    switch (column.dataType) {
        case ColumnDataType.Boolean:
            return <CheckboxCell key={column.name} column={column} checked={!!value} />;
        case ColumnDataType.Numeric:
            return <TextCell key={column.name} column={column} textAlign={'text-right'} text={value} />;
        case ColumnDataType.Date:
        case ColumnDataType.DateTime:
        case ColumnDataType.DateTimeUtc:
            const dateAsString = !value ? '' : parseDateColumnValue(column, value);
            return <TextCell key={column.name} column={column} text={dateAsString} />;
        default:
            return <TextCell key={column.name} column={column} text={value} />;
    }
};
