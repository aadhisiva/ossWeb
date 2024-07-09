import React from "react";
import { Col, Image, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <div className="h-10 w-screen fixed bottom-0 bg-[#124F8C]">
      <Row className="h-10 flex items-center justify-center w-full">
        <Col className="text-center text-sm text-white flex flex-row justify-center">
          Government of Karnataka 2024, <br />
          Directorate Of EDCS Developed By Mobile One
          <Image
            className="h-10 w-10"
            src={require("../assets/Images/m1-T.png")}
            alt="M1 Logo"
          />
        </Col>
      </Row>
    </div>
  );
}
