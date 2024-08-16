import { Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DASHBOARD } from "../utilities/routePaths";

export default function Header({ userRole }: { userRole: string }) {
  const navigate = useNavigate();


  return (
    <div className="bg-[#124F8C] sticky z-1 top-0">
      <Row className="h-14 w-full items-center">
        <Col
          md={2}
          xs={4}
          className="text-left"
          onClick={() => navigate(DASHBOARD)}
        >
          <Image
            className="ml-3"
            width={60}
            height={60}
            src={require("../assets/Images/karnataka.png")}
          />
        </Col>
        <Col md={8} xs={6} className="text-white text-center text-xl">
          OUT OF SCHOOL SURVEY
        </Col>
        <Col md={2} xs={2} className="text-end">
          <span className="text-sm text-white">{userRole}</span>
        </Col>
      </Row>
    </div>
  );
}
