import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IModalFromEdit } from "../../../utilities/interfacesOrtype";
import { Form, Row } from "react-bootstrap";
import { useState } from "react";
import TextInputWithLabel from "../textInputWithLabel";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import {
  ROLES,
} from "../../../utilities/roles";

export default function DivisionModal({
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
    GpOfficerName: formData?.Name,
    GpOfficerMobile: formData?.Mobile,
    ...formData,
  });

  const [{ userRole, Mobile }] = IsAuthenticated();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.stopPropagation();
      let forApiBody = {
        GpOfficerName: stateData.GpOfficerName,
        GpOfficerMobile: stateData.GpOfficerMobile,
        DistrictCode: stateData?.DistrictCode,
        TalukCode: stateData?.TalukCode,
        GpOrWard: stateData?.GramPanchayatCode,
        CreatedRole: userRole,
        CreatedMobile: Mobile,
        ListType: "Gp",
        AssigningType: ROLES.DIVISION_OFFICER
      };
      handleSubmitForm(forApiBody);
    }
    setValidated(true);
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    if (name === "Name" || name === "GpOfficerName" && /^[a-zA-Z_0-9\s]*$/.test(value) === false) return;
    if (name === "Mobile" || name === "GpOfficerMobile" && value.length > 10) return;
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
              placeholder={"District Name"}
              value={stateData?.DistrictName || ""}
              disabled={true}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId={"validationCustom03"}
              placeholder={"Zone Name"}
              value={stateData?.TalukName || ""}
              disabled={true}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId={"validationCustom03"}
              placeholder={"Division Name"}
              value={stateData?.GramPanchayatCode || ""}
              disabled={true}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId={"validationCustom06"}
              placeholder={"Mobile"}
              name={"GpOfficerMobile"}
              type={"number"}
              value={stateData.GpOfficerMobile}
              maxLength={10}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId="validationCustom07"
              placeholder={"Name"}
              name={"GpOfficerName"}
              value={stateData.GpOfficerName}
              maxLength={50}
              onChange={handleInputChange}
            />
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
