import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TablewithPagination from "../../../components/common/Tables";
import { useSelector } from "react-redux";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import {
  IMasterData,
  IReportsMasterData,
} from "../../../utilities/interfacesOrtype";
import { Col, Row } from "react-bootstrap";
import HalfDonutCircle from "../../../components/common/Reviewbars";
import Titlebar from "../../../components/common/titlebar";
import { AvatarDropdown } from "../../../components/common/menuDropDown";
import "./ward.css";
import { postRequest } from "../../../Authentication/axiosrequest";
import { calculatePercentage } from "../../../utilities/resusedFunction";
import { CustomTable } from "../../../components/common/customTable";
import { roleArrangeMent } from "../../../utilities/roles";

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
  const [copyOfOriginalData, setCopyOriginalData] = useState<
    IReportsMasterData[]
  >([]);

  const [urlSearchParam, setUrlSearchParam] = useSearchParams(); // retrieve url query params/ for search to get any value

  const [isLoading, setLoading] = useState(false);
  const [{ userRole }] = IsAuthenticated();
  const { currentPath } = useSelector((state: any) => state.path);
  

  const navigate = useNavigate();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    let body = {
      DataType: "VD",
      DistrictName: urlSearchParam.get("DistrictName"),
      TalukName: urlSearchParam.get("TalukName"),
      GpName: urlSearchParam.get("GpName"),
    };
    setLoading(true);
    let apiRes = await postRequest("getStagesWiseData", body);
    if (apiRes?.code == 200) {
      setLoading(false);
      setOriginalData(apiRes?.data);
      setCopyOriginalData(apiRes?.data);
    } else {
      setLoading(false);
      alert(apiRes?.response?.data?.message || "Please try again.");
    }
  };

  const handleChangeRoutes = () => {
    navigate(`/`);
  };

  const columns = [
    { accessor: "VillageName", label: "Village" },
    { accessor: "UnAssigned", label: "UnAssigned" },
    { accessor: "Scheduled", label: "Scheduled" },
    { accessor: "Completed", label: "Completed" },
    { accessor: "TotalCount", label: "TotalCount" },
  ];

  return (
    <React.Fragment>
      <Titlebar
        title={`Ward ${currentPath}`}
        Component={
          <AvatarDropdown
          {...roleArrangeMent(userRole)}
          />
        }
      />
      <div className="houseHoldBox">
        <span className="houseHoldText">HouseHold</span>
      </div>
      <div className="parentOdCircles">
        <div className="dashBoardPage">
          <HalfDonutCircle
            onClick={undefined}
            title={"Unassigned"}
            percentage={calculatePercentage(originalData, "UnAssigned")}
          />
          <HalfDonutCircle
            onClick={undefined}
            title={"scheduled"}
            percentage={calculatePercentage(originalData, "Scheduled")}
          />
          <HalfDonutCircle
            onClick={undefined}
            title={"Completed"}
            percentage={calculatePercentage(originalData, "Completed")}
          />
        </div>
        <div className="dashBoardPage">
          <HalfDonutCircle
            onClick={undefined}
            title={"Students Completed"}
            percentage={calculatePercentage(originalData, "Completed")}
          />
        </div>
      </div>
      <Row className="flex m-1">
        <Col
          md={3}
          xs={12}
          className="border rounded-xl bg-[#13678C] text-white"
        >
          District Name: {urlSearchParam.get("DistrictName")}
        </Col>
        <Col
          md={3}
          xs={12}
          className="border rounded-xl bg-[#13678C] text-white"
        >
          Taluk/Zone Name: {urlSearchParam.get("TalukName")}
        </Col>
        <Col
          md={3}
          xs={12}
          className="border rounded-xl bg-[#13678C] text-white"
        >
          Gp/Division Name: {urlSearchParam.get("GpName")}
        </Col>
      </Row>
      <CustomTable
        columns={columns}
        rows={originalData}
        handleChangeRoutes={handleChangeRoutes}
      />
    </React.Fragment>
  );
}
