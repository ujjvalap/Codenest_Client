import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { BiCodeBlock, BiTime } from "react-icons/bi";
import {
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import {
  useGetUserQuizSubmissionQuery,
  useQuizDataQuery,
  useSubmitQuizQuestionMutation,
} from "../../redux/api/api";
import { setQuizID } from "../../redux/reducers/auth";
import QuizResults from "./QuizResults";

function MainQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeSpent, setTimeSpent] = useState({});
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(true);
  const [shuffledMap, setShuffledMap] = useState({});

  const intervalRef = useRef(null);
  const quizRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, quizID } = useSelector((state) => state.auth);

  // Add fullscreen exit handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !quizSubmitted) {
        handleQuizSubmit();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [quizSubmitted]);

  // Add cleanup effect
  useEffect(() => {
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, []);

  // Check if quizID is missing and redirect if necessary
  useEffect(() => {
    if (!quizID && !quizSubmitted) {
      navigate("/user/quiz/dashboard");
    }
  }, [quizID, navigate]);

  const { data, isLoading: isQuizLoading } = useQuizDataQuery(quizID);
  const quizData = data?.quiz;

  const { data: userQuizAnswers, isLoading: isQuizAnswersLoading } =
    useGetUserQuizSubmissionQuery({ userId: user?._id, quizId: quizID });

  const [submitQuizQuestion] = useSubmitQuizQuestionMutation();

  // Initialize `timeRemaining` from quiz start & end time
  useEffect(() => {
    if (quizData?.startTime && quizData?.endTime) {
      const startTime = moment.utc(quizData.startTime);
      const endTime = moment.utc(quizData.endTime);
      let durationSeconds = endTime.diff(startTime, "seconds"); // Convert to seconds
      setTimeRemaining(durationSeconds > 0 ? durationSeconds : 0);
    }
  }, [quizData?.startTime, quizData?.endTime]);

  // Adjust `timeRemaining` based on user's previous progress
  useEffect(() => {
    if (userQuizAnswers?.submission?.answers) {
      setSelectedAnswers(userQuizAnswers.submission.answers);

      // Update timeSpent with the time taken from the server
      const newTimeSpent = {};
      userQuizAnswers.submission.answers.forEach((answer) => {
        newTimeSpent[answer.question._id] = answer.timeTaken / 1000; // Convert ms to sec
      });
      setTimeSpent(newTimeSpent);
    }
  }, [userQuizAnswers]);

  // Timer for quiz countdown
  useEffect(() => {
    if (!quizSubmitted && timeRemaining > 0 && quizData) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizSubmitted, timeRemaining, quizData]);

  // Timer for time spent on current question
  useEffect(() => {
    if (!quizData) return;
    const questionId = quizData.questions[currentQuestionIndex]._id;
    intervalRef.current = setInterval(() => {
      setTimeSpent((prev) => ({
        ...prev,
        [questionId]: (prev[questionId] || 0) + 1,
      }));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentQuestionIndex, quizData]);

  const currentQuestion = quizData?.questions[currentQuestionIndex];

  // Shuffle options when current question changes
  useEffect(() => {
    if (currentQuestion?._id && currentQuestion?.options) {
      const questionId = currentQuestion._id;
  
      // If already shuffled, don't reshuffle
      if (shuffledMap[questionId]) {
        setShuffledOptions(shuffledMap[questionId]);
      } else {
        const indexedOptions = currentQuestion.options.map((option, index) => ({
          option,
          originalIndex: index,
        }));
  
        // Shuffle (Fisher-Yates)
        for (let i = indexedOptions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indexedOptions[i], indexedOptions[j]] = [
            indexedOptions[j],
            indexedOptions[i],
          ];
        }
  
        // Save to map
        setShuffledMap((prev) => ({
          ...prev,
          [questionId]: indexedOptions,
        }));
  
        setShuffledOptions(indexedOptions);
      }
    }
  }, [currentQuestion]);
  

  const handleAnswerSelect = (questionId, optionIndex) => {
    const timeTaken = timeSpent[questionId] || 0;
    submitQuizQuestion({
      quizId: quizID,
      questionId: questionId,
      selectedOption: optionIndex,
      timeTaken: timeTaken * 1000, // Convert seconds to milliseconds
    });
  };

  const handleQuizSubmit = () => {
    dispatch(setQuizID(null));
    setQuizSubmitted(true);
  };

  const formatTime = (seconds) => {
    const duration = moment.duration(seconds, "seconds");
    const hours = duration.hours();
    const minutes = duration.minutes();
    const secs = duration.seconds();

    let result = [];
    if (hours > 0) result.push(`${hours}h`);
    if (minutes > 0) result.push(`${minutes}m`);
    result.push(`${secs}s`);
    return result.join(" ");
  };

  // Add fullscreen handler
  const handleStartFullscreen = async () => {
    try {
      if (quizRef.current) {
        await quizRef.current.requestFullscreen();
        setShowFullscreenPrompt(false);
      }
    } catch (err) {
      console.error("Fullscreen failed:", err);
      alert("Fullscreen is required to continue with the quiz!");
    }
  };

  if (isQuizLoading || !quizData || isQuizAnswersLoading) {
    return <LoadingSpinner />;
  }

  if (quizSubmitted) {
    return <QuizResults submission={userQuizAnswers?.submission} />;
  }

  return (
    <div
      ref={quizRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8"
    >
      {showFullscreenPrompt && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-80">
          <div className="bg-gray-800 p-8 rounded-lg text-center max-w-96 w-full mx-4">
            <h1 className="text-2xl font-bold mb-4 text-white">
              Fullscreen Required
            </h1>
            <p className="text-gray-400 mb-6">
              For a secure and distraction-free experience, please enter
              fullscreen mode. Exiting fullscreen will automatically submit your
              quiz.
            </p>
            <button
              onClick={handleStartFullscreen}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
            >
              <FiChevronRight className="text-xl" /> Enter Fullscreen
            </button>
            <p className="text-sm text-gray-500 mt-6">
              Note: Exiting fullscreen during the quiz will submit your answers
              automatically.
            </p>
          </div>
        </div>
      )}

      {/* Main Quiz Content Here */}
      <div className="max-w-6xl mx-auto">
        {/* Quiz Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {quizData.name}
            </h1>
            <div className="flex items-center gap-2 mt-2 text-gray-400">
              <FiClock className="text-blue-400" />
              <span className="font-semibold">
                {formatTime(timeRemaining)}
              </span>{" "}
              remaining
            </div>
          </div>
          <div className="bg-gray-700 px-6 py-3 rounded-xl flex items-center gap-3">
            <span className="font-semibold text-purple-400">
              Question {currentQuestionIndex + 1} of{" "}
              {quizData?.questions.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 bg-gray-700 rounded-full mb-8">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / quizData?.questions.length) * 100
              }%`,
            }}
          />
        </div>

        {/* Main Quiz Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Question Content */}
          <div className="lg:col-span-2 bg-gray-800 p-8 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3 text-purple-400">
                <BiTime className="text-xl" />
                <span className="font-semibold">
                  {formatTime(timeSpent[currentQuestion._id] || 0)}
                </span>
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-2 leading-relaxed">
              {currentQuestion.text}
            </h2>
            <div className="space-y-2 mb-12">
              {shuffledOptions.map(({ option, originalIndex }) => {
                const isSelected =
                  Array.isArray(selectedAnswers) &&
                  selectedAnswers.some(
                    (ans) =>
                      ans.question._id === currentQuestion._id &&
                      ans.selectedOption === originalIndex
                  );
                return (
                  <button
                    key={originalIndex}
                    onClick={() =>
                      handleAnswerSelect(currentQuestion._id, originalIndex)
                    }
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-4 ${
                      isSelected
                        ? "bg-blue-600/30 border-2 border-blue-500"
                        : "bg-gray-700 hover:bg-gray-600 border-2 border-transparent"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isSelected ? "bg-blue-500" : "bg-gray-600"
                      }`}
                    >
                      {isSelected && <FiCheck className="text-white text-lg" />}
                    </div>
                    <span className="text-lg">{option}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() =>
                  setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
                }
                disabled={currentQuestionIndex === 0}
                className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50"
              >
                <FiChevronLeft /> Previous
              </button>
              {currentQuestionIndex === quizData.questions.length - 1 ? (
                <button
                  onClick={handleQuizSubmit}
                  className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl flex items-center gap-2"
                >
                  Submit <FiCheck />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl flex items-center gap-2"
                >
                  Next <FiChevronRight />
                </button>
              )}
            </div>
          </div>

          {/* Question Navigation */}
          <div className="lg:col-span-1 bg-gray-800 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <BiCodeBlock /> Questions
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {quizData.questions.map((q, index) => (
                <button
                  key={q._id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`relative p-3 rounded-xl flex flex-col items-center justify-center transition-all ${
                    currentQuestionIndex === index
                      ? "bg-blue-600 text-white scale-105"
                      : Array.isArray(selectedAnswers) &&
                        selectedAnswers.some(
                          (ans) => ans.question._id === q._id
                        )
                      ? "bg-green-600/30 text-green-400"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <span className="text-sm font-medium">{index + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainQuiz;
