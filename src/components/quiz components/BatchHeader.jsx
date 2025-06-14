/* eslint-disable react/prop-types */
import clsx from "clsx";
import moment from "moment";
import {
  FaCalendarAlt,
  FaClipboard,
  FaClipboardCheck,
  FaKey,
  FaTasks,
  FaTrash,
} from "react-icons/fa";
import ConfirmationDeleteModal from "../../shared/ConfirmationDeleteModal";
import { useEffect, useState } from "react";
import {
  useDeleteBatchMutation,
  useEditBtachDataMutation,
} from "../../redux/api/api";
import useMutationToast from "../../hooks/useMutationToast";
import { useNavigate } from "react-router-dom";

const BatchHeader = ({ batchData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: batchData.name,
    description: batchData.description,
  });

  const navigate = useNavigate();

  const [editBatch, editStatus] = useEditBtachDataMutation();
  const [deleteBatch, deleteStatus] = useDeleteBatchMutation();

  useMutationToast({
    ...editStatus,
    successMessage: editStatus.data?.message || "Batch updated successfully",
  });

  useMutationToast({
    ...deleteStatus,
    successMessage: deleteStatus.data?.message || "Batch deleted successfully",
  });

  // Clipboard copy function
  const handleCopy = async () => {
    await navigator.clipboard.writeText(batchData.batchCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to format date and time for display (e.g., "1 December 2024, 14:30")
  const formatDisplayDateTime = (date) => {
    return moment(date).format("D MMMM YYYY, h:mm A");
  };

  // Handle batch data edit submission
  const handleEditBatchData = async (event) => {
    event.preventDefault();

    if (!editedData.name.trim() || !editedData.description.trim()) {
      alert("Batch name and description cannot be empty.");
      return;
    }

    await editBatch({ id: batchData._id, data: editedData });

    // Close edit mode
    setIsEditing(false);
  };

  useEffect(() => {
    if (deleteStatus.isSuccess) {
      navigate(-1); // Navigate back after successful deletion
    }
  }, [deleteStatus.isSuccess, navigate]);

  const handleDeleteBatch = async () => {
    await deleteBatch(batchData._id);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const DateCard = ({ label, icon: Icon, date }) => (
    <section className="flex flex-col items-start bg-gradient-to-r from-indigo-200 to-indigo-300 text-indigo-800 py-4 px-6 rounded-lg font-semibold shadow-md w-full sm:w-auto max-w-xs transition duration-300 transform hover:scale-105">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="text-indigo-600" />
        <span className="font-bold text-indigo-700">{label}</span>
      </div>
      <span className="text-gray-700">{formatDisplayDateTime(date)}</span>
    </section>
  );

  const ActionButton = ({ label, icon: Icon, onClick, color }) => (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium shadow-lg transition duration-200 transform hover:scale-105 whitespace-nowrap text-sm sm:text-base",
        {
          "bg-green-500 text-white hover:bg-green-600": color === "green",
          "bg-indigo-600 text-white hover:bg-indigo-700": color === "indigo",
          "bg-red-600 text-white hover:bg-red-700": color === "red",
        }
      )}
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      {label}
    </button>
  );

  return (
    <header className="p-8 rounded-lg bg-white shadow-lg w-full mb-6">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">
        {batchData?.name}
      </h1>

      {isEditing ? (
        <form onSubmit={handleEditBatchData} className="mb-4">
          <input
            name="name"
            value={editedData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mb-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <textarea
            name="description"
            value={editedData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mb-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <div className="flex justify-start">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition duration-200"
            >
              Update Batch Details
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="ml-2 bg-gray-400 text-white py-2 px-4 rounded-md shadow hover:bg-gray-500 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="text-lg text-gray-700 font-medium mb-6 leading-relaxed">
            {batchData.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8 text-sm text-gray-800 mb-6">
            <DateCard
              label="Start Date"
              icon={FaCalendarAlt}
              date={batchData.startDate}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-8 text-sm text-gray-800 mb-6">
            {/* Batch code Card */}
            <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-indigo-200 to-indigo-300 text-indigo-800 py-4 px-6 rounded-lg font-semibold shadow-md w-full sm:w-auto max-w-xs">
              <div className="flex items-center gap-2 mb-4 sm:mb-0">
                <FaKey className="text-indigo-600" />
                <span className="font-bold text-indigo-700">Batch Code:</span>
                <span className="text-gray-700 bg-zinc-100 py-2 px-5 rounded-md">
                  {batchData.batchCode}
                </span>
              </div>
              <div className="w-full sm:w-auto ml-2">
                <ActionButton
                  label={copied ? "Copied!" : "Copy"}
                  icon={copied ? FaClipboardCheck : FaClipboard}
                  onClick={handleCopy}
                  color={copied ? "green" : "indigo"}
                />
              </div>
            </section>
          </div>

          <div className="flex flex-col items-center gap-6 mt-6">
            {/* Edit and Delete Buttons */}
            <div className="w-full flex flex-col sm:flex-row justify-center gap-4">
              <ActionButton
                label="Edit Batch"
                icon={FaTasks}
                onClick={() => setIsEditing(true)}
                color="indigo"
                className="flex-1 sm:flex-none"
              />
              <ActionButton
                label="Delete Batch"
                icon={FaTrash}
                onClick={() => setIsModalOpen(true)}
                color="red"
                className="flex-1 sm:flex-none"
              />
            </div>
          </div>
        </>
      )}

      {/* Modal for Delete Confirmation */}
      <ConfirmationDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteBatch}
        title="Delete Batch"
        message="Are you sure you want to delete this batch? This action cannot be undone."
      />
    </header>
  );
};

export default BatchHeader;
