import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextInput from "../../components/common/textInput";
import { Col, Form, Image, Row } from "react-bootstrap";

interface PreviewModalProps {
  show?: boolean;
  handleClose?: any;
  previewData?: any;
}

export default function PreviewModal({
  show,
  handleClose,
  previewData = {},
}: PreviewModalProps) {
  return (
    <Modal
      size="xl"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="flex flex-row">
        <Col md={3}>
            <TextInput
              value={previewData?.SurveyMode ?? ""}
              disabled={true}
              label="SurveyMode"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentId ?? ""}
              disabled={true}
              label="SATS Id"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentName ?? ""}
              disabled={true}
              label="Student Name"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentClass ?? ""}
              disabled={true}
              label="Student Class"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.ParentCategory ?? ""}
              disabled={true}
              label="Category"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.SchoolName ?? ""}
              disabled={true}
              label="School Name"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.CreatedDate ?? ""}
              disabled={true}
              label="CreatedDate"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentDob ?? ""}
              disabled={true}
              label="Student Date of Birth"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentNotGoing ?? ""}
              disabled={true}
              label="Student Not Going"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentFinancial ?? ""}
              disabled={true}
              label="Financial Reason"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentSocial ?? ""}
              disabled={true}
              label="Social Reason"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentOther ?? ""}
              disabled={true}
              label="Other Reason"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentMedical ?? ""}
              disabled={true}
              label="Medical Reason"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentSpecialSupport ?? ""}
              disabled={true}
              label="Special Support Required"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.Status ?? ""}
              disabled={true}
              label="Status"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentGender ?? ""}
              disabled={true}
              label="Student Gender"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentDisabilityType ?? ""}
              disabled={true}
              label="Student Disability Type"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentDisability ?? ""}
              disabled={true}
              label="Student Disability"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentRelation ?? ""}
              disabled={true}
              label="Student Relation with HOF"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.SchoolAddress ?? ""}
              disabled={true}
              label="School Address"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentLAS_Date ?? ""}
              disabled={true}
              label="Student Last Date in School"
            />
          </Col>
          
          <Col md={3}>
            <TextInput
              value={previewData?.ParentMobile ?? ""}
              disabled={true}
              label="Parent Mobile"
            />
          </Col>      
          <Col md={3}>
            <TextInput
              value={previewData?.StudentMigratedDate ?? ""}
              disabled={true}
              label="Student Migration dDate"
            />
          </Col>        
          <Col md={3}>
            <TextInput
              value={previewData?.StudentMigratedFrom ?? ""}
              disabled={true}
              label="Student Migration From"
            />
          </Col>
          {/* sd */}
          <Col md={3}>
            <TextInput
              value={previewData?.ParentGovtIdType ?? ""}
              disabled={true}
              label="Parent Govt Id Type"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.ParentGovtIdNo ?? ""}
              disabled={true}
              label="Parent Govt Id No"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentAge ?? ""}
              disabled={true}
              label="Student Age"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.ParentMotherTongue ?? ""}
              disabled={true}
              label="Parent Mother Tongue"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.SchoolManagementType ?? ""}
              disabled={true}
              label="School ManageMent Type"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentStayHostel ?? ""}
              disabled={true}
              label="Student Stay Hostel"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentFoundArea ?? ""}
              disabled={true}
              label="Student Found Area"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentFoundAreaType ?? ""}
              disabled={true}
              label="Student Found Area Type"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentMigratedType ?? ""}
              disabled={true}
              label="Student Migrated Type"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentMigratedState ?? ""}
              disabled={true}
              label="Student Migrated State"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentMigratedDistrict ?? ""}
              disabled={true}
              label="Student Migrated District"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentMigratedCountry ?? ""}
              disabled={true}
              label="Student Migrated Country"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentMigratedToAddress ?? ""}
              disabled={true}
              label="Student Migrated To Address"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentDropoutCount ?? ""}
              disabled={true}
              label="Student Droupout Count"
            />
          </Col>
          
          {/* hdf */}
          <Col md={3}>
            <TextInput
              value={previewData?.ApproveBy ?? ""}
              disabled={true}
              label="Approve"
            />
          </Col>
          <Col md={3} className="mt-3">
          <Form.Group as={Col} controlId="validationCustom01">
            <Form.Label>Enter Remark</Form.Label>
            <Form.Control
              required
              as="textarea"
              value={previewData?.Remarks ?? ""}
              disabled
              rows={4}
            />
          </Form.Group>
          </Col>
          <Col md={3} className="flex flex-col justify-center items-center mt-3">
            <div>StudentImage</div>
            <div className="border rounded-xl items-center">
              <Image
                src={`data:image/png;base64,${previewData.StudentImage}`}
                height={100}
                width={150}
              />
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}