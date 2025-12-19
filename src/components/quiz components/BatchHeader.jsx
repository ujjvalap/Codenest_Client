// /* eslint-disable react/prop-types */
// import clsx from "clsx";
// import moment from "moment";
// import {
//   FaCalendarAlt,
//   FaClipboard,
//   FaClipboardCheck,
//   FaKey,
//   FaTasks,
//   FaTrash,
// } from "react-icons/fa";
// import ConfirmationDeleteModal from "../../shared/ConfirmationDeleteModal";
// import { useEffect, useState } from "react";
// import {
//   useDeleteBatchMutation,
//   useEditBtachDataMutation,
// } from "../../redux/api/api";
// import useMutationToast from "../../hooks/useMutationToast";
// import { useNavigate } from "react-router-dom";

// const BatchHeader = ({ batchData }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState({
//     name: batchData.name,
//     description: batchData.description,
//   });

//   const navigate = useNavigate();

//   const [editBatch, editStatus] = useEditBtachDataMutation();
//   const [deleteBatch, deleteStatus] = useDeleteBatchMutation();

//   useMutationToast({
//     ...editStatus,
//     successMessage: editStatus.data?.message || "Batch updated successfully",
//   });

//   useMutationToast({
//     ...deleteStatus,
//     successMessage: deleteStatus.data?.message || "Batch deleted successfully",
//   });

//   // Clipboard copy function
//   const handleCopy = async () => {
//     await navigator.clipboard.writeText(batchData.batchCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // Function to format date and time for display (e.g., "1 December 2024, 14:30")
//   const formatDisplayDateTime = (date) => {
//     return moment(date).format("D MMMM YYYY, h:mm A");
//   };

//   // Handle batch data edit submission
//   const handleEditBatchData = async (event) => {
//     event.preventDefault();

//     if (!editedData.name.trim() || !editedData.description.trim()) {
//       alert("Batch name and description cannot be empty.");
//       return;
//     }

//     await editBatch({ id: batchData._id, data: editedData });

//     // Close edit mode
//     setIsEditing(false);
//   };

//   useEffect(() => {
//     if (deleteStatus.isSuccess) {
//       navigate(-1); // Navigate back after successful deletion
//     }
//   }, [deleteStatus.isSuccess, navigate]);

//   const handleDeleteBatch = async () => {
//     await deleteBatch(batchData._id);
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setEditedData((prev) => ({ ...prev, [name]: value }));
//   };

//   const DateCard = ({ label, icon: Icon, date }) => (
//     <section className="flex flex-col items-start bg-gradient-to-r from-indigo-200 to-indigo-300 text-indigo-800 py-4 px-6 rounded-lg font-semibold shadow-md w-full sm:w-auto max-w-xs transition duration-300 transform hover:scale-105">
//       <div className="flex items-center gap-2 mb-2">
//         <Icon className="text-indigo-600" />
//         <span className="font-bold text-indigo-700">{label}</span>
//       </div>
//       <span className="text-gray-700">{formatDisplayDateTime(date)}</span>
//     </section>
//   );

//   const ActionButton = ({ label, icon: Icon, onClick, color }) => (
//     <button
//       onClick={onClick}
//       className={clsx(
//         "flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium shadow-lg transition duration-200 transform hover:scale-105 whitespace-nowrap text-sm sm:text-base",
//         {
//           "bg-green-500 text-white hover:bg-green-600": color === "green",
//           "bg-indigo-600 text-white hover:bg-indigo-700": color === "indigo",
//           "bg-red-600 text-white hover:bg-red-700": color === "red",
//         }
//       )}
//     >
//       <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
//       {label}
//     </button>
//   );

//   return (
//     <header className="p-8 rounded-lg bg-white shadow-lg w-full mb-6">
//       <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">
//         {batchData?.name}
//       </h1>

//       {isEditing ? (
//         <form onSubmit={handleEditBatchData} className="mb-4">
//           <input
//             name="name"
//             value={editedData.name}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-md p-2 mb-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             required
//           />
//           <textarea
//             name="description"
//             value={editedData.description}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-md p-2 mb-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             required
//           />
//           <div className="flex justify-start">
//             <button
//               type="submit"
//               className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition duration-200"
//             >
//               Update Batch Details
//             </button>
//             <button
//               type="button"
//               onClick={() => setIsEditing(false)}
//               className="ml-2 bg-gray-400 text-white py-2 px-4 rounded-md shadow hover:bg-gray-500 transition duration-200"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       ) : (
//         <>
//           <p className="text-lg text-gray-700 font-medium mb-6 leading-relaxed">
//             {batchData.description}
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-8 text-sm text-gray-800 mb-6">
//             <DateCard
//               label="Start Date"
//               icon={FaCalendarAlt}
//               date={batchData.startDate}
//             />
//           </div>

