/* eslint-disable react/prop-types */
import React from "react";

function MetricsPanel({ problemDetails, setProblemDetails }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-h-[600px]">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Problem Metrics
      </h2>
      <div className="space-y-6">
        {/* Score */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Score
          </label>
          <input
            type="number"
            placeholder="Max Score"
            className="border-2 border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={problemDetails.maxScore}
            onChange={(e) =>
              setProblemDetails({
                ...problemDetails,
                maxScore: e.target.value,
              })
            }
          />
        </div>

        {/* Difficulty Score */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty Score (1-10)
          </label>
          <input
            type="number"
            min="1"
            max="10"
            placeholder="Difficulty Score"
            className="border-2 border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={problemDetails.difficultyScore}
            onChange={(e) =>
              setProblemDetails({
                ...problemDetails,
                difficultyScore: e.target.value,
              })
            }
          />
        </div>

        {/* Estimated Solve Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Solve Time (minutes)
          </label>
          <input
            type="text"
            min="1"
            placeholder="Estimated Solve Time"
            className="border-2 border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={problemDetails.estimatedSolveTime}
            onChange={(e) =>
              setProblemDetails({
                ...problemDetails,
                estimatedSolveTime: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default MetricsPanel;
