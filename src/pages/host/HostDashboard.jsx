import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCode,
  FaPlus,
  FaQuestionCircle,
  FaTasks,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import LoadingSpinner from "../../components/LoadingSpinner";
import useMutationToast from "../../hooks/useMutationToast";
import {
  useMyBatchesQuery,
  useMyChallengesQuery,
  useUpdateHostMutation,
} from "../../redux/api/api";
import {
  hostExists,
  setBatchID,
  setChallengeID,
  setQuestionID,
  setSelectedTab,
} from "../../redux/reducers/auth";
import ContestSetup from "./ChallengeSetup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function HostDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [showContestSetup, setShowContestSetup] = useState(false);
  const { host, selectedTab } = useSelector((state) => state.auth);
  const [currentDataToShow, setCurrentDataToShow] = useState([]);

  useEffect(() => {
    dispatch(setQuestionID(null));
  }, [dispatch]);

  const { isLoading: challengeLoading, data: myChallengesData } =
    useMyChallengesQuery("");
  const { isLoading: batchesLoading, data: myBatchesData } =
    useMyBatchesQuery("");

  useEffect(() => {
    if (!challengeLoading && !batchesLoading) {
      setCurrentDataToShow(
        selectedTab === "contests"
          ? myChallengesData?.challenges || []
          : myBatchesData?.batches || []
      );
    }
  }, [
    selectedTab,
    myChallengesData,
    myBatchesData,
    challengeLoading,
    batchesLoading,
  ]);

  const [updateHost, { isLoading, isSuccess, data, isError, error }] =
    useUpdateHostMutation();

  const handleChallenge = (challengeID) => {
    dispatch(setChallengeID(challengeID));
    navigate("/overview");
  };

  const handleBatch = (id) => {
    dispatch(setBatchID(id));
    navigate("/quiz/batch");
  };

  const handleCreateContest = () => setShowContestSetup(true);
  const handleCloseContestSetup = () => setShowContestSetup(false);

  const handleEditDetails = async (e) => {
    e.preventDefault();
    const updatedDetails = { username: e.target.username.value };
    await updateHost(updatedDetails);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(hostExists(data?.host));
      setIsEditing(false);
    }
  }, [isSuccess, data, dispatch]);

  useMutationToast({
    isLoading,
    isSuccess,
    data,
    isError,
    error,
    successMessage: "Host updated successfully",
  });

  if (challengeLoading || batchesLoading) return <LoadingSpinner />;

  // ---------- Chart Data ----------
  // const contestData = myChallengesData?.challenges || [];
  // const batchData = myBatchesData?.batches || [];
  const contestData = myChallengesData?.challenges || [];
  const batchData = myBatchesData?.batches || [];


  const chartLineData = {
    labels: contestData.map((c) => moment(c.startTime).format("DD MMM")),
    datasets: [
      {
        label: "Participants",
        data: contestData.map((c) => c.participants?.length || 0),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.3)",
        tension: 0.4,
      },
    ],
  };

  const chartDoughnutData = {
    labels: ["Coding Contests", "Quiz Batches"],
    datasets: [
      {
        data: [contestData.length, batchData.length],
        backgroundColor: ["#6366f1", "#22c55e"],
        borderWidth: 2,
      },
    ],
  };

  const chartBarData = {
    labels: batchData.map((b) => b.name),
    datasets: [
      {
        label: "Students per Batch",
        data: batchData.map((b) => b.students?.length || 0),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-900">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="md:w-1/4 p-4 space-y-6 bg-white border-r border-gray-200 shadow-sm">
          {/* Profile Section */}
          {isEditing ? (
            <div className="bg-gray-50 p-4 rounded-xl shadow-md">
              <form onSubmit={handleEditDetails}>
                <h3 className="text-lg font-semibold text-blue-600 mb-3">
                  Edit Profile
                </h3>
                <input
                  name="username"
                  defaultValue={host.username}
                  className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new username"
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-400 text-white px-3 py-2 rounded-md hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100">
              <div className="flex items-center mb-4">
                {host?.picture ? (
                  <img
                    src={host.picture}
                    alt="User"
                    className="w-14 h-14 rounded-full border-2 border-blue-500"
                  />
                ) : (
                  <FaUserCircle className="text-blue-500 text-6xl" />
                )}
                <div className="ml-4">
                  <h1 className="text-lg font-bold">{host.username}</h1>
                  <p className="text-gray-500 text-sm">Host Account</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-white font-medium transition transform hover:scale-105"
              >
                <FaTasks /> Edit Profile
              </button>
            </div>
          )}

          {/* Create Section Cards */}
          <div className="grid grid-cols-1 gap-4">
            {/* Create Coding Contest Card */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition transform hover:scale-[1.02]">
              <div className="flex items-center gap-3 text-indigo-600 mb-2">
                <FaCode className="text-3xl" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Create Coding Contest
                </h2>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Build and schedule coding contests with custom challenges, time
                limits, and live results tracking.
              </p>
              <button
                onClick={() => {
                  dispatch(setSelectedTab("contests"));
                  setShowContestSetup(false);
                }}
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition duration-200 w-full"
              >
                Create Contest
              </button>
            </div>

            {/* Create Quiz Card */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition transform hover:scale-[1.02]">
              <div className="flex items-center gap-3 text-indigo-600 mb-2">
                <FaQuestionCircle className="text-3xl" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Create Quiz
                </h2>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Design interactive quizzes with multiple-choice questions,
                automatic scoring, and detailed analytics.
              </p>
              <button
                onClick={() => {
                  dispatch(setSelectedTab("quizzes"));
                  setShowContestSetup(false);
                }}
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition duration-200 w-full"
              >
                Create Quiz
              </button>
            </div>
          </div>
        </aside>

        {/* Main Section */}
        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <section className="bg-white rounded-lg shadow-md p-5 border">
            <h2 className="text-2xl font-semibold text-blue-600">
              Host Dashboard
            </h2>
            <p className="text-gray-600">
              Welcome back, {host.username}. Manage contests and student
              progress here.
            </p>
          </section>

          {/* Charts */}
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-700 mb-2">
                Participants Growth
              </h3>
              <Line data={chartLineData} />
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-700 mb-2">
                Overview Data
              </h3>
              <Doughnut data={chartDoughnutData} />
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-700 mb-2">
                Students per Batch
              </h3>
              <Bar data={chartBarData} />
            </div>
          </section>

          {/* Contests / Quizzes Section */}
          <section className="bg-white rounded-lg shadow-md p-6 border">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              {selectedTab === "contests"
                ? "Recent Coding Contests"
                : "Quiz Batches"}
            </h3>

            {currentDataToShow?.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {currentDataToShow.map((item) => (
                  <div
                    key={item._id}
                    onClick={() =>
                      selectedTab === "contests"
                        ? handleChallenge(item._id)
                        : handleBatch(item._id)
                    }
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-md hover:shadow-lg transition transform hover:scale-105 cursor-pointer"
                  >
                    <h4 className="text-lg font-semibold text-blue-700">
                      {item.title || item.name}
                    </h4>
                    <p className="flex items-center text-gray-600 mt-2 text-sm">
                      <FaCalendarAlt className="mr-2 text-blue-500" />
                      {moment(item.startTime || item.startDate).format(
                        "DD MMM YYYY, hh:mm A"
                      )}
                    </p>
                    <div className="flex items-center justify-between mt-4 text-gray-700 text-sm">
                      <p className="flex items-center">
                        <FaTasks className="mr-2 text-blue-500" />
                        {item.questions?.length ||
                          item.quizs?.length ||
                          0}{" "}
                        Tasks
                      </p>
                      <p className="flex items-center">
                        <FaUsers className="mr-2 text-green-500" />
                        {item.participants?.length ||
                          item.students?.length ||
                          0}{" "}
                        Users
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                onClick={handleCreateContest}
                className="border-2 border-dashed border-blue-400 p-6 rounded-lg text-center cursor-pointer hover:bg-blue-50 transition transform hover:scale-105"
              >
                <FaPlus className="text-blue-500 text-3xl mb-2 mx-auto" />
                <h4 className="font-semibold text-blue-600">
                  Create New {selectedTab === "contests" ? "Contest" : "Quiz"}
                </h4>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={handleCreateContest}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-full shadow-lg flex items-center gap-2 transition transform hover:scale-110"
      >
        <FaPlus /> Create
      </button>

      {/* Contest Setup Modal */}
      {showContestSetup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <ContestSetup
            onClose={handleCloseContestSetup}
            activeMode={selectedTab}
          />
        </div>
      )}
    </div>
  );
}

export default HostDashboard;










