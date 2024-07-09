import React, { useEffect, useState } from "react";
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
import {
  ASSIGNMENT,
  reportsAssignment,
  roleArrangeMent,
  routingWithBasedOnRole,
} from "../../utilities/roles";
import "../float.css";
import { postRequest } from "../../Authentication/axiosrequest";
import { SEARCH_REPORTS } from "../../utilities/routePaths";
import SpinnerLoader from "../../components/common/spinner/spinner";

function Dasbboard() {
  const [originalData, setOriginalData] = useState<any>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  const [{ accessOfMasters, userRole, userCodes }] = IsAuthenticated();

  const checkDataType =
    accessOfMasters[0]?.District == "Yes"
      ? ASSIGNMENT.DISTRICT
      : accessOfMasters[0]?.TalukorZone == "Yes"
      ? ASSIGNMENT.TALUK
      : accessOfMasters[0]?.GpOrPhc == "Yes"
      ? ASSIGNMENT.GET_GP
      : accessOfMasters[0]?.VllageOrWard == "Yes"
      ? ASSIGNMENT.VILLAGE
      : "";

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    setLoading(true);
    let apiRes = await postRequest("getCounts", {
      LoginType: checkDataType,
      TypeOfData: accessOfMasters[0]?.TypeOfData,
      Codes: userCodes,
    });
    if (apiRes?.code == 200) {
      setLoading(false);
      setOriginalData(apiRes?.data);
    } else {
      setLoading(false);
      alert(apiRes?.response?.data?.message || "Please try again.");
    }
  };

  const handleAssignRouting = () => {
    let getPagePath = roleArrangeMent(accessOfMasters, userRole);
    navigate(getPagePath.dropDown[0]?.routePath);
  };

  const handleReportsRouting = () => {
    let getPagePath = reportsAssignment(accessOfMasters, userRole);
    navigate(getPagePath.dropDown[0]?.routePath);
  };

  return (
    <React.Fragment>
      <SpinnerLoader isLoading={isLoading} />
      <Titlebar
        title={"DashBoard"}
        Component={
          <AvatarDropdown {...roleArrangeMent(accessOfMasters, userRole)} />
        }
      />
      <a
        onClick={() => navigate("/ChildRoles")}
        className="float cursor-pointer"
      >
        <i className="my-float">Assign</i>
      </a>
      <div className="m-16 mt-2">
        <Row>
          <Col className="text-right text-blue-600" md={12}>
            {`Welcome, ${userRole}`}
          </Col>
        </Row>
        <Row className="flex ml-12 mb-0">
          <Col
            md={2}
            style={{ borderRadius: "10px 10px 0 0" }}
            className="border border-solid border-b-0 border-black bg-black text-white"
          >
            Statistics
          </Col>
        </Row>
        <Row className="flex flex-row justify-evenly border border-solid border-gray-800 gap-y-4 rounded-b-lg rounded-r-lg mt-0 p-3 mb-3">
          <Col
            md={2}
            className="border justify-center items-center text-center border-gray-800 bg-[#ffc107] rounded-xl flex h-32 text-xl"
          >
            {`Total : ${originalData[0]?.TotalCount || 0}`}
          </Col>
          <Col
            md={2}
            className="border justify-center items-center text-center border-gray-800 bg-[#17a2b8] rounded-xl flex h-32  text-xl"
          >
            {`Verified : ${originalData[0]?.Verified || 0}`}
          </Col>
          <Col
            md={2}
            className="border justify-center items-center text-center border-gray-800 bg-[#fd7e14] rounded-xl flex h-32  text-xl"
          >
            {`Pending : ${originalData[0]?.Pending || 0}`}
          </Col>
        </Row>

        <Row className="flex ml-12 mb-0">
          <Col
            md={2}
            style={{ borderRadius: "10px 10px 0 0" }}
            className="border border-solid border-b-0 border-black bg-black text-white"
          >
            Assignment & Reports
          </Col>
        </Row>
        <Row className="flex flex-row justify-evenly border border-solid border-gray-800 gap-y-4 rounded-b-lg rounded-r-lg mt-0 p-3">
          {accessOfMasters[0]?.Department !== "Education" && (
            <Col
              md={2}
              className="border justify-center items-center text-center border-gray-800 bg-[#007bff] rounded-xl flex h-32  text-xl"
              onClick={handleAssignRouting}
            >
              Assignment
            </Col>
          )}
          <Col
            md={2}
            className="border justify-center items-center text-center border-gray-800 bg-[#28a745] rounded-xl flex h-32  text-xl"
            onClick={handleReportsRouting}
          >
            Reports
          </Col>
          <Col
            md={2}
            className="border justify-center items-center text-center border-gray-800 bg-[#6f42c1] rounded-xl flex h-32  text-xl"
            onClick={() => navigate(SEARCH_REPORTS)}
          >
            Search Reports
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default Dasbboard;
