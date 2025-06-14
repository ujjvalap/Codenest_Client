/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineFileSearch } from "react-icons/ai"; // Importing a search icon
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useAddQuestionMutation,
  useGetQuestionsQuery,
} from "../../redux/api/api";
import { setQuestionID } from "../../redux/reducers/auth";
import LoadingSpinner from "../LoadingSpinner";
import {ChatBotModal} from "../../pages/host/ChatBotModal"

const QuestionList = ({ NotShowQuestion = [], setShowQuestionList }) => {
  const navigate = useNavigate();
  const [showChatBot, setShowChatBot] = useState(false);
  const handlechatBot = () => {
    setShowChatBot(true);
  };
  
  const dispatch = useDispatch();

  const { challengeID } = useSelector((state) => state.auth);

  // Fetch challenge data
  const { data: challengeData } = useGetQuestionsQuery();
  const questions = challengeData?.questions;

  const [addQuestion, { isLoading, isSuccess, data, isError, error }] =
    useAddQuestionMutation();

  // Local state for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Handle edit/navigate to the question details
  const handleAddQuestion = async (questionID) => {
    await addQuestion({
      challengeID: challengeID,
      questionID: { questionID: questionID },
    });
  };

  // Navigate to add question page
  const handleCreateQuestion = () => {
    dispatch(setQuestionID(null));
    navigate("/add-question");
  };

  
  
  // Effect to display toast notifications based on mutation statuses
  useEffect(() => {
    if (isLoading) {
      toast.loading("Processing...");
    } else if (isSuccess) {
      toast.dismiss();
      toast.success(data.message);
      setShowQuestionList(false);
    } else if (isError) {
      toast.dismiss();
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isLoading, isSuccess, isError, error]);

  if (!questions) {
    return <LoadingSpinner />; // Display loading spinner while fetching data
  }

  // Filtered questions based on search query
  const filteredQuestions = questions.filter(
    (question) =>
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !NotShowQuestion.some((notShow) => notShow._id === question._id)
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-xl max-w-3xl mx-auto">
     <div className="mb-6 flex gap-4">
  <button
    onClick={handleCreateQuestion}
    className="w-1/2 bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition-all text-base font-medium"
  >
    Create New
  </button>

  <button
    onClick={handlechatBot}
    className="w-1/2 bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all text-base font-medium flex items-center justify-center gap-2"
  >
    <span>🤖 AI Generate</span>
  </button>
</div>

{showChatBot && <ChatBotModal onClose={() => setShowChatBot(false)} />}

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-gray-700">
          Existing Questions
        </h3>

        {/* Search field */}
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Scrollable Section */}
        <div className="overflow-y-auto max-h-60">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <button
                key={question._id}
                onClick={() => handleAddQuestion(question._id)}
                className="w-full bg-gray-100 hover:bg-gray-200 mb-2 rounded-lg p-4 shadow-sm transition-all flex justify-between items-center"
              >
                <span className="text-lg text-gray-600 font-medium">
                  {question.title}
                </span>
                <span className="text-sm text-gray-500">
                  {question.difficulty}
                </span>
              </button>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center mt-4 text-gray-500">
              <AiOutlineFileSearch size={50} className="mb-2" />
              <p className="text-lg font-medium">No questions found</p>
              <p className="text-sm text-gray-400">
                Try adjusting your search or create a new question.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
