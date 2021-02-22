import { Menu, Transition } from '@headlessui/react';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { exportGrid } from 'tubular-react-common';

interface GridActionsButtonProps {
    isDisabled?: boolean;
    gridName: string;
    exportTo: (allRows: boolean, exportFunc: (payload: any[], columns: ColumnModel[]) => void) => void;
}

export const GridActionsButton: React.FunctionComponent<GridActionsButtonProps> = ({
    isDisabled = false,
    exportTo,
    gridName,
}: GridActionsButtonProps) => {
    const partialExport = (type: string) => (data: [], columns: ColumnModel[]) => {
        exportGrid(type, data, columns, gridName);
    };

    const onExport = (type: string) => () => {
        exportTo(true, partialExport(type));
    };

    return (
        <Menu disabled={isDisabled}>
            {({ open }: any) => (
                <>
                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                        <span>Grid actions</span>

                        <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
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
                        <Menu.Items className="absolute z-10 right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                            <Menu.Item>
                                {({ active }: any) => (
                                    <a
                                        onClick={onExport('csv')}
                                        className="px-2 py-2 block text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <svg
                                            className="h-5 w-5 inline-block"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="ml-1">Export to csv</span>
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }: any) => (
                                    <a
                                        onClick={onExport('print')}
                                        className="px-2 py-2 block text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <svg
                                            className="h-5 w-5 inline-block"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="ml-1">Print</span>
                                    </a>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    );
};
