import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Form, Col } from "react-bootstrap";
import { CustomTable } from "../../components/common/customTable";
import { postRequest } from "../../Authentication/axiosrequest";
import RoleDashboard from ".";
import TextInputWithLabel from "../../components/common/textInputWithLabel";
import SelectInputWithLabel from "../../components/common/selectInputWithLabel";

export default function Hierarchy() {
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<any[]>([]);

  const [validated, setValidated] = useState<any>(false);
  const [formData, setFormData] = useState<any>(false);
  const [stateData, setStateData] = useState<any>({
    Role: "",
    ParentId: "",
  });

  const [isShowForm, setShowForm] = useState(false);

  useEffect(() => {
    getAllMaster();
  }, []);

  // assign initial data
  const getAllMaster = async () => {
    let res = await postRequest("roleAssignment", {
      DataType: "role",
    });
    if (res?.code === 200) {
      setOriginalData(res?.data);
      setCopyOriginalData(res?.data);
    } else {
      alert(res?.response?.data?.message || "Please try again.");
    }
  };

  const columns = [
    { accessor: "Role", label: "Role" },
    // { accessor: "ParentRole", label: "ParentRole" },
    { accessor: "Action", label: "Action" },
  ];

  const handleClickAdd = () => {
    setStateData({})
    setValidated(false);
    setShowForm(!isShowForm);
  };

  const handleDelete = async (obj: any) => {
    await postRequest("deleteRoles", { DataType: "role", id: obj?.id });
    await getAllMaster();
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    if (name === "Role" && /^[a-zA-Z_0-9_/-\s]*$/.test(value) === false) return;
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
        ParentId: stateData.ParentId,
        Role: stateData?.Role,
      };
      await postRequest("AssignRoles", {
        DataType: "role",
        ...forApiBody,
      });
      setShowForm(!isShowForm);
      await getAllMaster();
    }
    setStateData({
      Role: "",
      ParentId: "",
    });
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
              <TextInputWithLabel
                controlId={"validationCustom08"}
                placeholder="Enter Role"
                name={"Role"}
                value={stateData?.Role ?? ""}
                onChange={handleInputChange}
              />
              <SelectInputWithLabel
                controlId={"validationCustom08"}
                required={true}
                defaultSelect="Select Roles"
                isRoleSelect={true}
                options={originalData.map((obj: any) => {
                  return { role: obj.Role, value: obj.id };
                })}
                name={"ParentId"}
                value={stateData.ParentId}
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
