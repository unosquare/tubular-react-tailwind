import { ColumnSortDirection, ColumnModel } from "tubular-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { createUseStyles } from "react-jss";

const headerCellStyles = {
  headerCell: {
    userSelect: "none",
    cursor: (props: HeaderCellProps) =>
      props.column.sortable ? "pointer" : "auto",
  },
  headerContent: {
    display: "flex",
    "& span": {
      marginLeft: "0.3rem",
    },
  },
  text: {},
};

const useStyles = createUseStyles(headerCellStyles);

interface HeaderCellProps {
  column: ColumnModel;
  sortColumn: (colName: string) => void;
}

export const HeaderCell: React.FunctionComponent<HeaderCellProps> = ({
  column,
  sortColumn,
}) => {
  const classes = useStyles({ column });
  return (
    <th
      key={column.name}
      onClick={() => {
        if (column.sortable) {
          sortColumn(column.name);
        }
      }}
      className={classes.headerCell}
    >
      <div className={classes.headerContent}>
        <div className={classes.text}>{column.label}</div>
        {column.sortDirection !== ColumnSortDirection.None && (
          <span>
            {column.sortDirection === ColumnSortDirection.Ascending ? (
              <FontAwesomeIcon icon="sort-up" />
            ) : (
              <FontAwesomeIcon icon="sort-down" />
            )}
          </span>
        )}
      </div>
    </th>
  );
};
