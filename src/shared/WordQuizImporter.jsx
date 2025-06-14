/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import mammoth from "mammoth";
import { useSelector } from "react-redux";
import { useAddMultipleQuestionToQuizMutation } from "../redux/api/api";
import useMutationToast from "../hooks/useMutationToast";
import { useNavigate } from "react-router-dom";

const WordQuizImporter = () => {
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null); // Add ref

  const navigate = useNavigate();

  const { quizID } = useSelector((state) => state.auth);

  const [addMultipleQuestionToQuiz, QuestionsStatus] =
    useAddMultipleQuestionToQuizMutation();

  useMutationToast({
    ...QuestionsStatus,
    successMessage: "New questions are added successfully!",
  });

  useEffect(() => {
    if (QuestionsStatus?.isSuccess) {
      navigate("/quiz/overview");
    }
  }, [QuestionsStatus?.isSuccess]);

  const parseHtmlContent = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const tables = doc.querySelectorAll("table");
    const questions = [];

    tables.forEach((table) => {
      const question = {
        text: "",
        options: [],
        correctAnswerIndex: -1,
        explanation: "",
        marks: 0,
      };

      let hasQuestion = false;
      let optionCount = 0;
      const rows = table.querySelectorAll("tr");

      rows.forEach((row) => {
        const cells = Array.from(row.querySelectorAll("td"));
        if (cells.length < 1) return;

        const typeCell = cells[0];
        const type = typeCell.textContent.trim().toLowerCase();

        // Handle colspan in cells
        const getContentCell = () => {
          if (cells.length >= 2) return cells[1];
          // Handle colspan cases
          const contentCell = typeCell.nextElementSibling;
          return contentCell || null;
        };

        switch (type) {
          case "question": {
            const contentCell = getContentCell();
            if (contentCell) {
              question.text = contentCell.textContent.trim();
              hasQuestion = true;
            }
            break;
          }

          case "option": {
            if (cells.length >= 3) {
              const optionText = cells[1]?.textContent.trim() || "";
              const isCorrect =
                cells[2]?.textContent.trim().toLowerCase() === "correct";

              if (optionText) {
                question.options.push(optionText);
                if (isCorrect) {
                  question.correctAnswerIndex = question.options.length - 1;
                }
                optionCount++;
              }
            }
            break;
          }

          case "solution": {
            const contentCell = getContentCell();
            if (contentCell) {
              question.explanation = contentCell.textContent.trim();
            }
            break;
          }

          case "marks": {
            const contentCell = getContentCell();
            if (contentCell) {
              const marksValue = parseFloat(contentCell.textContent.trim());
              question.marks = !isNaN(marksValue) ? Math.max(0, marksValue) : 0;
            }
            break;
          }
        }
      });

      // Validation with detailed error reporting
      const errors = [];
      if (!hasQuestion) errors.push("Missing question text");
      if (question.options.length !== 4)
        errors.push(`Found ${question.options.length} options (need 4)`);
      if (question.correctAnswerIndex === -1)
        errors.push("No correct answer marked");
      if (question.marks <= 0) errors.push("Invalid or missing marks");

      if (errors.length === 0) {
        questions.push(question);
      } else {
        console.warn(`Skipped invalid question: ${errors.join(", ")}`);
      }
    });

    return questions;
  };

  const handleFileUpload = async (file) => {
    try {
      setParsedQuestions([]);
      setError("");

      if (!file) {
        setError("No file selected");
        return;
      }

      const result = await mammoth.convertToHtml({ arrayBuffer: file });
      const conversionIssues = result.messages
        .filter((m) => m.type === "warning")
        .map((m) => m.message);

      const questions = parseHtmlContent(result.value);

      let errorMessages = [];
      // if (conversionIssues.length > 0) {
      //   errorMessages.push("Document conversion notes:", ...conversionIssues);
      // }

      if (questions.length === 0) {
        errorMessages.push(
          "No valid questions found. Please check:",
          "- Each table contains a complete question",
          "- Exactly 4 options per question",
          "- One correct answer marked with 'correct'",
          "- Valid marks value in last row"
        );
      }

      if (errorMessages.length > 0) {
        setError(errorMessages.join("\n• "));
      }

      if (questions.length > 0) {
        setParsedQuestions(questions);
      }
    } catch (err) {
      console.error("Document processing failed:", err);
      setError(`Failed to process document: ${err.message}`);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleQuestionChange = (qIndex, field, value) => {
    const updatedQuestions = parsedQuestions.map((q, index) => {
      if (index === qIndex) {
        return { ...q, [field]: value };
      }
      return q;
    });
    setParsedQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = parsedQuestions.map((q, index) => {
      if (index === qIndex) {
        const newOptions = [...q.options];
        newOptions[optIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    });
    setParsedQuestions(updatedQuestions);
  };

  const handleSolutionChange = (qIndex, value) => {
    const updatedQuestions = parsedQuestions.map((q, index) => {
      if (index === qIndex) {
        return { ...q, explanation: value };
      }
      return q;
    });
    setParsedQuestions(updatedQuestions);
  };

  // Update marks handling to support decimals
  const handleMarksChange = (qIndex, value) => {
    const updatedQuestions = parsedQuestions.map((q, index) => {
      if (index === qIndex) {
        const numericValue = parseFloat(value) || 0;
        return { ...q, marks: Math.max(0, numericValue) };
      }
      return q;
    });
    setParsedQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updatedQuestions = parsedQuestions.map((q, index) => {
      if (index === qIndex) {
        return { ...q, correctAnswerIndex: parseInt(value) };
      }
      return q;
    });
    setParsedQuestions(updatedQuestions);
  };

  const validateQuestions = () => {
    return parsedQuestions.every(
      (q) =>
        q.text.trim() &&
        q.options.length === 4 &&
        q.options.every((opt) => opt.trim()) &&
        q.correctAnswerIndex >= 0 &&
        q.correctAnswerIndex < 4 &&
        q.marks > 0
    );
  };

  const onImport = (questions) => {
    addMultipleQuestionToQuiz({ quizId: quizID, questions });
  };

  return (
    <div className="max-w-3xl mt-10 mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Formatted Word Document (.docx)
        </label>

        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-100 hover:text-blue-900">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Select a file</span>
            <input
              type="file"
              className="hidden"
              accept=".docx"
              onChange={(e) => handleFileUpload(e.target.files[0])}
              ref={fileInputRef}
            />
          </label>
        </div>

        {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}

        {parsedQuestions.length == 0 && (
          <div className="mt-4 text-sm text-gray-500">
            <p>Required table format:</p>
            <table className="mt-2 border-collapse w-full">
              <tbody>
                <tr>
                  <td className="border p-2">Question</td>
                  <td className="border p-2">Your question text</td>
                  <td className="border p-2"></td>
                </tr>
                {[...Array(4)].map((_, i) => (
                  <tr key={i}>
                    <td className="border p-2">
                      Option {String.fromCharCode(65 + i)}
                    </td>
                    <td className="border p-2">Option text</td>
                    <td className="border p-2">correct/incorrect</td>
                  </tr>
                ))}
                <tr>
                  <td className="border p-2">Solution</td>
                  <td className="border p-2">Explanation</td>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <td className="border p-2">Marks</td>
                  <td className="border p-2">Total Marks</td>
                  <td className="border p-2">Negitive Marks</td>
                </tr>
              </tbody>
            </table>

            {/* Download button for Word format */}
            <div className="mt-4">
              <a
                href="/Test format.docx"
                download="Test format.docx"
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
              >
                Download Word Format
              </a>
            </div>
          </div>
        )}
      </div>

      {parsedQuestions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">
            Edit Questions ({parsedQuestions.length} questions found)
          </h3>

          <div className="space-y-6">
            {parsedQuestions.map((q, qIndex) => (
              <div key={qIndex} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 mr-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question
                    </label>
                    <input
                      type="text"
                      value={q.text}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, "text", e.target.value)
                      }
                      className="font-semibold text-gray-800 bg-white border-b-2 border-gray-300 focus:border-blue-500 w-full p-2 rounded-t"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Marks
                    </label>
                    <input
                      type="number"
                      value={q.marks}
                      onChange={(e) =>
                        handleMarksChange(qIndex, e.target.value)
                      }
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm w-20"
                      min="1"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Options (Click ✓ to mark correct answer)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-md ${
                          optIndex === q.correctAnswer
                            ? "bg-green-100 border-green-300"
                            : "bg-white border-gray-200"
                        } border flex items-center`}
                      >
                        <span className="font-medium mr-2 w-6">
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(qIndex, optIndex, e.target.value)
                          }
                          className="flex-1 bg-transparent focus:outline-none"
                        />
                        <button
                          onClick={() =>
                            handleCorrectAnswerChange(qIndex, optIndex)
                          }
                          className={`ml-2 px-2 py-1 rounded ${
                            optIndex === q.correctAnswerIndex
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          ✓
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Solution Explanation
                  </label>
                  <textarea
                    value={q.explanation}
                    onChange={(e) =>
                      handleSolutionChange(qIndex, e.target.value)
                    }
                    className="w-full p-3 text-sm bg-white rounded-md border border-gray-200 focus:border-blue-500"
                    placeholder="Add detailed solution explanation..."
                    rows="3"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-red-600">
              {!validateQuestions() &&
                "Please fill all required fields and ensure each question has a correct answer"}
            </div>
            <button
              onClick={() => onImport(parsedQuestions)}
              disabled={!validateQuestions()}
              className={`px-6 py-2 rounded-md ${
                validateQuestions()
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } transition-colors`}
            >
              Confirm Import
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordQuizImporter;
