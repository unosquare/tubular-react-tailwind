import * as React from 'react';
import { Menu, Transition } from '@headlessui/react';

interface QuickFilterProps {
    label: string;
}
export const QuickFilter: React.FunctionComponent<QuickFilterProps> = ({ label, children }) => {
    return (
        <div className="flex items-center justify-center">
            <div className="relative inline-block text-left">
                <Menu>
                    {({ open }: any) => (
                        <>
                            <span className="rounded-md shadow-sm">
                                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border-transparent rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                                    <span>{label}</span>
                                    <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Menu.Button>
                            </span>

                            <Transition
                                show={open}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                {children}
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>
        </div>
    );
};
