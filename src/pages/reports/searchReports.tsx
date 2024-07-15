import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { ASSIGNMENT, roleArrangeMent } from "../../utilities/roles";
import { AvatarDropdown } from "../../components/common/menuDropDown";
import Titlebar from "../../components/common/titlebar";
import { IsAuthenticated } from "../../Authentication/useAuth";
import SelectInput from "../../components/common/selectInput";
import {
  IMasterData,
  IReportsMasterData,
  ISelectItemsListProps,
} from "../../utilities/interfacesOrtype";
import ResuableHeaders from "../../components/common/resuableHeaders";
import SpinnerLoader from "../../components/common/spinner/spinner";
import { postRequest } from "../../Authentication/axiosrequest";
import DatePicker from "react-datepicker";
import { CustomTable } from "../../components/common/customTable";
import PreviewModal from "./preview";
import * as XLSX from "xlsx";

export default function SearchReports() {
  const [originalData, setOriginalData] = useState<IReportsMasterData[]>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<
    IReportsMasterData[]
  >([]);
  const [selectedItems, setSelectItems] = useState<ISelectItemsListProps>({
    district: "",
    panchayat: "",
    taluk: "",
    village: "",
    type: "",
    mode: "",
    status: "",
  });
  const [isLoading, setLoading] = useState(false);

  const [types, setTypes] = useState<any>([]);
  const [districtDropDown, setDistrictDropDown] = useState([]);
  const [talukDropDown, setTalukDropDown] = useState([]);
  const [gpDropDown, setGpDropDown] = useState([]);
  const [villageDropDown, setVillageDropDown] = useState([]);

  const [startDate, setStartDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  const [previewData, setPreviewData] = useState([]); // to assign preview data
  const [previewFormOpen, setPreviewFormOpen] = useState(false); // to assign preview data

  const [{ accessOfMasters, userRole, userCodes }] = IsAuthenticated();
  const [{ HTaluk, HGp, HVillage }] = ResuableHeaders();

  const checkValue =
    accessOfMasters[0]?.District == "Yes" &&
    accessOfMasters[0]?.TypeOfData !== "All";

  const checkDataType =
    accessOfMasters[0]?.District == "Yes"
      ? 1
      : accessOfMasters[0]?.TalukorZone == "Yes"
      ? 2
      : accessOfMasters[0]?.GpOrPhc == "Yes"
      ? 3
      : accessOfMasters[0]?.VllageOrWard == "Yes"
      ? 4
      : "";

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    setLoading(true);
    if (accessOfMasters[0]?.TypeOfData == "All") {
      setLoading(false);
      return setTypes(["Rural", "Urban", "BBMP"]);
    }
    let apiRes = await postRequest("getMasters", {
      DataType: checkDataType,
      Codes: userCodes,
      Type: accessOfMasters[0]?.TypeOfData,
    });
    if (apiRes?.code == 200) {
      setLoading(false);
      if (checkDataType == 1) {
        setSelectItems((prev) => ({
          ...prev,
          type: accessOfMasters[0]?.TypeOfData,
        }));
        setDistrictDropDown(apiRes?.data);
      } else if (checkDataType == 2) {
        setSelectItems((prev) => ({
          ...prev,
          type: accessOfMasters[0]?.TypeOfData,
        }));
        setTalukDropDown(apiRes?.data);
      } else if (checkDataType == 3) {
        setSelectItems((prev) => ({
          ...prev,
          type: accessOfMasters[0]?.TypeOfData,
        }));
        setGpDropDown(apiRes?.data);
      } else if (checkDataType == 4) {
        setSelectItems((prev) => ({
          ...prev,
          type: accessOfMasters[0]?.TypeOfData,
        }));
        setVillageDropDown(apiRes?.data);
      } else {
        return [];
      }
    } else {
      setLoading(false);
      alert(apiRes?.response?.data?.message || "Please try again.");
    }
  };

  const handleTypeSelect = async (value: string) => {
    if (type !== value) {
      setLoading(true);
      setSelectItems((prev) => ({
        ...prev,
        type: value,
        district: "",
        taluk: "",
        panchayat: "",
        village: "",
      }));
      let apiRes = await postRequest("getMasters", {
        DataType: 1,
        Codes: userCodes,
        Type: value,
      });
      setLoading(false);
      setDistrictDropDown(apiRes?.data);
    }
  };
  const handleDistrictSelect = async (value: string) => {
    if (district !== value) {
      setLoading(true);
      setSelectItems((prev) => ({
        ...prev,
        district: value,
        taluk: "",
        panchayat: "",
        village: "",
      }));
      let apiRes = await postRequest("getMasters", {
        DataType: 2,
        Codes: [value],
        Type: type,
      });
      setLoading(false);
      setTalukDropDown(apiRes?.data);
    }
  };

  const handleTalukSelect = async (value: string) => {
    if (taluk !== value) {
      setLoading(true);
      setSelectItems((prev) => ({
        ...prev,
        taluk: value,
        panchayat: "",
        village: "",
      }));
      let apiRes = await postRequest("getMasters", {
        DataType: 3,
        Codes: [value],
        Type: type,
      });
      setLoading(false);
      setGpDropDown(apiRes?.data);
    }
  };

  const handleGpSelect = async (value: string) => {
    if (panchayat !== value) {
      setLoading(true);
      setSelectItems((prev) => ({
        ...prev,
        panchayat: value,
        village: "",
      }));
      let apiRes = await postRequest("getMasters", {
        DataType: 4,
        Codes: [value],
        Type: type,
      });
      setLoading(false);
      setVillageDropDown(apiRes?.data);
    }
  };

  const handleVillageSelect = (value: string) => {
    if (village !== value) {
      setSelectItems((prev) => ({
        ...prev,
        village: value,
      }));
    }
  };

  const handleClearFilters = () => {
    setSelectItems((prev) => ({
      ...prev,
      district: "",
      panchayat: "",
      type: "",
      taluk: "",
      village: "",
      mode: "",
      status: "",
    }));
  };

  const handleSearchResult = async () => {
    setLoading(true);
    let apiRes = await postRequest("getSearchReports", {
      DataType: checkDataType,
      type: type,
      district: district,
      taluk,
      panchayat,
      village,
      mode,
      status,
      startDate: startDate,
      toDate: toDate,
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

  const {
    district,
    panchayat,
    taluk,
    type,
    village,
    mode,
    status,
  } = selectedItems;

  const handleChangeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectItems((pre) => ({
      ...pre,
      [name]: value,
    }));
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

  const renderPrevewForm = () => {
    return (
      <PreviewModal
        handleClose={() => setPreviewFormOpen(false)}
        show={previewFormOpen}
        previewData={previewData[0]}
      />
    );
  };

  const columns = [
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
  ];

  const handleReports = () => {
    if(originalData.length == 0) return alert("Empty Data.");
    const worksheet = XLSX.utils.json_to_sheet(originalData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const getDate = new Date().toJSON().split("T")[0];
    XLSX.writeFile(workbook, `${getDate}.xlsx`);
  };


  return (
    <React.Fragment>
      <SpinnerLoader isLoading={isLoading} />
      {previewFormOpen ? renderPrevewForm() : ""}
      <Titlebar
        title={"Search Reports"}
        Component={
          <AvatarDropdown {...roleArrangeMent(accessOfMasters, userRole)} />
        }
      />
      <div className="m-16 mt-4">
        <Row className="flex ml-12 mb-0">
          <Col
            md={2}
            style={{ borderRadius: "10px 10px 0 0" }}
            className="border border-solid border-b-0 border-black bg-black text-white"
          >
            Summary
          </Col>
        </Row>
        <Row className="flex flex-row border border-solid border-gray-800 gap-y-4 rounded-b-lg rounded-r-lg mt-0 p-3 mb-3">
          {checkDataType == 1 && (
            <Fragment>
              {accessOfMasters[0]?.TypeOfData =="All" && (
                <Col md={3} sm={6}>
                  <SelectInput
                    defaultSelect="Select Type"
                    options={types}
                    onChange={(e) => handleTypeSelect(e.target.value)}
                    value={type}
                  />
                </Col>
              )}
              <Col md={3} sm={6}>
                <SelectInput
                  defaultSelect="Select District"
                  isValueAdded={true}
                  options={districtDropDown}
                  onChange={(e) => handleDistrictSelect(e.target.value)}
                  value={district}
                />
              </Col>
              <Col md={3} sm={6}>
                <SelectInput
                  defaultSelect={`Select ${HTaluk}`}
                  isValueAdded={true}
                  options={talukDropDown}
                  onChange={(e) => handleTalukSelect(e.target.value)}
                  value={taluk}
                />
              </Col>
              <Col md={3} sm={6}>
                <SelectInput
                  defaultSelect={`Select ${HGp}`}
                  isValueAdded={true}
                  options={gpDropDown}
                  onChange={(e) => handleGpSelect(e.target.value)}
                  value={panchayat}
                />
              </Col>
              <Col md={3} sm={6}>
                <SelectInput
                  defaultSelect={`Select ${HVillage}`}
                  isValueAdded={true}
                  options={villageDropDown}
                  onChange={(e) => handleVillageSelect(e.target.value)}
                  value={village}
                />
              </Col>
            </Fragment>
          )}
          {checkDataType == 2 && (
            <Fragment>
              <Col md={3} sm={6}>
                <SelectInput
                  defaultSelect={`Select ${HTaluk}`}
                  isValueAdded={true}
                  options={talukDropDown}
                  onChange={(e) => handleTalukSelect(e.target.value)}
                  value={taluk}
                />
              </Col>
              <Col md={3} sm={6}>
                <SelectInput
                  defaultSelect={`Select ${HGp}`}
                  isValueAdded={true}
                  options={gpDropDown}
                  onChange={(e) => handleGpSelect(e.target.value)}
                  value={panchayat}
                />
              </Col>
              <Col md={3} sm={6}>
                <SelectInput
                  defaultSelect={`Select ${HVillage}`}
                  isValueAdded={true}
                  options={villageDropDown}
                  onChange={(e) => handleVillageSelect(e.target.value)}
                  value={village}
                />
              </Col>
            </Fragment>
          )}
          {checkDataType == 3 && (
            <Fragment>
              <Col md={3} sm={6}>
                <SelectInput
                  defaultSelect={`Select ${HGp}`}
                  isValueAdded={true}
                  options={gpDropDown}
                  onChange={(e) => handleGpSelect(e.target.value)}
                  value={panchayat}
                />
              </Col>
              <Col md={3} sm={6}>
                <SelectInput
                  defaultSelect={`Select ${HVillage}`}
                  isValueAdded={true}
                  options={villageDropDown}
                  onChange={(e) => handleVillageSelect(e.target.value)}
                  value={village}
                />
              </Col>
            </Fragment>
          )}
          {checkDataType == 4 && (
            <Fragment>
              <Col md={3} sm={6}>
                <SelectInput
                  defaultSelect={`Select ${HVillage}`}
                  isValueAdded={true}
                  options={villageDropDown}
                  onChange={(e) => handleVillageSelect(e.target.value)}
                  value={village}
                />
              </Col>
            </Fragment>
          )}
          <Col md={3} sm={6}>
            <SelectInput
              defaultSelect={`Select Mode`}
              name="mode"
              options={["Ration", "Aadhar", "NoId", "SatsId", "All"]}
              onChange={handleChangeSelect}
              value={mode}
            />
          </Col>
          <Col md={3} sm={6}>
            <SelectInput
              defaultSelect={`Select Status`}
              name="status"
              options={["Verified", "Pending"]}
              onChange={handleChangeSelect}
              value={status}
            />
          </Col>
          <Col md={3} xs={6} sm={6}>
            <InputGroup className="flex flex-row">
              {/* <InputGroup.Text>
                <i className="bi bi-calendar3"></i>
              </InputGroup.Text> */}
              <DatePicker
                className="rounded-md bg-white border-gray-200"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                isClearable
                placeholderText="From date"
              />
            </InputGroup>
          </Col>
          <Col md={3} xs={6} sm={6}>
            <InputGroup className="flex flex-row">
              {/* <InputGroup.Text>
                <i className="bi bi-calendar3"></i>
              </InputGroup.Text> */}
              <DatePicker
                className="rounded-md bg-white border-gray-200"
                selected={toDate}
                onChange={(date: Date) => setToDate(date)}
                dateFormat="dd/MM/yyyy"
                isClearable
                placeholderText="To date"
              />
            </InputGroup>
          </Col>
          <Col md={3} sm={6}>
            <Button
              style={{ backgroundColor: "#13678C" }}
              onClick={() => handleSearchResult()}
            >
              Search Result
            </Button>
          </Col>
          {/* <Col md={3} sm={6}>
            <Button
              style={{ backgroundColor: "#13678C" }}
              onClick={handleReports}
            >
              Download Reports
            </Button>
          </Col> */}
          <Col md={3} sm={6}>
            <Button
              style={{ backgroundColor: "#13678C" }}
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
        <CustomTable
          columns={columns}
          rows={originalData}
          title="Preview"
          handleCLickModify={handlePreviewData}
        />
      </div>
    </React.Fragment>
  );
}
