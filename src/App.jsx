import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

// Components
import NotProtectedLayout from "./components/auth/NotProtectedLayout";
import ProtectRoute from "./components/auth/ProtectRoute";3
import UserProtectedLayout from "./components/auth/UserProtectedLayout";
import ChallengeOverviewPage from "./components/CreateChallenge/ChallengeOverviewPage";
import About from "./components/homepage/About";
import Body from "./components/homepage/Body";
import LoadingSpinner from "./components/LoadingSpinner";
import UserLogin from "./components/user/UserLogin";
import ParticipantChallengeOverviewPage from "./components/userChallengePages/ParticipantChallengeOverviewPage";
import MainCode from "./components/VsCode/MainCode";
import Student from "./pages/student/Student";
import ProblemOfTheDay from "./pages/student/potd";
import SDE from "./pages/student/sde"

// Pages
import AddQuestion from "./pages/host/AddQuestion";
import ChallengeSetup from "./pages/host/ChallengeSetup";
import HostDashboard from "./pages/host/HostDashboard";
import AdminLogin from "./pages/host/HostLogin";
import ProtectedLayout from "./pages/host/ProtectedLayout";
import ProtectedLayoutUser from "./pages/student/ProtectedLayoutUser";
import Chatbot from "./components/homepage/Chatbot";

// Redux Actions
import {
  hostExists,
  hostLoading,
  hostNotExists,
  userExists,
  userLoading,
  userNotExists,
} from "./redux/reducers/auth";

// Config
import NotFound from "./components/NotFound";
import { config, server } from "./constants/config";
import MainQuiz from "./pages/quiz/MainQuiz";
import QuizOverviewPage from "./components/quiz components/QuizOverviewPage";
import BatchDetailsPage from "./components/UserQuiz/BatchDetailsPage";
import StudentBatchPage from "./components/UserQuiz/StudentBatchPage";
import AddQuizQuestion from "./pages/quiz/AddQuizQuetion";
import BatchPage from "./pages/quiz/BatchPage";
import WordQuizImporter from "./shared/WordQuizImporter";
import QuizResults from "./pages/quiz/QuizResults";

function App() {
  const { host, loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check Host Authentication
  useEffect(() => {
    dispatch(hostLoading());
    axios
      .get(`${server}/admin/profile`, config)
      .then(({ data }) => {
        if (data.success) {
          dispatch(hostExists(data.host));
        } else {
          dispatch(hostNotExists());
        }
      })
      .catch(() => dispatch(hostNotExists()));
  }, [dispatch]);

  // Check User Authentication
  useEffect(() => {
    dispatch(userLoading());
    axios
      .get(`${server}/user/profile`, config)
      .then(({ data }) => {
        if (data.success) {
          dispatch(userExists(data.user));
        } else {
          dispatch(userNotExists());
        }
      })
      .catch(() => dispatch(userNotExists()));
  }, [dispatch]);

  // Auto redirect user to student dashboard if logged in
 

  // Show loading spinner while auth is loading
  if (loading.host || loading.user) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Host Protected Routes */}
      <Route element={<ProtectRoute user={host} />}>
        <Route element={<ProtectedLayout />}>
          <Route path="/host-dashboard" element={<HostDashboard />} />
          <Route path="/challenge-setup" element={<ChallengeSetup />} />
          <Route path="/overview" element={<ChallengeOverviewPage />} />
          <Route path="/quiz/overview" element={<QuizOverviewPage />} />
          <Route path="/quiz/batch" element={<BatchPage />} />
          <Route path="/quiz/add-question" element={<AddQuizQuestion />} />
          <Route path="/quiz/uploadWordDoc" element={<WordQuizImporter />} />
        </Route>
        <Route path="/add-question" element={<AddQuestion />} />
        <Route path="/code-editor" element={<MainCode />} />
      </Route>

      {/* Public Routes */}
      <Route
        element={<ProtectRoute user={!host} redirect="/host-dashboard" />}
      >
        <Route
          element={<ProtectRoute user={!user} redirect="/student" />}
        >
          <Route element={<NotProtectedLayout />}>
            <Route path="/" element={<Body />} />
            <Route path="/about" element={<About />} />
            <Route path="/host-login" element={<AdminLogin />} />
            <Route path="/user-login" element={<UserLogin />} />
          </Route>
        </Route>
      </Route>

      {/* Participant Protected Routes */}
      <Route element={<ProtectRoute user={user} />}>
        <Route element={<ProtectedLayoutUser />}>
          <Route path="/student" element={<Student />} />
          <Route path="/challenge-page" element={<ParticipantChallengeOverviewPage />} />
          <Route path="/user/quiz/dashboard" element={<StudentBatchPage />} />
          <Route path="/user/batch" element={<BatchDetailsPage />} />
          <Route path="/user/quiz/result" element={<QuizResults />} />
          <Route path="/user/quiz" element={<MainQuiz />} />
          <Route path="/problem-of-the-day" element={<ProblemOfTheDay />} />
          <Route path="/sde" element={<SDE />} />
        </Route>
        <Route path="/editor" element={<MainCode />} />
      </Route>

      {/* Catch-all Route for NotFound Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
