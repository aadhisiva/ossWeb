import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Row } from "react-bootstrap";
import { useState } from "react";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import { IModalFromEdit } from "../../../utilities/interfacesOrtype";
import TextInputWithLabel from "../textInputWithLabel";
import { ROLES, rolesMapping } from "../../../utilities/roles";
import SelectInputWithLabel from "../selectInputWithLabel";
import ResuableHeaders from "../resuableHeaders";

export default function GpModal({
  show,
  title,
  onHide,
  handleSubmitForm,
  formData,
}: IModalFromEdit) {
  const [validated, setValidated] = useState(false);
  const [stateData, setStateData] = useState({
    Name: "",
    Role: "",
    Mobile: "",
    ...formData,
  });

  const [{ userRole, Mobile, childRoles }] = IsAuthenticated();
  const [{HTaluk, HGp}] = ResuableHeaders();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.stopPropagation();
      let forApiBody = {
        Name: stateData?.Name ?? "",
        Mobile: stateData?.Mobile ?? "",
        DistrictCode: stateData?.DistrictCode ?? "",
        id: stateData?.id ?? "",
        RuralOrUrban: stateData.Type ?? "",
        TalukCode: stateData?.TalukCode ?? "",
        GpCode: stateData?.GramPanchayatCode ?? "",
        CreatedRole: userRole ?? "",
        CreatedMobile: Mobile ?? "",
        ListType: "Gp",
        RoleId: childRoles?.length > 1 ? childRoles.find((obj: any) => obj.ChildRole == stateData?.Role)?.RoleId :  childRoles[0]?.Child,
      };
      if (title === "Add") {
        delete forApiBody.id;
      }
      handleSubmitForm(forApiBody);
    }
    setValidated(true);
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    if (name === "Name"&& /^[a-zA-Z\s]*$/.test(value) === false) return;
    if (name === "Mobile" && value.length > 10) return;
    setStateData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex flex-col">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <TextInputWithLabel
              controlId={"validationCustom02"}
              placeholder={"Type"}
              value={stateData?.Type || ""}
              disabled={true}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId={"validationCustom02"}
              placeholder={"DistrictName"}
              value={stateData?.DistrictName || ""}
              disabled={true}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId={"validationCustom03"}
              placeholder={HTaluk}
              value={stateData?.TalukName || ""}
              disabled={true}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId={"validationCustom03"}
              placeholder={HGp}
              value={stateData?.GramPanchayatName || ""}
              disabled={true}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId={"validationCustom06"}
              placeholder={"Mobile"}
              name={"Mobile"}
              type={"number"}
              value={stateData?.Mobile ?? ""}
              maxLength={10}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId="validationCustom07"
              placeholder={"Name"}
              name={"Name"}
              value={stateData?.Name ?? ""}
              maxLength={50}
              onChange={handleInputChange}
            />
            {childRoles?.length > 1 ? 
            <SelectInputWithLabel
              controlId={"validationCustom08"}
              required={true}
              defaultSelect="Select Roles"
              isValueAdded={true}
              options={childRoles.map((obj: any) => { return {role: obj?.ChildRole, value: obj?.Child}})}
              name={"Role"}
              value={stateData.Role}
              onChange={handleInputChange}
            /> : ("")}
          </Row>
          <Modal.Footer>
            <Button type="submit">Submit</Button>
            <Button onClick={onHide}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
