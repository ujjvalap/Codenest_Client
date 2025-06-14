/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { BiCodeBlock } from "react-icons/bi";
import { FiCheck } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useGetSubmissionsQuery } from "../../redux/api/api";
import SubmissionsTable from "./SubmissionTable";

function QuestionProblem({ QuestionData }) {
  const [activeTab, setActiveTab] = useState("Problem");

  const { challengeID, challengeProgress } = useSelector((state) => state.auth);

  const { data, isLoading, isError, error } = useGetSubmissionsQuery({
    challengeID: challengeID,
    questionID: QuestionData._id,
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const isSolved = challengeProgress?.solvedQuestions.some(
    (solvedQues) => solvedQues._id === QuestionData._id
  );

  return (
    <div className="w-full h-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg ">
      {/* Header Navigation */}
      <div className="sticky top-0 bg-white z-5">
        <div className="flex border-b border-gray-200 pb-3 mb-5">
          {["Problem", "Solution", "Submission"].map((tab) => (
            <button
              key={tab}
              className={`text-gray-700 font-semibold px-4 py-2 rounded-t-md ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Container with Scrolling */}
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        {/* Content based on Active Tab */}
        {activeTab === "Problem" && (
          <div>
            {/* Question Title and Meta Information */}
            <div className="mb-6">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    isSolved ? "bg-green-500 text-white" : "bg-white text-black"
                  }`}
                >
                  {isSolved ? (
                    <FiCheck className="text-lg text-white" /> // Green checkmark icon for solved
                  ) : (
                    <BiCodeBlock className="text-lg text-black" /> // Coding icon for not solved
                  )}
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                  {QuestionData.title}
                </h1>
              </div>
              <div className="text-sm text-gray-500 flex items-center space-x-4">
                <span
                  className={`font-medium ${getDifficultyColor(
                    QuestionData.difficulty
                  )}`}
                >
                  {QuestionData.difficulty}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">
                    ✨ {isSolved ? QuestionData.maxScore : 0} /
                    {QuestionData.maxScore}
                  </span>
                </div>
              </div>
            </div>

            {/* Question Statement */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Problem statement:
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {QuestionData.problemStatement}
              </p>
            </div>

            {/* Input and Output Format */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Input Format:
              </h2>
              <p className="text-gray-700">{QuestionData.inputFormat}</p>

              <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                Output Format:
              </h2>
              <p className="text-gray-700">{QuestionData.outputFormat}</p>
            </div>

            {/* Examples Section */}
            {QuestionData.examples && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Examples:
                </h2>
                {QuestionData.examples.map((example, i) => (
                  <div
                    key={i}
                    className="p-4 mb-4 bg-gray-50 rounded-md border border-gray-200"
                  >
                    <h3 className="text-md font-semibold text-gray-800 mb-2">
                      Example {i + 1}
                    </h3>

                    <p className="text-gray-700 font-semibold mb-1">Input:</p>
                    <p className="text-gray-700 mb-2 whitespace-pre-wrap">
                      {example.input}
                    </p>

                    <p className="text-gray-700 font-semibold mb-1">Output:</p>
                    <p className="text-gray-700 mb-2 whitespace-pre-wrap">
                      {example.output}
                    </p>

                    {example.explanation && (
                      <>
                        <p className="text-gray-700 font-semibold mb-1">
                          Explanation:
                        </p>
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {example.explanation}
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Constraints Section */}
            {QuestionData.constraints && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Constraints
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {QuestionData.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Additional Info: Tags */}
            {QuestionData.tags && QuestionData.tags.length > 0 && (
              <div className="mb-4">
                <span className="font-semibold text-gray-800">Tags:</span>
                <div className="flex flex-wrap mt-2">
                  {QuestionData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-sm text-blue-700 bg-blue-100 px-2 py-1 rounded-full mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "Solution" && (
          <div className="text-gray-700">
            {/* Solution content */}
            <p>This section will contain solution-related information.</p>
          </div>
        )}

        {activeTab === "Submission" && (
          <div>
            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
                <p className="ml-3 text-blue-600">Loading submissions...</p>
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="text-gray-600">
                <p>
                  {error?.data?.message || error?.message || "Unknown error"}
                </p>
              </div>
            )}

            {/* Success State */}
            {!isLoading && !isError && (
              <>
                {data && data.submissions.length > 0 ? (
                  <SubmissionsTable submissions={data.submissions} />
                ) : (
                  <p className="text-gray-600">
                    No submissions yet for this challenge or question. Stay
                    tuned!
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to style the difficulty label
function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case "Easy":
      return "text-green-600";
    case "Medium":
      return "text-yellow-600";
    case "Hard":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}

export default QuestionProblem;
