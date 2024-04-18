import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import TablewithPagination from "../../../components/common/Tables";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import HalfDonutCircle from "../../../components/common/Reviewbars";
import Titlebar from "../../../components/common/titlebar";
import { AvatarDropdown } from "../../../components/common/menuDropDown";
import { postRequest } from "../../../Authentication/axiosrequest";
import { IReportsMasterData } from "../../../utilities/interfacesOrtype";
import SpinnerLoader from "../../../components/common/spinner/spinner";
import "./district.css";

let headers = [
  "DistrictName",
  "UnAssigned",
  "Scheduled",
  "Completed",
  "TotalCount",
];
export default function DistrictReportComponent() {
  const [originalData, setOriginalData] = useState<IReportsMasterData[]>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<IReportsMasterData[]>([]);
  const [isLoading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState(""); // for search to get any value

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(copyOfOriginalData.length / itemsPerPage);

  const [{ Role, Mobile, loginCode }] = IsAuthenticated();

  const navigate = useNavigate();
  const { currentPath } = useSelector((state: any) => state.path);

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    let body = {
      DataType: 'DD'
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


  const handleChangeRoutes = (obj: IReportsMasterData) => {
    navigate(`/Zone/${currentPath}?DistrictName=${obj?.DistrictName}`);
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
        item?.DistrictName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.UnAssigned?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.Scheduled?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.Completed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.TotalCount?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  return (
    <React.Fragment>
      <SpinnerLoader isLoading={isLoading} />
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
          <HalfDonutCircle onClick={undefined} title={"Students Completed"} />
        </div>
      </div>
      <Row className="m-2">
        <TablewithPagination
          onClick={handleChangeRoutes}
          title={"District"}
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
