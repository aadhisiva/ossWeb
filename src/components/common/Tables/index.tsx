import Table from "react-bootstrap/Table";
import "./table.css";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../customPagination";
import { ItableWithPagination } from "../../../utilities/interfacesOrtype";
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { SearchBox } from "../searchBox";
import TableRowsPerPageDropDown from "../tableRowsPerPage";
function TablewithPagination({
  onClick,
  title,
  headers,
  tableBody,
  filteredData,
  totalPages,
  currentPage,
  onPageChange,
  currentCount,
  totalCount,
  searchTerm,
  setSearchTerm,
  itemsPerPage,
  setItemsPerPage,
  columns,
  handleCLickModify
}: ItableWithPagination) {
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

    const sortedData = [...tableBody]?.sort((a, b) => {
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
      <Row className="m-2 justify-between">
        <Col md={2}>
          <TableRowsPerPageDropDown
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </Col>
        <Col md={4} clas>
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Col>
      </Row>
      <Table responsive hover size="sm" className="m-2" border={1}>
        <thead className="urbanThead">
          <tr>
            {(columns || [])?.map((obj, i) => {
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
          {(sortedData || [])?.map((obj, rowIndex) => (
            <tr onClick={() => onClick(obj)} key={rowIndex}>
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
      <CustomPagination
        currentCount={currentCount}
        totalCount={totalCount}
        totalPages={totalPages || 0}
        currentPage={currentPage || 0}
        onPageChange={onPageChange}
        itemsPerPage={itemsPerPage}
      />
    </React.Fragment>
  );
}

export default TablewithPagination;