//           <div className="flex flex-col sm:flex-row justify-center gap-8 text-sm text-gray-800 mb-6">
//             {/* Batch code Card */}
//             <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-indigo-200 to-indigo-300 text-indigo-800 py-4 px-6 rounded-lg font-semibold shadow-md w-full sm:w-auto max-w-xs">
//               <div className="flex items-center gap-2 mb-4 sm:mb-0">
//                 <FaKey className="text-indigo-600" />
//                 <span className="font-bold text-indigo-700">Batch Code:</span>
//                 <span className="text-gray-700 bg-zinc-100 py-2 px-5 rounded-md">
//                   {batchData.batchCode}
//                 </span>
//               </div>
//               <div className="w-full sm:w-auto ml-2">
//                 <ActionButton
//                   label={copied ? "Copied!" : "Copy"}
//                   icon={copied ? FaClipboardCheck : FaClipboard}
//                   onClick={handleCopy}
//                   color={copied ? "green" : "indigo"}
//                 />
//               </div>
//             </section>
//           </div>

//           <div className="flex flex-col items-center gap-6 mt-6">
//             {/* Edit and Delete Buttons */}
//             <div className="w-full flex flex-col sm:flex-row justify-center gap-4">
//               <ActionButton
//                 label="Edit Batch"
//                 icon={FaTasks}
//                 onClick={() => setIsEditing(true)}
//                 color="indigo"
//                 className="flex-1 sm:flex-none"
//               />
//               <ActionButton
//                 label="Delete Batch"
//                 icon={FaTrash}
//                 onClick={() => setIsModalOpen(true)}
//                 color="red"
//                 className="flex-1 sm:flex-none"
//               />
//             </div>
//           </div>
//         </>
//       )}

//       {/* Modal for Delete Confirmation */}
//       <ConfirmationDeleteModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={handleDeleteBatch}
//         title="Delete Batch"
//         message="Are you sure you want to delete this batch? This action cannot be undone."
//       />
//     </header>
//   );
// };

// export default BatchHeader;





/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  useDeleteBatchMutation,
  useEditBtachDataMutation,
} from "../../redux/api/api";
import useMutationToast from "../../hooks/useMutationToast";

// Reusable subcomponents
const DateCard = ({ label, icon: Icon, date }) => (
  <section className="flex flex-col items-start bg-gradient-to-br from-indigo-500/10 via-sky-500/10 to-purple-500/10 text-indigo-50/90 border border-white/20 backdrop-blur-md py-4 px-6 rounded-2xl font-medium shadow-lg w-full sm:w-auto max-w-xs transition-transform duration-300 hover:scale-[1.02] hover:border-white/40">
    <div className="flex items-center gap-2 mb-1">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-100 shadow-sm">
        <Icon className="text-indigo-100" aria-hidden="true" />
      </span>
      <span className="font-semibold text-sm uppercase tracking-wide text-indigo-100/90">
        {label}
      </span>
    </div>
    <span className="text-xs sm:text-sm text-slate-100/90">
      {moment(date).format("D MMMM YYYY, h:mm A")}
    </span>
  </section>
);

const ActionButton = ({
  label,
  icon: Icon,
  onClick,
  color = "indigo",
  type = "button",
  ariaLabel,
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-medium shadow-md transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-xs sm:text-sm whitespace-nowrap";

  const colorClasses = {
    indigo:
      "bg-gradient-to-r from-indigo-500 via-sky-500 to-purple-500 text-white hover:from-indigo-600 hover:via-sky-600 hover:to-purple-600 focus-visible:ring-indigo-400 focus-visible:ring-offset-slate-900",
    green:
      "bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-emerald-400 focus-visible:ring-offset-slate-900",
    red:
      "bg-gradient-to-r from-rose-500 to-red-500 text-white hover:from-rose-600 hover:to-red-600 focus-visible:ring-rose-400 focus-visible:ring-offset-slate-900",
    gray:
      "bg-slate-700/70 text-slate-100 hover:bg-slate-700 focus-visible:ring-slate-400 focus-visible:ring-offset-slate-900",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel || label}
      className={clsx(
        baseClasses,
        colorClasses[color],
        "hover:-translate-y-[1px] active:scale-[0.98] rounded-full"
      )}
    >
      {Icon && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />}
      <span>{label}</span>
    </button>
  );
};

