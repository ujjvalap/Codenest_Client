// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import ChallengeNavbar from "../../components/CreateChallenge/ChallengeNavbar";
// import QuestionForm from "../../components/CreateChallenge/QuestionForm";
// import {
//   useNewQuestionMutation,
//   useQuestionDetailsQuery,
//   useUpdateQuestionMutation,
// } from "../../redux/api/api";
// import LoadingSpinner from "../../components/LoadingSpinner";
// import useMutationToast from "../../hooks/useMutationToast";

// function AddQuestion() {
//   const { questionID } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   // Query for question details
//   const {
//     data,
//     isLoading: isQuestionLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useQuestionDetailsQuery(questionID, { skip: !questionID });

  
//   // Mutations for updating and creating questions
//   const [updateQuestion, updateStatus] = useUpdateQuestionMutation();
//   const [newQuestion, createStatus] = useNewQuestionMutation();

//   // Use custom `useMutationToast` hook to handle notifications
//   useMutationToast({
//     ...updateStatus,
//     successMessage: "Question updated successfully!",
//   });

//   useMutationToast({
//     ...createStatus,
//     successMessage: "New question created successfully!",
//   });

//   // Handle navigation on successful mutation
//   useEffect(() => {
//     if (updateStatus.isSuccess || createStatus.isSuccess) {
//       navigate("/overview");
//     }
//   }, [updateStatus.isSuccess, createStatus.isSuccess, navigate]);

//   const [problemDetails, setProblemDetails] = useState({
//     title: "",
//     problemStatement: "",
//     inputFormat: "",
//     outputFormat: "",
//     constraints: [],
//     maxScore: 0,
//     difficulty: "Easy",
//     createdAt: new Date(),
//     tags: [],
//     author: null,
//     hints: [],
//     timeLimit: 1,
//     memoryLimit: 256,
//     difficultyScore: 1,
//     likes: 0,
//     views: 0,
//     sampleSolution: "// write problem solution here",
//     isActive: true,
//     languagesAllowed: ["cpp", "python", "javascript", "java"],
//     estimatedSolveTime: 0,
//     boilerplateCode: {
//       cpp: "",
//       python: "",
//       javascript: "",
//       java: "",
//     },
//     examples: [],
//   });

//   useEffect(() => {
//     if (isSuccess && data?.success) {
//       const questionData = data.question;
//       setProblemDetails({
//         title: questionData.title || "",
//         problemStatement: questionData.problemStatement || "",
//         inputFormat: questionData.inputFormat || "",
//         outputFormat: questionData.outputFormat || "",
//         constraints: questionData.constraints || [],
//         maxScore: questionData.maxScore || 0,
//         difficulty: questionData.difficulty || "Easy",
//         createdAt: questionData.createdAt,
//         tags: questionData.tags || [],
//         author: questionData.author || null,
//         hints: questionData.hints || [],
//         timeLimit: questionData.timeLimit || 1,
//         memoryLimit: questionData.memoryLimit || 256,
//         difficultyScore: questionData.difficultyScore || 1,
//         likes: questionData.likes || 0,
//         views: questionData.views || 0,
//         sampleSolution:
//           questionData.sampleSolution || "// write problem solution here",
//         isActive: questionData.isActive ?? true,
//         languagesAllowed: questionData.languagesAllowed || [
//           "cpp",
//           "python",
//           "javascript",
//           "java",
//         ],
//         estimatedSolveTime: questionData.estimatedSolveTime || 0,
//         boilerplateCode: questionData.boilerplateCode || {
//           cpp: "",
//           python: "",
//           javascript: "",
//           java: "",
//         },
//         examples: questionData.examples || [{ input: "", output: "" }],
//       });
//     }
//   }, [isSuccess, data]);

//   const handleSaveProblem = () => {
//     if (questionID) {
//       updateQuestion({ id: questionID, data: problemDetails });
//     } else {
//       newQuestion(problemDetails);
//     }
//   };

//   if (isQuestionLoading) {
//     return <p>Loading question details...</p>;
//   }

