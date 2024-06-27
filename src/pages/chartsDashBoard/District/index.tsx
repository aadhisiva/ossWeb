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
import { calculatePercentage } from "../../../utilities/resusedFunction";
import { CustomTable } from "../../../components/common/customTable";
import { roleArrangeMent } from "../../../utilities/roles";
import "./district.css";

export default function DistrictReportComponent() {
  const [originalData, setOriginalData] = useState<IReportsMasterData[]>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<
    IReportsMasterData[]
  >([]);
  const [isLoading, setLoading] = useState(false);

  const [{ userRole }] = IsAuthenticated();

  const navigate = useNavigate();
  const { currentPath } = useSelector((state: any) => state.path);

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    let body = {
      DataType: "DD",
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
    navigate(`/Zone/${currentPath}?DistrictName=${obj?.DistrictName}`);
  };

    const columns = [
      { accessor: "DistrictName", label: "District" },
      { accessor: "UnAssigned", label: "UnAssigned" },
      { accessor: "Scheduled", label: "Scheduled" },
      { accessor: "Completed", label: "Completed" },
      { accessor: "TotalCount", label: "TotalCount" },
    ];

  return (
    <React.Fragment>
      <SpinnerLoader isLoading={isLoading} />
      <Titlebar
        title={`District ${currentPath}`}
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
      <Row className="m-2">
        <CustomTable columns={columns} rows={originalData} handleChangeRoutes={handleChangeRoutes} />
      </Row>
    </React.Fragment>
  );
}
