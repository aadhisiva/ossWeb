import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TablewithPagination from "../../../components/common/Tables";
import { useSelector } from "react-redux";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import { Col, Row } from "react-bootstrap";
import HalfDonutCircle from "../../../components/common/Reviewbars";
import Titlebar from "../../../components/common/titlebar";
import { AvatarDropdown } from "../../../components/common/menuDropDown";
import "./division.css";
import { postRequest } from "../../../Authentication/axiosrequest";
import { IReportsMasterData } from "../../../utilities/interfacesOrtype";


export default function DivisionReportComponent() {
  const [originalData, setOriginalData] = useState<IReportsMasterData[]>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<IReportsMasterData[]>([]);

  const [urlSearchParam, setUrlSearchParam] = useSearchParams();  // retrieve url query params

  const [searchTerm, setSearchTerm] = useState(""); // for search to get any value
  
  const [isLoading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  const totalPages = Math.ceil(copyOfOriginalData.length / itemsPerPage);

  const [{ Role, Mobile, loginCode }] = IsAuthenticated();

  
  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    let body = {
      DataType: 'GPD',
      DistrictName: urlSearchParam.get("DistrictName"),
      TalukName: urlSearchParam.get("TalukName")
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

  const navigate = useNavigate();
  const { currentPath } = useSelector((state: any) => state.path);

  const handleChangeRoutes = (obj : IReportsMasterData) => {
    navigate(`/ward/${currentPath}?DistrictName=${obj.DistrictName}&TalukName=${obj.TalukName}&GpName=${obj.GramPanchayatName}`);
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
    "Gp/DivisionName",
    "UnAssigned",
    "Scheduled",
    "Completed",
    "TotalCount",
  ];

  const filteredData = (currentItems || []).filter((item) => {
    return (
      item?.GramPanchayatName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.UnAssigned?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Scheduled?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Completed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.TotalCount?.toLowerCase().includes(searchTerm.toLowerCase())
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
              { routeName: "Assignment", routePath: "/Assignment/Zone" },
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
          <HalfDonutCircle onClick={undefined} title={"Students Completed"} />
        </div>
      </div>
        <Row className="flex m-1">
          <Col md={2} xs={12} className="border rounded-xl bg-[#13678C] text-white">
            District Name: {urlSearchParam.get("DistrictName")}
          </Col>
          <Col md={2} xs={12} className="border rounded-xl bg-[#13678C] text-white">
            Zone/Taluk Name: {urlSearchParam.get("TalukName")}
          </Col>
        </Row>
        <TablewithPagination
          onClick={handleChangeRoutes}
          title={"Gp/Division"}
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
