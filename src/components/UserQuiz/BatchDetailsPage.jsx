/* eslint-disable react/prop-types */
import moment from "moment-timezone";
import React, { useState } from "react";
import { FaBell, FaCalendar, FaCode, FaUsers } from "react-icons/fa";
import {
  useBatchDataQuery,
  useQuizInitializeMutation,
} from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import PopupModal from "../../shared/PopupModal";
import { setQuizID } from "../../redux/reducers/auth";
import { useNavigate } from "react-router-dom";
import { CalendarIcon } from "lucide-react";

// Dummy notifications
const notifications = [
  {
    id: 1,
    title: "New Quiz Added",
    message: "HTML/CSS Basics quiz now available",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Reminder",
    message: "JavaScript Fundamentals quiz starts tomorrow",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: 3,
    title: "Result Published",
    message: "Introduction to Web quiz results available",
    timestamp: "3 days ago",
    read: true,
  },
];

// Format date function
const formatDate = (date) => moment(date).format("D MMMM YYYY");

// Component for batch details
const BatchDetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-2">
    <Icon className="text-indigo-600" />
    <span className="text-gray-600">
      {label}: {value}
    </span>
  </div>
);

// Component for quizzes
const QuizList = ({ title, status, color, quizzes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quizInitialize] = useQuizInitializeMutation();

  const onAccept = async () => {
    await quizInitialize({ quizId: selectedQuiz });
    dispatch(setQuizID(selectedQuiz));
    navigate("/user/quiz");
  };

  const handleAttemptClick = (quiz) => {
    setSelectedQuiz(quiz); // Store the selected quiz
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div className={`border-l-4 border-${color}-500`}>
      <div className={`bg-${color}-50 px-4 py-2`}>
        <h3 className={`font-semibold text-${color}-800`}>{title}</h3>
      </div>
      <div className="space-y-4 p-4">
        {quizzes.length ? (
          <>
            {quizzes.slice(0, showAll ? quizzes.length : 2).map((quiz) => (
              <div
                key={quiz._id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-800">{quiz.name}</h3>
                <div className="mt-1 flex flex-col items-center text-center">
                  <p
                    className={`px-2 py-1 text-xs bg-${color}-100 text-${color}-800 rounded-full`}
                  >
                    {quiz.status}
                  </p>
                  {status === "ongoing" ? (
                    <>
                      <p className="text-sm text-gray-500 mt-2">
                        Ends at{" "}
                        {moment(quiz.endTime).format("DD/MM/YYYY h:mm A")}
                      </p>
                      <div className="relative group mt-2">
                        <button
                          onClick={() => handleAttemptClick(quiz._id)}
                          className="text-sm font-semibold text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                          Attempt Quiz
                        </button>
                        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-3 py-1 whitespace-nowrap">
                          Only 1 attempt allowed
                        </div>
                      </div>
                    </>
                  ) : status === "upcoming" ? (
                    <p className="text-sm text-gray-500 mt-2">
                      Starts in{" "}
                      {moment(quiz.startTime).format("DD/MM/YYYY h:mm A")}
                    </p>
                  ) : (
                    <div className="flex flex-col gap-1 text-sm text-gray-700">
                      {/* Score Section */}
                      <div className="flex items-center gap-2">
                        <p className="text-gray-600 text-xs sm:text-sm">
                          Score:
                        </p>
                        <span className="font-bold text-purple-600 text-base">
                          {quiz.totalScore || 0}/{quiz.totalMarks || 100}
                        </span>
                      </div>

                      {/* Date Section */}
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-gray-500" />
                        <p className="text-gray-500 text-xs sm:text-sm">
                          {moment(quiz.startTime).format("MMM D, YYYY")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Popup Modal */}
                <PopupModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  title="Quiz Instructions"
                  acceptText="Start Quiz"
                  onAccept={onAccept}
                />
              </div>
            ))}

            {/* See More / See Less Button */}
            {quizzes.length > 2 && (
              <button
                className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-blue-200"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "See Less" : "See More"}
                <span
                  className={`transform transition-transform duration-300 ${
                    showAll ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ⬇️
                </span>
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">
            No {title.toLowerCase()}
          </p>
        )}
      </div>
    </div>
  );
};

// Component for notifications
const NotificationItem = ({ notification }) => (
  <div
    className={`p-4 rounded-lg ${
      !notification.read
        ? "bg-indigo-50 border border-indigo-200"
        : "bg-gray-50"
    }`}
  >
    <div className="flex items-start space-x-3">
      <div
        className={`mt-1 w-2 h-2 rounded-full ${
          !notification.read ? "bg-indigo-600" : "bg-gray-400"
        }`}
      />
      <div>
        <h3 className="font-semibold text-gray-800">{notification.title}</h3>
        <p className="text-gray-600 text-sm">{notification.message}</p>
        <p className="text-gray-400 text-xs mt-1">{notification.timestamp}</p>
      </div>
    </div>
  </div>
);

const BatchDetailsPage = () => {
  const { batchID, user } = useSelector((state) => state.auth);
  const { data, isLoading } = useBatchDataQuery({
    batchId: batchID,
    userId: user._id,
  });

  if (isLoading || !data?.batch) return <LoadingSpinner />;

  const { name, batchCode, startDate, students, description, quizzes } =
    data.batch;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Batch Details Section */}
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {name}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <BatchDetailItem icon={FaCode} label="Code" value={batchCode} />
              <BatchDetailItem
                icon={FaCalendar}
                label="Start Date"
                value={formatDate(startDate)}
              />
              <BatchDetailItem
                icon={FaUsers}
                label="Students"
                value={students?.length}
              />
            </div>
            <div className="mt-4 sm:mt-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                Description
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {description}
              </p>
            </div>
          </div>

          {/* Batch Quizzes Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Batch Quizzes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <QuizList
                title="Ongoing Quizzes"
                status="ongoing"
                color="green"
                quizzes={quizzes.filter((q) => q.status === "ongoing")}
              />
              <QuizList
                title="Upcoming Quizzes"
                status="upcoming"
                color="blue"
                quizzes={quizzes.filter((q) => q.status === "upcoming")}
              />
              <QuizList
                title="Completed Quizzes"
                status="completed"
                color="red"
                quizzes={quizzes.filter((q) => q.status === "completed")}
              />
            </div>
          </div>
        </div>

        {/* Notifications Sidebar */}
        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit lg:sticky lg:top-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaBell className="text-indigo-600 mr-2" /> Notifications
          </h2>
          <div className="space-y-4">
            {notifications.map((notif) => (
              <NotificationItem key={notif.id} notification={notif} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDetailsPage;
