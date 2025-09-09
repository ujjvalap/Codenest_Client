// /* eslint-disable react/prop-types */
// import React, { useEffect, useState } from "react";
// import { FaTimes } from "react-icons/fa";
// import useMutationToast from "../../hooks/useMutationToast";
// import {
//   useCreateBatcheMutation,
//   useCreateChallengeMutation,
//   useCreateQuizMutation,
// } from "../../redux/api/api";
// import { useSelector } from "react-redux";

// function ChallengeSetup({ onClose, activeMode }) {
//   const [title, setTitle] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [description, setDescription] = useState("");

//   const { batchID } = useSelector((state) => state.auth);

//   let type = "";

//   if (activeMode === "quizzes") {
//     type = "Batch";
//   } else if (activeMode === "contests") {
//     type = "Coding Challenge";
//   } else {
//     type = "Quiz";
//   }

//   // Destructure mutation and status properties
//   const [createChallenge, challengeStatus] = useCreateChallengeMutation();
//   const [createBatch, batchStatus] = useCreateBatcheMutation();
//   const [createQuiz, quizStatus] = useCreateQuizMutation();

//   // Choose the correct mutation status based on challengeType
//   let mutationStatus;

//   if (type == "Batch") mutationStatus = batchStatus;
//   else if (type == "Quiz") mutationStatus = quizStatus;
//   else mutationStatus = challengeStatus;

//   // Apply `useMutationToast` dynamically
//   useMutationToast({
//     ...mutationStatus,
//     loadingMessage: `Creating ${type}...`,
//     successMessage:
//       mutationStatus.data?.message || `${type} created successfully!`,
//   });

//   // Handle close logic after successful mutation
//   useEffect(() => {
//     if (mutationStatus.isSuccess) {
//       onClose();
//     }
//   }, [mutationStatus.isSuccess, onClose]);

//   // Function to handle time conversion to UTC
//   const convertToUTC = (localDateTime) => {
//     const date = new Date(localDateTime);
//     return date.toISOString(); // Converts to ISO string in UTC format
//   };

//   // Functions to create different challenge types
//   const handleCreateBatch = async () => {
//     const data = { name: title, description };
//     await createBatch(data).unwrap();
//   };

//   const handleCreateCodingChallenge = async () => {
//     const data = {
//       title,
//       description,
//       startTime: convertToUTC(startTime),
//       endTime: convertToUTC(endTime),
//     };
//     await createChallenge(data).unwrap();
//   };

//   const handleCreateQuestionBank = async () => {
//     const data = {
//       name: title,
//       description,
//       startTime: convertToUTC(startTime),
//       endTime: convertToUTC(endTime),
//     };

//     await createQuiz({ id: batchID, data }).unwrap();
//   };

//   const handleSubmit = async () => {
//     if (!title.trim()) {
//       alert(`${type} Name is required.`);
//       return;
//     }

//     if (!description.trim()) {
//       alert(`${type} Description is required.`);
//       return;
//     }

//     if (activeMode !== "quizzes") {
//       if (!startTime) {
//         alert("Start Time is required.");
//         return;
//       }

//       if (!endTime) {
//         alert("End Time is required.");
//         return;
//       }

//       if (new Date(startTime) >= new Date(endTime)) {
//         alert("End Time must be after Start Time.");
//         return;
//       }
//     }

//     if (activeMode === "quizzes") {
//       await handleCreateBatch();
//     } else if (activeMode === "contests") {
//       await handleCreateCodingChallenge();
//     } else {
//       await handleCreateQuestionBank();
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-md shadow-lg w-full max-w-md mx-auto relative">
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//       >
//         <FaTimes />
//       </button>
//       <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center border-b border-gray-200">
//         {type} Setup
//       </h1>

//       {/* Challenge Setup Form */}
//       <div className="mb-4">
//         <label className="block text-gray-700">{type} Name</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
//           required
//         />
//       </div>

//       {/* Start and End Time */}
//       {activeMode !== "quizzes" && (
//         <>
//           <div className="mb-4">
//             <label className="block text-gray-700">Start Time</label>
//             <input
//               type="datetime-local"
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">End Time</label>
//             <input
//               type="datetime-local"
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
//               required
//             />
//           </div>
//         </>
//       )}

//       {/* Description */}
//       <div className="mb-6">
//         <label className="block text-gray-700">{type} Description</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
//           rows="4"
//         />
//       </div>

//       {/* Create Challenge Button */}
//       <button
//         onClick={handleSubmit}
//         className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
//       >
//         Create {type}
//       </button>
//     </div>
//   );
// }

// export default ChallengeSetup;



/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import useMutationToast from "../../hooks/useMutationToast";
import {
  useCreateBatcheMutation,
  useCreateChallengeMutation,
  useCreateQuizMutation,
} from "../../redux/api/api";
import { useSelector } from "react-redux";

