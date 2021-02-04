import * as React from "react";
import { useTubular } from "tubular-react-common";
import columns from "./columns";
import withStyles, { useTheme, WithStylesProps } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faChevronLeft,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faChevronRight,
  faChevronLeft,
  faAngleDoubleLeft,
  faAngleDoubleRight
);
// Create your Styles. Remember, since React-JSS uses the default preset,
// most plugins are available without further configuration needed.
const styles = {
  gridContainer: {
    display: "flex",
    flexDirection: "column",
    "& button": {
      outline: 0,
      fontSize: "1rem",
      padding: ".375rem .75rem",
      textDecoration: "none",
      textTransform: "none",
      border: "1px solid transparent",
      borderRadius: ".25rem",
      textAlign: "center",
      "&.link": {
        background: "none",
        cursor: "pointer",
      },
    },
  },
  toolbar: {
    display: "flex",
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
    "& th": {
      border: "1px solid #ddd",
      paddingTop: "12px",
      paddingBottom: "12px",
      textAlign: "left",
      backgroundColor: "#4CAF50",
      color: "white",
    },
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
  },
};

export const GridComponent: React.FunctionComponent<
  WithStylesProps<typeof styles>
> = ({ classes }: WithStylesProps<typeof styles>) => {
  const theme = useTheme();
  const { state, api } = useTubular(
    columns,
    "https://tubular.azurewebsites.net/api/orders/paged"
  );
  return (
    <div className={classes.gridContainer}>
      <div className={classes.toolbar}>
        <div className="search-container">
          <input type="text" name="grid-search" id="grid-search" />
        </div>
        <div className="quick-filters-container">Quick filters here</div>
        <div className="grid-actions-container">
          <button>Export</button>
        </div>
      </div>
      {!state.isLoading && (
        <div className={classes.grid}>
          <table className={classes.table}>
            <thead>
              <tr role="rowheader">
                {state.columns
                  .filter((col) => col.visible)
                  .map((col) => (
                    <th key={col.name}>{col.label}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {state.data.map((row, index) => (
                <tr key={index}>
                  {state.columns
                    .filter((col) => col.visible)
                    .map((col) => (
                      <td role="cell" key={col.name}>
                        {row[col.name]}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className={classes.pagination}>
        <button className="link">
          <FontAwesomeIcon icon="angle-double-left" />
        </button>
        <button>
          <FontAwesomeIcon icon="chevron-left" />
        </button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>
          <FontAwesomeIcon icon="chevron-right" />
        </button>
        <button>
          <FontAwesomeIcon icon="angle-double-right" />
        </button>
      </div>
    </div>
  );
};

export const Grid = withStyles(styles)(GridComponent);
