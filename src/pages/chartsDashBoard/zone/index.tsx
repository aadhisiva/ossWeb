import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import HalfDonutCircle from "../../../components/common/Reviewbars";
import Titlebar from "../../../components/common/titlebar";
import { AvatarDropdown } from "../../../components/common/menuDropDown";
import { postRequest } from "../../../Authentication/axiosrequest";
import SpinnerLoader from "../../../components/common/spinner/spinner";
import { IReportsMasterData } from "../../../utilities/interfacesOrtype";
import { calculatePercentage } from "../../../utilities/resusedFunction";
import { CustomTable } from "../../../components/common/customTable";
import "./zone.css";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import { roleArrangeMent } from "../../../utilities/roles";

export default function ZoneReportComponent() {
  const [originalData, setOriginalData] = useState<IReportsMasterData[]>([]);
  const [copyOfiginalData, setCopyOriginalData] = useState<
    IReportsMasterData[]
  >([]);

  const [urlSearchParam, setUrlSearchParam] = useSearchParams(); // retrieve url query params

  const [isLoading, setLoading] = useState(false);
  const [{ userRole }] = IsAuthenticated();
  const { currentPath } = useSelector((state: any) => state.path);

  const navigate = useNavigate();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    let body = {
      DataType: "TD",
      DistrictName: urlSearchParam.get("DistrictName"),
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

  const handleChangeRoutes = (obj: IReportsMasterData) => {
    navigate(
      `/Division/${currentPath}?DistrictName=${obj.DistrictName}&TalukName=${obj.TalukName}`
    );
  };

  const columns = [
    { accessor: "TalukName", label: "Taluk" },
    { accessor: "UnAssigned", label: "UnAssigned" },
    { accessor: "Scheduled", label: "Scheduled" },
    { accessor: "Completed", label: "Completed" },
    { accessor: "TotalCount", label: "TotalCount" },
  ];

  return (
    <React.Fragment>
      <SpinnerLoader isLoading={isLoading} />
      <Titlebar
        title={`Zone ${currentPath}`}
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
            title={"Students Complpeted"}
            percentage={calculatePercentage(originalData, "Completed")}
          />
        </div>
      </div>
      <div>
        <Row className="flex m-1">
          <Col
            md={2}
            xs={12}
            className="border rounded-xl bg-[#13678C] text-white"
          >
            District : {urlSearchParam.get("DistrictName")}
          </Col>
        </Row>
        <CustomTable
          columns={columns}
          rows={originalData}
          handleChangeRoutes={handleChangeRoutes}
        />
      </div>
    </React.Fragment>
  );
}
