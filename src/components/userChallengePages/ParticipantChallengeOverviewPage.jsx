import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useChallengeDataQuery,
  useGetProgressQuery,
} from "../../redux/api/api";
import {
  setChallenge,
  setChallengeProgress,
  setQuestionData,
} from "../../redux/reducers/auth";
import LoadingSpinner from "../LoadingSpinner";
import ChallengeTimer from "./ChallengeTimer"; // Import your new component
import moment from "moment";

function ParticipantChallengeOverviewPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isChallengeActive, setIsChallengeActive] = useState(false);

  const { challengeID } = useSelector((state) => state.auth);

  const { data, isLoading: isChallengeLoading } =
    useChallengeDataQuery(challengeID);
  const challengeData = data?.challenge;

  const { data: progressData, isSuccess } = useGetProgressQuery(challengeID);

  useEffect(() => {
    dispatch(setChallengeProgress(progressData?.progress));
  }, [isSuccess]);

  const handleProblemClick = (question) => {
    dispatch(setQuestionData(question));
    dispatch(setChallenge(challengeData));
    navigate("/editor");
  };

  const handleChallengeStatusChange = ({ hasStarted, hasEnded }) => {
    setIsChallengeActive(hasStarted && !hasEnded);
  };

  if (isChallengeLoading || !challengeData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col md:flex-row p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Left Side: Challenge Header */}
      <div className="w-full md:w-1/3 p-4">
        <header className="p-6 sm:p-8 rounded-lg bg-white shadow-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-700 mb-4">
            {challengeData.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-700 font-medium mb-6">
            {challengeData.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-sm text-gray-800">
            {/* Start Date */}
            <div className="flex flex-col items-start bg-gradient-to-r from-indigo-200 to-indigo-300 text-indigo-800 py-4 px-6 rounded-lg font-semibold shadow-md w-full sm:w-auto max-w-xs transition duration-300 transform hover:scale-105">
              <div className="flex items-center gap-2 mb-2">
                <FaCalendarAlt className="text-indigo-600" />
                <span className="font-bold text-indigo-700">Start Date:</span>
              </div>
              <span className="text-gray-700">
                {moment(challengeData.startTime).format("DD MMM YYYY")}
              </span>
              <span className="text-gray-600">
                {moment(challengeData.startTime).format("hh:mm A")}
              </span>
            </div>

            {/* End Date */}
            <div className="flex flex-col items-start bg-gradient-to-r from-indigo-200 to-indigo-300 text-indigo-800 py-4 px-6 rounded-lg font-semibold shadow-md w-full sm:w-auto max-w-xs transition duration-300 transform hover:scale-105">
              <div className="flex items-center gap-2 mb-2">
                <FaCalendarAlt className="text-indigo-600" />
                <span className="font-bold text-indigo-700">End Date:</span>
              </div>
              <span className="text-gray-700">
                {moment(challengeData.endTime).format("DD MMM YYYY")}
              </span>
              <span className="text-gray-600">
                {moment(challengeData.endTime).format("hh:mm A")}
              </span>
            </div>
          </div>
        </header>
      </div>

      {/* Right Side: Problem List and Timer */}
      <div className="w-full md:w-2/3 p-4">
        <ChallengeTimer
          challengeData={challengeData}
          isChallengeLoading={isChallengeLoading}
          participantScore={60}
          onChallengeStatusChange={handleChallengeStatusChange}
        />

        {isChallengeActive && (
          <div className="text-lg font-bold text-indigo-700 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
              {challengeData &&
                challengeData.questions.map((question, index) => {
                  const isSolved = progressData?.progress?.solvedQuestions.some(
                    (solvedQues) => solvedQues._id === question._id
                  );
                  return (
                    <div
                      key={index}
                      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-l-4 ${
                        isSolved ? "border-green-500" : "border-indigo-500"
                      }`}
                    >
                      <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                        {question.title}
                      </h2>
                      <p className="text-sm text-gray-600 mt-2">
                        {question.description}
                      </p>
                      <button
                        onClick={() => handleProblemClick(question)}
                        className={`mt-4 py-2 px-4 md:px-6 rounded-full font-medium shadow-lg ${
                          isSolved
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        } text-white transition duration-200 transform hover:scale-105`}
                      >
                        {isSolved ? "Solved" : "View Problem"}
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ParticipantChallengeOverviewPage;
