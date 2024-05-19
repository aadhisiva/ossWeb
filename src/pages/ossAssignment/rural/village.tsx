import React, { useEffect, useState } from "react";
import Titlebar from "../../../components/common/titlebar";
import { AvatarDropdown } from "../../../components/common/menuDropDown";
import { Button, Col, Row, Table } from "react-bootstrap";
import SelectInput from "../../../components/common/selectInput";
import "./urbanStyle.css";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomPagination from "../../../components/common/customPagination";
import ZoneModal from "../../../components/common/Modals/ZoneModal";
import { SearchBox } from "../../../components/common/searchBox";
import { postRequest } from "../../../Authentication/axiosrequest";
import { ASSIGNMENT } from "../../../utilities/roles";
import GpModal from "../../../components/common/Modals/gpModal";
import VillageModal from "../../../components/common/Modals/villageModal";
import { IMasterData } from "../../../utilities/interfacesOrtype";
import TableRowsPerPageDropDown from "../../../components/common/tableRowsPerPage";
import SpinnerLoader from "../../../components/common/spinner/spinner";
import { TableWithSorting } from "../../../components/common/tableWithPagination";
import ResuableModal from "../../../components/common/Modals/selectOneRow";

export default function VillageAssignMent() {
  const [district, setDistrict] = useState("");
  const [taluk, setTaluk] = useState("");
  const [panchayat, setPanchayat] = useState("");
  const [village, setVillage] = useState("");

  const [talukDropDown, setTalukDropDown] = useState([]);
  const [gpDropDown, setGpDropDown] = useState([]);
  const [villageDropDown, setVillageDropDown] = useState([]);

  const [originalData, setOriginalData] = useState<IMasterData[]>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<IMasterData[]>([]);

  const [searchTerm, setSearchTerm] = useState(""); // for search to get any value

  const [isLoading, setLoading] = useState(false);

  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [formData, setFormData] = useState({});
  const [editFormData, setEditFormData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(copyOfOriginalData.length / itemsPerPage);

  const [{ userCodes }] = IsAuthenticated();

  // assign initial data
  const getAllMaster = async () => {
    setLoading(true);
    let res = await postRequest("getMasterWithAssigned", {
      LoginType: ASSIGNMENT.VILLAGE,
      Codes: userCodes,
      DataType: "",
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
    if (district && taluk) {
      filterData = filterData.filter(
        (obj) => obj.DistrictName === district && obj?.TalukName === taluk
      );
    }
    // filter rural/urban and district and taluka
    if (district && taluk && panchayat) {
      filterData = filterData.filter(
        (obj) =>
          obj.DistrictName === district &&
          obj?.TalukName === taluk &&
          obj?.GramPanchayatName === panchayat
      );
    }
    // filter rural/urban and district and taluka
    if (district && taluk && panchayat && village) {
      filterData = filterData.filter(
        (obj) =>
          obj.DistrictName === district &&
          obj?.TalukName === taluk &&
          obj?.GramPanchayatName === panchayat &&
          obj?.GramPanchayatName === village
      );
    }
    setCopyOriginalData(filterData);
  }, [district, taluk, panchayat]);

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
    setTaluk("");
    setPanchayat("");
    setVillage("");
  };

  const handleCLickModify = async (obj: any, title: string) => {
    setFormData(obj);
    setEditForm(true);
    setModalTitle(title);
  };

  const handleCLickAdd = async () => {
    if (!district || !taluk || !panchayat || !village)
      return alert("Select Fields.");
    let find: any = originalData.find(
      (obj) =>
        obj.DistrictName == district &&
        obj.TalukName === taluk &&
        obj.GramPanchayatName == panchayat &&
        obj.VillageName === village
    );
    delete find?.Name;
    delete find?.Mobile;
    setFormData(find);
    setAddForm(true);
    setModalTitle("Add");
  };

  const handleSubmitForm = async (values: any) => {
    let res = await postRequest("addToSurveyUser", values);
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
      <VillageModal
        show={addForm}
        title={modalTitle}
        formData={formData}
        handleSubmitForm={handleSubmitForm}
        onHide={() => setAddForm(false)}
      />
    );
  };

  const rednerEditForm = () => {
    return (
      <ResuableModal
        show={editForm}
        title={modalTitle}
        isRoleSelectOption={true}
        isType={"rural"}
        formData={editFormData}
        handleSubmitForm={handleSubmitForm}
        onHide={() => setEditForm(false)}
      />
    );
  };

  const filteredData = (currentItems || []).filter((item) => {
    return (
      item?.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.DistrictName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.CreatedMobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.TalukName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.VillageName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.GramPanchayatName?.toLowerCase().includes(
        searchTerm.toLowerCase()
      ) ||
      item?.CreatedRole?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.CreatedMobile?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDistrictSelect = (value: string) => {
    if (district !== value) {
      setDistrict(value);
      setTaluk("");
      setPanchayat("");
      setVillage("");
      let talukSelect: any = Array.from(
        new Set(
          originalData
            .filter((obj) => obj.DistrictName === value)
            .map((obj) => obj.TalukName)
        )
      );
      setTalukDropDown(talukSelect);
    }
  };

  const handleTalukSelect = (value: string) => {
    if (taluk !== value) {
      setTaluk(value);
      setPanchayat("");
      setVillage("");
      let gpSelect: any = Array.from(
        new Set(
          originalData
            .filter((obj) => obj.TalukName === value)
            .map((obj) => obj.GramPanchayatName)
        )
      );
      setGpDropDown(gpSelect);
    }
  };

  const handleGpSelect = (value: string) => {
    if (panchayat !== value) {
      setPanchayat(value);
      setVillage("");
      let villagesData: any = Array.from(
        new Set(
          originalData
            .filter(
              (obj) =>
                obj.TalukName === taluk && obj.GramPanchayatName === value
            )
            .map((obj) => obj.VillageName)
        )
      );
      setVillageDropDown(villagesData);
    }
  };

  const Columns = [
    {
      label: "Role",
      key: "Role",
      sorting: true,
    },
    {
      label: "Name",
      key: "Name",
      sorting: true,
    },
    {
      label: "Mobile",
      key: "Mobile",
      sorting: true,
    },
    {
      label: "AssignedCount",
      key: "count",
      sorting: true,
    },
    {
      label: "District",
      key: "DistrictName",
      sorting: true,
    },
    {
      label: "Taluk",
      key: "TalukName",
      sorting: true,
    },
    {
      label: "GramaPanchayat",
      key: "GramaPanchayat",
      sorting: true,
    },
    {
      label: "Village",
      key: "VillageName",
      sorting: true,
    },
    {
      label: "Action",
      key: "Action",
      sorting: false,
    },
  ];

  return (
    <React.Fragment>
      <SpinnerLoader isLoading={isLoading} />
      {addForm && rednerForm()}
      {editForm && rednerEditForm()}
      <Titlebar
        title={`Village Assignment`}
        Component={
          <AvatarDropdown
            dropDown={[{ routeName: "DashBoard", routePath: "/Dashboard" }]}
            username={"Gp Officer"}
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
              value={district}
            />
          </Col>
          <Col md={3} sm={6}>
            <SelectInput
              defaultSelect="Select Taluk"
              options={talukDropDown}
              onChange={(e) => handleTalukSelect(e.target.value)}
              value={taluk}
            />
          </Col>
          <Col md={3} sm={6}>
            <SelectInput
              defaultSelect="Select Gp"
              options={gpDropDown}
              onChange={(e) => handleGpSelect(e.target.value)}
              value={panchayat}
            />
          </Col>
          <Col md={3} sm={6}>
            <SelectInput
              defaultSelect="Select Village"
              options={villageDropDown}
              onChange={(e) => setVillage(e.target.value)}
              value={village}
            />
          </Col>
          <Col md={3} sm={6}>
            <Button
              style={{ backgroundColor: "#13678C" }}
              onClick={handleCLickAdd}
            >
              Add User
            </Button>
          </Col>
          <Col md={3} sm={6}>
            <Button
              style={{ backgroundColor: "#13678C" }}
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
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
          <TableWithSorting
            columns={Columns}
            filteredData={filteredData}
            handleCLickModify={handleCLickModify}
          />
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
