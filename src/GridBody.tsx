import { ColumnModel } from "tubular-common";
import * as React from "react";
import { GridRowDefault } from "./GridRowDefault";

interface GridBodyProps {
  columns: ColumnModel[];
  isLoading: boolean;
  data: any[];
}

export const GridBody: React.FunctionComponent<GridBodyProps> = ({
  isLoading,
  data,
  columns,
}: GridBodyProps) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {!isLoading &&
        data.map((row, index) => (
          <GridRowDefault row={row} columns={columns} key={index} />
        ))}
    </tbody>
  );
};
