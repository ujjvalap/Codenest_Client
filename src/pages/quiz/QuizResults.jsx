/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdCheck, MdCheckCircle, MdClose, MdHome, MdRadioButtonUnchecked, MdVisibility } from "react-icons/md";

const QuizResults = ({ submission }) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  if (!submission) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-center text-red-600">No quiz data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      {/* Quiz Completion Card */}
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center shadow-lg mb-6">
        <MdCheckCircle className="text-5xl text-green-400 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold mb-4">
          {submission.quiz.name} - Completed
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          You have successfully completed the quiz. Here are your results:
        </p>

        {/* Score and Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded-md">
            <p className="text-xl font-semibold text-blue-400">
              {submission.totalScore}
            </p>
            <p className="text-gray-400 text-xs mt-1">Total Score</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <p className="text-xl font-semibold text-green-400">
              {submission.answers.length}/{submission?.quiz?.questions?.length}
            </p>
            <p className="text-gray-400 text-xs mt-1">Questions Answered</p>
          </div>
        </div>
{/* 
        <p className="text-gray-400 text-sm">
          Total Time Taken:{" "}
          <span className="text-blue-400">
            {submission.totalTimeTaken / 1000} sec
          </span>
        </p> */}
      </div>

      {/* Buttons Section */}
      <div className="w-full max-w-md flex flex-col sm:flex-row sm:justify-center sm:gap-4 mb-6">
        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/user/quiz/dashboard")}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2 transition mb-3 sm:mb-0"
        >
          <MdHome className="text-lg" /> Back to Home
        </button>

        {/* See Results Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2 transition"
        >
          <MdVisibility className="text-lg" />
          {showDetails ? "Hide Details" : "See Results"}
        </button>
      </div>

      {/* Questions & Answers Breakdown (Hidden Initially) */}
      {showDetails && (
        <div className="p-6 max-w-2xl mx-auto bg-gray-800 shadow-md rounded-lg w-full">
          {submission.answers.map((answer, index) => {
            const { question, selectedOption, isCorrect } = answer;
            const correctIndex = question.correctAnswerIndex;

            return (
              <div
                key={index}
                className="mb-6 p-4 bg-gray-700 shadow-md rounded-md"
              >
                {/* Question */}
                <p className="font-semibold text-lg mb-3">
                  {index + 1}. {question.text}
                </p>

                {/* Options List */}
                <ul className="space-y-2">
                  {question.options.map((option, i) => (
                    <li
                      key={i}
                      className={`flex items-center gap-2 p-2 rounded-md ${
                        i === selectedOption
                          ? isCorrect
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : i === correctIndex
                          ? "bg-blue-500 text-white"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {/* Show different icons based on selection & correctness */}
                      {i === selectedOption ? (
                        isCorrect ? (
                          <MdCheck className="text-xl" /> // ✅ Correct Answer
                        ) : (
                          <MdClose className="text-xl" /> // ❌ Wrong Answer
                        )
                      ) : i === correctIndex ? (
                        <MdCheck className="text-xl" /> // ✅ Correct Answer (for unselected)
                      ) : (
                        <MdRadioButtonUnchecked className="text-xl text-gray-400" /> // Normal option
                      )}

                      {/* Option Text */}
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizResults;
