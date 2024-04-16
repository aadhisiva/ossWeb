import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TablewithPagination from "../../../components/common/Tables";
import { useSelector } from "react-redux";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import { Col, Row } from "react-bootstrap";
import HalfDonutCircle from "../../../components/common/Reviewbars";
import Titlebar from "../../../components/common/titlebar";
import { AvatarDropdown } from "../../../components/common/menuDropDown";
import "./division.css";

let tableBody = [
  {
    District: "DivisionTable",
    UnAssigned: "DistrictTable",
    Scheduled: "DistrictTable",
    Completed: "DistrictTable",
    TotalCount: "DivisionTable",
  },
];

for (let i = 0; i <= 500; i++) {
  let eachRow = {
    District: `DivisionTable ${i}`,
    UnAssigned: `UnAssgned ${i}`,
    Scheduled: `Scheduled ${i}`,
    Completed: `Completed ${i}`,
    TotalCount: `DivisionTable ${i}`,
  };
  tableBody.push(eachRow);
}

export default function DivisionReportComponent() {
  const [originalData, setOriginalData] = useState<any>(tableBody);
  const [copyOfOriginalData, setCopyOriginalData] = useState<any>(tableBody);

  const [searchTerm, setSearchTerm] = useState(""); // for search to get any value
  
  const [isLoading, setLoading] = useState(false);
  const [tableData, setTableData] = useState(tableBody);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  const totalPages = Math.ceil(copyOfOriginalData.length / itemsPerPage);

  const [{ Role, Mobile, loginCode }] = IsAuthenticated();

  const navigate = useNavigate();
  const { currentPath } = useSelector((state: any) => state.path);

  const handleChangeRoutes = () => {
    navigate(`/ward/${currentPath}`);
  };

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = copyOfOriginalData.slice(startIndex, endIndex);

  let headers = [
    "Division",
    "UnAssigned",
    "Scheduled",
    "Completed",
    "TotalCount",
  ];

  const filteredData = (currentItems || []).filter((item: any) => {
    return (
      item?.Division?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.UnAssigned?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Scheduled?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Completed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.TotalCount?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.CreatedMobile?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <React.Fragment>
      <Titlebar
        title={`Division ${currentPath}`}
        Component={
          <AvatarDropdown
            username={"SuperAdmin"}
            dropDown={[
              { routeName: "AssignMent", routePath: "/AssignMent/Zone" },
            ]}
          />
        }
      />
      <div className="firstBox">
        <span className="boxText">HouseHold</span>
      </div>
      <div className="parentOdCircles">
        <div className="dashBoardPage">
          <HalfDonutCircle onClick={undefined} title={"Unassigned"} />
          <HalfDonutCircle onClick={undefined} title={"scheduled"} />
          <HalfDonutCircle onClick={undefined} title={"Completed"} />
        </div>
        <div className="dashBoardPage">
          <HalfDonutCircle onClick={undefined} title={"Students Complpeted"} />
        </div>
      </div>
        <Row className="flex m-1">
          <Col md={2} xs={12} className="border rounded-xl bg-blue-300">
            Zone Name: {"Name"}
          </Col>
          <Col md={2} xs={12} className="border rounded-xl bg-blue-300">
            District Name: {"Name"}
          </Col>
        </Row>
        <TablewithPagination
          onClick={handleChangeRoutes}
          title={"Division"}
          headers={headers}
          tableBody={filteredData}
          currentCount={filteredData.length || 0}
          totalCount={copyOfOriginalData.length || 0}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
    </React.Fragment>
  );
}
