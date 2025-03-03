import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IReportsMasterData } from "../../utilities/interfacesOrtype";
import { IsAuthenticated } from "../../Authentication/useAuth";
import { postRequest } from "../../Authentication/axiosrequest";
import Titlebar from "../../components/common/titlebar";
import { AvatarDropdown } from "../../components/common/menuDropDown";
import { ASSIGNMENT, roleArrangeMent } from "../../utilities/roles";
import { CustomTable } from "../../components/common/customTable";
import { SURVEY_REPORTS } from "../../utilities/routePaths";
import SpinnerLoader from "../../components/common/spinner/spinner";
import ResuableHeaders from "../../components/common/resuableHeaders";
import { Accordion } from "react-bootstrap";

export default function VillageReportComponent() {
  const [originalData, setOriginalData] = useState<IReportsMasterData[]>([]);
  const [surveyerWise, setSurveyerWise] = useState<IReportsMasterData[]>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<
    IReportsMasterData[]
  >([]);

  const [urlSearchParam, setUrlSearchParam] = useSearchParams(); // retrieve url query params

  const [isLoading, setLoading] = useState(false);
  const [{ userRole, accessOfMasters, userCodes, Mobile }] = IsAuthenticated();
  const [{ HVillage, HSurveyerName, HSurveyerMobile }] = ResuableHeaders();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    setLoading(true);
    let apiRes = await postRequest("getRelatedWise", {
      LoginType: ASSIGNMENT.VILLAGE,
      TypeOfData: accessOfMasters[0]?.TypeOfData,
      Codes: [urlSearchParam.get("GpName"), ...userCodes],
    });
    let resOfSurveyers = await postRequest("getVillageWiseSurveyerCountsWise", {
      LoginType: ASSIGNMENT.VILLAGE,
      TypeOfData: accessOfMasters[0]?.TypeOfData,
      Mobile: Mobile,
      Code: urlSearchParam.get("GpName")
    });
    if (apiRes?.code == 200) {
      setLoading(false);
      setOriginalData(apiRes?.data);
      setSurveyerWise(resOfSurveyers?.data);
      setCopyOriginalData(apiRes?.data);
    } else {
      setLoading(false);
      alert(apiRes?.response?.data?.message || "Please try again.");
    }
  };

  const navigate = useNavigate();

  const handleChangeRoutes = (obj: IReportsMasterData) => {
    navigate(
      `${SURVEY_REPORTS}?DistrictName=${obj.DistrictCode}&TalukName=${obj.TalukCode}&GpName=${obj.GramPanchayatCode}&VillageName=${obj.VillageCode}`
    );
  };

  const columns = [
    { accessor: "VillageName", label: HVillage },
    { accessor: "TotalCompleted", label: "TotalCount" },
  ];


  const columnsForSurveyer: any = [
    { accessor: "VillageName", label: HVillage },
    { accessor: "Name", label: HSurveyerName },
    { accessor: "Mobile", label: HSurveyerMobile },
    { accessor: "TotalCompleted", label: "TotalCount" },
  ];


  return (
    <React.Fragment>
      <SpinnerLoader isLoading={isLoading} />
      <Titlebar
        title={HVillage}
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
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Village Wise Counts</Accordion.Header>
            <Accordion.Body>
              <CustomTable
                columns={columns}
                rows={originalData}
                handleChangeRoutes={handleChangeRoutes}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      {accessOfMasters[0]?.TypeOfData == "BBMP" && 
      <div className="m-4">
      <Accordion defaultActiveKey="1" className="z-0">
        <Accordion.Item eventKey="1">
          <Accordion.Header>Village And Surveyer Wise Counts - View</Accordion.Header>
          <Accordion.Body>
            <CustomTable
              columns={columnsForSurveyer}
              rows={surveyerWise}
              handleChangeRoutes={undefined}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>}
    </React.Fragment>
  );
}
