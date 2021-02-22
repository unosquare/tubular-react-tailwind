import { Listbox, Menu, Transition } from '@headlessui/react';
import dayjs = require('dayjs');

import * as React from 'react';
import * as quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { ColumnModel, CompareOperators } from 'tubular-common';
dayjs.extend(quarterOfYear);

const today = dayjs();
const lastWeekToday = today.add(-7);
const nextWeekToday = today.add(7);
const items: any[] = [
    { title: 'Today', desc: '', resolver: () => ({ day: today }) },
    { title: 'Yesterday', desc: '', resolver: () => ({ day: today.add(-1, 'd') }) },
    { title: 'Tomorrow', desc: '', resolver: () => ({ day: today.add(1, 'd') }) },
    { title: 'This week', desc: '', resolver: () => ({ a: today.add(-today.day()), b: today.add(6 - today.day()) }) },
    { title: 'This week so far', desc: '', resolver: () => ({ a: today.add(-today.day()), b: today }) },
    {
        title: 'Last week',
        desc: '',
        resolver: () => ({ a: lastWeekToday.add(-lastWeekToday.day()), b: lastWeekToday.add(6 - lastWeekToday.day()) }),
    },
    {
        title: 'Next week',
        desc: '',
        resolver: () => ({ a: nextWeekToday.add(-nextWeekToday.day()), b: nextWeekToday.add(6 - nextWeekToday.day()) }),
    },
    { title: 'This month', desc: '', resolver: () => ({ a: dayjs().date(1), b: dayjs().date(today.daysInMonth()) }) },
    { title: 'This month so far', desc: '', resolver: () => ({ a: dayjs().date(1), b: today }) },
    {
        title: 'Last month',
        desc: '',
        resolver: () => {
            const firstDateOfMonth = dayjs().add(-1, 'month').date(1);
            return { a: firstDateOfMonth, b: firstDateOfMonth.date(firstDateOfMonth.daysInMonth()) };
        },
    },
    {
        title: 'Next month',
        desc: '',
        resolver: () => {
            const firstDateOfMonth = dayjs().add(1, 'month').date(1);
            return { a: firstDateOfMonth, b: firstDateOfMonth.date(firstDateOfMonth.daysInMonth()) };
        },
    },

    {
        title: 'This quarter',
        desc: '',
        resolver: () => {
            const currentQuarter = dayjs().quarter();
            const quarterStartDate = dayjs()
                .month(currentQuarter * 3 - 3)
                .date(1);
            const quarterEndDate = dayjs()
                .month(currentQuarter * 3 - 1)
                .add(1, 'm')
                .add(-1, 'd');
            return { a: quarterStartDate, b: quarterEndDate };
        },
    },
    {
        title: 'This quarter so far',
        desc: '',
        resolver: () => {
            const currentQuarter = dayjs().quarter();
            const quarterStartDate = dayjs()
                .month(currentQuarter * 3 - 3)
                .date(1);
            return { a: quarterStartDate, b: today };
        },
    },
    {
        title: 'Last quarter',
        desc: '',
        resolver: () => {
            let currentQuarter = dayjs().quarter();
            const referenceDate = currentQuarter === 1 ? dayjs().add(-1, 'year') : dayjs();
            currentQuarter = currentQuarter === 1 ? 4 : currentQuarter - 1;

            const quarterStartDate = referenceDate.month(currentQuarter * 3 - 3).date(1);
            const quarterEndDate = referenceDate
                .month(currentQuarter * 3 - 1)
                .add(1, 'm')
                .add(-1, 'd');
            return { a: quarterStartDate, b: quarterEndDate };
        },
    },
    {
        title: 'Next quarter',
        desc: '',
        resolver: () => {
            let currentQuarter = dayjs().quarter();
            const referenceDate = currentQuarter === 4 ? dayjs().add(1, 'year') : dayjs();
            currentQuarter = currentQuarter === 4 ? 1 : currentQuarter + 1;

            const quarterStartDate = referenceDate.month(currentQuarter * 3 - 3).date(1);
            const quarterEndDate = referenceDate
                .month(currentQuarter * 3 - 1)
                .add(1, 'm')
                .add(-1, 'd');
            return { a: quarterStartDate, b: quarterEndDate };
        },
    },
    {
        title: 'This year',
        desc: '',
        resolver: () => {
            const yearStartDate = dayjs().month(0).date(1);
            const yearEndDate = dayjs().month(11).date(31);
            return { a: yearStartDate, b: yearEndDate };
        },
    },
    {
        title: 'This year so far',
        desc: '',
        resolver: () => {
            const yearStartDate = dayjs().month(0).date(1);
            return { a: yearStartDate, b: today };
        },
    },
];

interface QuickDateFilterProps {
    column: ColumnModel;
    filter: (column: ColumnModel, operator: CompareOperators, argument1: any, argument2?: any) => void;
}

export const QuickDateFilter: React.FunctionComponent<QuickDateFilterProps> = ({
    column,
    filter,
}: QuickDateFilterProps) => {
    const [selectedItem, setSelectedItem] = React.useState(null);
    const label = selectedItem ? selectedItem.title : column.label;
    const onChange = (item: any) => {
        setSelectedItem(item);
        const params = item.resolver();
        if (params.day) {
            filter(column, CompareOperators.Equals, params.day);
        } else {
            filter(column, CompareOperators.Between, params.a, params.b);
        }
    };
    return (
        <Listbox as="div" className="space-y-1 w-40 ml-4" value={selectedItem} onChange={onChange}>
            {({ open }) => (
                <>
                    <div className="relative">
                        <span className="inline-block w-full rounded-md">
                            <Listbox.Button className="cursor-default relative w-full bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                <span className="block truncate">{label}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path
                                            d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </Listbox.Button>
                        </span>

                        <Transition
                            show={open}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
                        >
                            <Listbox.Options
                                static
                                className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                            >
                                {items.map((item) => (
                                    <Listbox.Option key={item.title} value={item}>
                                        {({ selected, active }: any) => (
                                            <div
                                                className={`${
                                                    active ? 'text-white bg-blue-300' : 'text-gray-900'
                                                } cursor-default select-none relative py-2 pl-8 pr-4`}
                                            >
                                                <span
                                                    className={`${
                                                        selected ? 'font-semibold' : 'font-normal'
                                                    } block truncate`}
                                                >
                                                    {item.title}
                                                </span>
                                                {selected && (
                                                    <span
                                                        className={`${
                                                            active ? 'text-white' : 'text-blue-600'
                                                        } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                                    >
                                                        <svg
                                                            className="h-5 w-5"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="px-4 py-2 rounded bg-blue-600 text-white ...">Options</Menu.Button>
            <Menu.Items className="absolute z-10 right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                {items.map((item: any, index: number) => {
                    return (
                        <Menu.Item key={index}>
                            {({ active }: any) => {
                                console.log(active);
                                return (
                                    <a
                                        className={`${
                                            active ? 'bg-green-100 text-gray-900' : 'text-gray-700'
                                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                        href="/account-settings"
                                    >
                                        {item.title}
                                    </a>
                                );
                            }}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
};
