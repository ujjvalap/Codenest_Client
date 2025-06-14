import React from "react";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-8 px-8 bg-gradient-to-b from-gray-900 via-black to-gray-950 text-gray-300">
      {/* Hero Section */}
      <section className="mb-12 text-center animate-fadeIn">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 drop-shadow-lg mb-4">
          Welcome to Codenest
        </h1>
        <p className="text-xl text-gray-400 max-w-4xl mx-auto">
          Your go-to platform for competitive <span className="text-teal-400 font-semibold">Coding Contests</span> and engaging <span className="text-yellow-400 font-semibold">Quizzes</span>.  
          Whether you're a student looking to sharpen your coding skills or an educator streamlining assessments, **Codenest** has you covered.
        </p>
      </section>

      {/* Features Section */}
      <section className="my-12">
        <h2 className="text-4xl font-semibold text-white text-center mb-6">
          What We Offer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coding Contests */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 hover:bg-gray-700">
            <h3 className="text-3xl font-bold text-teal-400 mb-4">
              💻 Coding Contests
            </h3>
            <p className="text-lg text-gray-400 leading-relaxed">
              Compete with programmers worldwide, challenge yourself with  
              real-world problems, and improve your coding skills in a timed  
              environment. Earn rankings and showcase your expertise!
            </p>
          </div>

          {/* Quizzes */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 hover:bg-gray-700">
            <h3 className="text-3xl font-bold text-yellow-400 mb-4">
              📝 Interactive Quizzes
            </h3>
            <p className="text-lg text-gray-400 leading-relaxed">
              Test your conceptual knowledge with our **quiz feature**.  
              Get instant feedback, track your progress, and reinforce  
              your learning with fun, engaging questions!
            </p>
          </div>
        </div>
      </section>

      {/* Project Description */}
      <section className="my-12 bg-gray-800 bg-opacity-50 p-8 rounded-lg animate-fadeIn">
        <h2 className="text-4xl font-semibold text-white mb-4">About Codenest</h2>
        <p className="text-lg leading-relaxed text-gray-400">
          Codenest is a web-based platform designed to **simplify coding  
          assessments** and enhance learning through challenges. Our platform  
          helps educators manage and evaluate coding exams while giving  
          students a fun, engaging space to practice their skills.
        </p>
      </section>

      {/* Key Features */}
      <section className="my-12">
        <h2 className="text-4xl font-semibold text-white text-center mb-6">
          Why Choose Codenest?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-700 p-6 rounded-lg shadow-md transform hover:scale-105 transition duration-300 hover:bg-gray-600">
            <h3 className="text-2xl font-semibold text-teal-400 mb-2">
              ⚡ Instant Feedback
            </h3>
            <p className="text-lg text-gray-300">
              Get real-time results and insights to improve your performance.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md transform hover:scale-105 transition duration-300 hover:bg-gray-600">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-2">
              📊 Track Your Progress
            </h3>
            <p className="text-lg text-gray-300">
              Monitor your learning journey with detailed analytics.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md transform hover:scale-105 transition duration-300 hover:bg-gray-600">
            <h3 className="text-2xl font-semibold text-purple-400 mb-2">
              🎯 Fun & Competitive
            </h3>
            <p className="text-lg text-gray-300">
              Challenge yourself, compete, and climb the leaderboard!
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="my-12 px-8 py-6 bg-gray-800 rounded-lg shadow-lg animate-fadeIn">
        <h2 className="text-4xl font-semibold text-gray-300 mb-6 text-center">
          What Users Are Saying
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-700 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:bg-gray-600">
            <p className="text-lg text-gray-300">
              "Codenest has completely transformed the way we conduct our coding assessments.  
              It's intuitive and saves so much time!"
            </p>
            <p className="text-right font-semibold mt-2 text-yellow-400">
              - XYZ, Educator
            </p>
          </div>
          <div className="bg-gray-700 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:bg-gray-600">
            <p className="text-lg text-gray-300">
              "As a student, I love how easy it is to navigate the tests on Codenest.  
              It takes the stress out of coding exams!"
            </p>
            <p className="text-right font-semibold mt-2 text-yellow-400">
              - Pawan Tiwari, Student
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
