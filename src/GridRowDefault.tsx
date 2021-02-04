import { ColumnModel } from "tubular-common";
import * as React from "react";

interface GridRowDefaultProps {
  row: any;
  columns: ColumnModel[];
}

export const GridRowDefault: React.FunctionComponent<GridRowDefaultProps> = ({
  columns,
  row,
}: GridRowDefaultProps) => {
  return (
    <tr>
      {columns
        .filter((col) => col.visible)
        .map((col) => (
          <td role="cell" key={col.name}>
            {row[col.name]}
          </td>
        ))}
    </tr>
  );
};
