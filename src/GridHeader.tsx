import { ColumnModel } from "tubular-common";
import * as React from "react";
import withStyles, { WithStylesProps } from "react-jss";
import { HeaderCell } from "./HeaderCell";

const gridHeaderStyles = {
  gridHeader: {
    "& th": {
      border: "1px solid #ddd",
      paddingTop: "12px",
      paddingBottom: "12px",
      textAlign: "left",
      backgroundColor: "#4CAF50",
      color: "white",
    },
  },
};

interface GridHeaderProps extends WithStylesProps<typeof gridHeaderStyles> {
  columns: ColumnModel[];
  sortColumn: (colName: string) => void;
}

const GridHeaderComponent: React.FunctionComponent<GridHeaderProps> = ({
  classes,
  columns,
  sortColumn,
}: GridHeaderProps) => {
  return (
    <thead className={classes.gridHeader}>
      <tr role="rowheader">
        {columns
          .filter((col) => col.visible)
          .map((col) => (
            <HeaderCell column={col} sortColumn={sortColumn} />
          ))}
      </tr>
    </thead>
  );
};

export const GridHeader = withStyles(gridHeaderStyles)(GridHeaderComponent);
