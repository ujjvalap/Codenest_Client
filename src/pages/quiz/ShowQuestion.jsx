/* eslint-disable react/prop-types */
import React from "react";
import { BiCodeBlock } from "react-icons/bi";
import { FiCheck } from "react-icons/fi";

const ShowQuestion = ({ question, isSolved }) => {
  return (
    <div className="w-full p-4 text-white">
      {/* Question Title and Meta Information */}
      <div className="mb-6 border-b border-zinc-600">
        <div className="flex items-center space-x-2">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
              isSolved ? "bg-green-500 text-white" : "bg-white "
            }`}
          >
            {isSolved ? (
              <FiCheck className="text-lg text-white" />
            ) : (
              <BiCodeBlock className="text-lg text-black" />
            )}
          </div>
          <h2 className="font-bold mb-1">{question.title}</h2>
        </div>
        <div className=" text-gray-500 flex items-center space-x-2 mb-2">
          <p className="text-xs font-semibold text-gray-400">
            {question.difficulty} •
          </p>
          <div className="flex items-center">
            <span className="text-sm font-semibold">
              ✨ {isSolved ? question.maxScore : 0} / {question.maxScore}
            </span>
          </div>
        </div>
      </div>

      {/* Question Statement */}
      <div className="mb-8">
        <h2 className="font-semibold mb-2">Problem statement</h2>
        <p className="text-zinc-200 leading-relaxed whitespace-pre-line">
          {question.problemStatement}
        </p>
      </div>
    </div>
  );
};

export default ShowQuestion;
