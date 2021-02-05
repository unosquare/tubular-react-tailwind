import { ColumnModel } from "tubular-common";
import * as React from "react";

interface HeaderCellProps {
  column: ColumnModel;
  sortColumn: (colName: string) => void;
}

export const HeaderCell: React.FunctionComponent<HeaderCellProps> = ({
  column,
  sortColumn,
}) => {
  return (
    <th
      key={column.name}
      onClick={() => {
        if (column.sortable) {
          sortColumn(column.name);
        }
      }}
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      <div>
        <div>{column.label}</div>
        {/* {column.sortDirection !== ColumnSortDirection.None && (
          <span>
            {column.sortDirection === ColumnSortDirection.Ascending ? (
              <FontAwesomeIcon icon="sort-up" />
            ) : (
              <FontAwesomeIcon icon="sort-down" />
            )}
          </span>
        )} */}
      </div>
    </th>
  );
};
