/* eslint-disable react/prop-types */
import React from "react";
import ConfirmationDeleteModal from "../../shared/ConfirmationDeleteModal";
import { FaClock, FaEdit, FaPlus, FaTrash, FaTrophy } from "react-icons/fa";

const ProblemList = ({
  challengeData = { questions: [] },
  handleEditProblem,
  handleDeleteProblem,
  handleTestCaseToggle,
  isQuestionModalOpen,
  setIsQuestionModalOpen,
  DeleteProblemConform,
}) => {
  return (
    <div className="w-full  p-4">
      <h2 className="text-2xl font-bold text-indigo-700">
        Challenge Questions
      </h2>
      <div className="rounded-xl max-h-[700px] overflow-y-auto p-2 ">
        {challengeData.questions.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mt-2">
            {challengeData.questions.map((question, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 border-indigo-500 relative"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                  {question.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-1">
                  {question.problemStatement}
                </p>

                <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-indigo-500" />
                    <span className="font-medium">
                      {question?.estimatedSolveTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTrophy className="text-yellow-500" />
                    <span className="font-medium">
                      {question?.maxScore} Points
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEditProblem(question._id)}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => DeleteProblemConform(question._id)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold transition-colors duration-200"
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>

                  {/* Test Cases Button */}
                  <button
                    onClick={() => handleTestCaseToggle(question._id)}
                    className="gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200"
                  >
                    {question.testCases?.length > 0 ? (
                      <span className="text-lg font-bold text-indigo-600">
                        {question.testCases.length} Test Case
                        {question.testCases.length > 1 ? "s" : ""}
                      </span>
                    ) : (
                      <div className="flex items-center gap-1">
                        <FaPlus className="text-indigo-600" />
                        <span className="text-sm">Add Test Cases</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">
            No questions available.
          </p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationDeleteModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
        onConfirm={handleDeleteProblem}
        title="Delete Problem"
        message="Are you sure you want to delete this problem? This action cannot be undone."
      />
    </div>
  );
};

export default ProblemList;
