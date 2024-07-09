import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IReportsMasterData } from "../../utilities/interfacesOrtype";
import { IsAuthenticated } from "../../Authentication/useAuth";
import { postRequest } from "../../Authentication/axiosrequest";
import Titlebar from "../../components/common/titlebar";
import { AvatarDropdown } from "../../components/common/menuDropDown";
import { ASSIGNMENT, roleArrangeMent } from "../../utilities/roles";
import { CustomTable } from "../../components/common/customTable";
import { VILLAGE_REPORTS } from "../../utilities/routePaths";
import { Col, Row } from "react-bootstrap";
import SpinnerLoader from "../../components/common/spinner/spinner";
import ResuableHeaders from "../../components/common/resuableHeaders";

export default function GpReportComponent() {
  const [originalData, setOriginalData] = useState<IReportsMasterData[]>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<
    IReportsMasterData[]
  >([]);

  const [urlSearchParam, setUrlSearchParam] = useSearchParams(); // retrieve url query params

  const [isLoading, setLoading] = useState(false);
  const [{ userRole, accessOfMasters, userCodes }] = IsAuthenticated();
  const [{ HGp }] = ResuableHeaders();

  useEffect(() => {
    getInitialData();
  }, []);

  
  const getInitialData = async () => {
    setLoading(true);
    let apiRes = await postRequest("getRelatedWise", 
      {
        LoginType: ASSIGNMENT.GET_GP,
        TypeOfData: accessOfMasters[0]?.TypeOfData,
        Codes: [urlSearchParam.get('TalukName'), ...userCodes],
      }
    );
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
      `${VILLAGE_REPORTS}?DistrictName=${obj.DistrictCode}&TalukName=${obj.TalukCode}&GpName=${obj.GramPanchayatCode}`
    );
  };

  const columns = [
    { accessor: "GramPanchayatName", label: HGp },
    { accessor: "TotalCompleted", label: "TotalCount" },
  ];

  return (
    <React.Fragment>
      <SpinnerLoader isLoading={isLoading}/>
      <Titlebar
        title={HGp}
        Component={<AvatarDropdown {...roleArrangeMent(userRole)} />}
      />
      <div className="m-4">
     
      {/* <Row className="flex m-1">
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
      </Row> */}
      <CustomTable
        columns={columns}
        rows={originalData}
        handleChangeRoutes={handleChangeRoutes}
      />
      </div>
    </React.Fragment>
  );
}
