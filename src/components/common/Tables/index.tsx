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
  const navigate = useNavigate();

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
      <Table responsive hover>
        <thead>
          <tr className="trHead">
            {(headers || []).map((tableHeader, index) => (
              <th
                style={{ backgroundColor: "grey" }}
                className="th"
                key={index}
              >
                {tableHeader}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(tableBody || []).map((obj: any, index) => (
            <tr onClick={onClick} title={title} key={index}>
              <td className="tableRowStart">
                {(obj?.Taluk || obj?.District) + " " + index}
              </td>
              <td>{obj?.UnAssigned + " " + index}</td>
              <td>{obj?.Scheduled + " " + index}</td>
              <td>{obj?.Completed + " " + index}</td>
              <td className="tableRowEnd">{obj?.TotalCount + " " + index}</td>
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
