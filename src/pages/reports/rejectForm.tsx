import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Form, Col } from "react-bootstrap";

interface PreviewModalProps {
  show?: boolean;
  handleClose?: any;
  childData?: any;
  handleRejectChild?: any;
}

export default function RejectModal({
  show,
  handleClose,
  childData = {},
  handleRejectChild
}: PreviewModalProps) {
  const [remark, setRemark] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
       handleRejectChild(remark, childData?.id);
    };
    setValidated(true);
  };
  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Rejecting - {childData.StudentName}</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Modal.Body>
        <Row className="flex flex-row">
          <Form.Group as={Col} controlId="validationCustom01">
            <Form.Label>Enter Remark</Form.Label>
            <Form.Control
              required
              as="textarea"
              placeholder="Hint :- add reamrks, provide detailed explaination why you want to reject this child.?"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              rows={5}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">Please Enter Remarks</Form.Control.Feedback>
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit" variant="success">
          Submit
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
}
