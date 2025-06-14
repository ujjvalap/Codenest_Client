/* eslint-disable react/prop-types */
import React from "react";
import CodeEditor from "../VsCode/CodeEditor";

function CodeAndSolutionsPanel({ problemDetails, setProblemDetails }) {
  // Handle changes to the sample solution
  const handleSolutionChange = (code) => {
    setProblemDetails((prevDetails) => ({
      ...prevDetails,
      sampleSolution: code,
    }));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Code & Solutions
      </h2>

      <div className="relative bg-gray-50 p-4 rounded-lg shadow-inner border border-gray-300 transition-all duration-300">
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Sample Solution
        </h3>
        <div className="h-[400px]">
          {" "}
          {/* Set consistent height for the editor */}
          <CodeEditor
            value={problemDetails.sampleSolution || ""}
            onChange={handleSolutionChange}
            language="javascript" // Adjust language based on requirements
          />
        </div>
      </div>
    </div>
  );
}

export default CodeAndSolutionsPanel;