function ChallengeSetup({ onClose, activeMode }) {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const { batchID } = useSelector((state) => state.auth);

  let type = "";

  if (activeMode === "quizzes") {
    type = "Batch";
  } else if (activeMode === "contests") {
    type = "Coding Challenge";
  } else {
    type = "Quiz";
  }

  const [createChallenge, challengeStatus] = useCreateChallengeMutation();
  const [createBatch, batchStatus] = useCreateBatcheMutation();
  const [createQuiz, quizStatus] = useCreateQuizMutation();

  let mutationStatus;
  if (type === "Batch") mutationStatus = batchStatus;
  else if (type === "Quiz") mutationStatus = quizStatus;
  else mutationStatus = challengeStatus;

  useMutationToast({
    ...mutationStatus,
    loadingMessage: `Creating ${type}...`,
    successMessage: mutationStatus.data?.message || `${type} created successfully!`,
  });

  useEffect(() => {
    if (mutationStatus.isSuccess) {
      onClose();
    }
  }, [mutationStatus.isSuccess, onClose]);

  const convertToUTC = (localDateTime) => {
    const date = new Date(localDateTime);
    return date.toISOString();
  };

  const validateForm = () => {
    const errors = {};
    if (!title.trim()) errors.title = `${type} Name is required.`;
    if (!description.trim()) errors.description = `${type} Description is required.`;
    if (activeMode !== "quizzes") {
      if (!startTime) errors.startTime = "Start Time is required.";
      if (!endTime) errors.endTime = "End Time is required.";
      if (startTime && endTime && new Date(startTime) >= new Date(endTime)) {
        errors.endTime = "End Time must be after Start Time.";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateBatch = async () => {
    const data = { name: title, description };
    await createBatch(data).unwrap();
  };

  const handleCreateCodingChallenge = async () => {
    const data = {
      title,
      description,
      startTime: convertToUTC(startTime),
      endTime: convertToUTC(endTime),
    };
    await createChallenge(data).unwrap();
  };

  const handleCreateQuestionBank = async () => {
    const data = {
      name: title,
      description,
      startTime: convertToUTC(startTime),
      endTime: convertToUTC(endTime),
    };
    await createQuiz({ id: batchID, data }).unwrap();
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (activeMode === "quizzes") {
      await handleCreateBatch();
    } else if (activeMode === "contests") {
      await handleCreateCodingChallenge();
    } else {
      await handleCreateQuestionBank();
    }
  };

  return (
    <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl mx-auto relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition"
        aria-label="Close dialog"
      >
        <FaTimes size={20} />
      </button>

      {/* Title */}
      <h2 className="text-center text-3xl font-extrabold text-indigo-700 mb-6 border-b border-indigo-100 pb-3 select-none">
        {type} Setup
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        noValidate
        className="space-y-5"
      >
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-1">
            {type} Name
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
              formErrors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={`Enter ${type} name`}
            aria-invalid={!!formErrors.title}
            aria-describedby={formErrors.title ? "title-error" : undefined}
            autoFocus
          />
          {formErrors.title && (
            <p id="title-error" className="mt-1 text-sm text-red-600">
              {formErrors.title}
            </p>
          )}
        </div>

        {/* Start and End Time - hide for quizzes */}
        {activeMode !== "quizzes" && (
          <>
            <div>
              <label htmlFor="startTime" className="block text-gray-700 font-semibold mb-1">
                Start Time
              </label>
              <input
                id="startTime"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                  formErrors.startTime ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={!!formErrors.startTime}
                aria-describedby={formErrors.startTime ? "startTime-error" : undefined}
              />
              {formErrors.startTime && (
                <p id="startTime-error" className="mt-1 text-sm text-red-600">
                  {formErrors.startTime}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="endTime" className="block text-gray-700 font-semibold mb-1">
                End Time
              </label>
              <input
                id="endTime"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                  formErrors.endTime ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={!!formErrors.endTime}
                aria-describedby={formErrors.endTime ? "endTime-error" : undefined}
              />
              {formErrors.endTime && (
                <p id="endTime-error" className="mt-1 text-sm text-red-600">
                  {formErrors.endTime}
                </p>
              )}
            </div>
          </>
        )}

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">
            {type} Description
          </label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none ${
              formErrors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={`Enter ${type} description`}
            aria-invalid={!!formErrors.description}
            aria-describedby={formErrors.description ? "description-error" : undefined}
          />
          {formErrors.description && (
            <p id="description-error" className="mt-1 text-sm text-red-600">
              {formErrors.description}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={mutationStatus.isLoading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-md transition flex justify-center items-center gap-2"
        >
          {mutationStatus.isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : null}
          Create {type}
        </button>
      </form>
    </div>
  );
}

export default ChallengeSetup;
