/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import featurebg from "../../assets/featurebg.png";
const TypingEffect = ({ text = "", speed = 150, pause = 1000 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const typeInterval = setInterval(() => {
        setDisplayedText((prevText) => prevText + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, speed);
      return () => clearInterval(typeInterval);
    } else {
      const pauseTimeout = setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, pause);
      return () => clearTimeout(pauseTimeout);
    }
  }, [index, text, speed, pause]);

  return <span>{displayedText}</span>;
};

const Features = () => {
  return (
    <div
      className="py-16 px-8 text-center"
      style={{ backgroundImage: `url(${featurebg})` }}
    >
          <div className=" inset-0 bg-black bg-opacity-10 z-0" />
      <h2 className="text-4xl font-semibold text-white mb-6">
        <TypingEffect text="Why Choose Codenest?" speed={300} pause={2000} />
      </h2>
      <p className="text-gray-400 max-w-lg mx-auto mb-10">
        Our platform is designed to make coding tests easy to administer for
        teachers and engaging for students.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-800 shadow-lg p-6 rounded-lg transform transition-all hover:scale-105 hover:bg-gradient-to-r from-teal-600 to-blue-500">
          <h3 className="text-2xl font-semibold text-white mb-2">
            Customizable Tests
          </h3>
          <p className="text-gray-200">
            Create tailored coding tests that match your curriculum and
            students’ needs.
          </p>
        </div>
        <div className="bg-gray-800 shadow-lg p-6 rounded-lg transform transition-all hover:scale-105 hover:bg-gradient-to-r from-teal-600 to-blue-500">
          <h3 className="text-2xl font-semibold text-white mb-2">
            Real-Time Results
          </h3>
          <p className="text-gray-200">
            Get instant results and feedback to understand student progress at a
            glance.
          </p>
        </div>
        <div className="bg-gray-800 shadow-lg p-6 rounded-lg transform transition-all hover:scale-105 hover:bg-gradient-to-r from-teal-600 to-blue-500">
          <h3 className="text-2xl font-semibold text-white mb-2">
            Progress Tracking
          </h3>
          <p className="text-gray-200">
            Track student improvement over time with detailed reports and
            analytics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
