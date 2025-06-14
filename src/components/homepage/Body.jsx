import React, { useState } from "react";
import { useSelector } from "react-redux";
import HomeNavbar from "./HomeNavbar";
import homebg from "../../assets/homebg.png";
import Login from "./Login";
import Signup from "./Signup";
import Modal from "./Modal";
import "../../App.css";

const Body = () => {
  const { host, user } = useSelector((state) => state.auth);

  const [showBranches, setShowBranches] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null); // "login-admin", "signup-admin", "login-student", "signup-student"
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (tab) => {
    setActiveTab(tab);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActiveTab(null);
    setIsModalOpen(false);
  };

  const isLogin = activeTab?.includes("login");

  const userType = activeTab?.includes("admin") ? "admin" : "student";

  const handleLogin = (data) => {
    console.log("Logging in with:", data);
    // Add API logic here
  };

  const handleSignup = (data) => {
    console.log("Signing up with:", data);
    // Add API logic here
  };

  const toggleForm = () => {
    if (isLogin) {
      setActiveTab(activeTab.replace("login", "signup"));
    } else {
      setActiveTab(activeTab.replace("signup", "login"));
    }
  };

  return (

    
    <div
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${homebg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />
      <div className="relative z-10 px-4 sm:px-10 py-10">
        <HomeNavbar />

        {!host && !user && (
          <div className="flex flex-col lg:flex-row items-center justify-between mt-16 min-h-[80vh]">
            <div className="max-w-xl lg:w-1/2">
              <h1 className="text-5xl font-bold text-yellow-400 drop-shadow-lg mb-4 px-10">
                Welcome to <span className="text-teal-400">Codenest</span>
              </h1>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed text-center">
                Codenest is your gateway to mastering coding challenges and
                online assessments. Whether you're a student or a teacher, we’ve got you covered.
              </p>

              <div className="relative flex flex-col items-center">
                <div className="branch-wrapper">
                  <button
                    onClick={() => {
                      setShowBranches(!showBranches);
                      setAdminOpen(false);
                      setStudentOpen(false);
                      setActiveTab(null);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-3 rounded-full shadow-lg z-10 relative text-lg font-semibold hover:from-blue-700 hover:to-teal-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Create Account
                  </button>

                  {showBranches && <div className="straight-line" />}
                </div>

                {showBranches && (
                  <div className="branch-container">
                    <div className="branch-line admin-line"></div>
                    <button
                      className="role-button admin-btn"
                      onClick={() => {
                        setAdminOpen(!adminOpen);
                        setStudentOpen(false);
                      }}
                    >
                      Admin
                    </button>

                    <div className="branch-line student-line"></div>
                    <button
                      className="role-button student-btn"
                      onClick={() => {
                        setStudentOpen(!studentOpen);
                        setAdminOpen(false);
                      }}
                    >
                      Student
                    </button>

                    {adminOpen && (
                      <div className="admin-branch-container">
                        <div className="child-line left-child"></div>
                        <button
                          onClick={() => openModal("login-admin")}
                          className="child-button left-child-btn"
                        >
                          Sign In
                        </button>

                        <div className="child-line right-child"></div>
                        <button
                          onClick={() => openModal("signup-admin")}
                          className="child-button right-child-btn"
                        >
                          Sign Up
                        </button>
                      </div>
                    )}

                    {studentOpen && (
                      <div className="student-branch-container student-offset">
                        <div className="child-line left-child"></div>
                        <button
                          onClick={() => openModal("login-student")}
                          className="child-button left-child-btn"
                        >
                          Sign In
                        </button>

                        <div className="child-line right-child"></div>
                        <button
                          onClick={() => openModal("signup-student")}
                          className="child-button right-child-btn"
                        >
                          Sign Up
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/2" />
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 capitalize">
                {isLogin ? "Log In" : "Sign Up"} as {userType}
              </h2>
              <p className="text-sm text-gray-600">
                {isLogin
                  ? `Access your ${userType} dashboard.`
                  : `Create a new ${userType} account and start your journey.`}
              </p>
            </div>

            {isLogin ? (
              <Login userType={userType} onSubmit={handleLogin} toggleForm={toggleForm} />
            ) : (
              <Signup userType={userType} onSubmit={handleSignup} toggleForm={toggleForm} />
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Body;
