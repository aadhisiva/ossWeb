import React from "react";
import { Col, Row } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ITitleBar } from "../../utilities/interfacesOrtype";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../redux/actions/userAction";
import { DASHBOARD } from "../../utilities/routePaths";
import { useNavigate } from "react-router-dom";
import { IsAuthenticated } from "../../Authentication/useAuth";

export default function Titlebar({ title, Component }: ITitleBar) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [{ loginRole, Role }] = IsAuthenticated();

  const handeClick = () => {
    dispatch(userLoggedOut());
  };
  const handleNavigate = () => {
    navigate(DASHBOARD);
  };
  return (
    <div className="h-8 bg-[#8CB8D3]">
      <Row className="w-full">
        <Col
          md={1}
          sm={2}
          xs={3}
          onClick={handleNavigate}
          className="cursor-pointer"
        >
          <p>
            <i className="bi bi-house-fill text-blue-600 text-xl"></i>
          </p>
        </Col>
        <Col md={7} sm={6} xs={3} className="text-xl">
          {title}
        </Col>
        <Col md={2} sm={2} xs={3} className="text-end text-black text-xl">
          <span>{loginRole || Role}</span>
        </Col>
        <Col
          md={2}
          sm={2}
          xs={3}
          className="text-xl text-end cursor-pointer text-black flex justify-end"
        >
          {Component}
        </Col>
      </Row>
    </div>
  );
}
