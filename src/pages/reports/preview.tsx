import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextInput from "../../components/common/textInput";
import { Col, Image, Row } from "react-bootstrap";

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
              label="StudentId"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentName ?? ""}
              disabled={true}
              label="StudentName"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentClass ?? ""}
              disabled={true}
              label="StudentClass"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.Category ?? ""}
              disabled={true}
              label="Category"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.Standard ?? ""}
              disabled={true}
              label="Standard"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.SchoolName ?? ""}
              disabled={true}
              label="SchoolName"
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
              value={previewData?.ParentDob ?? ""}
              disabled={true}
              label="ParentDob"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentFinancial ?? ""}
              disabled={true}
              label="StudentFinancial"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentSocial ?? ""}
              disabled={true}
              label="StudentSocial"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentOther ?? ""}
              disabled={true}
              label="StudentOther"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentSpecialSupport ?? ""}
              disabled={true}
              label="StudentSpecialSupport"
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
              value={previewData?.ParentGender ?? ""}
              disabled={true}
              label="ParentGender"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentDisabilityType ?? ""}
              disabled={true}
              label="StudentDisabilityType"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentDisability ?? ""}
              disabled={true}
              label="StudentDisability"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentRelation ?? ""}
              disabled={true}
              label="StudentRelation"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentDob ?? ""}
              disabled={true}
              label="StudentDob"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentGender ?? ""}
              disabled={true}
              label="StudentGender"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.SchoolAddress ?? ""}
              disabled={true}
              label="SchoolAddress"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentLAS_Date ?? ""}
              disabled={true}
              label="StudentLAS_Date"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.StudentNotGoing ?? ""}
              disabled={true}
              label="StudentNotGoing"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.ParentMobile ?? ""}
              disabled={true}
              label="ParentMobile"
            />
          </Col>
          <Col md={3}>
            <TextInput
              value={previewData?.ApproveBy ?? ""}
              disabled={true}
              label="ApproveBy"
            />
          </Col>
          <Col md={3} className="flex flex-col mt-1">
            <div>StudentImage</div>
            <div className="border rounded-xl h-52">
              <Image
                src={`data:image/png;base64,${previewData.StudentImage}`}
                width={50}
                height={100}
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
