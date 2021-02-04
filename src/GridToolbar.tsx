import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { createUseStyles } from "react-jss";

const gridToolbarStyles = {
  toolbar: {
    display: "flex",
    padding: "0.5rem 0.25rem",
    justifyContent: "middle",
  },
  searchContainer: {
    display: "flex",
    position: "relative",
  },
  quickFiltersContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  gridActionsContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
  },
  inputSearch: {
    padding: "0.5rem 2rem 0.5rem 0.5rem",
  },
  searchIcon: {
    position: "absolute",
    right: 5,
    top: 8,
  },
};

const useStyles = createUseStyles(gridToolbarStyles);

interface GridToolbarProps {
  search: (term: string) => void;
  searchText: string;
}

export const GridToolbar: React.FunctionComponent<GridToolbarProps> = ({
  search,
  searchText,
}: GridToolbarProps) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = React.useState(searchText);

  return (
    <div className={classes.toolbar}>
      <div className={classes.searchContainer}>
        <input
          className={classes.inputSearch}
          type="text"
          name="grid-search"
          id="grid-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
              search(searchTerm);
              return;
            }
          }}
        />
        <span className={classes.searchIcon}>
          <FontAwesomeIcon icon="search" />
        </span>
      </div>
      <div className={classes.quickFiltersContainer}>Quick filters here</div>
      <div className={classes.gridActionsContainer}>
        <button>Export</button>
      </div>
    </div>
  );
};
