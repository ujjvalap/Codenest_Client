/* eslint-disable react/prop-types */
import React from "react";
import { Route } from "react-router-dom";
import ProtectRoute from "../components/auth/ProtectRoute";
import UserProtectedLayout from "../components/auth/UserProtectedLayout";
import ParticipantChallengeOverviewPage from "../components/userChallengePages/ParticipantChallengeOverviewPage";
import MainCode from "../components/VsCode/MainCode";

const UserRoutes = ({ user, challengeProgress }) => {
  const isChallengeActive =
    challengeProgress && challengeProgress.status !== "ended";

  return (
    <>
      <Route element={<ProtectRoute user={isChallengeActive ? user : null} />}>
        <Route element={<UserProtectedLayout />}>
          <Route
            path="/challenge-page"
            element={<ParticipantChallengeOverviewPage />}
          />
        </Route>
        <Route path="/editor" element={<MainCode />} />
      </Route>
    </>
  );
};

export default UserRoutes;
