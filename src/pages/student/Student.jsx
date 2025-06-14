import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useJoinChallengeMutation } from "../../redux/api/api";
import useMutationToast from "../../hooks/useMutationToast";
import { useNavigate } from "react-router-dom";
import { setChallengeID } from "../../redux/reducers/auth";

const Student = () => {
  const [key, setKey] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [joinChallenge, joinStatus] = useJoinChallengeMutation();

  useMutationToast({
    ...joinStatus,
    successMessage: joinStatus.data?.message || "Challenge joined successfully",
  });

  const handleKeyChange = (e) => setKey(e.target.value);

  const handleSubmitKey = async () => {
    if (!key.trim()) {
      alert("Please enter a valid access key.");
      return;
    }
    try {
      await joinChallenge({ challengeKey: key });
    } catch (error) {
      console.error("Error while joining challenge:", error);
    }
  };

  useEffect(() => {
    if (joinStatus.isSuccess && joinStatus.data?.challengeID) {
      dispatch(setChallengeID(joinStatus.data.challengeID));
      navigate("/challenge-page");
    }
  }, [joinStatus.isSuccess, joinStatus.data, dispatch, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex flex-col items-center justify-center py-16 px-4">
      {/* Title */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl font-extrabold text-yellow-400 mb-3 drop-shadow-md">
          Welcome, <span className="text-teal-400">Student</span>
        </h1>
        <p className="text-lg text-gray-200 opacity-90">
          Explore coding contests and quizzes to enhance your skills!
        </p>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-10">
        {/* Card 1: Coding Contest */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 max-w-sm w-full text-center shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4 drop-shadow">
            Join Coding Contest
          </h3>
          <p className="text-gray-300 mb-4">
            Enter the access key to participate in exciting challenges.
          </p>
          <input
            type="text"
            value={key}
            onChange={handleKeyChange}
            className="w-full bg-white/20 text-white placeholder-gray-300 py-2 px-4 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-md"
            placeholder="Enter access key"
          />
          <button
            onClick={handleSubmitKey}
            className="w-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 text-black font-bold py-2 px-4 rounded-md shadow-md hover:shadow-lg hover:brightness-110 transition-all"
          >
            🚀 Join Now
          </button>
        </div>

        {/* Card 2: Quiz */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 max-w-sm w-full text-center shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <h3 className="text-2xl font-bold text-teal-400 mb-4 drop-shadow">
            Take a Quiz
          </h3>
          <p className="text-gray-300 mb-4">
            Test your knowlege with fun and interactive quizzes.
          </p>
          <button
            onClick={() => navigate("/user/quiz/dashboard")}
            className="w-full bg-gradient-to-r from-teal-500 via-teal-400 to-teal-300 text-black font-bold py-2 px-4 rounded-md shadow-md hover:shadow-lg hover:brightness-110 transition-all"
          >
            🧠 Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Student;