const BatchHeader = ({ batchData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editedData, setEditedData] = useState({
    name: batchData?.name || "",
    description: batchData?.description || "",
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

  const handleCopy = useCallback(async () => {
    if (!batchData?.batchCode) return;
    await navigator.clipboard.writeText(batchData.batchCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [batchData?.batchCode]);

  const handleEditBatchData = async (event) => {
    event.preventDefault();

    const trimmedName = editedData.name.trim();
    const trimmedDescription = editedData.description.trim();

    if (!trimmedName || !trimmedDescription) {
      // Hook your toast or inline error here instead of alert
      return;
    }

    await editBatch({
      id: batchData._id,
      data: {
        ...editedData,
        name: trimmedName,
        description: trimmedDescription,
      },
    });

    setIsEditing(false);
  };

  const handleDeleteBatch = async () => {
    await deleteBatch(batchData._id);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (deleteStatus.isSuccess) {
      navigate(-1);
    }
  }, [deleteStatus.isSuccess, navigate]);

  return (
    <header className="w-full mb-6">
      {/* Background and glass card wrapper */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-[1px] shadow-[0_20px_45px_rgba(15,23,42,0.7)]">
        <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.35),transparent_55%),radial-gradient(circle_at_bottom,_rgba(45,212,191,0.25),transparent_55%)]" />
        <div className="relative pointer-events-auto rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 p-5 sm:p-7 md:p-8">
          {/* Top section: title + date */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-50 mb-1 break-words">
                {batchData?.name}
              </h1>

              {isEditing ? (
                <form onSubmit={handleEditBatchData} className="space-y-3 mt-3">
                  <input
                    name="name"
                    value={editedData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl p-2.5 text-sm sm:text-base text-slate-50 placeholder:text-slate-500 transition focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-transparent"
                    placeholder="Batch name"
                    required
                  />
                  <textarea
                    name="description"
                    value={editedData.description}
                    onChange={handleChange}
                    className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl p-2.5 text-sm sm:text-base text-slate-50 placeholder:text-slate-500 transition resize-y min-h-[90px] focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-transparent"
                    placeholder="Batch description"
                    required
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    <ActionButton
                      type="submit"
                      label="Update Batch Details"
                      icon={FaTasks}
                      color="indigo"
                    />
                    <ActionButton
                      type="button"
                      label="Cancel"
                      color="gray"
                      onClick={() => setIsEditing(false)}
                    />
                  </div>
                </form>
              ) : (
                <p className="mt-2 text-sm sm:text-base text-slate-300/95 leading-relaxed">
                  {batchData?.description}
                </p>
              )}
            </div>

            {/* Start date card */}
            {!isEditing && (
              <div className="mt-2 sm:mt-0 flex-shrink-0 flex justify-start sm:justify-end">
                <DateCard
                  label="Start Date"
                  icon={FaCalendarAlt}
                  date={batchData.startDate}
                />
              </div>
            )}
          </div>

          {/* Non-edit mode: batch code + actions */}
          {!isEditing && (
            <>
              {/* Batch code */}
              <div className="mt-6">
                <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-900/70 border border-slate-700/80 rounded-2xl py-4 px-4 sm:px-6 shadow-inner gap-3">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-200">
                      <FaKey className="text-indigo-200" aria-hidden="true" />
                    </span>
                    <span className="font-medium text-xs sm:text-sm text-slate-200">
                      Batch Code
                    </span>
                    <span className="text-slate-100 bg-slate-800/80 border border-slate-700/60 py-1.5 px-4 rounded-full text-[11px] sm:text-xs break-all">
                      {batchData.batchCode}
                    </span>
                  </div>
                  <div className="w-full sm:w-auto">
                    <ActionButton
                      label={copied ? "Copied!" : "Copy"}
                      ariaLabel="Copy batch code"
                      icon={copied ? FaClipboardCheck : FaClipboard}
                      onClick={handleCopy}
                      color={copied ? "green" : "indigo"}
                    />
                  </div>
                </section>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <ActionButton
                  label="Edit Batch"
                  icon={FaTasks}
                  onClick={() => setIsEditing(true)}
                  color="indigo"
                />
                <ActionButton
                  label="Delete Batch"
                  icon={FaTrash}
                  onClick={() => setIsModalOpen(true)}
                  color="red"
                />
              </div>
            </>
          )}
        </div>
      </div>

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
