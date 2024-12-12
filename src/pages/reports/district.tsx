import React, { useEffect, useState } from "react";
import SpinnerLoader from "../../components/common/spinner/spinner";
import { AvatarDropdown } from "../../components/common/menuDropDown";
import { ASSIGNMENT, roleArrangeMent } from "../../utilities/roles";
import { CustomTable } from "../../components/common/customTable";
import Titlebar from "../../components/common/titlebar";
import { IReportsMasterData } from "../../utilities/interfacesOrtype";
import { IsAuthenticated } from "../../Authentication/useAuth";
import { postRequest, PostRequestWithdownloadFile } from "../../Authentication/axiosrequest";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TALUK_REPORTS } from "../../utilities/routePaths";
import { DownloadTable } from "../../components/common/customTable/downloadTable";

export default function DistrictReports() {
    const [originalData, setOriginalData] = useState<IReportsMasterData[]>([]);
    const [copyOfOriginalData, setCopyOriginalData] = useState<
      IReportsMasterData[]
    >([]);
    const [isLoading, setLoading] = useState(false);
    const [downloadClick, setDownloadClick] = useState(false);

    const [{ userRole, accessOfMasters, userCodes }] = IsAuthenticated();
  
    const navigate = useNavigate();
  
    useEffect(() => {
      getInitialData();
    }, []);

  const columns = [
    { accessor: "DistrictName", label: "District" },
    { accessor: "TotalCompleted", label: "TotalCount" },
  ];

  const EducationColumns = [
    { accessor: "DistrictName", label: "District" },
    { accessor: "TotalCompleted", label: "TotalCount" },
    { accessor: "Type", label: "Type" },
    { accessor: "Action", label: "Download" },
  ]
  
  const getInitialData = async () => {
    setLoading(true);
    let apiRes = await postRequest("getRelatedWise", 
      {
        LoginType: ASSIGNMENT.DISTRICT,
        TypeOfData: accessOfMasters[0]?.TypeOfData,
        Codes: userCodes,
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
  const handleCLickModify = async (obj: any) => {
    setDownloadClick(false);
    setLoading(true);
    await PostRequestWithdownloadFile("downloadDetailsSNG", {DistrictCode: obj.DistrictCode, Type: obj.Type, DistrictName: obj.DistrictName, ReqType: "SA",})
    setLoading(false);
  };

  const handleChangeRoutes = (obj: IReportsMasterData) => {

    navigate(`${TALUK_REPORTS}?DistrictName=${obj?.DistrictCode}`);
  };
  return (
    <React.Fragment>
      <SpinnerLoader isLoading={isLoading} />
      <Titlebar
        title={`District`}
        Component={<AvatarDropdown {...roleArrangeMent(userRole)} />}
      />
      <DownloadTable
        columns={accessOfMasters[0]?.Department == "Education" ? EducationColumns : columns}
        rows={originalData}
        handleChangeRoutes={downloadClick ? undefined : handleChangeRoutes}
        handleCLickModify={handleCLickModify}
      />
    </React.Fragment>
  );
}
