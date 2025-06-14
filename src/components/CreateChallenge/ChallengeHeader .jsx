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
  FaWhatsapp,
} from "react-icons/fa";

const ChallengeHeader = ({
  challengeData,
  handleEditChallengeData,
  setIsEditing,
  isEditing,
  setIsModalOpen,
  handleCopy,
  copied,
  showKey = true,
}) => {
  // Function to format date and time for display (e.g., "1 December 2024, 14:30")
  const formatDisplayDateTime = (date) => {
    return moment(date).format("D MMMM YYYY, h:mm A");
  };

  // Function to format date and time for input field (e.g., "2024-12-01T14:30")
  const formatInputDateTime = (date) => {
    return moment(date).format("YYYY-MM-DDTHH:mm");
  };

  const shareOnWhatsApp = () => {
    const message = `
📢 *Join the Coding Challenge.* 
  
🔥 *Challenge Name*: ${challengeData.title}
💡 *Description*: ${challengeData.description}
  
🔑 *Challenge Key*: ${challengeData.key}
  
⏳ *Challenge Timings*: 
  🗓️ *Start Time:*  ${formatDisplayDateTime(challengeData.startTime)}
  🗓️ *End Time:*  ${formatDisplayDateTime(challengeData.endTime)}
  
⏳ *How to Join the Challenge in 3 Easy Steps*:
1️⃣ *Visit our website:*  ${import.meta.env.VITE_CLIENT}  
2️⃣ Login or Sign up as a Student
3️⃣ Enter the provided Challenge Key to start!
  
— CodeNest
`;

    // Properly encode the message for the URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp with the encoded message
    window.open(
      `https://api.whatsapp.com/send/?text=${encodedMessage}`,
      "_blank"
    );
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
        {showKey ? challengeData.title : challengeData.name}
      </h1>
      {isEditing ? (
        <form onSubmit={handleEditChallengeData} className="mb-4">
          <input
            name="title"
            defaultValue={showKey ? challengeData.title : challengeData.name}
            className="w-full border border-gray-300 rounded-md p-2 mb-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <textarea
            name="description"
            defaultValue={challengeData.description}
            className="w-full border border-gray-300 rounded-md p-2 mb-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="datetime-local"
            name="startTime"
            defaultValue={formatInputDateTime(challengeData.startTime)}
            className="w-full border border-gray-300 rounded-md p-2 mb-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="datetime-local"
            name="endTime"
            defaultValue={formatInputDateTime(challengeData.endTime)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <div className="flex justify-start">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition duration-200"
            >
              Update Challenge Details
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
            {challengeData.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8 text-sm text-gray-800 mb-6">
            <DateCard
              label="Start Date"
              icon={FaCalendarAlt}
              date={challengeData.startTime}
            />
            <DateCard
              label="End Date"
              icon={FaCalendarAlt}
              date={challengeData.endTime}
            />
          </div>

          {showKey && (
            <div className="flex flex-col sm:flex-row justify-center gap-8 text-sm text-gray-800 mb-6">
              {/* Challenge Key Card */}
              <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-indigo-200 to-indigo-300 text-indigo-800 py-4 px-6 rounded-lg font-semibold shadow-md w-full sm:w-auto max-w-xs">
                <div className="flex items-center gap-2 mb-4 sm:mb-0">
                  <FaKey className="text-indigo-600" />
                  <span className="font-bold text-indigo-700">
                    Challenge Key:
                  </span>
                  <span className="text-gray-700 bg-zinc-100 p-1 rounded-md">
                    {challengeData.key}
                  </span>
                </div>
                {/* Copy Button */}
                <div className="w-full sm:w-auto ml-2 ">
                  <ActionButton
                    label={copied ? "Copied!" : "Copy"}
                    icon={copied ? FaClipboardCheck : FaClipboard}
                    onClick={handleCopy}
                    color={copied ? "green" : "indigo"}
                  />
                </div>
              </section>
            </div>
          )}

          <div className="flex flex-col items-center gap-6 mt-6">
            {/* Share on WhatsApp Button */}
            {showKey && (
              <div className="w-full flex justify-center">
                <ActionButton
                  label="Share on WhatsApp"
                  icon={FaWhatsapp}
                  onClick={shareOnWhatsApp}
                  color="green"
                  className="w-full sm:w-auto"
                />
              </div>
            )}

            {/* Edit and Delete Buttons */}
            <div className="w-full flex flex-col sm:flex-row justify-center gap-4">
              <ActionButton
                label={`Edit ${showKey ? "Challenge" : "Quiz"}`}
                icon={FaTasks}
                onClick={() => setIsEditing(true)}
                color="indigo"
                className="flex-1 sm:flex-none"
              />
              <ActionButton
                label={`Delete ${showKey ? "Challenge" : "Quiz"}`}
                icon={FaTrash}
                onClick={() => setIsModalOpen(true)}
                color="red"
                className="flex-1 sm:flex-none"
              />
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default ChallengeHeader;
