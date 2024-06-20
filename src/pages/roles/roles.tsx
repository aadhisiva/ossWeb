import { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Form } from "react-bootstrap";
import { CustomTable } from "../../components/common/customTable";
import { postRequest } from "../../Authentication/axiosrequest";
import RoleDashboard from ".";
import TextInputWithLabel from "../../components/common/textInputWithLabel";
import SelectInputWithLabel from "../../components/common/selectInputWithLabel";

export default function ChildRoles() {
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<any[]>([]);
  const [rolesData, setRolesData] = useState<any[]>([]);

  const [validated, setValidated] = useState<any>(false);
  const [formData, setFormData] = useState<any>(false);
  const [stateData, setStateData] = useState<any>({
    IsLastStage: "",
    RoleId: "",
    ChildRole: "",
  });

  const [isShowForm, setShowForm] = useState(false);

  useEffect(() => {
    getAllMaster();
  }, []);

  // assign initial data
  const getAllMaster = async () => {
    let res = await postRequest("roleAssignment", {
      DataType: "",
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
    { accessor: "ChildRole", label: "ChildRole" },
    { accessor: "IsLastStage", label: "IsLastStage" },
    { accessor: "Action", label: "Action" },
  ];

  const handleClickAdd = () => {
    setStateData({})
    setValidated(false);
    setShowForm(!isShowForm);
  };

  const handleDelete = async (obj: any) => {
    await postRequest("deleteRoles", { DataType: "", id: obj?.id });
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
        IsLastStage: stateData.IsLastStage,
        RoleId: stateData?.RoleId,
        Child: stateData?.ChildRole,
      };
      await postRequest("AssignRoles", {
        DataType: "",
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
                defaultSelect="Parent Role"
                isValueAdded={true}
                options={rolesData.map((obj: any) => {
                  return { role: obj.Role, value: obj.id };
                })}
                name={"RoleId"}
                value={stateData.RoleId ?? ""}
                onChange={handleInputChange}
              />
              <SelectInputWithLabel
                required={true}
                defaultSelect="Child Role"
                isValueAdded={true}
                options={rolesData.map((obj: any) => {
                  return { role: obj.Role, value: obj.id };
                })}
                name={"ChildRole"}
                value={stateData.ChildRole ?? ""}
                onChange={handleInputChange}
              />
              <SelectInputWithLabel
                required={true}
                defaultSelect="IsLastStage"
                options={["Yes", "No"]}
                name={"IsLastStage"}
                value={stateData.IsLastStage ?? ""}
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
