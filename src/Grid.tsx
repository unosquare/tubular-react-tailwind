import * as React from "react";
import { useTubular } from "tubular-react-common";

import columns from "./columns";
import withStyles, { WithStylesProps } from "react-jss";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faChevronLeft,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faSortUp,
  faSortDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { buttonStyle } from "./styles/common";
import { Pagination } from "./Pagination";
import { GridHeader } from "./GridHeader";
import { GridBody } from "./GridBody";
import { GridToolbar } from "./GridToolbar";

library.add(
  faChevronRight,
  faChevronLeft,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faSortUp,
  faSortDown,
  faSearch
);

const styles = {
  gridContainer: {
    display: "flex",
    flexDirection: "column",
    "& button": {
      extend: buttonStyle,
    },
  },
  grid: {},
  table: {
    width: "100%",
    borderCollapse: "collapse",
    "& th, td": {
      padding: "8px",
    },
    "& tr:hover": {
      backgroundColor: "#ddd",
    },
    "& tr:nth-child(even)": {
      backgroundColor: "#f2f2f2",
    },
  },
};

export const GridComponent: React.FunctionComponent<
  WithStylesProps<typeof styles>
> = ({ classes }: WithStylesProps<typeof styles>) => {
  const { state, api } = useTubular(
    columns,
    "https://tubular.azurewebsites.net/api/orders/paged"
  );
  return (
    <div className={classes.gridContainer}>
      <GridToolbar
        search={api.updateSearchText}
        searchText={state.searchText}
      />
      <div className={classes.grid}>
        <table className={classes.table}>
          <GridHeader columns={state.columns} sortColumn={api.sortColumn} />
          <GridBody
            columns={state.columns}
            data={state.data}
            isLoading={state.isLoading}
          />
        </table>
      </div>
      <Pagination
        isLoading={state.isLoading}
        filteredRecordCount={state.filteredRecordCount}
        itemsPerPage={state.itemsPerPage}
        page={state.page}
        goToPage={api.goToPage}
      />
    </div>
  );
};

export const Grid = withStyles(styles)(GridComponent);
