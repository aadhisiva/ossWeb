import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Form, Col } from "react-bootstrap";
import { CustomTable } from "../../components/common/customTable";
import { postRequest } from "../../Authentication/axiosrequest";
import RoleDashboard from ".";
import SelectInputWithLabel from "../../components/common/selectInputWithLabel";

export default function Access() {
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<any[]>([]);
  const [rolesData, setRolesData] = useState<any[]>([]);

  const [validated, setValidated] = useState<any>(false);
  const [stateData, setStateData] = useState({
    RoleId: "",
    District: "",
    TalukorZone: "",
    GpOrPhc: "",
    VllageOrWard: "",
    TypeOfData: "",
  });

  const [isShowForm, setShowForm] = useState(false);

  useEffect(() => {
    getAllMaster();
  }, []);

  // assign initial data
  const getAllMaster = async () => {
    let res = await postRequest("roleAssignment", {
      DataType: "access",
    });
    let resOfRoles = await postRequest("roleAssignment", {
      DataType: "role",
    });
    if (res?.code === 200) {
      setOriginalData(res?.data);
      setCopyOriginalData(res?.data);
      setRolesData(resOfRoles?.data);
    } else {
      alert(res?.response?.data?.message || "Please try again.");
    }
  };
  const columns = [
    { accessor: "Role", label: "Role" },
    { accessor: "District", label: "District" },
    { accessor: "TalukorZone", label: "TalukorZone" },
    { accessor: "GpOrPhc", label: "GpOrPhc" },
    { accessor: "VllageOrWard", label: "VllageOrWard" },
    { accessor: "TypeOfData", label: "TypeOfData" },
    { accessor: "Action", label: "Action" },
  ];

  const handleClickAdd = () => {
    setShowForm(!isShowForm);
  };

  const handleDelete = async (obj: any) => {
    await postRequest("deleteRoles", { DataType: "access", id: obj?.id });
    await getAllMaster();
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setStateData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      e.stopPropagation();
      let forApiBody = {
        RoleId: stateData?.RoleId ?? "",
        District: stateData?.District ?? "",
        TalukorZone: stateData?.TalukorZone ?? "",
        GpOrPhc: stateData?.GpOrPhc ?? "",
        VllageOrWard: stateData?.VllageOrWard ?? "",
        TypeOfData: stateData?.TypeOfData ?? "",
      };
      await postRequest("AssignRoles", {
        DataType: "access",
        ...forApiBody,
      });
      setShowForm(!isShowForm);
      await getAllMaster();
    }
    setValidated(true);
  };
  const renderForm = () => {
    return (
      <Modal
        show={isShowForm}
        onHide={() => setShowForm(!isShowForm)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{"Add"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex flex-col">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <SelectInputWithLabel
                required={true}
                defaultSelect="Select Parent Role"
                isValueAdded={true}
                options={rolesData.map((obj: any) => {
                  return { role: obj.Role, value: obj.id };
                })}
                name={"RoleId"}
                value={stateData.RoleId}
                onChange={handleInputChange}
              />
              <SelectInputWithLabel
                required={true}
                defaultSelect="Select District Access"
                options={["Yes", "No"]}
                name={"District"}
                value={stateData.District}
                onChange={handleInputChange}
              />
              <SelectInputWithLabel
                required={true}
                defaultSelect="Select TalukorZone Access"
                options={["Yes", "No"]}
                name={"TalukorZone"}
                value={stateData.TalukorZone}
                onChange={handleInputChange}
              />
              <SelectInputWithLabel
                required={true}
                defaultSelect="Select GpOrPhc Access"
                options={["Yes", "No"]}
                name={"GpOrPhc"}
                value={stateData.GpOrPhc}
                onChange={handleInputChange}
              />
              <SelectInputWithLabel
                required={true}
                defaultSelect="Select VllageOrWard"
                options={["Yes", "No"]}
                name={"VllageOrWard"}
                value={stateData.VllageOrWard}
                onChange={handleInputChange}
              />
              <SelectInputWithLabel
                required={true}
                defaultSelect="Select TypeOfData"
                options={["Rural", "Urban", "BBMP"]}
                name={"TypeOfData"}
                value={stateData.TypeOfData}
                onChange={handleInputChange}
              />
            </Row>
            <Modal.Footer>
              <Button type="submit">Submit</Button>
              <Button onClick={() => setShowForm(!isShowForm)}>Close</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div>
      {isShowForm ? renderForm() : ""}
      <RoleDashboard />
      <Row></Row>
      <Row className="m-4">
        <Col md={12} className="text-end mb-4">
          <Button onClick={handleClickAdd}>Create New</Button>
        </Col>
        <CustomTable
          columns={columns}
          rows={originalData}
          handleCLickModify={handleDelete}
          title="Delete"
        />
      </Row>
    </div>
  );
}
