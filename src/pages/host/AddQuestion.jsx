import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChallengeNavbar from "../../components/CreateChallenge/ChallengeNavbar";
import QuestionForm from "../../components/CreateChallenge/QuestionForm";
import {
  useNewQuestionMutation,
  useQuestionDetailsQuery,
  useUpdateQuestionMutation,
} from "../../redux/api/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import useMutationToast from "../../hooks/useMutationToast";

function AddQuestion() {
  const { questionID } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Query for question details
  const {
    data,
    isLoading: isQuestionLoading,
    isSuccess,
    isError,
    error,
  } = useQuestionDetailsQuery(questionID, { skip: !questionID });

  
  // Mutations for updating and creating questions
  const [updateQuestion, updateStatus] = useUpdateQuestionMutation();
  const [newQuestion, createStatus] = useNewQuestionMutation();

  // Use custom `useMutationToast` hook to handle notifications
  useMutationToast({
    ...updateStatus,
    successMessage: "Question updated successfully!",
  });

  useMutationToast({
    ...createStatus,
    successMessage: "New question created successfully!",
  });

  // Handle navigation on successful mutation
  useEffect(() => {
    if (updateStatus.isSuccess || createStatus.isSuccess) {
      navigate("/overview");
    }
  }, [updateStatus.isSuccess, createStatus.isSuccess, navigate]);

  const [problemDetails, setProblemDetails] = useState({
    title: "",
    problemStatement: "",
    inputFormat: "",
    outputFormat: "",
    constraints: [],
    maxScore: 0,
    difficulty: "Easy",
    createdAt: new Date(),
    tags: [],
    author: null,
    hints: [],
    timeLimit: 1,
    memoryLimit: 256,
    difficultyScore: 1,
    likes: 0,
    views: 0,
    sampleSolution: "// write problem solution here",
    isActive: true,
    languagesAllowed: ["cpp", "python", "javascript", "java"],
    estimatedSolveTime: 0,
    boilerplateCode: {
      cpp: "",
      python: "",
      javascript: "",
      java: "",
    },
    examples: [],
  });

  useEffect(() => {
    if (isSuccess && data?.success) {
      const questionData = data.question;
      setProblemDetails({
        title: questionData.title || "",
        problemStatement: questionData.problemStatement || "",
        inputFormat: questionData.inputFormat || "",
        outputFormat: questionData.outputFormat || "",
        constraints: questionData.constraints || [],
        maxScore: questionData.maxScore || 0,
        difficulty: questionData.difficulty || "Easy",
        createdAt: questionData.createdAt,
        tags: questionData.tags || [],
        author: questionData.author || null,
        hints: questionData.hints || [],
        timeLimit: questionData.timeLimit || 1,
        memoryLimit: questionData.memoryLimit || 256,
        difficultyScore: questionData.difficultyScore || 1,
        likes: questionData.likes || 0,
        views: questionData.views || 0,
        sampleSolution:
          questionData.sampleSolution || "// write problem solution here",
        isActive: questionData.isActive ?? true,
        languagesAllowed: questionData.languagesAllowed || [
          "cpp",
          "python",
          "javascript",
          "java",
        ],
        estimatedSolveTime: questionData.estimatedSolveTime || 0,
        boilerplateCode: questionData.boilerplateCode || {
          cpp: "",
          python: "",
          javascript: "",
          java: "",
        },
        examples: questionData.examples || [{ input: "", output: "" }],
      });
    }
  }, [isSuccess, data]);

  const handleSaveProblem = () => {
    if (questionID) {
      updateQuestion({ id: questionID, data: problemDetails });
    } else {
      newQuestion(problemDetails);
    }
  };

  if (isQuestionLoading) {
    return <p>Loading question details...</p>;
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <ChallengeNavbar handleSaveProblem={handleSaveProblem} />
      </div>

      {/* Content with padding-top to prevent overlap */}
      <div className="flex h-full pt-24">
        {" "}
        {isQuestionLoading ? (
          <LoadingSpinner />
        ) : (
          <QuestionForm
            problemDetails={problemDetails}
            setProblemDetails={setProblemDetails}
          />
        )}
      </div>
    </div>
  );
}

export default AddQuestion;
