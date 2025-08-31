/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";


// TypingEffect Component
const TypingEffect = ({ text = "", speed = 100, pause = 1500 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    if (!isDeleting && index <= text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, index));
        setIndex(index + 1);
      }, speed);

      if (index === text.length) {
        timeout = setTimeout(() => setIsDeleting(true), pause);
      }
    } else if (isDeleting && index >= 0) {
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, index));
        setIndex(index - 1);
      }, speed / 2);

      if (index === 0) {
        setIsDeleting(false);
        setIndex(1);
      }
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, text, speed, pause]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 font-semibold tracking-wide text-4xl md:text-5xl drop-shadow-lg">
      {displayedText}
      <span className="ml-1 animate-pulse text-white">|</span>
    </span>
  );
};

// Feature List Data
const featureList = [
  {
    title: "Customizable Tests",
    description:
      "Create tailored coding tests that match your curriculum and students’ needs.",
    icon: (
      <svg
        role="presentation"
        className="w-12 h-12 text-teal-400 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M12 20h9" />
        <path d="M6 20h.01" />
        <path d="M3 4h18" />
        <path d="M3 10h18" />
        <path d="M4 14h16" />
      </svg>
    ),
  },
  {
    title: "Batch-Wise Management",
    description:
      "Organize tests and quizzes batch-wise for streamlined evaluation and reporting.",
    icon: (
      <svg
        role="presentation"
        className="w-12 h-12 text-yellow-400 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="7" width="18" height="14" rx="2" ry="2" />
        <path d="M8 7V3m8 4V3m-3 14v-7" />
      </svg>
    ),
  },
  {
    title: "Real-Time Results",
    description:
      "Get instant results and feedback to understand student progress at a glance.",
    icon: (
      <svg
        role="presentation"
        className="w-12 h-12 text-blue-500 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Progress Tracking",
    description:
      "Track student improvement over time with detailed reports and analytics.",
    icon: (
      <svg
        role="presentation"
        className="w-12 h-12 text-red-400 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M3 17l6-6 4 4 8-8" />
      </svg>
    ),
  },
  {
    title: "AI-Powered MCQ Generator",
    description:
      "Automatically generate diverse multiple-choice questions tailored to student levels using AI.",
    icon: (
      <svg
        role="presentation"
        className="w-12 h-12 text-indigo-400 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M9 12h6M9 16h6M9 8h6M12 3l9 4.5-9 4.5-9-4.5L12 3z" />
        <path d="M3 9v6a9 9 0 0 0 18 0V9" />
      </svg>
    ),
  },
  {
    title: "AI-Assisted Coding Challenges",
    description:
      "Provide personalized coding problems and hints powered by AI algorithms for adaptive learning.",
    icon: (
      <svg
        role="presentation"
        className="w-12 h-12 text-pink-400 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M16 8v8M8 8v8M4 12h16M10 16h4" />
      </svg>
    ),
  },
];

// Features Component
const Features = () => {
  return (
    <section
      className="relative py-24 px-6 md:px-20 text-center bg-gradient-to-br from-gray-900 via-black to-gray-950"
      aria-labelledby="features-title"
    >
      {/* Section Heading */}
      <h2
        id="features-title"
        className="mb-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 text-4xl md:text-5xl"
      >
        <TypingEffect text="Why Choose CodeNest?" speed={150} pause={2800} />
      </h2>

      <p className="text-gray-400 max-w-3xl mx-auto mb-20 text-lg leading-relaxed">
        Our platform empowers educators and students with seamless test
        management, insightful analytics, and intelligent recommendations powered by AI.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {featureList.map(({ title, description, icon }, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30 hover:border-cyan-400 cursor-default"
          >
            {icon}
            <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
            <p className="text-gray-300 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default Features;
