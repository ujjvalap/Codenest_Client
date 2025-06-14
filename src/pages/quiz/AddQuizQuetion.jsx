/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { X, Plus, Trash } from "lucide-react";
import {
  useAddQuestionToQuizMutation,
  useEditQuizQuestionMutation,
} from "../../redux/api/api";
import { useSelector } from "react-redux";
import useMutationToast from "../../hooks/useMutationToast";

export default function AddQuizQuestion({ editData, onClose }) {
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [marks, setMarks] = useState(1);
  const [difficulty, setDifficulty] = useState("medium");
  const [explanation, setExplanation] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const isEditMode = Boolean(editData);

  const { quizID } = useSelector((state) => state.auth);

  const [addQuestionToQuiz, addQuestionStatus] = useAddQuestionToQuizMutation();
  const [editQuizQuestion, editQuestionStatus] = useEditQuizQuestionMutation();

  useMutationToast({
    ...addQuestionStatus,
    successMessage: "New question added successfully!",
  });

  useMutationToast({
    ...editQuestionStatus,
    successMessage: "Question updated successfully!",
  });

  useEffect(() => {
    if (isEditMode) {
      setText(editData.text || "");
      setOptions(editData.options || ["", ""]);
      setCorrectAnswerIndex(editData.correctAnswerIndex ?? null);
      setMarks(editData.marks || 1);
      setDifficulty(editData.difficulty || "medium");
      setExplanation(editData.explanation || "");
      setTags(editData.tags || []);
    } else {
      resetForm();
    }
  }, [editData]);

  const resetForm = () => {
    setText("");
    setOptions(["", ""]);
    setCorrectAnswerIndex(null);
    setMarks(1);
    setDifficulty("medium");
    setExplanation("");
    setTags([]);
  };

  const handleAddOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""]);
    }
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    if (correctAnswerIndex === index) {
      setCorrectAnswerIndex(null);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!text.trim()) {
      alert("Please enter a question.");
      return;
    }
    if (options.some((opt) => !opt.trim())) {
      alert("Please fill in all options.");
      return;
    }
    if (correctAnswerIndex === null) {
      alert("Please select the correct answer.");
      return;
    }

    const questionData = {
      text,
      options,
      correctAnswerIndex,
      marks,
      difficulty,
      explanation,
      tags,
      quizId: quizID,
    };

    if (isEditMode) {
      editQuizQuestion({id: editData._id, data: questionData});
    } else {
      addQuestionToQuiz(questionData);
    }

    onClose();
    resetForm();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white shadow-lg p-6 rounded-xl border w-full max-w-2xl relative max-h-[70vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-center">
          {isEditMode ? "Edit Question" : "Add Question"}
        </h2>

        {/* Question Input */}
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-medium">
            Question <span className="text-red-500">*</span>
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter question..."
            className="w-full p-3 border rounded focus:ring focus:ring-blue-300 mt-1"
          />
        </div>

        {/* Marks Selector */}
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-medium">
            Marks <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(Number(e.target.value))}
            min={1}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300 mt-1"
          />
        </div>

        {/* Difficulty Selector */}
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-medium">
            Difficulty Level <span className="text-red-500">*</span>
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300 mt-1"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Explanation (Optional) */}
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-medium">
            Explanation
          </label>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="(Optional) Provide an explanation..."
            className="w-full p-3 border rounded focus:ring focus:ring-blue-300 mt-1"
          />
        </div>

        {/* MCQ Options */}
        <div className="mt-4">
          <label className="text-gray-700 text-sm font-medium">
            Options <span className="text-red-500">*</span>
          </label>
          {options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2 mt-2">
              <input
                type="radio"
                name="correct"
                checked={correctAnswerIndex === i}
                onChange={() => setCorrectAnswerIndex(i)}
                className="cursor-pointer"
              />
              <input
                value={opt}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[i] = e.target.value;
                  setOptions(newOptions);
                }}
                placeholder={`Option ${i + 1}`}
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              />
              {options.length > 2 && (
                <button
                  onClick={() => handleRemoveOption(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={18} />
                </button>
              )}
            </div>
          ))}
          {options.length < 6 && (
            <button
              onClick={handleAddOption}
              className="mt-2 text-blue-500 flex items-center"
            >
              <Plus size={16} className="mr-1" /> Add Option
            </button>
          )}
        </div>

        {/* Tags Section */}
        <div className="mb-4 mt-4">
          <label className="text-gray-700 text-sm font-medium">Tags</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Enter a tag..."
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300 mt-1"
            />
            <button
              onClick={handleAddTag}
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(i)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-blue-600 text-white p-3 rounded"
        >
          {isEditMode ? "Update Question" : "Save Question"}
        </button>
      </div>
    </div>
  );
}
