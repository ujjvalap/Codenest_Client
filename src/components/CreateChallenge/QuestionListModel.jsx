/* eslint-disable react/prop-types */
import React from "react";
import { FaTimes } from "react-icons/fa";
import QuestionList from "../edit question/QuestionList";

const QuestionListModal = ({
  showQuestionList,
  setShowQuestionList,
  challengeData,
}) => {
  if (!showQuestionList) return null; // Don't render anything if `showQuestionList` is false

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-3xl p-6 sm:p-8 lg:p-10">
        {/* Close button */}
        <button
          onClick={() => setShowQuestionList(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2 border-b border-gray-200 pb-3">
          Question List
        </h2>

        {/* Content */}
        <div className="overflow-y-auto max-h-[70vh]">
          <QuestionList
            NotShowQuestion={challengeData.questions}
            setShowQuestionList={setShowQuestionList}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionListModal;
