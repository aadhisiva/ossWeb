import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SIGN_IN } from "../utilities/routePaths";

const SignInComponent = lazy(() => import("../pages/signIn"));

const PublicRoutes = () => {

  return (
    <Routes>
      <Route path={SIGN_IN} Component={SignInComponent} />
      <Route path="/*" element={<Navigate to={SIGN_IN} />} />
    </Routes>
  );
};

export default PublicRoutes;