//   return (
//     <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Fixed Navbar */}
//       <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
//         <ChallengeNavbar handleSaveProblem={handleSaveProblem} />
//       </div>

//       {/* Content with padding-top to prevent overlap */}
//       <div className="flex h-full pt-24">
//         {" "}
//         {isQuestionLoading ? (
//           <LoadingSpinner />
//         ) : (
//           <QuestionForm
//             problemDetails={problemDetails}
//             setProblemDetails={setProblemDetails}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default AddQuestion;



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
  FaEdit,
  FaChevronRight,
  FaTachometerAlt,
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
  const { selectedTab } = useSelector((state) => state.auth);
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
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen relative">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <FaTachometerAlt className="text-indigo-600 mr-3 text-xl" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center text-sm text-gray-600">
                <span>Welcome,</span>
                <span className="font-medium ml-1 text-indigo-700">{host.username}</span>
              </div>
              {host?.picture ? (
                <img
                  src={host.picture}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-indigo-100"
                />
              ) : (
                <FaUserCircle className="text-indigo-600 text-3xl" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4 space-y-6">
            {isEditing ? (
              <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
                <form onSubmit={handleEditDetails} className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Edit Host Details
                  </h3>
                  <input
                    name="username"
                    defaultValue={host.username}
                    className="w-full border border-gray-200 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter new username"
                    required
                  />
                  <div className="flex justify-start space-x-3">
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 transition duration-200 font-medium"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg shadow hover:bg-gray-300 transition duration-200 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                {/* Host Info Card */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-xl shadow-md text-white">
                  <div className="flex items-center mb-6">
                    {host?.picture ? (
                      <img
                        src={host.picture}
                        alt="User"
                        className="w-14 h-14 rounded-full border-2 border-white border-opacity-30"
                      />
                    ) : (
                      <FaUserCircle className="text-white text-5xl opacity-90" />
                    )}
                    <div className="ml-4">
                      <h1 className="text-xl font-semibold">{host.username}</h1>
                      <p className="text-indigo-100 text-sm mt-1">Challenge Host</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center justify-center gap-2 bg-white bg-opacity-20 text-white py-2 px-4 rounded-lg font-medium hover:bg-opacity-30 transition duration-200 w-full backdrop-blur-sm"
                  >
                    <FaEdit className="text-sm" /> Edit Profile
                  </button>
                </div>

                {/* Navigation Cards */}
                <div className="space-y-5">
                  <div 
                    className={`bg-white p-5 rounded-xl shadow-md border cursor-pointer transition duration-200 hover:shadow-lg hover:border-indigo-300 ${selectedTab === "contests" ? "border-indigo-400" : "border-gray-200"}`}
                    onClick={() => dispatch(setSelectedTab("contests"))}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-indigo-100 p-3 rounded-lg">
                          <FaCode className="text-indigo-600 text-xl" />
                        </div>
                        <div>
                          <h2 className="font-semibold text-gray-800">Coding Challenges</h2>
                          <p className="text-gray-500 text-sm mt-1">
                            Create and manage coding contests
                          </p>
                        </div>
                      </div>
                      <FaChevronRight className="text-gray-400" />
                    </div>
                  </div>

                  <div 
                    className={`bg-white p-5 rounded-xl shadow-md border cursor-pointer transition duration-200 hover:shadow-lg hover:border-indigo-300 ${selectedTab === "quizzes" ? "border-indigo-400" : "border-gray-200"}`}
                    onClick={() => dispatch(setSelectedTab("quizzes"))}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-3 rounded-lg">
                          <FaQuestionCircle className="text-green-600 text-xl" />
                        </div>
                        <div>
                          <h2 className="font-semibold text-gray-800">Quiz Challenges</h2>
                          <p className="text-gray-500 text-sm mt-1">
                            Create and manage quiz batches
                          </p>
                        </div>
                      </div>
                      <FaChevronRight className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Dashboard Header */}
            <section className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Challenge Management Dashboard
              </h2>
              <p className="text-gray-600">
                Welcome back, {host.username}. Manage your coding contests and quiz challenges, 
                track participant progress, and create engaging competitions.
              </p>
            </section>

            {/* Content Section */}
            <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {selectedTab === "contests" ? "Your Coding Contests" : "Your Quiz Batches"}
                </h3>
                <button
                  onClick={handleCreateContest}
                  className="flex items-center gap-2 bg-indigo-600 text-white py-2.5 px-5 rounded-lg font-medium shadow hover:bg-indigo-700 transition duration-200"
                >
                  <FaPlus className="text-sm" /> Create New
                </button>
              </div>

              {selectedTab === "contests" && (
                challengeLoading ? (
                  <LoadingSpinner />
                ) : currentDataToShow?.length > 0 ? (
                  <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {currentDataToShow?.map((challenge) => (
                      <div
                        key={challenge._id}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-5 transition duration-200 hover:shadow-md hover:border-indigo-200 cursor-pointer"
                        onClick={() => handleChallenge(challenge._id)}
                      >
                        <h4 className="text-lg font-semibold text-indigo-700 mb-2">
                          {challenge.title}
                        </h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p className="flex items-center">
                            <FaCalendarAlt className="mr-2 text-indigo-500" />
                            Start: {moment(challenge.startTime).format("DD MMM YYYY, hh:mm A")}
                          </p>
                          <p className="flex items-center">
                            <FaCalendarAlt className="mr-2 text-indigo-500" />
                            End: {moment(challenge.endTime).format("DD MMM YYYY, hh:mm A")}
                          </p>
                        </div>
                        <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
                          <span className="flex items-center text-sm text-gray-600">
                            <FaTasks className="mr-1.5 text-blue-500" />
                            {challenge.questions?.length} Problems
                          </span>
                          <span className="flex items-center text-sm text-gray-600">
                            <FaUsers className="mr-1.5 text-green-500" />
                            {challenge.participants?.length} Participants
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCode className="text-indigo-600 text-2xl" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">No contests yet</h4>
                    <p className="text-gray-500 mb-6">Create your first coding contest to get started</p>
                    <button
                      onClick={handleCreateContest}
                      className="bg-indigo-600 text-white py-2.5 px-5 rounded-lg font-medium shadow hover:bg-indigo-700 transition duration-200"
                    >
                      Create Your First Contest
                    </button>
                  </div>
                )
              )}

              {selectedTab === "quizzes" && (
                batchesLoading ? (
                  <LoadingSpinner />
                ) : currentDataToShow.length > 0 ? (
                  <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {currentDataToShow?.map((batch) => (
                      <div
                        key={batch._id}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-5 transition duration-200 hover:shadow-md hover:border-indigo-200 cursor-pointer"
                        onClick={() => handleBatch(batch._id)}
                      >
                        <h4 className="text-lg font-semibold text-indigo-700 mb-2">
                          {batch.name}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">{batch.description}</p>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p className="flex items-center">
                            <FaCalendarAlt className="mr-2 text-indigo-500" />
                            Start: {moment(batch.startDate).format("DD MMM YYYY, hh:mm A")}
                          </p>
                        </div>
                        <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
                          <span className="flex items-center text-sm text-gray-600">
                            <FaTasks className="mr-1.5 text-blue-500" />
                            {batch.quizs?.length || 0} Quizzes
                          </span>
                          <span className="flex items-center text-sm text-gray-600">
                            <FaUsers className="mr-1.5 text-green-500" />
                            {batch.students?.length || 0} Students
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaQuestionCircle className="text-green-600 text-2xl" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">No quiz batches yet</h4>
                    <p className="text-gray-500 mb-6">Create your first quiz batch to get started</p>
                    <button
                      onClick={handleCreateContest}
                      className="bg-indigo-600 text-white py-2.5 px-5 rounded-lg font-medium shadow hover:bg-indigo-700 transition duration-200"
                    >
                      Create Your First Quiz Batch
                    </button>
                  </div>
                )
              )}
            </section>
          </main>
        </div>
      </div>

      {/* ContestSetup Panel */}
      {showContestSetup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
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