import * as React from 'react';
import { GridSearchText } from './GridSearchText';
interface GridToolbarProps {
    search: (term: string) => void;
    searchText: string;
}

export const GridToolbar: React.FunctionComponent<GridToolbarProps> = ({ search, searchText }: GridToolbarProps) => {
    return (
        <div className="flex justify-start mb-4">
            <GridSearchText searchText={searchText} search={search} />
            <div>Quick filters here</div>
            <div>
                <button>Export</button>
            </div>
        </div>
    );
};
