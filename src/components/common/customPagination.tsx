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
        className="-z-0"
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
    <Row className="pb-3 flex justify-center items-center flex-row">
      <Col>{`Showing ${ eachPageCount- itemsPerPage} - ${totalCount > eachPageCount? eachPageCount : totalCount}
       out of ${totalCount || 0}`}</Col>
      <Col>
        <Pagination>
          <Pagination.First className="-z-0" onClick={() => onPageChange(1)} />
          <Pagination.Prev className="-z-0" onClick={() => onPageChange(currentPage - 1)} />
          {getPageItems()}
          <Pagination.Next className="-z-0" onClick={() => onPageChange(currentPage + 1)} />
          <Pagination.Last className="-z-0" onClick={() => onPageChange(totalPages)} />
        </Pagination>
      </Col>
    </Row>
  );
};

export default CustomPagination;
