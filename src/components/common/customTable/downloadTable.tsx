import React, { useState, useMemo, FC } from "react";
import { filterRows, paginateRows, sortRows } from "./helpers";
import { Pagination } from "./pagination";
import { IMasterData } from "../../../utilities/interfacesOrtype";
import "./customTable.css";
import { Button, Col, Row, Table } from "react-bootstrap";
import TableRowsPerPageDropDown from "../tableRowsPerPage";
import { SearchBox } from "../searchBox";
import { IsAuthenticated } from "../../../Authentication/useAuth";

interface ITableProps {
  columns: IColumn[];
  rows: IMasterData[];
  handleCLickModify?: any;
  handleCLickApprove?: any;
  handleChangeRoutes?: any;
  handleApproveAll?: any;
  title?: string;
  secondTitle?: string;
}

interface IColumn {
  accessor: string;
  label: string;
  format?: (value: any) => React.ReactNode; // Assuming format is an optional function to format the column value
}

export const DownloadTable: FC<ITableProps> = ({
  columns,
  rows,
  handleCLickModify = undefined,
  handleChangeRoutes = undefined,
  title,
  secondTitle,
  handleCLickApprove,
  handleApproveAll = undefined,
}) => {
  const [activePage, setActivePage] = useState<number>(1);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sort, setSort] = useState<{ order: "asc" | "desc"; orderBy: string }>({
    order: "asc",
    orderBy: "id",
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRows = useMemo(() => filterRows(rows, filters), [
    rows,
    filters,
  ]);
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [
    filteredRows,
    sort,
  ]);
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

  const [{ userRole }] = IsAuthenticated();

  const handleSearch = (value: string, accessor: string) => {
    setActivePage(1);

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }));
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[accessor];

        return updatedFilters;
      });
    }
  };

  const handleSort = (accessor: string) => {
    setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === "asc" && prevSort.orderBy === accessor
          ? "desc"
          : "asc",
      orderBy: accessor,
    }));
  };

  const clearAll = () => {
    setSort({ order: "asc", orderBy: "id" });
    setActivePage(1);
    setFilters({});
  };

  const filteredData = (calculatedRows || []).filter(
    (item: Record<string, any>, i) => {
      if (searchTerm.trim() === "") {
        return rows;
      } else {
        return columns.some((column) =>
          item[column.accessor]
            ?.toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      }
    }
  );

  return (
    <React.Fragment>
      <Row className="flex justify-between">
        <Col md={2}>
          <TableRowsPerPageDropDown
            itemsPerPage={rowsPerPage}
            setItemsPerPage={setRowsPerPage}
          />
        </Col>
        <Col md={4}>
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Col>
      </Row>
      {/* {userRole == "RO/RI/ARO" && ( */}
      {/* )} */}
      <Table responsive size="sm" hover>
        <thead>
          <tr>
            {columns.map((column, i) => {
              const sortIcon = () => {
                if (column.accessor === "Action") {
                  return "";
                }
                if (column.accessor === sort.orderBy) {
                  if (sort?.order === "asc") {
                    return "⬆️";
                  }
                  return "⬇️";
                } else {
                  return "️↕️";
                }
              };
              return (
                <th
                  key={`${column.accessor}_${i}`}
                  className="rounded-xl text-sm"
                >
                  <span>{column.label}</span>
                  <button onClick={() => handleSort(column.accessor)}>
                    {sortIcon()}
                  </button>
                </th>
              );
            })}
          </tr>
          <tr>
            {columns.map((column, i) => {
              if (column.accessor === "Action") {
                return <th key={i}></th>;
              }
              return (
                <th key={i}>
                  <input
                    className="rounded-xl h-7 p-0 text-[10px]"
                    key={`${column.accessor}-search`}
                    type="search"
                    placeholder={`Search ${column.label}`}
                    value={filters[column.accessor]}
                    onChange={(event) =>
                      handleSearch(event.target.value, column.accessor)
                    }
                  />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row: any, i) => {
            return (
              <tr
                key={i}
              >
                {columns.map((column) => {
                  if (column.accessor == "Action") {
                    return (
                      <td
                        key={`${column.accessor} - ${i}}`}
                        className="text-sm"
                      >
                        {/* <div className="flex flex-row"> */}
                          <div>
                            <Button
                              style={{
                                backgroundColor: "#13678C",
                                fontSize: 10,
                              }}
                              onClick={() => handleCLickModify(row, "Modify")}
                            >
                              {"Download SNG Details"}
                            </Button>
                          </div>
                        {/* </div> */}
                      </td>
                    );
                  }
                  return (
                    <td key={column.accessor} onClick={
                        handleChangeRoutes == undefined
                          ? undefined
                          : () => handleChangeRoutes(row)
                      } className="text-sm max-w-64 break-words">
                      {row[column.accessor] ?? "N/A"}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {userRole == "RO/RI/ARO" && (
        <Row className="flex flex-row items-end justify-end">
          <Col md={2} className="text-end">
            <Button onClick={handleApproveAll}>Aprrove All</Button>
          </Col>
        </Row>
      )}
      {count > 0 ? (
        <Pagination
          activePage={activePage}
          count={count}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      ) : (
        <p>No data found</p>
      )}

      <div>
        <p>
          <button className="pointer text-blue-500" onClick={clearAll}>
            Clear all Filters
          </button>
        </p>
      </div>
    </React.Fragment>
  );
};
