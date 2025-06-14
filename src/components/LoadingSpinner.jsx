import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center space-y-2">
        {/* Spinner */}
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-indigo-600 border-opacity-75"></div>
        </div>

        {/* Loading Text with Pulse Effect */}
        <p className="text-indigo-600 font-semibold text-xl animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
