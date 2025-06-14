/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddQuizQuestion from "../../pages/quiz/AddQuizQuetion";
import ConfirmationDeleteModal from "../../shared/ConfirmationDeleteModal";
import { useDeleteQuizQuestionMutation } from "../../redux/api/api";
import useMutationToast from "../../hooks/useMutationToast";

export default function QuizProblemList({ questions, quizData }) {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState(null);

  const [deleteQuizQuestion, deleteStatus] = useDeleteQuizQuestionMutation();

  // Custom hook for handling mutation responses
  useMutationToast({
    ...deleteStatus,
    successMessage: deleteStatus.data?.message,
  });

  const handleEdit = (question) => {
    setEditData(question);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setQuestion(id);
    setIsModalOpen(true);
  };

  const handleDeleteQuizQuestion = () => {
    deleteQuizQuestion(question);
  };

  return (
    <div className="min-h-screen">
      {/* Stats Cards Container */}
      <div className="grid grid-cols-2 gap-4 sm:flex sm:justify-center mb-6">
        {/* Total Questions Card */}
        <div className="bg-white border-l-4 border-indigo-500 shadow-md rounded-lg p-4 text-center sm:w-48">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Questions
          </h2>
          <p className="text-2xl font-bold text-indigo-900">
            {quizData?.questions?.length || 0}
          </p>
        </div>

        {/* Total Marks Card */}
        <div className="bg-white border-l-4 border-green-500 shadow-md rounded-lg p-4 text-center sm:w-48">
          <h2 className="text-lg font-semibold text-gray-700">Total Marks</h2>
          <p className="text-2xl font-bold text-green-900">
            {quizData?.totalMarks || 0}
          </p>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-indigo-700 text-center mt-6 mb-4">
        Added Questions
      </h2>

      {/* Grid layout with uniform height cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {questions.map((question, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-l-4 border-indigo-500 flex flex-col justify-between"
          >
            {/* Question */}
            <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
              Q{index + 1}: {question.text}
            </h2>

            <div className="grid grid-cols-2 gap-2 text-gray-600 mt-4">
              {question.options.map((opt, i) => (
                <div
                  key={i}
                  className={`p-3 border rounded-md text-center font-medium ${
                    question.correctAnswerIndex === i
                      ? "bg-green-100 text-green-700 border-green-500 font-bold"
                      : "border-gray-300"
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>

            {/* Action Buttons - Always at the Bottom */}
            <div className="flex justify-between items-center mt-4">
              <button
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition"
                onClick={() => handleEdit(question)}
              >
                <FaEdit />
                <span>Edit</span>
              </button>

              <button
                className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold transition"
                onClick={() => handleDelete(question._id)}
              >
                <FaTrash />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <AddQuizQuestion
          onClose={() => setShowForm(false)}
          editData={editData}
        />
      )}

      {/* Modal for Delete Confirmation */}
      <ConfirmationDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteQuizQuestion}
        title="Delete Question"
        message="Are you sure you want to delete this question? This action cannot be undone."
      />
    </div>
  );
}
