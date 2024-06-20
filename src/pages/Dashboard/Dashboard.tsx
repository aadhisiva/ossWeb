import React from "react";
import Reviewsbar from "../../components/common/Reviewbars";
import "./dashBoard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveuserPath } from "../../redux/actions/userPaths";
import Titlebar from "../../components/common/titlebar";
import { AvatarDropdown } from "../../components/common/menuDropDown";
import HalfDonutCircle from "../../components/common/Reviewbars";
import { Col, Container, Row } from "react-bootstrap";
import { IsAuthenticated } from "../../Authentication/useAuth";
import { roleArrangeMent } from "../../utilities/roles";
import "../float.css";

function Dasbboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [{ accessOfMasters, userRole }] = IsAuthenticated();

  const onRouteChange = (path: string) => {
    navigate(`/District/${path}`);
    dispatch(saveuserPath(path));
  };

  return (
    <React.Fragment>
      <Titlebar
        title={"DashBoard"}
        Component={<AvatarDropdown {...roleArrangeMent(accessOfMasters, userRole)} />}
      />
      <a
        onClick={() => navigate("/ChildRoles")}
        className="float cursor-pointer"
      >
        <i className="my-float">Assign</i>
      </a>
      <div className="houseHoldBox">
        <span className="houseHoldText">HouseHold</span>
      </div>
      <div className="parentOdCircles">
        <div className="dashBoardPage">
          <HalfDonutCircle
            onClick={() => onRouteChange("UnAssigned")}
            title={"Unassigned"}
            percentage={30}
          />
          <HalfDonutCircle
            onClick={() => onRouteChange("Scheduled")}
            title={"scheduled"}
            percentage={30}
          />
          <HalfDonutCircle
            onClick={() => onRouteChange("Completed")}
            title={"Completed"}
            percentage={30}
          />
        </div>
        <div className="dashBoardPage">
          <HalfDonutCircle
            onClick={() => onRouteChange("StudentsComplpeted")}
            title={"Students Complpeted"}
            percentage={30}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dasbboard;
