import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { executeCode } from "../../API/api";
import { infoNotify } from "../../hooks/useInfoMutaionToast";
import useMutationToast from "../../hooks/useMutationToast";
import {
  useGetProgressQuery,
  useGetTestCasesQuery,
  useSubmitCodeMutation,
} from "../../redux/api/api";
import CodeEditor from "./CodeEditor";
import CodeNavbar from "./CodeNavbar";
import Output from "./Output";
import QuestionDescription from "./QuestionDescription";
import { CODE_SNIPPETS } from "../../constants/constant";
import SubmissionResultCard from "./SubmissionResultCard";
import { useNavigate } from "react-router-dom";

function MainCode() {
  const editorRef = useRef();
  const { challengeID, questionData, challenge } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [language, setLanguage] = useState("cpp");
  const [outputVisible, setOutputVisible] = useState(false);
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [question, setQuestion] = useState(questionData);
  const [showQuestionList, setShowQuestionList] = useState(false);

  const [showSubmissionResult, setShowSubmissionResult] = useState(false);
  const [submissionResult, setSubmissionResult] = useState({
    totalTestCases: 0,
    passedTestCases: 0,
    ErrorMessage: "",
  });

  const [publicTestCases, setPublicTestCases] = useState([]);

  const { data, isSuccess } = useGetTestCasesQuery(question._id);

  const { data: progressData } = useGetProgressQuery(challengeID);

  // Handle API response and update testCases
  useEffect(() => {
    if (isSuccess && Array.isArray(data.publicTestCases)) {
      setPublicTestCases(data.publicTestCases);
    }
  }, [isSuccess, data?.publicTestCases]);

  const [submitCode, submitStatus] = useSubmitCodeMutation();

  useEffect(() => {
    if (submitStatus.isSuccess) {
      const data = submitStatus.data;

      console.log(data);

      setSubmissionResult({
        totalTestCases: data?.totalTestCases || 0,
        passedTestCases: data?.passedTestCases || 0,
        ErrorMessage: data?.errorDetails
          ? data?.errorDetails || "An unknown error occurred."
          : "",
      });
    }
  }, [submitStatus.isSuccess, submitStatus.isError]);

  const [editorContent, setEditorContent] = useState(
    questionData?.boilerplateCode?.[language] || ""
  );

  useEffect(() => {
    setEditorContent(question?.boilerplateCode?.[language] || "");
  }, [language, question]);

  // Add beforeunload event listener to confirm before refresh
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Only show the message if the editor has content
      if (editorContent) {
        const message =
          "You  have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message; // Standard for most browsers
        return message; // For some older browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [editorContent]); // Trigger when editorContent changes

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (event) => {
    const selectedLang = event.target.value;
    setLanguage(selectedLang);
  };

  const handleCloseOutput = () => setOutputVisible(false);

  const runCode = (sourceCode) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      setErrorMessage("");

      executeCode(language, sourceCode, publicTestCases)
        .then((results) => {
          setOutput(results);
          const firstSyntaxError = results.find(
            (result) => result.error
          )?.error;

          if (firstSyntaxError) {
            setErrorMessage(`Syntax Error: ${firstSyntaxError}`);
          }

          resolve(results);
        })
        .catch((error) => {
          console.error("Unable to run code", error);
          setErrorMessage("An error occurred while executing the code.");
          reject(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  const handleRun = () => {
    const sourceCode = editorRef.current.getValue();

    if (!sourceCode) {
      infoNotify(
        "Your code editor is empty. Please write some code to proceed."
      );
      return;
    }

    setOutputVisible(true);
    runCode(sourceCode);
  };

  const handleSubmit = async () => {
    const sourceCode = editorRef.current.getValue();

    if (!sourceCode) {
      infoNotify(
        "Your code editor is empty. Please write some code to proceed."
      );
      return;
    }

    setIsSubmitLoading(true);
    setShowSubmissionResult(true); // Show result card

    try {
      setErrorMessage(""); // Reset error messages

      const submissionData = {
        challenge: challengeID,
        question: question._id,
        code: sourceCode,
        language: language,
      };

      console.log("SubData : ", submissionData);

      await submitCode(submissionData); // Submit the code
    } catch (error) {
      console.error("Error during submission:", error);
      setSubmissionResult({
        totalTestCases: 0,
        passedTestCases: 0,
        ErrorMessage: "Submission failed. Please try again.",
      });
      setShowSubmissionResult(true); // Show result card with error
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const toggleQuestionList = () => {
    setShowQuestionList((prev) => !prev);
    handleCloseOutput()
  };

  const handleQuestionSelect = (selectedQuestion) => {
    setQuestion(selectedQuestion); // Set the selected question
    setShowQuestionList(false); // Close the question list after selecting
  };

  const handleCloseQuestionList = () => {
    setShowQuestionList(false); // Close the list explicitly
  };

  // Detect screen size on load and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile threshold
    };

    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize); // Listen for resize events

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
        <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <h1 className="text-xl font-bold">Not Supported on Mobile</h1>
          <p className="mt-2">
            This platform is optimized for larger screens. Please switch to a
            desktop or tablet for the best experience.
          </p>
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <CodeNavbar
        handleRun={handleRun}
        handleSubmit={handleSubmit}
        onSelect={onSelect}
        toggleQuestionList={toggleQuestionList}
        challenge={challenge}
      />

      <div
        className={`w-full h-[93vh] p-4 grid gap-6 transition-all duration-300 ${
          showQuestionList
            ? "grid-cols-1 md:grid-cols-10 lg:grid-cols-10"
            : outputVisible
            ? "grid-cols-1 md:grid-cols-12"
            : "grid-cols-1 md:grid-cols-8"
        }`}
      >
        {/* Submission Result */}
        {showSubmissionResult && (
          <SubmissionResultCard
            totalTestCases={submissionResult.totalTestCases}
            passedTestCases={submissionResult.passedTestCases}
            ErrorMessage={submissionResult.ErrorMessage}
            loading={isSubmitLoading}
            onClose={() => setShowSubmissionResult(false)}
            language={language}
            score={question.maxScore}
          />
        )}

        {/* Question List */}
        {showQuestionList && (
          <div className="md:col-span-2 bg-white shadow-lg p-4 rounded-r-lg border-r border-gray-300 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Select Question
              </h2>
              <button
                onClick={handleCloseQuestionList}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full focus:outline-none transition duration-200"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-3 overflow-y-auto h-full">
              {challenge &&
                challenge.questions.map((ques, index) => {
                  const isSolved = progressData?.progress?.solvedQuestions.some(
                    (solvedQues) => solvedQues._id === ques._id
                  );

                  return (
                    <li
                      key={ques._id}
                      className={`p-4 rounded-lg cursor-pointer transition duration-200 border ${
                        ques._id === question?._id && isSolved
                          ? "bg-green-100 text-green-700 border-green-500 font-semibold hover:bg-green-200 hover:text-green-700"
                          : ques._id === question?._id
                          ? "bg-blue-100 text-blue-700 border-blue-500 font-semibold hover:bg-blue-200"
                          : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-sm font-medium">{ques.title}</h3>
                          <p className="text-xs text-gray-500">
                            {ques.difficulty} • {ques.maxScore} points
                          </p>
                        </div>
                        <button
                          onClick={() => handleQuestionSelect(ques)}
                          className={`px-4 py-1 text-sm font-medium rounded-lg transition duration-200 ${
                            isSolved
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          {isSolved ? "Solved" : "Solve"}
                        </button>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}

        {/* Question Description */}
        <div
          className={`${
            outputVisible
              ? "col-span-12 md:col-span-4"
              : "col-span-12 md:col-span-3"
          } h-full text-gray-900 overflow-y-auto`}
        >
          <QuestionDescription QuestionData={question} />
        </div>

        {/* Code Editor */}
        <div
          className={`${
            outputVisible
              ? "col-span-12 md:col-span-5"
              : "col-span-12 md:col-span-5"
          } bg-white rounded-lg shadow-lg p-4 flex flex-col overflow-hidden`}
        >
          <div className="w-full flex justify-start px-4 py-2 text-gray-800">
            <h1 className="text-lg font-semibold">Code Editor</h1>
          </div>
          <CodeEditor
            language={language}
            value={
              question.boilerplateCode?.[language] || CODE_SNIPPETS[language]
            }
            onChange={setEditorContent}
            onMount={onMount}
          />
        </div>

        {/* Output */}
        {outputVisible && (
          <div className="col-span-12 md:col-span-3 overflow-y-auto">
            <Output
              handleCloseOutput={handleCloseOutput}
              isLoading={isLoading}
              ErrorMessage={ErrorMessage}
              output={output}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainCode;
