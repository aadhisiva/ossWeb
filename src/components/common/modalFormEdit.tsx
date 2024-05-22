// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { IModalFromEdit } from "../../utilities/interfacesOrtype";
// import { Form, Row } from "react-bootstrap";
// import { useState } from "react";
// import SelectInput from "./selectInput";
// import TextInput from "./textInput";
// import TextInputWithLabel from "./textInputWithLabel";
// import SelectInputWithLabel from "./selectInputWithLabel";
// import { IsAuthenticated } from "../../Authentication/useAuth";
// import { DISTRICT_ROLES, PHC_ROLES, TALUK_ROLES } from "../../utilities/roles";

// export default function ModalFormEdit({
//   show,
//   title,
//   onHide,
//   handleSubmitForm,
//   saveType,
//   formData,
// }: IModalFromEdit) {
//   const [validated, setValidated] = useState(false);

//   const [stateData, setStateData] = useState({
//     Name: "",
//     Role: "",
//     Mobile: "",
//     ...formData,
//   });

//   const [{ Role, loginRole, Mobile }] = IsAuthenticated();

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const form = event.currentTarget;
//     if (form.checkValidity() === true) {
//       event.stopPropagation();
//         let forApiBody = {
//           Name: stateData.Name,
//           Mobile: stateData.Mobile,
//           Role: stateData.Role || Role,
//           type: saveType,
//           SubCenterCode: stateData.SubCenterCode,
//           Type: stateData?.Type,
//           CreatedBy: loginRole,
//           CreatedMobile: Mobile,
//           UserId: stateData?.UserId
//         };
//         handleSubmitForm(forApiBody);
//     };
//     setValidated(true);
//   };

//   const handleInputChange = (e: React.ChangeEvent<any>) =>{
//     const { name, value } = e.target;
//     if(name === "Name" && /^[a-zA-Z\s]*$/.test(value) === false) return;
//     if(name === "Mobile" && value.length > 10) return;
//     setStateData((prev:any) => ({
//         ...prev,
//         [name]: value
//     }))
//   }
//   console.log("loginRole",loginRole)

//   const renderRoles = () => {

//     if(loginRole === DISTRICT_ROLES.WCD || loginRole === TALUK_ROLES.CDPO || loginRole === PHC_ROLES.SuperVisor){
//       return [{role: "AWW", valule: "AWW"}];
//     } else if(loginRole === DISTRICT_ROLES.DHO || loginRole === TALUK_ROLES.THO || loginRole === PHC_ROLES.PHCO){
//       return [{role: "Asha Worker", value:"Asha Worker"}];
//     } else if(loginRole === DISTRICT_ROLES.RDPR || loginRole === TALUK_ROLES.EO || loginRole === PHC_ROLES.PDO){
//       return [{role:"GP Assistant", value: "GP Assistant"}];
//     } else if(loginRole === DISTRICT_ROLES.DUDC || loginRole === TALUK_ROLES.CMC_TMC_TPC || loginRole === PHC_ROLES.CAO_CO){
//       return [{role:"CTP Assistant", value: "CTP Assistant"}];
//     } else if(loginRole === DISTRICT_ROLES.BBMP || loginRole === TALUK_ROLES.ZON_IC || loginRole === PHC_ROLES.DIVISON_IN){
//       return [{role:"Urban Surveyor", value: "Urban Surveyor"}];
//     } else {
//       let type = stateData?.Type;
//         return type === "Rural"
//           ? [{role: "Asha Worker", value:"Asha Worker"}, {role: "AWW", valule: "AWW"}]
//           : [
//             {role: "Asha Worker", value:"Asha Worker"}, 
//             {role:"Urban Surveyor", value: "Urban Surveyor"},
//             {role:"GP Assistant", value: "GP Assistant"},
//             {role:"CTP Assistant", value: "CTP Assistant"},
//             {role: "AWW", valule: "AWW"},
//           ]
//     }
//   };

//   return (
//     <Modal
//       show={show}
//       onHide={onHide}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body className="flex flex-col">
//         <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <Row>
//             <TextInputWithLabel
//               controlId={"validationCustom01"}
//               placeholder={"Type"}
//               value={stateData?.Type}
//               disabled={true}
//               onChange={handleInputChange}
//             />
//             <TextInputWithLabel
//               controlId={"validationCustom02"}
//               placeholder={"DistrictName"}
//               value={stateData?.DistrictName || ""}
//               disabled={true}
//               onChange={handleInputChange}
//             />
//             <TextInputWithLabel
//               controlId={"validationCustom03"}
//               placeholder={"TalukOrTownName"}
//               value={stateData?.TalukOrTownName || ""}
//               disabled={true}
//               onChange={handleInputChange}
//             />
//             <TextInputWithLabel
//               controlId={"validationCustom04"}
//               placeholder={"PHCName"}
//               value={stateData?.PHCName || ""}
//               disabled={true}
//               onChange={handleInputChange}
//             />
//             <TextInputWithLabel
//               controlId={"validationCustom05"}
//               placeholder={"SubCenterName"}
//               value={stateData?.SubCenterName || ""}
//               disabled={true}
//               onChange={handleInputChange}
//             />
//             <TextInputWithLabel
//               controlId={"validationCustom06"}
//               placeholder={"Mobile"}
//               name={"Mobile"}
//               type={"number"}
//               value={stateData.Mobile}
//               maxLength={10}
//               onChange={handleInputChange}
//             />
//             <TextInputWithLabel
//               controlId="validationCustom07"
//               placeholder={"Name"}
//               name={"Name"}
//               value={stateData.Name}
//               maxLength={50}
//               onChange={handleInputChange}
//             />
//             <SelectInputWithLabel
//               controlId={"validationCustom08"}
//               defaultSelect="Select Roles"
//               required={true}
//               options={renderRoles()}
//               name={"Role"}
//               isValueAdded={true}
//               value={stateData.Role}
//               onChange={handleInputChange}
//             />
//           </Row>
//           <Modal.Footer>
//             <Button type="submit">Submit</Button>
//             <Button onClick={onHide}>Close</Button>
//           </Modal.Footer>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// }
import React from 'react'

export default function modalFormEdit() {
  return (
    <div>
      fsd
    </div>
  )
}
