import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import TablewithPagination from '../../../components/common/Tables';
import { IsAuthenticated } from '../../../Authentication/useAuth';
import HalfDonutCircle from '../../../components/common/Reviewbars';
import Titlebar from '../../../components/common/titlebar';
import { AvatarDropdown } from '../../../components/common/menuDropDown';
import { postRequest } from '../../../Authentication/axiosrequest';
import SpinnerLoader from '../../../components/common/spinner/spinner';
import { IMasterData, IReportsMasterData } from '../../../utilities/interfacesOrtype';
import "./zone.css";

let headers = ["Zone/TalukName", "UnAssigned", "Scheduled", "Completed", "TotalCount"];

export default function ZoneReportComponent() {
  const [originalData, setOriginalData] = useState<IReportsMasterData[]>([]);
  const [copyOfiginalData, setCopyOriginalData] = useState<IReportsMasterData[]>([]);
  
  const [urlSearchParam, setUrlSearchParam] = useSearchParams();  // retrieve url query params

  const [searchTerm, setSearchTerm] = useState(""); // for search to get any value

  const [isLoading, setLoading] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(copyOfiginalData.length / itemsPerPage);

  const [{ Role, Mobile, loginCode }] = IsAuthenticated();
  
  const navigate = useNavigate();
  const { currentPath } = useSelector((state: any) => state.path);

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    let body = {
      DataType: 'TD',
      DistrictName: urlSearchParam.get("DistrictName")
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
    navigate(`/Division/${currentPath}?DistrictName=${obj.DistrictName}&TalukName=${obj.TalukName}`);
  };

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = copyOfiginalData.slice(startIndex, endIndex);
  
  const filteredData = (currentItems || [])?.filter((item) => {
    return (
      item?.TalukName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      item?.UnAssigned?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      item?.Scheduled?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      item?.Completed?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      item?.TotalCount?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
  });
  
  return (
    <React.Fragment>
      <SpinnerLoader isLoading={isLoading} />
       <Titlebar
        title={`Zone ${currentPath}`}
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
      <div>
        <Row className='flex m-1'>
            <Col md={2} xs={12} className='border rounded-xl bg-blue-300'>District : {urlSearchParam.get("DistrictName")}</Col>
        </Row>
        <TablewithPagination 
          onClick={handleChangeRoutes} 
          title={"Taluk/Zone"}  
          headers={headers} 
          tableBody={filteredData}
          currentCount={filteredData.length|| 0}
          totalCount={copyOfiginalData.length || 0}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          />
      </div>
  
    </React.Fragment>
  );
}

