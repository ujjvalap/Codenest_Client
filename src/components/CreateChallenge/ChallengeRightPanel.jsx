/* eslint-disable react/prop-types */
import { Editor } from "@monaco-editor/react";
import React from "react";

function ChallengeRightPanel({
  problemDetails,
  selectedLanguage,
  handleBoilerplateChange,
}) {
  return (
    <div className="w-1/2 p-4 flex flex-col space-y-4 overflow-y-auto max-h-[calc(100vh-80px)]">
      <Editor
        height="400px"
        defaultLanguage="cpp"
        value={problemDetails.boilerplateCode[selectedLanguage]}
        onChange={handleBoilerplateChange}
        className="rounded-lg border border-gray-400"
      />
      <button
        onClick={() =>
          handleBoilerplateChange(
            problemDetails.boilerplateCode[selectedLanguage]
          )
        }
        className="bg-blue-500 w-[20%] text-white p-2 rounded shadow-md mt-2"
      >
        Save Code
      </button>
    </div>
  );
}

export default ChallengeRightPanel;
