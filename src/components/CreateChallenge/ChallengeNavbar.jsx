/* eslint-disable react/prop-types */
import React from "react";
import { AiOutlineSave } from "react-icons/ai";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function ChallengeNavbar({ handleSaveProblem }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <nav className="w-full bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Home and Back buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center text-gray-200 hover:text-white transition-colors duration-200 px-3 py-2 rounded-md hover:bg-indigo-600"
            >
              <FaHome className="mr-2 text-lg" />
              <span className="font-semibold">Home</span>
            </Link>

            {/* Divider */}
            <div className="h-6 border-l border-gray-200"></div>

            {/* Back Button */}
            <button
              onClick={handleBackClick}
              className="flex items-center text-gray-200 hover:text-white transition-colors duration-200 px-3 py-2 rounded-md hover:bg-indigo-600"
            >
              <FaArrowLeft className="mr-2 text-lg" />
              <span className="font-semibold">Back</span>
            </button>
          </div>

          {/* Center - Save Problem button */}
          <div className="flex space-x-4">
            <button
              onClick={handleSaveProblem}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 active:scale-95 transition-transform duration-150 space-x-2"
            >
              <AiOutlineSave className="text-lg" />
              <span>Save Problem</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default ChallengeNavbar;
