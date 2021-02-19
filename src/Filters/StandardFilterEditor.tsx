import { Menu, Transition } from '@headlessui/react';
import * as React from 'react';
import { ColumnModel, getOperators, ColumnDataType, CompareOperators } from 'tubular-common';
import { DateFilter } from './DateFilter';
import { FilterEditorProps } from './FilterControl';
import { NumericFilter } from './NumericFilter';
import { StringFilter } from './StringFilter';
import { getOperatorIcon, getOperatorText } from './utils';

const getFilterControl = (column: ColumnModel, onApply: () => void) => {
    switch (column.dataType) {
        case ColumnDataType.Numeric:
            return <NumericFilter column={column} onApply={onApply} />;

        case ColumnDataType.String:
            return <StringFilter column={column} onApply={onApply} />;
        case ColumnDataType.Date:
        case ColumnDataType.DateTime:
        case ColumnDataType.DateTimeUtc:
            return <DateFilter column={column} onApply={onApply} />;

        default:
            return null;
    }
};

export const StandardFilterEditor: React.FunctionComponent<FilterEditorProps> = ({
    column,
    onApply,
}: FilterEditorProps) => {
    const [currentOperator, setCurrentOperator] = React.useState(column.filterOperator);

    const options = getOperators(column).map((row: any) => ({
        key: row.value,
        icon: getOperatorIcon(column.filterOperator),
        text: getOperatorText(row.value, row.title),
    }));

    const handleOperatorClick = (operator: CompareOperators) => {
        setCurrentOperator(operator);
        column.filterOperator = operator;
    };

    return (
        <>
            <div className="flex">
                <div className="relative flex justify-center flex-col mr-2">
                    <Menu>
                        {({ open }: any) => (
                            <>
                                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-100 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                                    {getOperatorIcon(currentOperator)}
                                </Menu.Button>
                                <Transition
                                    show={open}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute z-10 left-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                                        {options.map((option) => (
                                            <Menu.Item key={option.key}>
                                                {({ active }: any) => (
                                                    <a
                                                        // selected={currentOperator === option.key}
                                                        onClick={() => handleOperatorClick(option.key)}
                                                        className="px-2 py-2 block text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                    >
                                                        {getOperatorIcon(option.key)}
                                                        <span style={{ marginLeft: 10 }}>{option.text}</span>
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </Menu.Items>
                                </Transition>
                            </>
                        )}
                    </Menu>
                </div>
                <div>{getFilterControl(column, onApply)}</div>
            </div>
        </>
    );
};
