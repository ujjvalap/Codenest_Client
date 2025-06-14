/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FiChevronRight, FiChevronDown, FiX, FiCheck } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";

function Output({ handleCloseOutput, isLoading, ErrorMessage, output }) {
  const [expandedIndex, setExpandedIndex] = useState(null); // Tracks the expanded test case

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Find the index of the first failing test case
  const firstFailIndex = output?.findIndex(
    (result) => result?.status === "Fail"
  );

  // Limit output to the first failing test case and previous test cases
  const limitedOutput =
    firstFailIndex !== -1 ? output?.slice(0, firstFailIndex + 1) : output;

  // Check if all test cases passed
  const allTestCasesPassed = output?.every(
    (result) => result.status === "Pass"
  );

  return (
    <div className="w-full h-full bg-white text-gray-800 rounded-lg shadow p-6 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-300">
        <h1 className="text-xl font-semibold">Execution Results</h1>
        <button
          onClick={handleCloseOutput}
          className="text-gray-500 hover:text-red-500"
        >
          <FiX className="text-xl" />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-20 text-gray-600">
            <FaSpinner className="animate-spin text-3xl mr-2" />
            <span className="text-base">Running your code...</span>
          </div>
        ) : ErrorMessage ? (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded whitespace-pre-wrap">
            {ErrorMessage}
          </div>
        ) : (
          <div>
            {limitedOutput?.length > 0 ? (
              <div className="space-y-4">
                {/* Display success message if all test cases passed */}
                {/* {allTestCasesPassed && (
                  <div className="text-green-600 text-base font-semibold bg-green-50 p-3 rounded mb-4">
                    All test cases passed
                  </div>
                )} */}

                {/* Test Cases */}
                <div className="bg-gray-50 rounded-lg border border-gray-200">
                  <h2 className="p-3 bg-gray-100 font-semibold text-gray-800">
                    {limitedOutput.length} Test Cases
                  </h2>
                  <div className="divide-y divide-gray-200">
                    {limitedOutput.map((result, index) => (
                      <div key={index}>
                        {/* Test Case Header */}
                        <div
                          className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100"
                          onClick={() => toggleExpand(index)}
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                                result.status === "Fail"
                                  ? "bg-red-500 text-white"
                                  : "bg-green-500 text-white"
                              }`}
                            >
                              {result.status === "Fail" ? (
                                <FiX className="text-sm" /> // Red cross icon for Fail
                              ) : (
                                <FiCheck className="text-sm" /> // Green checkmark icon for Pass
                              )}
                            </div>
                            <span className="text-sm font-medium">
                              Test case {index + 1}
                            </span>
                          </div>
                          {expandedIndex === index ? (
                            <FiChevronDown className="text-gray-600" />
                          ) : (
                            <FiChevronRight className="text-gray-600" />
                          )}
                        </div>

                        {/* Expanded Content */}
                        {expandedIndex === index && (
                          <div className="bg-gray-50 p-4 space-y-2">
                            <Section title="Input: " content={result.input} />
                            <Section
                              title="Output: "
                              content={result.actualOutput}
                              status={result.status}
                            />
                            <Section
                              title="Desired Output: "
                              content={result.expectedOutput}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center">
                No output generated.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* Section Component */
const Section = ({ title, content, status }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
    <div
      className={`p-2 text-sm font-mono whitespace-pre-wrap ${
        status === "Fail" ? "text-red-600" : "text-gray-700"
      }`}
    >
      {content}
    </div>
  </div>
);

export default Output;
