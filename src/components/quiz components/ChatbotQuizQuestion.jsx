import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddQuestionToQuizWithAIMutation } from "../../redux/api/api";
// import { toast } from "react-toastify"; // optional

export const ChatbotQuizQuestion = ({ onClose }) => {
  const chatRef = useRef(null);
  const { quizID } = useSelector((state) => state.auth);
  const [AddQuestionToQuizWithAI,{isLoading}] = useAddQuestionToQuizWithAIMutation();
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! Ask me to generate multiple-choice questions!" },
  ]);
  const [input, setInput] = useState("");

  // Suggestions for MCQ categories
  const suggestions = [
    "Add 5 easy math questions",
    "Generate 3 medium science questions",
    "Give me 2 hard history questions",
    "Create 4 geography questions",
    "Add 5 programming-related questions",
  ];

  const sendMessage = async (msg = input.trim()) => {
    if (!msg) return;

    setMessages((prev) => [...prev, { from: "user", text: msg }]);
    setInput("");

    // Add "thinking" animation
    setMessages((prev) => [...prev, { from: "bot", text: "🤖 Thinking..." }]);

    try {
      const res = await AddQuestionToQuizWithAI({
        message: msg,
        quizID,
      }).unwrap();

      const botReply = res.message;

      // Replace "Thinking..." with actual reply
      setMessages((prev) => {
        const withoutThinking = prev.slice(0, -1);
        return [...withoutThinking, { from: "bot", text: botReply }];
      });

      if (botReply.toLowerCase().includes("saved")) {
        // toast.success("Questions saved! Reloading...");
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1), // remove "Thinking..."
        { from: "bot", text: "❌ Error connecting to server." },
      ]);
    }
  };

  useEffect(() => {
    const escClose = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", escClose);
    return () => document.removeEventListener("keydown", escClose);
  }, [onClose]);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    document.querySelector("input[type='text']")?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-50 w-full max-w-md bg-white rounded-xl shadow-2xl p-5 flex flex-col h-[600px]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-3 text-center text-blue-700">
          MCQ Question AI Chatbot
        </h2>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestions.map((text, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(text)}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200 transition"
            >
              {text}
            </button>
          ))}
        </div>

        {/* Chat */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto bg-gray-50 p-3 rounded-md space-y-2 border border-gray-200"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-4 py-2 text-sm rounded-lg whitespace-pre-line ${
                msg.from === "user"
                  ? "bg-blue-100 text-right self-end ml-auto"
                  : "bg-white border self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask me to generate questions..."
            className="flex-1 border border-gray-300 rounded-md px-4 py-2"
          />
          <button
            onClick={sendMessage}
            className={`bg-blue-600 text-white px-4 py-2 rounded-lg transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
};
