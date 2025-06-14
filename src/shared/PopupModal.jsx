/* eslint-disable react/prop-types */
import { useState } from "react";

const PopupModal = ({
  isOpen,
  onClose,
  title,
  message,
  acceptText,
  onAccept,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  if (!isOpen) return null; // Hide modal if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>

        {/* Message as Bullet Points */}
        <ul className="text-gray-600 text-sm mb-4 list-disc list-inside space-y-2">
          <li>
            📌 Please read each question carefully before selecting your answer.
          </li>
          <li>⏳ You will have a limited time to complete each question.</li>
          <li>🚫 There is no negative marking for incorrect answers.</li>
          <li>🔄 You are allowed only <b>1 attempt</b> for this quiz.</li>
          <li>
            ⚠️ Any form of cheating or unfair practices is strictly prohibited.
          </li>
          <li>
            🖥️ <b>Do not navigate away</b> from the quiz window. Leaving the quiz
            page may result in automatic submission.
          </li>
        </ul>

        {/* Accept Checkbox */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="accept"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="mr-2 w-4 h-4 text-indigo-600 border-gray-300 rounded"
          />
          <label htmlFor="accept" className="text-gray-900 text-sm">
            I accept the terms.
          </label>
        </div>

        {/* Accept Button */}
        <button
          onClick={() => isChecked && onAccept()}
          disabled={!isChecked}
          className={`w-full py-2 text-white font-semibold rounded-lg ${
            isChecked
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {acceptText}
        </button>
      </div>
    </div>
  );
};

export default PopupModal;
