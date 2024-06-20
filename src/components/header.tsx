import { Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DASHBOARD } from "../utilities/routePaths";

export default function Header({ userRole }: { userRole: string }) {
  const navigate = useNavigate();


  return (
    <div className="bg-[#124F8C] sticky z-1 top-0">
      <Row className="h-12 w-full items-center">
        <Col
          md={2}
          xs={4}
          className="text-left"
          onClick={() => navigate(DASHBOARD)}
        >
          <Image
            className="ml-3"
            width={50}
            height={50}
            src={require("../assests/Images/karnataka.png")}
          />
        </Col>
        <Col md={8} xs={6} className="text-white text-center text-base">
          Out Of School Survey
        </Col>
        <Col md={2} xs={2} className="text-end">
          <span className="text-sm text-white">{userRole}</span>
        </Col>
      </Row>
    </div>
  );
}
