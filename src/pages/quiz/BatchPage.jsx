/* eslint-disable react/prop-types */
import moment from "moment";
import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaFileExcel,
  FaPlus,
  FaTasks,
  FaTimesCircle,
  FaUserGraduate,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import LoadingSpinner from "../../components/LoadingSpinner";
import BatchHeader from "../../components/quiz components/BatchHeader";
import useMutationToast from "../../hooks/useMutationToast";
import {
  useBatchDataQuery,
  useBatchReqestsMutation,
  useStudentQuizPerformanceQuery,
} from "../../redux/api/api";
import { setQuizID } from "../../redux/reducers/auth";
import ChallengeSetup from "../host/ChallengeSetup";

const sections = [
  { name: "Batch Quizzes", icon: <FaUserGraduate size={20} /> },
  { name: "Total Students", icon: <FaUsers size={20} /> },
  { name: "Pending Requests", icon: <FaUserPlus size={20} /> },
  { name: "Quiz Performance", icon: <FaChartLine size={20} /> },
];

const BatchSidebar = ({ activeSection, setActiveSection, sections }) => (
  <div className="w-full overflow-x-hidden px-4 mb-6">
    <div className="overflow-x-auto lg:overflow-hidden">
      <div className="flex justify-center gap-4 min-w-max">
        {sections.map((section) => (
          <button
            key={section.name}
            onClick={() => setActiveSection(section.name)}
            className={`px-6 py-3 flex items-center gap-2 rounded-lg text-white font-semibold transition-all shadow-lg whitespace-nowrap ${
              activeSection === section.name
                ? "bg-blue-700 scale-105"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {section.icon} {section.name}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const BatchQuizzes = ({ quizzes, handleQuiz, handleCreateQuiz }) => {
  return (
    <div>
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Batch Quizzes
      </h2>

      {/* Quiz Container */}
      <div className="scrollbar-thin scrollbar-thumb-indigo-300">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Create New Quiz Card */}
          <div
            className="relative bg-gradient-to-br from-indigo-100 to-indigo-50 border-2 border-dashed border-indigo-400 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer 
                     hover:shadow-xl hover:bg-indigo-100 transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden"
            onClick={handleCreateQuiz}
          >
            <div className="bg-indigo-200 p-4 rounded-full flex items-center justify-center mb-3 transition-all duration-300 hover:bg-indigo-300 shadow-md">
              <FaPlus className="text-indigo-700 text-5xl" />
            </div>
            <p className="text-indigo-700 font-semibold text-lg">
              Create New Quiz
            </p>
          </div>

          {/* List of Quizzes */}
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="relative bg-white border border-indigo-200 rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-300 flex flex-col text-center overflow-hidden"
            >
              {/* Quiz Name */}
              <button onClick={() => handleQuiz(quiz._id)} className="w-full">
                <h4 className="text-lg font-semibold text-indigo-700">
                  {quiz?.name}
                </h4>

                {/* Start & End Time */}
                <div className="mt-3 space-y-2 text-gray-600 text-sm">
                  <p className="flex items-center justify-center">
                    <FaCalendarAlt className="mr-2 text-indigo-600" />
                    <span>
                      <strong>Start:</strong>{" "}
                      {moment(quiz?.startTime).format("DD MMM YYYY, hh:mm A")}
                    </span>
                  </p>
                  <p className="flex items-center justify-center">
                    <FaCalendarAlt className="mr-2 text-indigo-600" />
                    <span>
                      <strong>End:</strong>{" "}
                      {moment(quiz?.endTime).format("DD MMM YYYY, hh:mm A")}
                    </span>
                  </p>
                </div>

                {/* Problems & Participants */}
                <div className="flex items-center justify-between mt-4 text-gray-700 text-sm">
                  <p className="flex items-center">
                    <FaTasks className="mr-2 text-blue-500" />
                    <span>{quiz?.questions?.length} Problems</span>
                  </p>
                  <p className="flex items-center">
                    <FaUsers className="mr-2 text-green-500" />
                    <span>{quiz.participants?.length} Participants</span>
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TotalStudents = ({ students }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Total Students: {students.length}
      </h2>

      {students.length === 0 ? (
        <p className="text-gray-500 text-center">No Student in this Batch.</p>
      ) : (
        <div className="overflow-hidden rounded-lg shadow-md border border-gray-300">
          {/* Scrollable Container */}
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead className="sticky top-0 bg-blue-500 text-white uppercase text-sm font-semibold shadow-md">
                <tr>
                  <th className="p-4 border border-gray-300 text-center">ID</th>
                  <th className="p-4 border border-gray-300 text-center">
                    Name
                  </th>
                  <th className="p-4 border border-gray-300 text-center">
                    Email
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="bg-white">
                {students.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`border border-gray-300 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition-all`}
                  >
                    <td className="p-4 border border-gray-300 text-center text-gray-700">
                      {index + 1}
                    </td>
                    <td className="p-4 border border-gray-300 text-center text-gray-700">
                      {student.username}
                    </td>
                    <td className="p-4 border border-gray-300 text-center text-gray-700">
                      {student.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Add new QuizPerformance component
const QuizPerformance = ({ id }) => {
  const [studentSearch, setStudentSearch] = useState("");
  const { data, isLoading } = useStudentQuizPerformanceQuery(id);

  if (isLoading) return <LoadingSpinner />;

  // Group performance data by student
  const groupedData = {};
  data?.performanceData?.forEach((entry) => {
    if (!groupedData[entry.student]) {
      groupedData[entry.student] = {};
    }
    groupedData[entry.student][entry.quiz] = {
      score: entry.score,
      total: entry.total,
      percentage:
        entry.total > 0
          ? ((entry.score / entry.total) * 100).toFixed(1) + "%"
          : "0%",
    };
  });

  // Extract unique quiz names dynamically
  const quizNames = [
    ...new Set(data?.performanceData.map((entry) => entry.quiz)),
  ];

  // 📌 Export to Excel function
  const exportToExcel = () => {
    const excelData = Object.keys(groupedData).map((student) => {
      const rowData = { Student: student };
      quizNames.forEach((quiz) => {
        const performance = groupedData[student][quiz];
        rowData[quiz] = performance
          ? `${performance.score}/${performance.total} (${performance.percentage})`
          : "—";
      });
      return rowData;
    });

    if (excelData.length === 0) {
      alert("No data available to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Quiz Performance");

    XLSX.writeFile(workbook, "Quiz_Performance.xlsx");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Student Quiz Performance
      </h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by student name..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          value={studentSearch}
          onChange={(e) => setStudentSearch(e.target.value)}
        />
      </div>

      {/* Performance Table */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300">
        <table className="w-full border-collapse">
          <thead className="bg-blue-500 text-white uppercase text-sm font-semibold">
            <tr>
              <th className="p-4 border border-gray-300 text-center">
                Student
              </th>
              {quizNames.map((quiz, index) => (
                <th
                  key={index}
                  className="p-4 border border-gray-300 text-center"
                >
                  {quiz}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {Object.keys(groupedData)
              .filter((student) =>
                student.toLowerCase().includes(studentSearch.toLowerCase())
              )
              .map((student, index) => (
                <tr
                  key={index}
                  className="border border-gray-300 hover:bg-gray-100 transition-all"
                >
                  <td className="p-4 border border-gray-300 text-center font-semibold">
                    {student}
                  </td>
                  {quizNames.map((quiz, idx) => {
                    const performance = groupedData[student][quiz];
                    return (
                      <td
                        key={idx}
                        className="p-4 border border-gray-300 text-center"
                      >
                        {performance ? (
                          <span className="font-bold">
                            {performance.score}/{performance.total} (
                            {performance.percentage})
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Excel Export Button */}
      <div className="relative group w-fit mx-auto mt-6">
        <button
          onClick={exportToExcel}
          className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition transform hover:scale-105 focus:outline-none flex items-center gap-2"
        >
          <FaFileExcel className="w-5 h-5" />
          <span>Export as Excel</span>
        </button>

        {/* Tooltip */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-12 bg-black text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap">
          Download student quiz data as an Excel file 📊
        </div>
      </div>
    </div>
  );
};

const PendingRequests = ({ pendingRequests, onBatchRequest }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Pending Requests
      </h2>

      {pendingRequests.length === 0 ? (
        <p className="text-gray-500 text-center">No pending requests.</p>
      ) : (
        <div className="overflow-hidden rounded-lg shadow-md">
          {/* Scrollable Container */}
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead className="sticky top-0 bg-blue-500 text-white uppercase text-sm font-semibold shadow-md">
                <tr>
                  <th className="p-4 border border-gray-300 text-left">ID</th>
                  <th className="p-4 border border-gray-300 text-left">Name</th>
                  <th className="p-4 border border-gray-300 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="bg-white">
                {pendingRequests.map((request, index) => (
                  <tr
                    key={request._id}
                    className={`border border-gray-300 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition-all`}
                  >
                    <td className="p-4 border border-gray-300 text-gray-700">
                      {index + 1}
                    </td>
                    <td className="p-4 border border-gray-300 text-gray-700">
                      {request.username}
                    </td>
                    <td className="p-4 border border-gray-300 flex justify-center gap-3">
                      <button
                        onClick={() => onBatchRequest(request._id, "approve")}
                        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
                      >
                        <FaCheckCircle size={18} />
                        Approve
                      </button>
                      <button
                        onClick={() => onBatchRequest(request._id, "reject")}
                        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
                      >
                        <FaTimesCircle size={18} />
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

function BatchPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showQuizSetup, setShowQuizSetup] = useState(false);

  const [activeSection, setActiveSection] = useState("Batch Quizzes");

  const { batchID } = useSelector((state) => state.auth);

  const { data, isLoading: isBatchLoding } = useBatchDataQuery({
    batchId: batchID,
  });

  const batchData = data?.batch;

  const [batchRequests, requestStatus] = useBatchReqestsMutation();

  useMutationToast({
    ...requestStatus,
    successMessage: requestStatus.data?.message,
  });

  const handleBatchRequest = async (studentId, action) => {
    try {
      const data = {
        studentId,
        action,
      };
      await batchRequests({ id: batchData._id, data });
    } catch (error) {
      console.error("Error handling batch request:", error);
    }
  };

  const handleQuiz = (id) => {
    dispatch(setQuizID(id));
    navigate("/quiz/overview");
  };

  const handleCreateQuiz = () => {
    setShowQuizSetup(true);
  };

  if (isBatchLoding) return <LoadingSpinner />;

  return (
    <div className="flex flex-col md:flex-row sm:p-4 lg:p-8 gap-5 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Left Side */}
      <div className="w-full md:w-1/3">
        <BatchHeader batchData={batchData} />
      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col items-center">
        {/* Navigation */}
        <BatchSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sections={sections}
        />

        {/* Active Section */}
        <div className="w-full bg-white p-6 rounded-lg shadow-xl">
          {activeSection === "Batch Quizzes" && (
            <BatchQuizzes
              quizzes={batchData.quizzes}
              handleQuiz={handleQuiz}
              handleCreateQuiz={handleCreateQuiz}
            />
          )}
          {activeSection === "Total Students" && (
            <TotalStudents students={batchData.students} />
          )}
          {activeSection === "Pending Requests" && (
            <PendingRequests
              pendingRequests={batchData.pendingRequests}
              onBatchRequest={handleBatchRequest}
            />
          )}
          {/* Add new section */}
          {activeSection === "Quiz Performance" && (
            <QuizPerformance id={batchID} />
          )}
        </div>
      </div>

      {/* Quiz Setup Panel */}
      {showQuizSetup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
          <ChallengeSetup
            onClose={() => setShowQuizSetup(false)}
            activeMode={"Quiz"}
          />
        </div>
      )}
    </div>
  );
}

export default BatchPage;
