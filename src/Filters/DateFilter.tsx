import * as React from 'react';
import { ColumnModel, CompareOperators } from 'tubular-common';

export interface DateFilterProps {
    column: ColumnModel;
    onApply: () => void;
}

const getInitialDates = (column: ColumnModel) => {
    const dates: [Date, Date] = [null, null];

    const startDate = Date.parse(column.filterText);

    if (!isNaN(startDate)) {
        dates[0] = new Date(startDate);
    }

    const toDate = Date.parse(
        column.filterArgument && column.filterArgument[0] ? column.filterArgument[0].toString() : null,
    );

    if (!isNaN(startDate)) {
        dates[1] = new Date(toDate);
    }

    return dates;
};

export const DateFilter: React.FunctionComponent<DateFilterProps> = ({ column }: DateFilterProps) => {
    const [dates, setDates] = React.useState(getInitialDates(column));

    const handleDateChange = (isSecondInput?: boolean) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.valueAsDate;
        const normalizedDate = !!date ? date : null;
        if (isSecondInput) {
            column.filterArgument = [];
            setDates([dates[0], normalizedDate]);
            column.filterArgument[0] = normalizedDate ? normalizedDate.toISOString() : null;
        } else {
            setDates([normalizedDate, dates[1]]);
            column.filterText = normalizedDate ? normalizedDate.toISOString() : null;
        }
    };

    const isBetween = column.filterOperator === CompareOperators.Between;

    return (
        <div>
            <div>
                <input
                    placeholder={isBetween ? 'From' : 'Select a date'}
                    defaultValue={dates[0] ? dates[0].toString() : ''}
                    onChange={handleDateChange()}
                    type="date"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            {column.filterOperator === CompareOperators.Between && (
                <div>
                    <input
                        placeholder={'To'}
                        defaultValue={dates[1] ? dates[1].toString() : ''}
                        onChange={handleDateChange(true)}
                        type="date"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                </div>
            )}
        </div>
    );
};
