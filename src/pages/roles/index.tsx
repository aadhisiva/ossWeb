import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function RoleDashboard() {
    return (
        <Row className='border rounded-lg bg-[#c0c8c0] text-xl'>
            <Col md={4} className="text-center">
                <NavLink to={"/Hierarchy"}>Roles</NavLink>
            </Col>
            <Col md={4} className="text-center">
                <NavLink to={"/ChildRoles"}>Assigning Roles</NavLink>
            </Col>
            <Col md={4} className="text-center">
                <NavLink to={"/Access"}>Role Access</NavLink>
            </Col>
        </Row>
    )
}
