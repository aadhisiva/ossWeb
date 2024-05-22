import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IMasterData, IModalFromEdit } from "../../../utilities/interfacesOrtype";
import { Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import TextInputWithLabel from "../textInputWithLabel";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import { ROLES } from "../../../utilities/roles";
import SelectInputWithLabel from "../selectInputWithLabel";

export default function ResuableModal({
  show,
  title,
  onHide,
  handleSubmitForm,
  formData,
  isType,
  isRoleSelectOption
}: IModalFromEdit) {
  const [validatedForms, setValidatedForms] = useState<number[]>([]);
  const [submittingIndex, setSubmittingIndex] = useState<number | null>(null);

  const initialData = formData.map((obj: any) => ({
    Mobile: obj?.Mobile,
    Name: obj?.Name,
    Role: obj?.Role,
    AssigningType: obj?.AssigningType
  }));
  const [stateData, setStateData] = useState(initialData);

  const [{ Mobile, userRole }] = IsAuthenticated();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, i:number) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
        let getData = formData[i];
      let newFormData: any = {
        Name: stateData[i].Name,
        Mobile: stateData[i].Mobile,
        AssigningType: stateData[i].AssigningType,
        CreatedRole: userRole,
        CreatedMobile: Mobile,
      };
      if(isRoleSelectOption){
        newFormData['Role'] = stateData[i].Role
      }
      let newData = {...getData, ...newFormData};
      handleSubmitForm(newData);
    }
    setSubmittingIndex(i+1);
    setValidatedForms((prev) => [...prev, i]);
  };
  
  const handleInputChange = (e: React.ChangeEvent<any>, i: number) => {
    const { name, value } = e.target;
       if (name === "Name" && /^[a-zA-Z_0-9\s]*$/.test(value) === false) return;
    if (name === "Mobile" && value?.length > 10) return;
    setStateData((prevState: any) => {
      const newStateData = [...prevState];
      newStateData[i] = {
        ...newStateData[i],
        [name]: value
      };
      return newStateData;
    });
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
        <Modal.Title id="contained-modal-title-vcenter">{"Modify"}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex flex-col">
        {(formData || []).map((obj: any, i:number) => (
          <Form 
            key={i} 
            noValidate 
            validated={(validatedForms.includes(i) && i !== submittingIndex) ? true : false} 
            onSubmit={(e) =>handleSubmit(e, i)}
            >
            <Row className="flex flex-row items-end justify-around">
              {i + 1}.
              {isRoleSelectOption && (
                    <SelectInputWithLabel
                    controlId={`validationCustom03_${i}`}
                    required={true}
                    defaultSelect="Select Roles"
                    options={isType == "rural" ? ["Enumerator"]: ["SHG"]}
                    name={"Role"}
                    value={stateData.Role}
                    onChange={(e) => handleInputChange(e, i)}
                  />
              )}
              <Col md={3}>
                <TextInputWithLabel
                  controlId={`validationCustom01_${i}`}
                  placeholder={"Mobile"}
                  name={`Mobile`}
                  value={stateData[i].Mobile || ""}
                  maxLength={10}
                  type={"number"}
                  onChange={(e) =>handleInputChange(e, i)}
                />
              </Col>
              <Col md={3}>
                <TextInputWithLabel
                  controlId={`validationCustom02_${i}`}
                  placeholder={"Name"}
                  name={`Name`}
                  value={stateData[i].Name || ""}
                  onChange={(e) =>handleInputChange(e, i)}
                />
              </Col>
              <Col md={3}>
                <Button type="submit">Modify</Button>
              </Col>
            </Row>
          </Form>
        ))}
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}
