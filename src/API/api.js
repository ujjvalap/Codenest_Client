import axios from "axios";
import { LANGUAGE_VERSIONS } from "../constants/constant";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

const handleInputForLanguage = (input, language) => {
  if (language === "python") {
    // Split input by space (for space-separated values like '3 5')
    const formattedInput = input.split("\n").map((line) => {
      if (line.trim().includes(" ")) {
        // Handle space-separated input in Python
        return line.split(" ").map(value => value.trim()).join("\n"); // Split by space and join each number with a newline
      }
      return line.trim();
    }).join("\n");
    return formattedInput;
  }

  if (language === "javascript") {
    // JavaScript input handling - usually string manipulation is enough
    return input
      .split("\n")
      .map((line) => line.trim())
      .join("\n");
  }

  // For Java, we don't need to change much for standard input formatting
  return input; // Default for other languages like Java
};


export const executeCode = async (language, sourceCode, testCases = []) => {
  try {
    const results = [];

    for (const testCase of testCases) {
      const formattedInput = handleInputForLanguage(testCase?.input, language);

      const response = await API.post("/execute", {
        language: language,
        version: LANGUAGE_VERSIONS[language],
        files: [
          {
            content: sourceCode,
          },
        ],
        stdin: formattedInput, // Pass formatted input
      });

      const { run } = response.data;
      const { output, stderr, code } = run;

      const result = {
        input: testCase?.input,
        expectedOutput: String(testCase?.output).trim(), // Ensure expectedOutput is a string and trim
        actualOutput: output.trim(), // Remove any trailing newlines or spaces from actualOutput
        executionTime: run.time || 0,
        memoryUsed: run.memory || 0,
        status:
          output.trim() === String(testCase?.output).trim() && code === 0
            ? "Pass"
            : "Fail", // Trim both for comparison
        error: stderr?.trim() || null,
      };

      results.push(result);

      if (stderr?.trim() || code !== 0) {
        console.warn("Error detected, stopping further execution.");
        break;
      }
    }

    return results;
  } catch (error) {
    console.error("Code execution failed:", error);
    throw new Error("Error while executing code.");
  }
};
