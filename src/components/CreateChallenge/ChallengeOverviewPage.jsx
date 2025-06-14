import React, { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useMutationToast from "../../hooks/useMutationToast";
import {
  useChallengeDataQuery,
  useDeleteChallengeMutation,
  useEditChallengeDataMutation,
  useRemoveQuestionMutation,
} from "../../redux/api/api";
import { setQuestionID } from "../../redux/reducers/auth";
import ConfirmationDeleteModal from "../../shared/ConfirmationDeleteModal";
import LoadingSpinner from "../LoadingSpinner";
import ChallengeHeader from "./ChallengeHeader ";
import LeaderboardPanel from "./LeaderboardPanel";
import ProblemList from "./ProblemList";
import QuestionListModal from "./QuestionListModel";
import ShowTestCasePanel from "./ShowTestCasePanel";

function ChallengeOverviewPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [showTestCasePanel, setShowTestCasePanel] = useState(false);
  const [showQuestionList, setShowQuestionList] = useState(false);
  const [copied, setCopied] = useState(false);
  const [question, setQuestion] = useState("");

  const { challengeID } = useSelector((state) => state.auth);

  const { data, isLoading: isChallengeLoading } =
    useChallengeDataQuery(challengeID);
  const challengeData = data?.challenge;

  
  // Mutation hooks for editing and deleting challenges and questions
  const [editChallenge, editStatus] = useEditChallengeDataMutation();
  const [deleteChallenge, deleteStatus] = useDeleteChallengeMutation();
  const [removeQuestion, removeStatus] = useRemoveQuestionMutation();

  // Custom hook for handling mutation responses
  useMutationToast({
    ...editStatus,
    successMessage:
      editStatus.data?.message || "Challenge updated successfully",
  });
  useMutationToast({
    ...deleteStatus,
    successMessage:
      deleteStatus.data?.message || "Challenge deleted successfully",
  });
  useMutationToast({
    ...removeStatus,
    successMessage: "Question removed successfully",
  });

  // Close edit mode after a successful edit
  useEffect(() => {
    if (editStatus?.isSuccess) {
      setIsEditing(false);
    }
  }, [editStatus?.isSuccess]);

  // Navigate to dashboard after successful deletion of challenge
  useEffect(() => {
    if (deleteStatus?.isSuccess) {
      navigate("/host-dashboard");
    }
  }, [deleteStatus?.isSuccess]);

  // Clipboard copy function
  const handleCopy = async () => {
    await navigator.clipboard.writeText(challengeData.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Edit problem handler
  const handleEditProblem = (questionID) => {
    dispatch(setQuestionID(questionID));
    navigate("/add-question");
  };

  // Show the modal for adding a new problem
  const handleAddNewProblem = () => {
    setShowQuestionList(true);
  };

  // Show the delete confirmation modal
  const DeleteProblemConform = (id) => {
    setQuestion(id);
    setIsQuestionModalOpen(true);
  };

  const handleTestCaseToggle = (questionID) => {
    if (!showTestCasePanel) {
      dispatch(setQuestionID(questionID)); // Dispatch only when opening
    }
  
    setShowTestCasePanel((prev) => !prev);
  };
  

  // Function to handle time conversion to UTC
  const convertToUTC = (localDateTime) => {
    const date = new Date(localDateTime);
    return date.toISOString(); // Converts to ISO string in UTC format
  };

  // Handle challenge data editing
  const handleEditChallengeData = async (e) => {
    e.preventDefault();
    const updatedChallengeData = {
      title: e.target.title.value,
      description: e.target.description.value,
      startTime: convertToUTC(e.target.startTime.value),
      endTime: convertToUTC(e.target.endTime.value),
    };
    await editChallenge({ id: challengeID, data: updatedChallengeData });
  };

  // Handle challenge deletion
  const handleDeleteChallenge = async () => {
    await deleteChallenge(challengeID);
    if (deleteStatus.isSuccess) {
      navigate(-1);
    }
  };

  // Handle question deletion
  const handleDeleteProblem = async () => {
    const data = { questionID: question };
    await removeQuestion({ id: challengeID, data });
  };

  // Loading spinner if challenge data is still loading
  if (isChallengeLoading || !challengeData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col md:flex-row sm:p-4 lg:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Left Side: Challenge Header and Section */}
      <div className="w-full md:w-1/3 p-4">
        {/* Header */}
        <ChallengeHeader
          challengeData={challengeData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setIsModalOpen={setIsModalOpen}
          handleEditChallengeData={handleEditChallengeData}
          handleCopy={handleCopy}
          copied={copied}
        />

        {/* Leaderboard and Participation Panel */}
        <LeaderboardPanel
          isChallengeLoading={isChallengeLoading}
          challengeData={challengeData}
          type={"challenge"}
        />
      </div>

      {/* Right Side: Problem List */}
      <div className="w-full md:w-2/3 p-4">
        <ProblemList
          challengeData={challengeData}
          handleEditProblem={handleEditProblem}
          handleDeleteProblem={handleDeleteProblem}
          handleTestCaseToggle={handleTestCaseToggle}
          isQuestionModalOpen={isQuestionModalOpen}
          setIsQuestionModalOpen={setIsQuestionModalOpen}
          DeleteProblemConform={DeleteProblemConform}
        />
      </div>

      {/* Modal for Delete Confirmation */}
      <ConfirmationDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteChallenge}
        title="Delete Challenge"
        message="Are you sure you want to delete this challenge? This action cannot be undone."
      />

      {/* Floating Add Problem Button */}
     {/* Floating Add AI Question Button */}


{/* Floating Add Problem Button */}
<button
  onClick={handleAddNewProblem}
  className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-indigo-600 text-white py-3 px-4 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 flex items-center gap-2"
>
  <FaPlus />
  Add Question
</button>


      {/* Conditionally render QuestionList */}
      {showQuestionList && (
        <QuestionListModal
          showQuestionList={showQuestionList}
          setShowQuestionList={setShowQuestionList}
          challengeData={challengeData}
        />
      )}

      {/* Conditional Rendering of TestCasePanel in Center of Screen */}
      {showTestCasePanel && (
        <ShowTestCasePanel
          handleTestCaseToggle={handleTestCaseToggle}
          className="transition-opacity duration-300 ease-in-out opacity-100"
        />
      )}
    </div>
  );
}

export default ChallengeOverviewPage;