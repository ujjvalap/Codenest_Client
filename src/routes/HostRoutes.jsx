/* eslint-disable react/prop-types */
import React from "react";
import { Route } from "react-router-dom";
import ProtectRoute from "../components/auth/ProtectRoute";
import ProtectedLayout from "../pages/host/ProtectedLayout";
import HostDashboard from "../pages/host/HostDashboard";
import ChallengeSetup from "../pages/host/ChallengeSetup";
import ChallengeOverviewPage from "../components/CreateChallenge/ChallengeOverviewPage";
import AddQuestion from "../pages/host/AddQuestion";
import MainCode from "../components/VsCode/MainCode";

const HostRoutes = ({ host }) => {
  return (
    <>
      <Route element={<ProtectRoute user={host} />}>
        <Route element={<ProtectedLayout />}>
          <Route path="/host-dashboard" element={<HostDashboard />} />
          <Route path="/challenge-setup" element={<ChallengeSetup />} />
          <Route path="/overview" element={<ChallengeOverviewPage />} />
        </Route>
        <Route path="/add-question" element={<AddQuestion />} />
        <Route path="/code-editor" element={<MainCode />} />
      </Route>
    </>
  );
};

export default HostRoutes;
