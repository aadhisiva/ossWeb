import React, { useEffect, useState } from "react";
import {
  IMasterData,
  ISelectItemsListProps,
} from "../../utilities/interfacesOrtype";
import { postRequest } from "../../Authentication/axiosrequest";
import { ASSIGNMENT } from "../../utilities/roles";
import DistrictModal from "../../components/common/Modals/districtModal";
import ResuableModal from "../../components/common/Modals/selectOneRow";
import SpinnerLoader from "../../components/common/spinner/spinner";
import Titlebar from "../../components/common/titlebar";
import { AvatarDropdown } from "../../components/common/menuDropDown";
import { ResuableDropDownList } from "../../components/common/resuableDropDownList";
import { CustomTable } from "../../components/common/customTable";
import { Row } from "react-bootstrap";
import { IsAuthenticated } from "../../Authentication/useAuth";
import TalukModal from "../../components/common/Modals/talukaModal";
import GpModal from "../../components/common/Modals/gpModal";
import VillageModal from "../../components/common/Modals/villageModal";

export default function Village() {
  const [originalData, setOriginalData] = useState<IMasterData[]>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<IMasterData[]>([]);

  const [isLoading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [formData, setFormData] = useState<any>({});
  const [editFormData, setEditFormData] = useState([]);

  const [{ userCodes, accessOfMasters }] = IsAuthenticated();

  // assign initial data
  const getAllMaster = async () => {
    setLoading(true);
    let res = await postRequest("getMasterWithAssigned", {
      LoginType: ASSIGNMENT.VILLAGE,
      TypeOfData: accessOfMasters[0]?.TypeOfData,
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

  const handleCLickModify = async (obj: any, title: string) => {
    if (!obj?.DistrictCode) return alert("Provide DistrictCode");
    if (!obj?.TalukCode) return alert("Provide TalukCode.");
    if (!obj?.GramPanchayatCode) return alert("Provide GramPanchayatCode.");
    if (!obj?.VillageCode) return alert("Provide VillageCode.");
    if (obj.count < 1) return alert("You have to add user first.");
    let getData = await postRequest("getAllWithCode", {
      ListType: "User",
      DistrictCode: obj?.DistrictCode,
      TalukCode: obj?.TalukCode,
      GpOrWard: obj?.GramPanchayatCode,
      VillageCode: obj?.VillageCode
    });
    if (getData?.code == 200) {
      setEditFormData(getData?.data);
      setEditForm(true);
      setModalTitle(title);
    } else {
      alert(getData?.response?.data?.message || "Please try again.");
    }
  };

  const handleCLickAdd = async (selectedValues: ISelectItemsListProps) => {
    if (!selectedValues.district || !selectedValues.taluk)
      return alert("Select Fields.");
    let find = originalData.find(
      (obj: IMasterData) =>
        obj.Type == selectedValues.type &&
        obj.DistrictName == selectedValues.district &&
        obj.TalukName == selectedValues.taluk &&
        obj.GramPanchayatName == selectedValues.panchayat &&
        obj.VillageName == selectedValues.village 
    );
    delete find?.Name;
    delete find?.Mobile;
    setFormData(find);
    setAddForm(true);
    setModalTitle("Add");
  };

  const handleSubmitForm = async (values: any) => {
    let res = await postRequest("assignMentProcess", values);
    if (res.code === 200) {
      setAddForm(false);
      await getAllMaster();
    } else {
      setAddForm(false);
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
        formData={editFormData}
        handleSubmitForm={handleSubmitForm}
        onHide={() => setEditForm(false)}
      />
    );
  };

  const columns = [
    { accessor: "Mobile", label: "Mobile" },
    { accessor: "Role", label: "Role" },
    { accessor: "Name", label: "Name" },
    { accessor: "count", label: "AssignedCount" },
    { accessor: "Type", label: "Type" },
    { accessor: "DistrictName", label: "District" },
    { accessor: "TalukName", label: "Taluk" },
    { accessor: "GramPanchayatName", label: "Gp" },
    { accessor: "VillageName", label: "Village" },
    { accessor: "Action", label: "Action" }
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
            username={"Super Admin"}
          />
        }
      />
      <div>
        <ResuableDropDownList
          listType={4}
          handleClickAdd={handleCLickAdd}
          setCopyOriginalData={setCopyOriginalData}
          originalData={originalData}
        />
        <Row className="m-4">
          <CustomTable
            columns={columns}
            rows={copyOfOriginalData}
            handleCLickModify={handleCLickModify}
          />
        </Row>
      </div>
    </React.Fragment>
  );
}
