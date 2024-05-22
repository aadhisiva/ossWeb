import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  ASSIGNMENT_DISTRICT,
  ASSIGNMENT_DIVISION,
  ASSIGNMENT_GP,
  ASSIGNMENT_SURVEYOR,
  ASSIGNMENT_TALUK,
  ASSIGNMENT_WARD,
  ASSIGNMENT_ZONE,
  DASHBOARD,
} from "../utilities/routePaths";
import StudentsCompleted from "../pages/Studentscompleted/StudentsCompleted";
import Completed from "../pages/Completed/Completed";
import scheduled from "../pages/Scheduled/scheduled";
import Dashboard from "../pages/Dashboard/Dashboard";

const DistrictChartComponent = lazy(() =>
  import("../pages/chartsDashBoard/District")
);

const DivisionChartComponent = lazy(() =>
  import("../pages/chartsDashBoard/Division")
);

const WardChartComponent = lazy(() => import("../pages/chartsDashBoard/ward"));

const ZoneChartComponent = lazy(() => import("../pages/chartsDashBoard/zone"));
const ZoneComponent = lazy(() => import("../pages/ossAssignment/urban/zone"));
const WardComponent = lazy(() => import("../pages/ossAssignment/urban/ward"));
const DivisionComponent = lazy(() => import("../pages/ossAssignment/urban/division"));

const DistrictAssignmentComponent = lazy(() =>
  import("../pages/assignment/district")
);
const TalukAssignmentComponent = lazy(() => import("../pages/assignment/taluk"));

const PanchayatAssignmentComponent = lazy(() =>
  import("../pages/assignment/panchayat")
);

const VillageAssignMentComponent = lazy(() =>
  import("../pages/assignment/village")
);

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path={DASHBOARD} Component={Dashboard} />
      <Route path="/StudentsCompleted" Component={StudentsCompleted} />
      <Route path="/Completed" Component={Completed} />
      <Route path="/scheduled" Component={scheduled} />

      <Route path="/Ward/:path" Component={WardChartComponent} />
      <Route path="/Division/:path" Component={DivisionChartComponent} />
      <Route path="/Zone/:path" Component={ZoneChartComponent} />
      <Route path="/District/:path" Component={DistrictChartComponent} />

      <Route path={ASSIGNMENT_DISTRICT} Component={DistrictAssignmentComponent} />
      <Route path={ASSIGNMENT_TALUK} Component={TalukAssignmentComponent} />
      <Route path={ASSIGNMENT_GP} Component={PanchayatAssignmentComponent} />
      <Route path={ASSIGNMENT_SURVEYOR} Component={VillageAssignMentComponent} />

      <Route path={ASSIGNMENT_ZONE} Component={ZoneComponent} />
      <Route path={ASSIGNMENT_WARD} Component={WardComponent} />
      <Route path={ASSIGNMENT_DIVISION} Component={DivisionComponent} />

      <Route path="/*" element={<Navigate to={DASHBOARD} />} />
    </Routes>
  );
};

export default PrivateRoutes;
