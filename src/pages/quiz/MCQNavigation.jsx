import { useState } from "react";
import { X } from "lucide-react";

const QuizNavigation = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 5;

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className=" text-white p-4 flex justify-center items-center relative">
      <button
        className={`text-gray-400 px-4 py-2 ${
          currentQuestion === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:text-white"
        }`}
        onClick={handlePrev}
        disabled={currentQuestion === 1}
      >
        Prev
      </button>

      <button
        className="px-4 py-2"
      >
        Submit
      </button>

      <button
        className={`text-orange-500 px-4 py-2 ${
          currentQuestion === totalQuestions
            ? "opacity-50 cursor-not-allowed"
            : "hover:text-orange-400"
        }`}
        onClick={handleNext}
        disabled={currentQuestion === totalQuestions}
      >
        Next
      </button>
    </div>
  );
};

export default QuizNavigation;
