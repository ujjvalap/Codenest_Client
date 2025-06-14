import React from 'react';
import { FaClock } from 'react-icons/fa';
import { format } from 'date-fns';

function ProblemOfTheDay() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Problem of the Day Header */}
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Problem of the Day
      </h1>

      {/* Problem Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Date and Time */}
        <div className="flex items-center gap-3 text-gray-500">
          <FaClock />
          <p className="text-lg">{format(new Date(), "MMMM dd, yyyy")}</p>
        </div>

        {/* Problem Title */}
        <h2 className="text-2xl font-semibold text-gray-800">
          Solve the Maximum Subarray Problem
        </h2>

        {/* Difficulty and Topic Tags */}
        <div className="flex items-center gap-4">
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-200 text-green-800">
            Easy
          </span>
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-200 text-blue-800">
            Array
          </span>
        </div>

        {/* Problem Description */}
        <p className="text-gray-700">
          Given an integer array, find the contiguous subarray with the largest sum.
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-full">Array</span>
          <span className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-full">Dynamic Programming</span>
        </div>

        {/* Solve Button */}
        <button className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-700 transition">
          Solve Now
        </button>
      </div>
    </div>
  );
}

export default ProblemOfTheDay;
