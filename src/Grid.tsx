import * as React from "react";
import { useTubular } from "tubular-react-common";
import columns from "./columns";

export const Grid: React.FunctionComponent = () => {
  const { state, api } = useTubular(
    columns,
    "https://tubular.azurewebsites.net/api/orders/paged"
  );

  return (
    <>
      <div>
        <button onClick={() => api.goToPage(state.page + 1)}>
          Go to next page
        </button>
        <button onClick={() => api.goToPage(state.page - 1)}>
          Go to previous page
        </button>
        <button onClick={() => api.sortColumn("CustomerName")}>
          Sort by Customer Name
        </button>
        <button onClick={() => api.reloadGrid(true)}>Refresh</button>
      </div>
      {!state.isLoading && (
        <table>
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
      )}
    </>
  );
};
