import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import { Col, Row } from "react-bootstrap";
import HalfDonutCircle from "../../../components/common/Reviewbars";
import Titlebar from "../../../components/common/titlebar";
import { AvatarDropdown } from "../../../components/common/menuDropDown";
import { postRequest } from "../../../Authentication/axiosrequest";
import { IReportsMasterData } from "../../../utilities/interfacesOrtype";
import { calculatePercentage } from "../../../utilities/resusedFunction";
import { CustomTable } from "../../../components/common/customTable";
import "./division.css";
import { roleArrangeMent } from "../../../utilities/roles";

export default function DivisionReportComponent() {
  const [originalData, setOriginalData] = useState<IReportsMasterData[]>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<
    IReportsMasterData[]
  >([]);

  const [urlSearchParam, setUrlSearchParam] = useSearchParams(); // retrieve url query params

  const [isLoading, setLoading] = useState(false);
  const [{ userRole }] = IsAuthenticated();
  const { currentPath } = useSelector((state: any) => state.path);

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    let body = {
      DataType: "GPD",
      DistrictName: urlSearchParam.get("DistrictName"),
      TalukName: urlSearchParam.get("TalukName"),
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

  const navigate = useNavigate();

  const handleChangeRoutes = (obj: IReportsMasterData) => {
    navigate(
      `/ward/${currentPath}?DistrictName=${obj.DistrictName}&TalukName=${obj.TalukName}&GpName=${obj.GramPanchayatName}`
    );
  };

  const columns = [
    { accessor: "GramPanchayatName", label: "GpName" },
    { accessor: "UnAssigned", label: "UnAssigned" },
    { accessor: "Scheduled", label: "Scheduled" },
    { accessor: "Completed", label: "Completed" },
    { accessor: "TotalCount", label: "TotalCount" },
  ];

  return (
    <React.Fragment>
      <Titlebar
        title={`Division ${currentPath}`}
        Component={
          <AvatarDropdown
          {...roleArrangeMent(userRole)}
          />
        }
      />
      <div className="firstBox">
        <span className="boxText">HouseHold</span>
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
          md={2}
          xs={12}
          className="border rounded-xl bg-[#13678C] text-white"
        >
          District Name: {urlSearchParam.get("DistrictName")}
        </Col>
        <Col
          md={2}
          xs={12}
          className="border rounded-xl bg-[#13678C] text-white"
        >
          Zone/Taluk Name: {urlSearchParam.get("TalukName")}
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
