import React, { useEffect, useState } from "react";
import Titlebar from "../../../components/common/titlebar";
import { AvatarDropdown } from "../../../components/common/menuDropDown";
import { Button, Col, Row, Table } from "react-bootstrap";
import SelectInput from "../../../components/common/selectInput";
import "./urbanStyle.css";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomPagination from "../../../components/common/customPagination";
import TableRowsPerPageDropDown from "../../../components/common/tableRowsPerPage";
import { SearchBox } from "../../../components/common/searchBox";
import { postRequest } from "../../../Authentication/axiosrequest";
import { ASSIGNMENT } from "../../../utilities/roles";
import DistrictModal from "../../../components/common/Modals/districtModal";
import { IMasterData } from "../../../utilities/interfacesOrtype";
import SpinnerLoader from "../../../components/common/spinner/spinner";

export default function DistrictAssignMent() {
  const [district, setDistrict] = useState("");

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

  // assign initial data
  const getAllMaster = async () => {
    setLoading(true);
    let res = await postRequest("getMasterWithAssigned", {
      LoginType: ASSIGNMENT.DISTRICT,
      Codes: [],
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
      filterData = filterData.filter(
        (obj) => obj.DistrictName === district
      );
    }
    setCopyOriginalData(filterData);
  }, [district]);

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
    if (!district) return alert("Select District.");
    let find: any = originalData.find(
      (obj: any) => obj.DistrictCode == district
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
      <DistrictModal
        show={editForm}
        title={modalTitle}
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
      item?.CreatedMobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.CreatedRole?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <React.Fragment>
      <SpinnerLoader isLoading={isLoading} />
      {editForm && rednerForm()}
      <Titlebar
        title={`District AssignMent`}
        Component={
          <AvatarDropdown
            dropDown={[{ routeName: "DashBoard", routePath: "/Dashboard" }]}
            username={"Super Admin"}
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
              options={Array.from(
                new Set(originalData.map((obj) => obj.DistrictName))
              )}
              onChange={(e) => setDistrict(e.target.value)}
              value={district}
            />
          </Col>
          <Col md={3} sm={6}>
            <Button onClick={handleCLickAdd}>Add User</Button>
          </Col>
          <Col md={3} sm={6}>
            <Button onClick={handleClearFilters}>Clear Filters</Button>
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
          <Table hover className="bg-green-200 pn-2" size="sm">
            <thead className="urbanThead">
              <th className="urbanTh p-1">Name</th>
              <th className="urbanTh p-1">Mobile Number</th>
              <th className="urbanTh p-1">District</th>
              <th className="urbanTh p-1">CreatedRole</th>
              <th className="urbanTh p-1">CreatedMobile</th>
              <th className="urbanTh p-1">Action</th>
            </thead>
            <tbody>
              <tr className="spacer"></tr>
              {(filteredData || []).map((obj: any) => (
                <tr>
                  <td className="tableRowStart">{obj?.Name ?? "N/A"}</td>
                  <td>{obj?.Mobile ?? "N/A"}</td>
                  <td>{obj?.DistrictName ?? "N/A"}</td>
                  <td>{obj?.CreatedRole ?? "N/A"}</td>
                  <td>{obj?.CreatedMobile ?? "N/A"}</td>
                  <td className="tableRowEnd">
                    <Button
                      className="mr-1"
                      variant="primary"
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
