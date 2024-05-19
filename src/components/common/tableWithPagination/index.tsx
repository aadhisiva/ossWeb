import React, { FC, useMemo, useState } from "react";
import { Button, Table } from "react-bootstrap";
import {
  IMasterData,
  ITableColumns,
} from "../../../utilities/interfacesOrtype";
import "./tableWithPagination.css";

interface ITableWithSorting {
  filteredData?: IMasterData[] | any;
  handleCLickModify?: any;
  columns?: ITableColumns[];
}

export const TableWithSorting: FC<ITableWithSorting> = ({
  filteredData,
  handleCLickModify,
  columns,
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "ascending",
  });

  const handleSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key && sortConfig.direction === "ascending") {
      return a[sortConfig.key]+''.localeCompare(b[sortConfig.key]);
    }
    if (sortConfig.key && sortConfig.direction === "descending") {
      return b[sortConfig.key]+''.localeCompare(a[sortConfig.key]);
    }
    return 0;
  });

  return (
    <React.Fragment>
      <Table responsive hover size="sm" border={1}>
        <thead className="urbanThead">
          <tr>
            {columns?.map((obj, i) => {
              if (obj.sorting) {
                return (
                  <th
                    key={`${obj.key} - ${i}`}
                    className="urbanTh p-1 eachcolumn"
                    onClick={() => handleSort(obj.key)}
                  >
                    {obj.label}{" "}
                    <i
                      style={{
                        color: `${
                          sortConfig.key === obj.key &&
                          sortConfig.direction === "ascending"
                            ? "red"
                            : "black"
                        }`,
                      }}
                      className="bi bi-arrow-bar-down"
                    ></i>
                    <i
                      style={{
                        color: `${
                          sortConfig.key === obj.key &&
                          sortConfig.direction === "descending"
                            ? "red"
                            : "black"
                        }`,
                      }}
                      className="bi bi-arrow-bar-up"
                    ></i>
                  </th>
                );
              }
              return (
                <th
                  key={`${obj.key} - ${i}`}
                  className="urbanTh p-1 eachcolumn"
                >
                  {obj.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr className="spacer"></tr>
          {(sortedData || []).map((obj, rowIndex) => (
            <tr key={rowIndex}>
              {(columns || []).map((column, columnIndex) => {
                if (column.key == "Action") {
                  return (
                    <td
                      key={`${column.key} - ${columnIndex}}`}
                      className="eachcolumn"
                    >
                      <Button
                        className="mr-1"
                        style={{ backgroundColor: "#13678C" }}
                        onClick={() => handleCLickModify(obj, "Modify")}
                      >
                        Modify
                      </Button>
                    </td>
                  );
                }
                return (
                  <td
                    key={`${column.key} - ${columnIndex}}`}
                    // className={`${columnIndex == 0 && "tableRowStart"} eachcolumn`}
                    className="eachcolumn"
                  >
                    {obj[column.key] ?? "N/A"}
                  </td>
                );
              })}
            </tr>
          ))}
          <tr className="spacer"></tr>
        </tbody>
      </Table>
    </React.Fragment>
  );
};
