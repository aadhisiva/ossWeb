import React, { useEffect, useState } from "react";
import Titlebar from "../../../components/common/titlebar";
import { AvatarDropdown } from "../../../components/common/menuDropDown";
import { Button, Col, Row, Table } from "react-bootstrap";
import SelectInput from "../../../components/common/selectInput";
import "./urbanStyle.css";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../../components/common/customPagination";
import { SearchBox } from "../../../components/common/searchBox";
import { postRequest } from "../../../Authentication/axiosrequest";
import { ASSIGNMENT } from "../../../utilities/roles";
import { IMasterData } from "../../../utilities/interfacesOrtype";
import DivisionModal from "../../../components/common/Modals/divisionModal";
import TableRowsPerPageDropDown from "../../../components/common/tableRowsPerPage";
import SpinnerLoader from "../../../components/common/spinner/spinner";

export default function DivisionComponent() {
  const [district, setDistrict] = useState("");
  const [zone, setZone] = useState("");
  const [division, setDivision] = useState("");

  const [talukDropDown, setTalukDropDown] = useState([]);
  const [gpDropDown, setGpDropDown] = useState([]);

  const [originalData, setOriginalData] = useState<IMasterData[]>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<IMasterData[]>([]);

  const [searchTerm, setSearchTerm] = useState(""); // for search to get any value

  const [isLoading, setLoading] = useState(false);

  const [editForm, setEditForm] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [formData, setFormData] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(copyOfOriginalData.length / itemsPerPage);

  const [{ userCodes }] = IsAuthenticated();

  // assign initial data
  const getAllMaster = async () => {
    setLoading(true);
    let res = await postRequest("getMasterWithAssigned", {
      LoginType: ASSIGNMENT.GET_GP,
      Codes: userCodes,
    });
    if (res?.code === 200) {
      setOriginalData(res?.data);
      setCopyOriginalData(res?.data);
      setLoading(false);
    } else {
      setLoading(false);
      alert(res?.response?.data?.message || "Please try again.");
    }
  };

  useEffect(() => {
    getAllMaster();
  }, []);

  useEffect(() => {
    let filterData = originalData;
    // filter rural/urban
    if (district) {
      filterData = filterData.filter((obj) => obj.DistrictName === district);
    }

    // filter rural/urban and district
    if (district && zone) {
      filterData = filterData.filter(
        (obj) => obj.DistrictName === district && obj?.TalukName === zone
      );
    }
    // filter rural/urban and district and taluka
    if (district && zone && division) {
      filterData = filterData.filter(
        (obj) =>
          obj.DistrictName === district &&
          obj?.TalukName === zone &&
          obj?.GramPanchayatName === division
      );
    }

    setCopyOriginalData(filterData);
  }, [district, zone, division]);

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = copyOfOriginalData.slice(startIndex, endIndex);

  const handleClearFilters = () => {
    setDistrict("");
    setZone("");
    setDivision("");
  };

  const handleCLickModify = async (obj: any, title: string) => {
    setFormData(obj);
    setEditForm(true);
    setModalTitle(title);
  };

  const handleCLickAdd = async () => {
    if (!district || !zone || !division) return alert("Select Fields.");
    let find: any = originalData.find(
      (obj) =>
        obj.DistrictName == district &&
        obj.TalukName === zone &&
        obj.GramPanchayatName === division
    );
    setFormData(find);
    setEditForm(true);
    setModalTitle("Add");
  };

  const handleSubmitForm = async (values: any) => {
    let res = await postRequest("assignMentProcess", values);
    if (res.code === 200) {
      setEditForm(false);
      await getAllMaster();
    } else {
      setEditForm(false);
      alert(res?.response?.data?.message || "Please try again.");
    }
  };

  const rednerForm = () => {
    return (
      <DivisionModal
        show={editForm}
        title={modalTitle}
        saveType={"DO"}
        formData={formData}
        handleSubmitForm={handleSubmitForm}
        onHide={() => setEditForm(false)}
      />
    );
  };

  const filteredData = (currentItems || []).filter((item) => {
    return (
      item?.Role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.DistrictName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.GramPanchayatName?.toLowerCase().includes(
        searchTerm.toLowerCase()
      ) ||
      item?.TalukName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.VillageName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.CreatedMobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.TalukName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.CreatedRole?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDistrictSelect = (value: string) => {
    if (district !== value) {
      setDistrict(value);
      setZone("");
      setDivision("");
      let talukData: any = Array.from(
        new Set(
          originalData
            .filter((obj) => obj.DistrictName === value)
            .map((obj) => obj.TalukName)
        )
      );
      setTalukDropDown(talukData);
    }
  };

  const handleZoneSelect = (value: string) => {
    if (zone !== value) {
      setZone(value);
      setDivision("");
      let gpData: any = Array.from(
        new Set(
          originalData
            .filter((obj) => obj.TalukName === value)
            .map((obj) => obj.GramPanchayatName)
        )
      );
      setGpDropDown(gpData);
    }
  };

  return (
    <React.Fragment>
      {editForm && rednerForm()}
      <SpinnerLoader isLoading={isLoading} />
      <Titlebar
        title={`Division AssignMent`}
        Component={
          <AvatarDropdown
            dropDown={[{ routeName: "DashBoard", routePath: "/Dashboard" }]}
            username={"Zone Officer"}
          />
        }
      />
      <div>
        <Row className="boxTitle">
          <Col md={2} className="boxText">
            Filters
          </Col>
        </Row>
        <Row className="box">
          <Col md={3} sm={6}>
            <SelectInput
              defaultSelect="Select District"
              options={Array.from(
                new Set(originalData.map((obj) => obj.DistrictName))
              )}
              onChange={(e) => handleDistrictSelect(e.target.value)}
              // isValueAdded={true}
              value={district}
            />
          </Col>
          <Col md={3} sm={6}>
            <SelectInput
              defaultSelect="Select Zone"
              options={talukDropDown}
              onChange={(e) => handleZoneSelect(e.target.value)}
              value={zone}
            />
          </Col>
          <Col md={3} sm={6}>
            <SelectInput
              defaultSelect="Select Ward"
              options={gpDropDown}
              onChange={(e) => setDivision(e.target.value)}
              value={division}
            />
          </Col>
          <Col md={3} sm={6}>
            <Button style={{backgroundColor: '#13678C'}} onClick={handleCLickAdd}>Add User</Button>
          </Col>
          <Col md={3} sm={6}>
            <Button style={{backgroundColor: '#13678C'}} onClick={handleClearFilters}>Clear Filters</Button>
          </Col>
        </Row>
        <Row className="searchWithDroopDown">
          <Col md={2}>
            <TableRowsPerPageDropDown
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
          </Col>
          <Col md={4}>
            <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </Col>
        </Row>
        <Row className="m-4">
          <Table hover className="pn-2" size="sm">
            <thead className="urbanThead">
              <th className="urbanTh p-1">Name</th>
              <th className="urbanTh p-1">Mobile Number</th>
              <th className="urbanTh p-1">District</th>
              <th className="urbanTh p-1">Zone</th>
              <th className="urbanTh p-1">Division</th>
              <th className="urbanTh p-1">Action</th>
            </thead>
            <tbody>
              <tr className="spacer"></tr>
              {(filteredData || []).map((obj: any) => (
                <tr>
                  <td className="tableRowStart">{obj?.Name ?? "N/A"}</td>
                  <td>{obj?.Mobile ?? "N/A"}</td>
                  <td>{obj?.DistrictName ?? "N/A"}</td>
                  <td>{obj?.TalukName ?? "N/A"}</td>
                  <td>{obj?.GramPanchayatName ?? "N/A"}</td>
                  <td className="tableRowEnd">
                    <Button
                      className="mr-1"
                      style={{backgroundColor: '#13678C'}}
                      onClick={() => handleCLickModify(obj, "Modify")}
                    >
                      Modify
                    </Button>
                  </td>
                </tr>
              ))}
              <tr className="spacer"></tr>
            </tbody>
          </Table>
          <CustomPagination
            currentCount={filteredData.length || 0}
            onPageChange={onPageChange}
            totalCount={originalData.length || 0}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
          />
        </Row>
      </div>
    </React.Fragment>
  );
}
