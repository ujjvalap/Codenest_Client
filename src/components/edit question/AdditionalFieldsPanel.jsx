/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const defaultTags = [
  "Array",
  "Linked List",
  "Stack",
  "Queue",
  "Dynamic Programming",
  "Greedy",
  "Graph",
  "Binary Tree",
  "Sorting",
  "Searching",
  "Recursion",
  "Backtracking",
  "Bit Manipulation",
  "Mathematics",
];

function AdditionalFieldsPanel({ problemDetails, setProblemDetails }) {
  const [newHint, setNewHint] = useState("");

  const handleAddHint = () => {
    if (newHint.trim() !== "") {
      setProblemDetails({
        ...problemDetails,
        hints: [...problemDetails.hints, newHint.trim()],
      });
      setNewHint("");
    }
  };

  const handleRemoveHint = (index) => {
    const updatedHint = problemDetails.hints.filter((_, idx) => idx !== index);
    setProblemDetails({
      ...problemDetails,
      hints: updatedHint,
    });
  };

  const handleTagClick = (tag) => {
    // Check if the tag is already selected
    const newTags = problemDetails.tags.includes(tag)
      ? problemDetails.tags.filter((selectedTag) => selectedTag !== tag)
      : [...problemDetails.tags, tag];

    setProblemDetails({ ...problemDetails, tags: newTags });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Additional Fields
      </h2>

      {/* Hints Field */}
      <div className="space-y-4 mb-6">
        <label
          htmlFor="hints"
          className="block text-lg font-medium text-gray-700"
        >
          Hints
        </label>

        {/* New hint input */}
        <div className="flex space-x-4">
          <input
            id="hints"
            type="text"
            placeholder="Enter a new hit"
            value={newHint}
            onChange={(e) => setNewHint(e.target.value)}
            className="w-full max-w-3xl p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          {/* Add Hint Button */}
          <button
            onClick={handleAddHint}
            className="flex items-center p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-lg shadow-lg transform hover:scale-105 active:scale-95 transition-transform duration-150 space-x-2"
          >
            <AiOutlinePlus className="text-lg" />
            <span>Add</span>
          </button>
        </div>

        {/* Displaying added hints */}
        <ul className="space-y-2  max-h-[100px] overflow-y-auto">
          {problemDetails.hints &&
            problemDetails.hints.map((hint, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <span>{hint}</span>
                {/* Remove HintButton */}
                <button
                  onClick={() => handleRemoveHint(index)}
                  className="text-red-500 hover:text-red-700 font-medium transform hover:scale-105 transition-transform duration-150"
                >
                  Remove
                </button>
              </li>
            ))}
        </ul>
      </div>

      {/* Tags Field with Selectable Buttons in Grid Layout */}
      <div className="mb-6">
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Tags (Select multiple)
        </label>

        {/* Tags Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {defaultTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => handleTagClick(tag)}
              className={`p-2 rounded-md text-sm font-medium transition duration-300 
                  ${
                    problemDetails.tags.includes(tag)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-blue-200"
                  }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Level Field */}
      <div className="mb-6">
        <label
          htmlFor="difficulty"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Difficulty Level
        </label>
        <select
          id="difficulty"
          className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 transition duration-300"
          value={problemDetails.difficulty}
          onChange={(e) =>
            setProblemDetails({ ...problemDetails, difficulty: e.target.value })
          }
        >
          <option value="">Select Difficulty Level</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
    </div>
  );
}

export default AdditionalFieldsPanel;
