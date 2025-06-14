/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

function ConstraintsTimeLimitPanel({ problemDetails, setProblemDetails }) {
  const [newConstraint, setNewConstraint] = useState("");

  const handleAddConstraint = () => {
    if (newConstraint.trim() !== "") {
      setProblemDetails({
        ...problemDetails,
        constraints: [...problemDetails.constraints, newConstraint.trim()],
      });
      setNewConstraint("");
    }
  };

  const handleRemoveConstraint = (index) => {
    const updatedConstraints = problemDetails.constraints.filter(
      (_, idx) => idx !== index
    );
    setProblemDetails({
      ...problemDetails,
      constraints: updatedConstraints,
    });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg  space-y-6 ">
      {/* Panel Title */}
      <h2 className="text-2xl font-bold text-gray-800">
        Constraints & Time Limits
      </h2>

      {/* Time Limit Input */}
      <div className="space-y-4">
        <label
          htmlFor="timeLimit"
          className="block text-lg font-medium text-gray-700"
        >
          Time Limit (seconds)
        </label>
        <input
          id="timeLimit"
          type="number"
          placeholder="Enter time limit in seconds"
          className="w-full max-w-3xl p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={problemDetails.timeLimit}
          onChange={(e) =>
            setProblemDetails({ ...problemDetails, timeLimit: e.target.value })
          }
        />
      </div>

      {/* Memory Limit Input */}
      <div className="space-y-4">
        <label
          htmlFor="memoryLimit"
          className="block text-lg font-medium text-gray-700"
        >
          Memory Limit (MB)
        </label>
        <input
          id="memoryLimit"
          type="number"
          placeholder="Enter memory limit in MB"
          className="w-full max-w-3xl p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={problemDetails.memoryLimit}
          onChange={(e) =>
            setProblemDetails({
              ...problemDetails,
              memoryLimit: e.target.value,
            })
          }
        />
      </div>

      {/* Constraints Input & List */}
      <div className="space-y-4">
        <label
          htmlFor="constraints"
          className="block text-lg font-medium text-gray-700"
        >
          Constraints
        </label>

        {/* New constraint input */}
        <div className="flex space-x-4">
          <input
            id="constraints"
            type="text"
            placeholder="Enter a new constraint"
            value={newConstraint}
            onChange={(e) => setNewConstraint(e.target.value)}
            className="w-full max-w-3xl p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          {/* Add Constraint Button */}
          <button
            onClick={handleAddConstraint}
            className="flex items-center p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-lg shadow-lg transform hover:scale-105 active:scale-95 transition-transform duration-150 space-x-2"
          >
            <AiOutlinePlus className="text-lg" />
            <span>Add</span>
          </button>
        </div>

        {/* Displaying added constraints */}
        <ul className="space-y-2 max-h-[100px] overflow-y-auto">
          {problemDetails.constraints &&
            problemDetails.constraints.map((constraint, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <span>{constraint}</span>
                {/* Remove Constraint Button */}
                <button
                  onClick={() => handleRemoveConstraint(index)}
                  className="text-red-500 hover:text-red-700 font-medium transform hover:scale-105 transition-transform duration-150"
                >
                  Remove
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default ConstraintsTimeLimitPanel;
