import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IReportsMasterData } from "../../utilities/interfacesOrtype";
import { IsAuthenticated } from "../../Authentication/useAuth";
import { postRequest } from "../../Authentication/axiosrequest";
import Titlebar from "../../components/common/titlebar";
import { AvatarDropdown } from "../../components/common/menuDropDown";
import { ASSIGNMENT, roleArrangeMent } from "../../utilities/roles";
import { Button, Col, Row } from "react-bootstrap";
import { CustomTable } from "../../components/common/customTable";
import * as XLSX from "xlsx";
import SpinnerLoader from "../../components/common/spinner/spinner";
import PreviewModal from "./preview";
import RejectModal from "./rejectForm";

export default function SurveyReportComponent() {
  const [originalData, setOriginalData] = useState<IReportsMasterData[]>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<
    IReportsMasterData[]
  >([]);

  const [urlSearchParam, setUrlSearchParam] = useSearchParams(); // retrieve url query params
  const [previewData, setPreviewData] = useState([]); // to assign preview data
  const [previewFormOpen, setPreviewFormOpen] = useState(false); // to assign preview data

  const [rejectData, setRejectData] = useState();
  const [rejectForm, setRejectForm] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [{ userRole, accessOfMasters, userCodes }] = IsAuthenticated();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    setLoading(true);
    let apiRes = await postRequest("getRelatedWise", {
      LoginType: ASSIGNMENT.USER,
      TypeOfData: accessOfMasters[0]?.TypeOfData,
      Codes: [urlSearchParam.get("VillageName")],
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

  const columns = (userRole == "RO/RI/ARO" || userRole == "DMA Admin"  || userRole == "CC/CMC/TMC") ? [
    { accessor: "StudentId", label: "StudentId" },
    { accessor: "StudentName", label: "StudentName" },
    { accessor: "StudentClass", label: "StudentClass" },
    { accessor: "ParentMobile", label: "ParentMobile" },
    { accessor: "ParentRelation", label: "ParentRelation" },
    { accessor: "StudentDob", label: "StudentDob" },
    { accessor: "Status", label: "Status" },
    { accessor: "SurveyMode", label: "SurveyMode" },
    { accessor: "SchoolName", label: "SchoolName" },
    { accessor: "ApproveBy", label: "ApproveBy" },
    { accessor: "Action", label: "Action" },
  ]: [
    { accessor: "StudentId", label: "StudentId" },
    { accessor: "StudentName", label: "StudentName" },
    { accessor: "StudentClass", label: "StudentClass" },
    { accessor: "ParentMobile", label: "ParentMobile" },
    { accessor: "ParentRelation", label: "ParentRelation" },
    { accessor: "StudentDob", label: "StudentDob" },
    { accessor: "Status", label: "Status" },
    { accessor: "SurveyMode", label: "SurveyMode" },
    { accessor: "SchoolName", label: "SchoolName" },
    { accessor: "Action", label: "Action" },
  ];

  const handleReports = () => {
    const worksheet = XLSX.utils.json_to_sheet(originalData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const getName = urlSearchParam.get("VillageName");
    const getDate = new Date().toJSON().split("T")[0];
    XLSX.writeFile(workbook, `${getName}-${getDate}.xlsx`);
  };

  const handlePreviewData = async (obj: any) => {
    setLoading(true);
    let apiRes = await postRequest("getRelatedWise", {
      LoginType: ASSIGNMENT.SUREVY,
      TypeOfData: "",
      Codes: [obj.id],
    });
    if (apiRes?.code == 200) {
      setLoading(false);
      setPreviewData(apiRes?.data);
      setPreviewFormOpen(true);
    } else {
      setLoading(false);
      setPreviewFormOpen(false);
      alert(apiRes?.response?.data?.message || "Please try again.");
    }
  };

  const handleCLickApprove = async (obj: any, type: string) => {
    setLoading(true);
    if(type == "Rejected"){
      setRejectForm(true);
      setRejectData(obj);
      setLoading(false);
    } else {
      let apiRes = await postRequest("approve", {
        id: obj.id,
        ApproveBy: `Approved By ${userRole}`
      });
      if (apiRes?.code == 200) {
        setLoading(false);
        await getInitialData();
      } else {
        setLoading(false);
        alert(apiRes?.response?.data?.message || "Please try again.");
      }
    }
  };

  const handleApproveAll = async (obj: any) => {
    setLoading(true);
    let mapId = originalData.map(obj => obj.id);
    let apiRes = await postRequest("approveAll", {
      data: mapId,
      ApproveBy: `Approved By ${userRole}`
    });
    if (apiRes?.code == 200) {
      setLoading(false);
      await getInitialData();
    } else {
      setLoading(false);
      alert(apiRes?.response?.data?.message || "Please try again.");
    }
  };

  const handleRejectChild = async (remark: string, id: string) => {
    setLoading(true);
    let apiRes = await postRequest("addRejectRemarks", {
      id: id,
      Remarks: remark,
      ApproveBy: `Rejected By ${userRole}`
    });
    if (apiRes?.code == 200) {
      setLoading(false);
      await getInitialData();
    } else {
      setLoading(false);
      alert(apiRes?.response?.data?.message || "Please try again.");
    }
  }

  const renderPrevewForm = () => {
    return (
      <PreviewModal
        handleClose={() => setPreviewFormOpen(false)}
        show={previewFormOpen}
        previewData={previewData[0]}
      />
    );
  };

  const renderRejectForm = () => {
    return (
      <RejectModal
        handleClose={() => setRejectForm(false)}
        show={rejectForm}
        childData={rejectData}
        handleRejectChild={handleRejectChild}
      />
    );
  };


  return (
    <React.Fragment>
      <Titlebar
        title={`Surveyed Reports`}
        Component={<AvatarDropdown {...roleArrangeMent(userRole)} />}
      />
      {previewFormOpen ? renderPrevewForm() : ""}
      {rejectForm ? renderRejectForm() : ""}
      {isLoading ? <SpinnerLoader isLoading={isLoading} /> : ""}
      <div className="m-4">
        {/* <Row className="flex justify-end m-2">
          <Col md={2}>
            <Button onClick={handleReports}>Download Reports</Button>
          </Col>
        </Row> */}
        <CustomTable
          title="Preview"
          secondTitle="Approve"
          columns={columns}
          rows={originalData}
          handleCLickModify={handlePreviewData}
          handleCLickApprove={handleCLickApprove}
          handleApproveAll={handleApproveAll}
        />
      </div>
    </React.Fragment>
  );
}
