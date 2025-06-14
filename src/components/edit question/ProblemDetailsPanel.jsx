/* eslint-disable react/prop-types */
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

function ProblemDetailsPanel({ problemDetails, setProblemDetails }) {
  const handleExampleChange = (id, field, value) => {
    const updatedExamples = problemDetails.examples.map((example) =>
      example._id === id ? { ...example, [field]: value } : example
    );
    setProblemDetails((prev) => ({ ...prev, examples: updatedExamples }));
  }
  

  const addExample = () => {
    const newExample = {
      id: Date.now(), // Unique ID for each example
      input: "",
      output: "",
      explanation: "",
    };
    setProblemDetails((prev) => ({
      ...prev,
      examples: [...prev.examples, newExample],
    }));
  };

  const removeExample = (id) => {
    const updatedExamples = problemDetails.examples.filter(
      (example) => example._id !== id
    );
    setProblemDetails((prev) => ({ ...prev, examples: updatedExamples }));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg space-y-6 overflow-y-auto max-h-[80vh]">
      {/* Panel Title */}
      <h2 className="text-2xl font-bold text-gray-800">Problem Details</h2>

      {/* Problem Title Input */}
      <div className="space-y-4">
        <label
          htmlFor="title"
          className="block text-lg font-medium text-gray-700"
        >
          Problem Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter problem title"
          className="w-full max-w-3xl p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={problemDetails.title}
          onChange={(e) =>
            setProblemDetails({ ...problemDetails, title: e.target.value })
          }
        />
      </div>

      {/* Problem Statement Textarea */}
      <div className="space-y-4">
        <label
          htmlFor="problemStatement"
          className="block text-lg font-medium text-gray-700"
        >
          Problem Statement
        </label>
        <textarea
          id="problemStatement"
          placeholder="Enter problem description"
          rows="6"
          className="w-full max-w-3xl p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
          value={problemDetails.problemStatement}
          onChange={(e) =>
            setProblemDetails({
              ...problemDetails,
              problemStatement: e.target.value,
            })
          }
        />
      </div>

      {/* Examples Section */}
      <div className="space-y-4">
        <label className="block text-lg font-medium text-gray-700">
          Examples
        </label>
        {problemDetails.examples.map((example) => (
          <div
            key={example._id}
            className="p-4 border border-gray-200 rounded-lg shadow-sm space-y-3 bg-gray-50"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-700">Example</h3>
              <button
                onClick={() => removeExample(example._id)}
                className="text-red-500 hover:underline text-sm font-medium transform hover:scale-105 transition-transform duration-150"
              >
                Remove
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-gray-600 font-medium">Input</label>
              <textarea
                placeholder="Enter input"
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                value={example.input}
                onChange={(e) =>
                  handleExampleChange(example._id, "input", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-600 font-medium">Output</label>
              <textarea
                placeholder="Enter output"
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                value={example.output}
                onChange={(e) =>
                  handleExampleChange(example._id, "output", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-600 font-medium">
                Explanation (optional)
              </label>
              <textarea
                placeholder="Enter explanation"
                rows="2"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                value={example.explanation}
                onChange={(e) =>
                  handleExampleChange(example._id, "explanation", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <button
          onClick={addExample}
          className="mt-4 px-4 py-2 bg-gradient-to-b from-blue-500 to-blue-700 text-white font-medium rounded-lg shadow-lg transform hover:scale-105 active:scale-95 transition-transform duration-150 flex items-center space-x-2"
        >
          <AiOutlinePlus className="text-lg" />
          {problemDetails.examples.length > 0 ? (
            <span>Add Another Example</span>
          ) : (
            <span>Add Example</span>
          )}
        </button>
      </div>

      {/* Input Format Textarea */}
      <div className="space-y-4">
        <label
          htmlFor="inputFormat"
          className="block text-lg font-medium text-gray-700"
        >
          Input Format
        </label>
        <textarea
          id="inputFormat"
          placeholder="Enter input format"
          rows="3"
          className="w-full max-w-3xl p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
          value={problemDetails.inputFormat}
          onChange={(e) =>
            setProblemDetails({
              ...problemDetails,
              inputFormat: e.target.value,
            })
          }
        />
      </div>

      {/* Output Format Textarea */}
      <div className="space-y-4">
        <label
          htmlFor="outputFormat"
          className="block text-lg font-medium text-gray-700"
        >
          Output Format
        </label>
        <textarea
          id="outputFormat"
          placeholder="Enter output format"
          rows="3"
          className="w-full max-w-3xl p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
          value={problemDetails.outputFormat}
          onChange={(e) =>
            setProblemDetails({
              ...problemDetails,
              outputFormat: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}

export default ProblemDetailsPanel;
