import React, {lazy} from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { IsAuthenticated } from "./useAuth";

const PublicRoutesComponent = lazy(() => import("./publicRoutes")); 
const PrivateRoutesComponent = lazy(() => import("./privateRoutes")); 

export default function WebRoutes() {
  const [{ isLoggedIn, userRole }] = IsAuthenticated();

  return (
    <React.Suspense fallback={<div>....Loading</div>}>
      <BrowserRouter basename="/oss">
        <Header userRole={userRole} />
        {!isLoggedIn ? <PublicRoutesComponent /> : <PrivateRoutesComponent />}
        <Footer />
      </BrowserRouter>
    </React.Suspense>
  );
}
