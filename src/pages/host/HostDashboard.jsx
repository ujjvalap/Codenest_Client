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

function HostDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [showContestSetup, setShowContestSetup] = useState(false);

  const { host } = useSelector((state) => state.auth);

  // const [selectedTab, setSelectedTab] = useState("contests");

  const [currentDataToShow, setCurrentDataToShow] = useState([]);

  const { selectedTab } = useSelector((state) => state.auth);

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
    }, [selectedTab, myChallengesData, myBatchesData, challengeLoading, batchesLoading]);
    

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

  const handleCreateContest = () => {
    setShowContestSetup(true);
  };

  const handleCloseContestSetup = () => {
    setShowContestSetup(false);
  };

  const handleEditDetails = async (e) => {
    e.preventDefault();

    const updatedDetails = {
      username: e.target.username.value,
    };

    await updateHost(updatedDetails);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(hostExists(data?.host));
      setIsEditing(false);
    }
  }, [isSuccess]);

  // Call the custom hook to handle toast notifications
  useMutationToast({
    isLoading,
    isSuccess,
    data,
    isError,
    error,
    successMessage: "Host updated successfully",
  });

  if (challengeLoading || batchesLoading) {
    return <LoadingSpinner />;
  }
  

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen relative">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="md:w-1/4 p-6 space-y-6">
          {isEditing ? (
            <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-200 z-10 relative">
              <form onSubmit={handleEditDetails} className="mb-4">
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">
                  Edit Host Details
                </h3>
                <input
                  name="username"
                  defaultValue={host.username}
                  className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter new username"
                  required
                />
                <div className="flex justify-start">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition duration-200"
                  >
                    Update Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="ml-2 bg-gray-400 text-white py-2 px-4 rounded-md shadow hover:bg-gray-500 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              {/* Host Info Card */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-indigo-200 z-10 relative">
                <div className="flex items-center mb-6">
                  {host?.picture ? (
                    <img
                      src={host.picture}
                      alt="User Picture"
                      className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"
                    />
                  ) : (
                    <FaUserCircle className="text-indigo-600 text-6xl cursor-pointer" />
                  )}
                  <div className="ml-4">
                    <h1 className="text-2xl font-semibold text-gray-800">
                      {host.username}
                    </h1>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white py-2 px-6 rounded-full font-medium shadow-lg hover:bg-indigo-700 hover:shadow-xl transition duration-200 transform hover:scale-105 whitespace-nowrap"
                  >
                    <FaTasks /> Edit Details
                  </button>
                </div>
              </div>

              {/* Coding Challenges Card */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-300 mt-6">
                <div className="flex items-center gap-3 text-indigo-600">
                  <FaCode className="text-3xl" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Coding Challenges
                  </h2>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  Create, edit, and review coding challenges. Monitor
                  participants' submissions and performance.
                </p>
                <button
                  onClick={() => dispatch(setSelectedTab("contests"))}
                  className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition duration-200 w-full"
                >
                  <a href="#preData"> Manage Challenges</a>
                </button>
              </div>

              {/* Quiz Challenges Card */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-300 mt-6">
                <div className="flex items-center gap-3 text-indigo-600">
                  <FaQuestionCircle className="text-3xl" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Quiz Challenges
                  </h2>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  Create, update, and oversee quiz challenges. Track
                  participants' progress and results.
                </p>
                <button
                  onClick={() => dispatch(setSelectedTab("quizzes"))}
                  className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition duration-200 w-full"
                >
                  <a href="#preData">Manage Quizzes</a>
                </button>
              </div>
            </>
          )}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Dashboard Overview */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
              Admin Dashboard: Coding & Quiz Challenges
            </h2>
            <p className="text-gray-600">
              Welcome, {host.username}. Oversee coding and quiz challenges,
              create and manage contests, and track participants' progress.
              Monitor insights to enhance engagement and performance.
            </p>
          </section>

          {/* Previous Contests Section */}
          <section id="preData" className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-indigo-700 mb-4">
              {selectedTab === "contests"
                ? "Recent Coding Contests"
                : "Quiz Batches"}
            </h3>

            {selectedTab === "contests" &&
              (challengeLoading ? (
                <LoadingSpinner />
              ) : currentDataToShow?.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {/* Create New Coding Contest Card */}
                  <div
                    className="bg-gradient-to-br from-indigo-100 to-indigo-50 border-2 border-dashed border-indigo-400 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer 
             hover:shadow-xl hover:bg-indigo-100 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    onClick={handleCreateContest}
                  >
                    <div className="bg-indigo-200 p-4 rounded-full flex items-center justify-center mb-3 transition-all duration-300 hover:bg-indigo-300 shadow-md">
                      <FaPlus className="text-indigo-700 text-5xl" />
                    </div>
                    Create New{" "}
                    {selectedTab === "contests"
                      ? "Coding Contest"
                      : "Quiz Batch"}
                  </div>

                  {/* Existing Challenges */}
                  {currentDataToShow?.map((challenge) => (
                    <div
                      key={challenge._id}
                      className="bg-gray-50 border border-indigo-200 rounded-lg shadow-sm p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                      <button onClick={() => handleChallenge(challenge._id)}>
                        <h4 className="text-lg font-semibold text-indigo-700">
                          {challenge.title}
                        </h4>
                        <p className="flex items-center text-gray-500 mt-2">
                          <FaCalendarAlt className="mr-2 text-indigo-600" />
                          Start:{" "}
                          {moment(challenge.startTime).format(
                            "DD MMMM YYYY, hh:mm A"
                          )}
                        </p>
                        <p className="flex items-center text-gray-500">
                          <FaCalendarAlt className="mr-2 text-indigo-600" />
                          End:{" "}
                          {moment(challenge.endTime).format(
                            "DD MMMM YYYY, hh:mm A"
                          )}
                        </p>
                        <div className="flex items-center justify-between mt-4 text-gray-600">
                          <p className="flex items-center">
                            <FaTasks className="mr-2 text-blue-500" />{" "}
                            {challenge.questions?.length} Problems
                          </p>
                          <p className="flex items-center">
                            <FaUsers className="mr-2 text-green-500" />{" "}
                            {challenge.participants?.length} Participants
                          </p>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  {/* Show Create New Coding Contest Card if no contests exist */}
                  <div
                    className="bg-gradient-to-br from-indigo-100 to-indigo-50 border-2 border-dashed border-indigo-400 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer 
             hover:shadow-xl hover:bg-indigo-100 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    onClick={handleCreateContest}
                  >
                    <div className="bg-indigo-200 p-4 rounded-full flex items-center justify-center mb-3 transition-all duration-300 hover:bg-indigo-300 shadow-md">
                      <FaPlus className="text-indigo-700 text-5xl" />
                    </div>
                    <h4 className="text-xl font-bold text-indigo-800 text-center">
                      Create New{" "}
                      {selectedTab === "contests"
                        ? "Coding Contest"
                        : "Quiz Challenge"}
                    </h4>
                  </div>
                  <p className="text-gray-500 mt-4">
                    No {selectedTab === "contests" ? "contests" : "quizzes"}{" "}
                    available. Create a new one!
                  </p>
                </div>
              ))}

            {selectedTab === "quizzes" &&
              (batchesLoading ? (
                <LoadingSpinner />
              ) : currentDataToShow.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {/* Create New Coding Contest Card */}
                  <div
                    className="bg-gradient-to-br from-indigo-100 to-indigo-50 border-2 border-dashed border-indigo-400 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer 
             hover:shadow-xl hover:bg-indigo-100 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    onClick={handleCreateContest}
                  >
                    <div className="bg-indigo-200 p-4 rounded-full flex items-center justify-center mb-3 transition-all duration-300 hover:bg-indigo-300 shadow-md">
                      <FaPlus className="text-indigo-700 text-5xl" />
                    </div>
                    Create New Quiz Batch
                  </div>

                  {currentDataToShow?.map((batch) => (
                    <div
                      key={batch._id}
                      className="bg-gray-50 border border-indigo-200 rounded-lg shadow-sm p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                      <button onClick={() => handleBatch(batch._id)}>
                        <h4 className="text-lg font-semibold text-indigo-700">
                          {batch.name}
                        </h4>
                        <p className="text-gray-600 mt-2">
                          {batch.description}
                        </p>
                        <p className="flex items-center text-gray-500 mt-2">
                          <FaCalendarAlt className="mr-2 text-indigo-600" />
                          Start:{" "}
                          {moment(batch.startDate).format(
                            "DD MMMM YYYY, hh:mm A"
                          )}
                        </p>
                        <div className="flex items-center justify-between mt-4 text-gray-600">
                          <p className="flex items-center">
                            <FaTasks className="mr-2 text-blue-500" />{" "}
                            {batch.quizs?.length || 0} Quizs
                          </p>
                          <p className="flex items-center">
                            <FaUsers className="mr-2 text-green-500" />{" "}
                            {batch.students?.length || 0} Students
                          </p>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  {/* Show Create New Coding Contest Card if no contests exist */}
                  <div
                    className="bg-gradient-to-br from-indigo-100 to-indigo-50 border-2 border-dashed border-indigo-400 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer 
             hover:shadow-xl hover:bg-indigo-100 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    onClick={handleCreateContest}
                  >
                    <div className="bg-indigo-200 p-4 rounded-full flex items-center justify-center mb-3 transition-all duration-300 hover:bg-indigo-300 shadow-md">
                      <FaPlus className="text-indigo-700 text-5xl" />
                    </div>
                    <h4 className="text-xl font-bold text-indigo-800 text-center">
                      Create New{" "}
                      {selectedTab === "contests"
                        ? "Coding Contest"
                        : "Quiz Batch"}
                    </h4>
                  </div>
                  <p className="text-gray-500 mt-4">
                    No{" "}
                    {selectedTab === "contests" ? "contests" : "quiz Batches"}{" "}
                    available. Create a new one!
                  </p>
                </div>
              ))}
          </section>
        </main>
      </div>

      {/* Floating Add Problem Button */}
      {/* <button
        onClick={handleCreateContest}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white py-3 px-4 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 flex items-center gap-2"
      >
        <FaPlus />
        Create New Contest
      </button> */}

      {/* ContestSetup Panel */}
      {showContestSetup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
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
