/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  FaClock,
  FaUserGraduate,
  FaRegCalendarCheck,
  FaPlus,
  FaKey,
  FaArrowRight,
} from "react-icons/fa";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setBatchID } from "../../redux/reducers/auth";
import { useJoinBatchReqMutation } from "../../redux/api/api";
import useMutationToast from "../../hooks/useMutationToast";
import LoadingSpinner from "../LoadingSpinner";

const sections = [
  { name: "Batches", icon: <FaUserGraduate size={20} /> },
  { name: "Pending Requests", icon: <FaClock size={20} /> },
];

const JoinBatchModal = ({ onClose, setPendingRequests }) => {
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [joinBatchReq, reqStatus] = useJoinBatchReqMutation();

  // Custom hook for handling mutation responses
  useMutationToast({
    ...reqStatus,
    successMessage: reqStatus.data?.message,
  });

  useEffect(() => {
    if (reqStatus?.isSuccess) {
      setIsSubmitting(false);

      setPendingRequests(reqStatus?.data?.pendingRequests);
      onClose();
    }
  }, [reqStatus?.isSuccess]);

  useEffect(() => {
    if (reqStatus?.error) {
      setIsSubmitting(false);
    }
  }, [reqStatus?.error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await joinBatchReq({ batchCode: code });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <FaKey className="text-indigo-600 text-2xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Join New Batch
          </h3>
          <p className="text-gray-600">
            Enter the batch code provided by your instructor
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter Batch Code"
              className="w-full px-4 py-3 rounded-lg border-2 border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Joining...</span>
            ) : (
              <>
                <FaPlus className="mr-2" />
                Join Batch
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const PendingRequestsStudent = ({ requests }) => {
  return (
    <div>
      {requests.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-xs mx-auto mb-4">
            {/* Add your 3D illustration here */}
            <div className="bg-indigo-600 w-full h-48 rounded-xl mb-4 flex items-center justify-center">
              <span className="text-gray-900 text-2xl font-bold animate-bounce">
                No pending join requests
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-xl shadow-lg p-6 border border-indigo-50"
            >
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <FaClock className="text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {request.name}
                  </h3>
                  <p className="text-yellow-600 text-sm">Pending Approval</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const YourBatches = ({ batches, onOpenJoin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const handleBatchClick = (batchId) => {
    dispatch(setBatchID(batchId));
    navigate("/user/batch");
  };

  // Correct filtering logic
  const filteredBatches =
    searchQuery.trim() === ""
      ? batches
      : batches.filter((batch) =>
          batch?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const formatDisplayDateTime = (date) => {
    return moment(date).format("D MMMM YYYY");
  };

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-indigo-700">
          <span className="text-gray-500 text-lg ml-2">
            {filteredBatches.length} BATCHES
          </span>
        </h2>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search batches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-lg border border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
          />
          <svg
            className="absolute right-3 top-3 h-5 w-5 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {filteredBatches.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-xs mx-auto mb-4">
            {/* Add your 3D illustration here */}
            <div className="bg-indigo-600 w-full h-48 rounded-xl mb-4 flex items-center justify-center">
              <span className="text-gray-900 text-2xl font-bold animate-bounce">
                No batches available!
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {filteredBatches.map((batch) => (
            <div
              key={batch._id}
              onClick={() => handleBatchClick(batch._id)}
              className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-indigo-50 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {batch.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {batch.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-500">
                      <span className="font-medium mr-2">Start Date:</span>
                      {formatDisplayDateTime(batch.startDate)}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <span className="font-medium mr-2">Batch Code:</span>
                      {batch.batchCode}
                    </div>
                  </div>
                </div>
                <FaArrowRight className="text-indigo-600 ml-4 transform group-hover:translate-x-2 transition-all" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Join Button */}
      <button
        onClick={onOpenJoin}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white p-5 rounded-full shadow-xl hover:bg-indigo-700 transition-all hover:scale-105 flex items-center"
      >
        <FaPlus className="text-xl" />
        <span className="ml-2 font-semibold">Join Batch</span>
      </button>
    </div>
  );
};

// Modified StudentBatchPage
function StudentBatchPage() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [enrolledBatches] = useState(user?.batches);
  const [pendingRequests, setPendingRequests] = useState(user?.pendingRequests);

  if (!enrolledBatches || !pendingRequests) {
    <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-center gap-4">
            {sections.map((section) => (
              <button
                key={section.name}
                onClick={() =>
                  navigate(`#${section.name.toLowerCase().replace(" ", "-")}`)
                }
                className="px-6 py-3 flex items-center gap-2 rounded-xl text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition-all"
              >
                {section.icon} {section.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {location.hash.includes("pending") ? (
            <PendingRequestsStudent requests={pendingRequests} />
          ) : (
            <YourBatches
              batches={enrolledBatches}
              onOpenJoin={() => setShowJoinModal(true)}
            />
          )}
        </div>

        {showJoinModal && (
          <JoinBatchModal
            onClose={() => setShowJoinModal(false)}
            setPendingRequests={setPendingRequests}
          />
        )}
      </div>
    </div>
  );
}

export default StudentBatchPage;
