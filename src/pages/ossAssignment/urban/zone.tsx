import React, { useEffect, useState } from "react";
import Titlebar from "../../../components/common/titlebar";
import { AvatarDropdown } from "../../../components/common/menuDropDown";
import {
  Button,
  Col,
  Row,
  Table,
} from "react-bootstrap";
import SelectInput from "../../../components/common/selectInput";
import "./urbanStyle.css";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomPagination from "../../../components/common/customPagination";
import ZoneModal from "../../../components/common/Modals/ZoneModal";
import TableRowsPerPageDropDown from "../../../components/common/tableRowsPerPage";
import { SearchBox } from "../../../components/common/searchBox";
import { postRequest } from "../../../Authentication/axiosrequest";
import { ASSIGNMENT } from "../../../utilities/roles";
import { IMasterData } from "../../../utilities/interfacesOrtype";
import SpinnerLoader from "../../../components/common/spinner/spinner";

export default function ZoneComponent() {
  const [district, setDistrict] = useState("");
  const [zone, setZone] = useState("");

  const [zoneDropDown, setZoneDropDown] = useState([]);
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
      LoginType: ASSIGNMENT.TALUK,
      Codes: userCodes
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
      filterData = filterData.filter(obj => obj.DistrictName === district);
    }

    // filter rural/urban and district
    if (district && zone) {
      filterData = filterData.filter(
        (obj) =>  obj.DistrictName === district && 
        obj?.TalukName === zone
      );
    }
 
    setCopyOriginalData(filterData);
  }, [district, zone]);


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
  };

  const handleCLickModify = async (obj: any, title: string) => {
    setFormData(obj);
    setEditForm(true);
    setModalTitle(title);
  };

  const handleCLickAdd = async () => {
    if(!district || !zone) return alert("Select Fields.");
    let find: any = originalData.find((obj) => obj.DistrictName === district && obj.TalukName === zone);
    setFormData(find);
    setEditForm(true);
    setModalTitle('Add');
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
      <ZoneModal
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
      item?.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.DistrictName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.TalukCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.CreatedMobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.TalukName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.CreatedRole?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  });

  const handleDistrictSelect = (value: string) => {
    if(district !== value){
      setDistrict(value);
      setZone("");
      let talukSelect: any = Array.from(new Set(((originalData).filter((obj) => obj.DistrictName === value).map(obj => obj.TalukName))));
      setZoneDropDown(talukSelect);
    }
  };

  return (
    <React.Fragment>
      <SpinnerLoader isLoading={isLoading} />
      {editForm && rednerForm()}
      <Titlebar
        title={`Zone Assignment`}
        Component={
          <AvatarDropdown
            dropDown={[{ routeName: "DashBoard", routePath: "/Dashboard" }]}
            username={"District Officer"}
          />
        }
      />
      <div>
        <Row className="boxTitle">
          <Col md={2} className="boxText">
            FIlters
          </Col>
        </Row>
        <Row className="box">
          <Col md={3} sm={6}>
            <SelectInput
              defaultSelect="Select District"
              options={Array.from(new Set(originalData.map(obj => obj.DistrictName)))}
              onChange={(e) => handleDistrictSelect(e.target.value)}
              value={district}
            />
          </Col>
          <Col md={3} sm={6}>
            <SelectInput
              defaultSelect="Select District"
              options={zoneDropDown}
              onChange={(e) => setZone(e.target.value)}
              value={zone}
            />
          </Col>
          <Col md={3} sm={6}>
            <Button style={{backgroundColor: '#13678C'}} onClick={handleCLickAdd}>
              Add User
            </Button>
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
              <th className="urbanTh p-1">Action</th>
            </thead>
            <tbody>
              <tr className="spacer"></tr>
              {(filteredData || []).map((obj, i) => (
              <tr key={i}>
                <td className="tableRowStart">{obj?.Name ?? "N/A"}</td>
                <td>{obj?.Mobile ?? "N/A"}</td>
                <td>{obj?.DistrictName ?? "N/A"}</td>
                <td>{obj?.TalukName ?? "N/A"}</td>
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
