import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Row } from "react-bootstrap";
import { useState } from "react";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import { IModalFromEdit } from "../../../utilities/interfacesOrtype";
import TextInputWithLabel from "../textInputWithLabel";
import SelectInputWithLabel from "../selectInputWithLabel";

export default function ApprovalModal({
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
    GramPanchayatCode: "",
    ...formData,
  });

  const [{ userRole, Mobile, childRoles }] = IsAuthenticated();
 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.stopPropagation();
      let forApiBody = {
        Name: stateData.Name,
        Mobile: stateData.Mobile,
        DistrictCode: stateData?.DistrictCode,
        TalukCode: stateData?.TalukCode,
        id: stateData?.id,
        GpCode: stateData?.GramPanchayatCode+"_"+stateData?.VillageCode,
        GpName: stateData?.GramPanchayatCode,
        VillageCode: stateData?.VillageCode,
        CreatedRole: userRole ?? "",
        CreatedMobile: Mobile ?? "",
        RuralOrUrban: stateData?.Type ?? "",
        ListType: 'Gp',
        RoleId: childRoles?.length > 1 ? childRoles.find((obj: any) => obj.ChildRole == stateData?.Role)?.RoleId :  childRoles[0]?.Child
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
    if (name === "Name" && /^[a-zA-Z-_/\s]*$/.test(value) === false) return;
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
              placeholder={"District Name"}
              value={stateData?.DistrictName || ""}
              disabled={true}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId={"validationCustom03"}
              placeholder={"ULB"}
              value={stateData?.TalukName || ""}
              disabled={true}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId={"validationCustom03"}
              placeholder={"Village Naem"}
              value={stateData?.VillageName || ""}
              disabled={true}
              onChange={handleInputChange}
            />
              <SelectInputWithLabel
                controlId={"validationCustom08"}
                required={true}
                defaultSelect="Select ULB Ward"
                options={["RO", "RI", "ARO"]}
                name={"GramPanchayatCode"}
                value={stateData.GramPanchayatCode}
                onChange={handleInputChange}
                />
            <TextInputWithLabel
              controlId={"validationCustom06"}
              placeholder={"Mobile"}
              name={"Mobile"}
              type={"number"}
              value={stateData.Mobile}
              maxLength={10}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId="validationCustom07"
              placeholder={"Name"}
              name={"Name"}
              value={stateData.Name}
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
