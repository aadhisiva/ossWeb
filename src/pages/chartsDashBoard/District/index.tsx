import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TablewithPagination from "../../../components/common/Tables";
import { useSelector } from "react-redux";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import HalfDonutCircle from "../../../components/common/Reviewbars";
import Titlebar from "../../../components/common/titlebar";
import { AvatarDropdown } from "../../../components/common/menuDropDown";
import "./district.css";
import { Col, Row } from "react-bootstrap";
import { SearchBox } from "../../../components/common/searchBox";

let tableBody = [
  {
    District: "DistrictTable",
    UnAssigned: "DistrictTable",
    Scheduled: "DistrictTable",
    Completed: "DistrictTable",
    TotalCount: "DistrictTable",
  },
];

for (let i = 0; i <= 500; i++) {
  let eachRow = {
    District: `DistrictTable ${i}`,
    UnAssigned: `UnAssgned ${i}`,
    Scheduled: `Scheduled ${i}`,
    Completed: `Completed ${i}`,
    TotalCount: `DistrictTable ${i}`,
  };
  tableBody.push(eachRow);
}

export default function DistrictReportComponent() {
  const [originalData, setOriginalData] = useState<any>(tableBody);
  const [copyOfOriginalData, setCopyOriginalData] = useState<any>(tableBody);
  const [isLoading, setLoading] = useState(false);
  const [tableData, setTableData] = useState(tableBody);

  const [searchTerm, setSearchTerm] = useState(""); // for search to get any value

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  console.log("itemsPerPage",itemsPerPage)
  const totalPages = Math.ceil(copyOfOriginalData.length / itemsPerPage);

  const [{ Role, Mobile, loginCode }] = IsAuthenticated();

  const navigate = useNavigate();
  const { currentPath } = useSelector((state: any) => state.path);

  const handleChangeRoutes = () => {
    navigate(`/Zone/${currentPath}`);
  };

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = copyOfOriginalData.slice(startIndex, endIndex);
  
    const filteredData = (currentItems || []).filter((item: any) => {
      return (
        item?.District?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.UnAssigned?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.Scheduled?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.Completed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.TotalCount?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.CreatedMobile?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  let headers = [
    "District",
    "UnAssigned",
    "Scheduled",
    "Completed",
    "TotalCount",
  ];
  return (
    <React.Fragment>
      <Titlebar
        title={`District ${currentPath}`}
        Component={
          <AvatarDropdown
            username={"SuperAdmin"}
            dropDown={[
              { routeName: "AssignMent", routePath: "/AssignMent/Zone" },
            ]}
          />
        }
      />
      <div className="houseHoldBox">
        <span className="houseHoldText">HouseHold</span>
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
      <Row className="m-2">
        <TablewithPagination
          onClick={handleChangeRoutes}
          title={"UnAssigned"}
          headers={headers}
          tableBody={filteredData}
          currentCount={filteredData.length || 0}
          totalCount={originalData.length || 0}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </Row>
    </React.Fragment>
  );
}
