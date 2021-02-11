import * as React from 'react';
export interface GridSearchTextProps {}

export interface GridSearchTextProps {
    searchText: string;
    search: (value: string) => void;
}

export const GridSearchText: React.FunctionComponent<GridSearchTextProps> = ({
    searchText,
    search,
}: GridSearchTextProps) => {
    const [value, setValue] = React.useState(searchText);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);
    const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            search(value);
        }
    };

    return (
        <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-2 flex items-center">
                <span>
                    <svg
                        className={`h-4 w-4`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            </div>
            <input
                value={value}
                onChange={onChange}
                onKeyPress={onKeyPress}
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block h-full w-full pl-7 pr-2 sm:text-sm rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                placeholder=""
            />
        </div>
    );
};
