import React from "react";

function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col animate-pulse">
      {/* Navbar */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md w-full overflow-hidden">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo section */}
          <a href="#" className="cursor-pointer flex items-center">
            <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
          </a>

          {/* Navigation links */}
          <ul className="hidden md:flex space-x-8 text-lg">
            <li>
              <a href="#" className="hover:text-yellow-300">
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300">
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </a>
            </li>
          </ul>
          {/* Mobile Menu Button */}
          <button className="md:hidden block text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow bg-gray-800">
        {/* Title Section */}
        <div className="text-center py-12 px-4">
          <div className="h-10 bg-gray-200 rounded w-3/4 sm:w-1/2 mx-auto mb-4"></div>
          <div className="h-5 bg-gray-200 rounded w-44 mx-auto"></div>
        </div>

        {/* Tabs Section */}
        <div className="flex justify-center space-x-4 sm:space-x-8 mb-6 px-4">
          <div className="px-11 py-6 bg-gray-200 rounded-md text-lg font-semibold"></div>
          <div className="px-11 py-6 bg-gray-200 rounded-md text-lg font-semibold"></div>
        </div>

        {/* Card Section */}
        <div className="bg-gray-200 rounded-lg p-6 sm:p-8 max-w-md mx-auto">
          {/* Card Title */}
          <div className="mb-6">
            <div className="h-8 bg-gray-300 rounded mx-auto w-2/3 sm:w-3/4"></div>
          </div>

          {/* Card Content */}
          <div className="mb-8">
            <div className="h-5 bg-gray-300 rounded mx-auto w-full"></div>
            <div className="h-5 bg-gray-300 rounded mx-auto w-4/5 my-2"></div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col space-y-4 items-center">
            <div className="w-full sm:w-2/3 py-3 px-6 bg-gray-300 h-10 rounded-md"></div>
            <div className="w-full sm:w-2/3 py-3 px-6 bg-gray-300 h-10 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSkeleton;
