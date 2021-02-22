import * as React from 'react';

const options = [
    { value: 10, text: '10' },
    { value: 25, text: '25' },
    { value: 50, text: '50' },
    { value: 100, text: '100' },
];

export const PaginationRowsPerPageDropDown: React.FunctionComponent<any> = ({ itemsPerPage, updateItemsPerPage }) => {
    return (
        <select
            className="block py-2 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(event) => updateItemsPerPage(options[event.currentTarget.selectedIndex].value)}
            value={itemsPerPage}
        >
            {options.map((option) => (
                <option key={option.value}>{option.text}</option>
            ))}
        </select>
    );
};
