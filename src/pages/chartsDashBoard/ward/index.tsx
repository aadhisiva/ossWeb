import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TablewithPagination from "../../../components/common/Tables";
import { useSelector } from "react-redux";
import { IsAuthenticated } from "../../../Authentication/useAuth";import { IMasterData, IReportsMasterData } from "../../../utilities/interfacesOrtype";
import { Col, Row } from "react-bootstrap";
import HalfDonutCircle from "../../../components/common/Reviewbars";
import Titlebar from "../../../components/common/titlebar";
import { AvatarDropdown } from "../../../components/common/menuDropDown";
import "./ward.css";
import { postRequest } from "../../../Authentication/axiosrequest";

let tableBody = [
  {
    District: "wardTable",
    UnAssigned: "DistrictTable",
    Scheduled: "DistrictTable",
    Completed: "DistrictTable",
    TotalCount: "wardTable",
  },
];

for (let i = 0; i <= 500; i++) {
  let eachRow = {
    District: `wardTable ${i}`,
    UnAssigned: `UnAssgned ${i}`,
    Scheduled: `Scheduled ${i}`,
    Completed: `Completed ${i}`,
    TotalCount: `wardTable ${i}`,
  };
  tableBody.push(eachRow);
}

export default function WardReportComponent() {
  const [originalData, setOriginalData] = useState<IReportsMasterData[]>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<IReportsMasterData[]>([]);

  const [urlSearchParam, setUrlSearchParam] = useSearchParams(); // retrieve url query params

  const [searchTerm, setSearchTerm] = useState(""); // for search to get any value

  const [isLoading, setLoading] = useState(false);
  const [tableData, setTableData] = useState(tableBody);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  const totalPages = Math.ceil(copyOfOriginalData.length / itemsPerPage);

  const [{ Role, Mobile, loginCode }] = IsAuthenticated();

  const navigate = useNavigate();
  const { currentPath } = useSelector((state: any) => state.path);

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    let body = {
      DataType: 'VD',
      DistrictName: urlSearchParam.get("DistrictName"),
      TalukName: urlSearchParam.get("TalukName"),
      GpName: urlSearchParam.get("GpName")
    }
    setLoading(true);
    let apiRes = await postRequest("getStagesWiseData", body);
    if(apiRes?.code == 200){
      setLoading(false);
      setOriginalData(apiRes?.data);
      setCopyOriginalData(apiRes?.data);
    } else {
      setLoading(false);
      alert(apiRes?.response?.data?.message || "Please try again.")
    }
  }; 

  const handleChangeRoutes = () => {
    navigate(`/`);
  };

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = copyOfOriginalData.slice(startIndex, endIndex);

  
  const filteredData = (currentItems || []).filter((item) => {
    return (
      item?.VillageName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.UnAssigned?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Scheduled?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Completed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.TotalCount?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  let headers = ["Village/wardName", "UnAssigned", "Scheduled", "Completed", "TotalCount"];
  return (
    <React.Fragment>
      <Titlebar
        title={`Ward ${currentPath}`}
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
          <HalfDonutCircle onClick={undefined} title={"Students Completed"} />
        </div>
      </div>
      <Row className="flex m-1">
        <Col md={3} xs={12} className="border rounded-xl bg-blue-300">
          District Name: {urlSearchParam.get("DistrictName")}
        </Col>
        <Col md={3} xs={12} className="border rounded-xl bg-blue-300">
          Taluk/Zone Name: {urlSearchParam.get("TalukName")}
        </Col>
        <Col md={3} xs={12} className="border rounded-xl bg-blue-300">
          Gp/Division Name: {urlSearchParam.get("GpName")}
        </Col>
      </Row>
      <TablewithPagination
        onClick={handleChangeRoutes}
        title={"Village/Ward"}
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
