import * as React from 'react';
interface GridToolbarProps {
    search: (term: string) => void;
    searchText: string;
}

export const GridToolbar: React.FunctionComponent<GridToolbarProps> = ({ search, searchText }: GridToolbarProps) => {
    const [searchTerm, setSearchTerm] = React.useState(searchText);

    return (
        <div>
            <div>
                <input
                    type="text"
                    name="grid-search"
                    id="grid-search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                        if (event.key === 'Enter') {
                            search(searchTerm);
                            return;
                        }
                    }}
                />
                <span>{/* <FontAwesomeIcon icon="search" /> */}</span>
            </div>
            <div>Quick filters here</div>
            <div>
                <button>Export</button>
            </div>
        </div>
    );
};
