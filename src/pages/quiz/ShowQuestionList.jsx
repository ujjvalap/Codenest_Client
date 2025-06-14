/* eslint-disable react/prop-types */
import React from "react";
import { FaTimes } from "react-icons/fa";

const ShowQuestionList = ({ toggleQuestionList, questions, handleQuestionSelect  }) => {
  return (
    <div className="w-full p-6 text-white relative">
      <button
        onClick={toggleQuestionList}
        className="absolute top-4 right-4 text-gray-200 hover:bg-gray-500 p-2 rounded-full"
      >
        <FaTimes />
      </button>

      <div className="flex justify-between items-center mt-4 bg-gray-800 p-3 rounded-lg">
        <p>
          Total problems <span className="font-bold">{questions?.length}</span> • Attempted{" "}
          <span className="font-bold">0/{questions?.length}</span>
        </p>
        <p className="flex items-center gap-1">
          <span className="text-yellow-400">⚡</span> 0/50
        </p>
      </div>

      {/* Table Format */}
      <div className="mt-4 bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700 text-left text-gray-300">
              <th className="p-3">#</th>
              <th className="p-3">Problem Name</th>
              <th className="p-3 text-center">XP</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr
                key={question.id}
                className="border-b border-gray-600 hover:bg-gray-700 transition rounded-lg cursor-pointer"
                onClick={() => handleQuestionSelect (index)} // Set selected question
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{question.title}</td>
                <td className="p-3 text-center text-yellow-400">
                  {question.maxScore}
                </td>
                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${
                      question.status === "Solved"
                        ? "bg-green-400 text-white"
                        : "bg-blue-400 text-white"
                    }`}
                  >
                    {question.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowQuestionList;
