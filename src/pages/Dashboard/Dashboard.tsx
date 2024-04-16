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

function Dasbboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [{userRole}] = IsAuthenticated();
  const [auth] = IsAuthenticated();

  const onRouteChange = (path: string) => {
    navigate(`/District/${path}`);
    dispatch(saveuserPath(path));
  };

  return (
    <React.Fragment>
      <Titlebar
        title={"DashBoard"}
        Component={
          <AvatarDropdown
          {...roleArrangeMent(userRole)}
          />
        }
      />
       <div className="houseHoldBox">
        <span className="houseHoldText">
          HouseHold
        </span>
      </div>
      <div className="parentOdCircles">
        <div className="dashBoardPage">
          <HalfDonutCircle
            onClick={() => onRouteChange("UnAssigned")}
            title={"Unassigned"}
          />
          <HalfDonutCircle
            onClick={() => onRouteChange("Scheduled")}
            title={"scheduled"}
          />
          <HalfDonutCircle
            onClick={() => onRouteChange("Completed")}
            title={"Completed"}
          />
        </div>
        <div className="dashBoardPage">
          <HalfDonutCircle
            onClick={() => onRouteChange("StudentsComplpeted")}
            title={"Students Complpeted"}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dasbboard;
