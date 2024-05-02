import { Col, Pagination, Row } from "react-bootstrap";
import { IPagination } from "../../utilities/interfacesOrtype";
import React from "react";

const CustomPagination: React.FC<IPagination> = ({
  totalPages,
  currentPage,
  onPageChange,
  totalCount,
  currentCount,
  itemsPerPage
}) => {
  const getPageItems = () => {
    const items = [];
    let totalPagesData = totalPages > 10 ? 10 : totalPages;
    for (let i = 1; i <= totalPagesData; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return items;
  };

  let eachPageCount = itemsPerPage * currentPage;


  return (
    <Row className="pb-3 flex justify-center items-center flex-row -z-1">
      <Col>{`Showing ${ eachPageCount- itemsPerPage} - ${totalCount > eachPageCount? eachPageCount : totalCount}
       out of ${totalCount || 0}`}</Col>
      <Col>
        <Pagination>
          <Pagination.First onClick={() => onPageChange(1)} />
          <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} />
          {getPageItems()}
          <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
          <Pagination.Last onClick={() => onPageChange(totalPages)} />
        </Pagination>
      </Col>
    </Row>
  );
};

export default CustomPagination;
