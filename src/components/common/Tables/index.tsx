import Table from "react-bootstrap/Table";
import "./table.css";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../customPagination";
import { ItableWithPagination } from "../../../utilities/interfacesOrtype";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { SearchBox } from "../searchBox";
import TableRowsPerPageDropDown from "../tableRowsPerPage";
function TablewithPagination({
  onClick,
  title,
  headers,
  tableBody,
  totalPages,
  currentPage,
  onPageChange,
  currentCount,
  totalCount,
  searchTerm,
  setSearchTerm,
  itemsPerPage,
  setItemsPerPage,
}: ItableWithPagination) {

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
      <Table responsive hover className="m-2" size="sm">
        <thead className="urbanThead">
          {(headers || []).map((tableHeader, index) => (
            <th className="urbanTh p-1" key={index}>
              {tableHeader}
            </th>
          ))}
        </thead>
        <tbody>
          {(tableBody || []).map((obj, index) => (
            <tr onClick={() => onClick(obj)} title={title} key={index}>
              <td className="tableRowStart">
                {(
                  obj?.VillageName ||
                  obj?.GramPanchayatName ||
                  obj?.TalukName ||
                  obj?.DistrictName
                ) ??
                  "N/A"}
              </td>
              <td>{obj?.UnAssigned ?? "N/A"}</td>
              <td>{obj?.Scheduled ?? "N/A"}</td>
              <td>{obj?.Completed ?? "N/A"}</td>
              <td className="tableRowEnd">
                <div>{obj?.TotalCount ?? "N/A"}</div>
                <div>{">"}</div>
              </td>
            </tr>
          ))}
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
