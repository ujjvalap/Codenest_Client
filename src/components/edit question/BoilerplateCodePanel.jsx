/* eslint-disable react/prop-types */
import React, { useState } from "react";
import CodeEditor from "../VsCode/CodeEditor";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "../../constants/constant";
import { AiOutlineClose } from "react-icons/ai";

function BoilerplateCodePanel({ problemDetails, setProblemDetails }) {
  const languages = ["cpp", "java", "python", "javascript"];
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  // Toggle the CodeEditor view for the selected language
  const handleLanguageSelect = (language) => {
    setSelectedLanguage((prev) => (prev === language ? null : language));
  };

  // Update boilerplate code for the selected language as the user types
  const handleCodeChange = (code) => {
    setProblemDetails((prevDetails) => ({
      ...prevDetails,
      boilerplateCode: {
        ...prevDetails.boilerplateCode,
        [selectedLanguage]: code,
      },
    }));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Boilerplate Code
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {languages.map((language) => (
          <button
            key={language}
            onClick={() => handleLanguageSelect(language)}
            className={`py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
              selectedLanguage === language
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {language}
          </button>
        ))}
      </div>

      {selectedLanguage && (
        <div className="relative bg-gray-50 p-4 rounded-lg shadow-inner border border-gray-300 transition-all duration-300 mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Boilerplate Code for {selectedLanguage}
          </h3>
          <div className="h-[400px]"> {/* Ensure the parent has a fixed height or a max height */}
            <CodeEditor
              language={LANGUAGE_VERSIONS[selectedLanguage]}
              value={
                problemDetails.boilerplateCode?.[selectedLanguage] ||
                CODE_SNIPPETS[selectedLanguage] // Default to snippet if boilerplate is empty
              }
              onChange={handleCodeChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default BoilerplateCodePanel;
