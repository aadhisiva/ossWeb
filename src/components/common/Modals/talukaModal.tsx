import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Row } from "react-bootstrap";
import { useState } from "react";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import { IModalFromEdit } from "../../../utilities/interfacesOrtype";
import TextInputWithLabel from "../textInputWithLabel";
import { ROLES } from "../../../utilities/roles";


export default function TalukModal({
  show,
  title,
  onHide,
  handleSubmitForm,
  formData,
  saveType
}: IModalFromEdit) {
  const [validated, setValidated] = useState(false);
  const [stateData, setStateData] = useState({
    TalukOfficerName: "",
    Role: "",
    TalukOfficerMobile: "",
    ...formData,
  });

  const [{ userRole, Mobile }] = IsAuthenticated();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.stopPropagation();
        let forApiBody = {
          TalukOfficerName: stateData.TalukOfficerName,
          TalukOfficerMobile: stateData.TalukOfficerMobile,
          TalukCode: stateData?.TalukCode,
          CreatedRole: userRole,
          CreatedMobile: Mobile,
          AssigningType: ROLES.TALUK_OFFICER
        };
        handleSubmitForm(forApiBody);
    };
    setValidated(true);
  };

  const handleInputChange = (e: React.ChangeEvent<any>) =>{
    const { name, value } = e.target;
    if(name === "Name" || name === "TalukOfficerName" && /^[a-zA-Z_0-9\s]*$/.test(value) === false) return;
    if(name === "Mobile" || name === "TalukOfficerMobile" && value.length > 10) return;
    setStateData((prev:any) => ({
        ...prev,
        [name]: value
    }))
  }

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
              placeholder={"DistrictName"}
              value={stateData?.DistrictName || ""}
              disabled={true}
              onChange={handleInputChange}
            />
              <TextInputWithLabel
                controlId={"validationCustom03"}
                placeholder={"TalukName"}
                value={stateData?.TalukName || ""}
                disabled={true}
                onChange={handleInputChange}
              />
            <TextInputWithLabel
              controlId={"validationCustom06"}
              placeholder={"Mobile"}
              name={"TalukOfficerMobile"}
              type={"number"}
              value={stateData.TalukOfficerMobile}
              maxLength={10}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId="validationCustom07"
              placeholder={"Name"}
              name={"TalukOfficerName"}
              value={stateData.TalukOfficerName}
              maxLength={50}
              onChange={handleInputChange}
            />
            {/* <SelectInputWithLabel
              controlId={"validationCustom08"}
              required={true}
              defaultSelect="Select Roles"
              options={renderRoles()}
              name={"Role"}
              value={stateData.Role}
              onChange={handleInputChange}
            /> */}
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
