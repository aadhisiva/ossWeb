import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  ASSIGNMENT_APPROVER,
  ASSIGNMENT_DISTRICT,
  ASSIGNMENT_DIVISION,
  ASSIGNMENT_GP,
  ASSIGNMENT_SURVEYOR,
  ASSIGNMENT_TALUK,
  ASSIGNMENT_TO_MASTERS,
  ASSIGNMENT_WARD,
  ASSIGNMENT_ZONE,
  DASHBOARD,
  DISTRICT_REPORTS,
  GP_REPORTS,
  SEARCH_REPORTS,
  TALUK_REPORTS,
  VILLAGE_REPORTS,
} from "../utilities/routePaths";
import StudentsCompleted from "../pages/Studentscompleted/StudentsCompleted";
import Completed from "../pages/Completed/Completed";
import scheduled from "../pages/Scheduled/scheduled";
import Dashboard from "../pages/Dashboard/Dashboard";
import ChildRoles from "../pages/roles/roles";
import Access from "../pages/roles/access";
import Hierarchy from "../pages/roles/hierarchy";
import { DISTRICT_OPTIONS } from "../utilities/constants";

const ZoneComponent = lazy(() => import("../pages/ossAssignment/urban/zone"));
const WardComponent = lazy(() => import("../pages/ossAssignment/urban/ward"));
const DivisionComponent = lazy(() =>
  import("../pages/ossAssignment/urban/division")
);

const DistrictAssignmentComponent = lazy(() =>
  import("../pages/assignment/district")
);
const TalukAssignmentComponent = lazy(() =>
  import("../pages/assignment/taluk")
);

const PanchayatAssignmentComponent = lazy(() =>
  import("../pages/assignment/panchayat")
);

const VillageAssignMentComponent = lazy(() =>
  import("../pages/assignment/village")
);

const ApprovalComponent = lazy(() => import("../pages/assignment/approval"));

const MasterAssignmentLazy = lazy(() =>
  import("../pages/assignment/masterAssignment")
);

const DistrictReportsComponent = lazy(() =>
  import("../pages/reports/district")
);

const GpReportsComponent = lazy(() =>
  import("../pages/reports/gp")
);

const TalukReportsComponent = lazy(() =>
  import("../pages/reports/taluk")
);

const VillageReportsComponent = lazy(() =>
  import("../pages/reports/village")
);

const SeacrhReportsComponent = lazy(() =>
  import("../pages/reports/searchReports")
);

const RoleDashboardLazy = lazy(() => import("../pages/roles"));

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path={DASHBOARD} Component={Dashboard} />
      <Route path="/StudentsCompleted" Component={StudentsCompleted} />
      <Route path="/Completed" Component={Completed} />
      <Route path="/scheduled" Component={scheduled} />

      <Route path={VILLAGE_REPORTS} Component={VillageReportsComponent} />
      <Route path={GP_REPORTS} Component={GpReportsComponent} />
      <Route path={TALUK_REPORTS} Component={TalukReportsComponent} />
      <Route path={DISTRICT_REPORTS} Component={DistrictReportsComponent} />

      <Route path={SEARCH_REPORTS} Component={SeacrhReportsComponent} />

      <Route
        path={ASSIGNMENT_DISTRICT}
        Component={DistrictAssignmentComponent}
      />
      <Route path={ASSIGNMENT_TALUK} Component={TalukAssignmentComponent} />
      <Route path={ASSIGNMENT_GP} Component={PanchayatAssignmentComponent} />
      <Route
        path={ASSIGNMENT_SURVEYOR}
        Component={VillageAssignMentComponent}
      />
      <Route path={ASSIGNMENT_APPROVER} Component={ApprovalComponent} />

      <Route path={ASSIGNMENT_TO_MASTERS} Component={MasterAssignmentLazy} />

      <Route path={ASSIGNMENT_ZONE} Component={ZoneComponent} />
      <Route path={ASSIGNMENT_WARD} Component={WardComponent} />
      <Route path={ASSIGNMENT_DIVISION} Component={DivisionComponent} />

      <Route path={"/ChildRoles"} Component={ChildRoles} />
      <Route path={"/Access"} Component={Access} />
      <Route path={"/Hierarchy"} Component={Hierarchy} />

      <Route path="/*" element={<Navigate to={DASHBOARD} />} />
    </Routes>
  );
};

export default PrivateRoutes;
