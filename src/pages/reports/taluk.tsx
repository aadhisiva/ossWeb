import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IReportsMasterData } from "../../utilities/interfacesOrtype";
import { IsAuthenticated } from "../../Authentication/useAuth";
import {
  postRequest,
  PostRequestWithdownloadFile,
} from "../../Authentication/axiosrequest";
import Titlebar from "../../components/common/titlebar";
import { AvatarDropdown } from "../../components/common/menuDropDown";
import { ASSIGNMENT, roleArrangeMent } from "../../utilities/roles";
import { Col, Row } from "react-bootstrap";
import { CustomTable } from "../../components/common/customTable";
import { GP_REPORTS } from "../../utilities/routePaths";
import SpinnerLoader from "../../components/common/spinner/spinner";
import ResuableHeaders from "../../components/common/resuableHeaders";
import { DownloadTable } from "../../components/common/customTable/downloadTable";

export default function TalukReportComponent() {
  const [originalData, setOriginalData] = useState<IReportsMasterData[]>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<
    IReportsMasterData[]
  >([]);

  const [urlSearchParam, setUrlSearchParam] = useSearchParams(); // retrieve url query params

  const [isLoading, setLoading] = useState(false);
  const [
    { userRole, accessOfMasters, userCodes, isDownloadReports },
  ] = IsAuthenticated();
  const [downloadClick, setDownloadClick] = useState(false);

  const { currentPath } = useSelector((state: any) => state.path);

  const [{ HTaluk }] = ResuableHeaders();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    setLoading(true);
    let apiRes = await postRequest("getRelatedWise", {
      LoginType: ASSIGNMENT.TALUK,
      TypeOfData: accessOfMasters[0]?.TypeOfData,
      Codes: [urlSearchParam.get("DistrictName"), ...userCodes],
    });
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
      `${GP_REPORTS}?DistrictName=${obj.DistrictCode}&TalukName=${obj.TalukCode}`
    );
  };

  const columns = [
    { accessor: "TalukName", label: HTaluk },
    { accessor: "TotalCompleted", label: "TotalCount" },
  ];

  const UlbColumns = [
    { accessor: "TalukName", label: HTaluk },
    { accessor: "TotalCompleted", label: "TotalCount" },
    { accessor: "Action", label: "Download" },
  ];

  const handleCLickModify = async (obj: any) => {
    setDownloadClick(false);
    setLoading(true);
    await PostRequestWithdownloadFile("downloadDetailsSNG", {
      DistrictCode: obj.DistrictCode,
      TalukCode: obj.TalukCode,
      Type: obj.Type,
      DistrictName: obj.DistrictName,
      TalukName: obj.TalukName,
      ReqType: "District",
    });
    setLoading(false);
  };

  return (
    <React.Fragment>
      <SpinnerLoader isLoading={isLoading} />
      <Titlebar
        title={HTaluk}
        Component={<AvatarDropdown {...roleArrangeMent(userRole)} />}
      />
      <div className="m-4">
        {/* <Row className="flex m-1">
        <Col
          md={3}
          xs={12}
          className="border rounded-xl bg-[#13678C] text-white"
        >
          District Name: {urlSearchParam.get("DistrictName")}
        </Col>
      </Row> */}
        {isDownloadReports !== "Yes" ? (
          <CustomTable
            columns={columns}
            rows={originalData}
            handleChangeRoutes={handleChangeRoutes}
          />
        ) : (
          <DownloadTable
            columns={
              accessOfMasters[0]?.Department == "District"
                ? UlbColumns
                : columns
            }
            rows={originalData}
            handleChangeRoutes={downloadClick ? undefined : handleChangeRoutes}
            handleCLickModify={handleCLickModify}
          />
        )}
      </div>
    </React.Fragment>
  );
}
