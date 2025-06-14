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

  const { batchID } = useSelector((state) => state.auth);

  let type = "";

  if (activeMode === "quizzes") {
    type = "Batch";
  } else if (activeMode === "contests") {
    type = "Coding Challenge";
  } else {
    type = "Quiz";
  }

  // Destructure mutation and status properties
  const [createChallenge, challengeStatus] = useCreateChallengeMutation();
  const [createBatch, batchStatus] = useCreateBatcheMutation();
  const [createQuiz, quizStatus] = useCreateQuizMutation();

  // Choose the correct mutation status based on challengeType
  let mutationStatus;

  if (type == "Batch") mutationStatus = batchStatus;
  else if (type == "Quiz") mutationStatus = quizStatus;
  else mutationStatus = challengeStatus;

  // Apply `useMutationToast` dynamically
  useMutationToast({
    ...mutationStatus,
    loadingMessage: `Creating ${type}...`,
    successMessage:
      mutationStatus.data?.message || `${type} created successfully!`,
  });

  // Handle close logic after successful mutation
  useEffect(() => {
    if (mutationStatus.isSuccess) {
      onClose();
    }
  }, [mutationStatus.isSuccess, onClose]);

  // Function to handle time conversion to UTC
  const convertToUTC = (localDateTime) => {
    const date = new Date(localDateTime);
    return date.toISOString(); // Converts to ISO string in UTC format
  };

  // Functions to create different challenge types
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
    if (!title.trim()) {
      alert(`${type} Name is required.`);
      return;
    }

    if (!description.trim()) {
      alert(`${type} Description is required.`);
      return;
    }

    if (activeMode !== "quizzes") {
      if (!startTime) {
        alert("Start Time is required.");
        return;
      }

      if (!endTime) {
        alert("End Time is required.");
        return;
      }

      if (new Date(startTime) >= new Date(endTime)) {
        alert("End Time must be after Start Time.");
        return;
      }
    }

    if (activeMode === "quizzes") {
      await handleCreateBatch();
    } else if (activeMode === "contests") {
      await handleCreateCodingChallenge();
    } else {
      await handleCreateQuestionBank();
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-lg w-full max-w-md mx-auto relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <FaTimes />
      </button>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center border-b border-gray-200">
        {type} Setup
      </h1>

      {/* Challenge Setup Form */}
      <div className="mb-4">
        <label className="block text-gray-700">{type} Name</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
          required
        />
      </div>

      {/* Start and End Time */}
      {activeMode !== "quizzes" && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Start Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">End Time</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>
        </>
      )}

      {/* Description */}
      <div className="mb-6">
        <label className="block text-gray-700">{type} Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
          rows="4"
        />
      </div>

      {/* Create Challenge Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
      >
        Create {type}
      </button>
    </div>
  );
}

export default ChallengeSetup;
