import React from 'react';
import { FaClock, FaTasks, FaPen } from 'react-icons/fa';
import { format } from 'date-fns';

function SDEDashboard() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* SDE Dashboard Header */}
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        SDE Dashboard
      </h1>

      {/* SDE Stats Section */}
      <div className="flex flex-wrap gap-6 mb-8">
        <div className="w-full sm:w-1/2 lg:w-1/4 bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800">Today's Problem</h3>
          <div className="text-4xl text-blue-600">
            <FaClock />
          </div>
          <p className="text-gray-600">Solve a new problem today!</p>
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/4 bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800">Total Challenges Solved</h3>
          <div className="text-4xl text-green-600">
            <FaTasks />
          </div>
          <p className="text-gray-600">50 Challenges</p>
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/4 bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800">Profile Updates</h3>
          <div className="text-4xl text-yellow-600">
            <FaPen />
          </div>
          <p className="text-gray-600">Update your profile and resume</p>
        </div>
      </div>

      {/* Latest Problem Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-center gap-3 text-gray-500">
          <FaClock />
          <p className="text-lg">{format(new Date(), "MMMM dd, yyyy")}</p>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Implement a Linked List in Java
        </h2>
        <div className="flex items-center gap-4 mt-4">
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-200 text-blue-800">
            Easy
          </span>
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-200 text-green-800">
            Data Structures
          </span>
        </div>
        <p className="text-gray-700 mt-4">
          Implement a basic linked list in Java. Your implementation should support adding, removing, and retrieving elements.
        </p>
        <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Start Coding
        </button>
      </div>

      {/* Interview Prep Section */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Interview Preparation
        </h2>
        <p className="text-gray-600">
          Get ready for your upcoming interviews! Check out our curated list of problems based on common SDE interviews.
        </p>
        <div className="mt-6 flex flex-wrap gap-6">
          <div className="w-full sm:w-1/2 lg:w-1/4 bg-blue-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold">Array Manipulation</h4>
            <p className="text-gray-600">10 Problems</p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 bg-yellow-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold">Dynamic Programming</h4>
            <p className="text-gray-600">15 Problems</p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 bg-green-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold">Binary Trees</h4>
            <p className="text-gray-600">12 Problems</p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 bg-red-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold">Graph Theory</h4>
            <p className="text-gray-600">8 Problems</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SDEDashboard;
