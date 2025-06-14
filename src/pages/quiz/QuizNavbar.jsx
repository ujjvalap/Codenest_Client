/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiSettings, FiUser } from "react-icons/fi";
import { formatTime } from "../../constants/constant";
import ConfirmationModal from "../../shared/ConfirmationModal";

function QuizNavbar({ toggleQuestionList, challenge }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!challenge) return;
    const startTime = new Date(challenge.startTime).getTime();
    const endTime = new Date(challenge.endTime).getTime();

    const updateTimer = () => {
      const currentTime = Date.now();
      if (currentTime < startTime) {
        setHasStarted(false);
        setHasEnded(false);
        setTimeLeft(startTime - currentTime);
      } else if (currentTime >= startTime && currentTime <= endTime) {
        setHasStarted(true);
        setHasEnded(false);
        setTimeLeft(endTime - currentTime);
      } else {
        setHasStarted(false);
        setHasEnded(true);
        setTimeLeft(0);
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [challenge]);

  return (
    <div className="w-full h-[8vh] flex flex-wrap justify-between items-center px-4 md:px-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
      
      {/* Left Section: Home & Contest Name */}
      <div className="flex items-center space-x-4 md:space-x-6">
        <Link
          to="/challenge-page"
          className="flex items-center text-white hover:text-indigo-200 transition-colors duration-200 text-sm md:text-base"
        >
          <FaHome className="mr-1 md:mr-2 text-lg md:text-xl" />
          <span className="font-semibold">Home</span>
        </Link>

        <div className="border-l-2 border-white h-6 hidden md:block"></div>

        <button
          onClick={toggleQuestionList}
          className="text-xs flex flex-col text-zinc-200 hover:text-white transition-colors duration-200"
        >
          <span className="text-sm font-semibold text-white">Contest Name</span>
          <span className="hidden sm:block">View all problems</span>
        </button>
      </div>

      {/* Right Section: Timer & Buttons */}
      <div className="flex items-center space-x-3 md:space-x-6">
        <div className="text-sm md:text-lg">
          <span>{timeLeft ? formatTime(timeLeft) : "Loading..."}</span>
        </div>

        {hasStarted && !hasEnded && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-1 md:px-6 md:py-2 rounded-lg shadow-md hover:bg-red-400 transition-transform transform hover:scale-105 text-sm md:text-base"
          >
            End Contest
          </button>
        )}

        {/* Icons: Adjusted size for mobile */}
        <button className="text-white hover:text-indigo-200 transition-colors duration-200">
          <FiSettings className="text-xl md:text-2xl" />
        </button>
        <button className="text-white hover:text-indigo-200 transition-colors duration-200">
          <FiUser className="text-xl md:text-2xl" />
        </button>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="End Contest"
        message="Are you sure you want to end this contest?"
      />
    </div>
  );
}

export default QuizNavbar;
