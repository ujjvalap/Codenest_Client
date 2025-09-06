// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import HomeNavbar from "./HomeNavbar";
// import homebg from "../../assets/homebg.png";
// import Login from "./Login";
// import Signup from "./Signup";
// import Modal from "./Modal";
// import "../../App.css";

// const Body = () => {
//   const { host, user } = useSelector((state) => state.auth);

//   const [showBranches, setShowBranches] = useState(false);
//   const [adminOpen, setAdminOpen] = useState(false);
//   const [studentOpen, setStudentOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState(null); // "login-admin", "signup-admin", "login-student", "signup-student"
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = (tab) => {
//     setActiveTab(tab);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setActiveTab(null);
//     setIsModalOpen(false);
//   };

//   const isLogin = activeTab?.includes("login");

//   const userType = activeTab?.includes("admin") ? "admin" : "student";

//   const handleLogin = (data) => {
//     console.log("Logging in with:", data);
//     // Add API logic here
//   };

//   const handleSignup = (data) => {
//     console.log("Signing up with:", data);
//     // Add API logic here
//   };

//   const toggleForm = () => {
//     if (isLogin) {
//       setActiveTab(activeTab.replace("login", "signup"));
//     } else {
//       setActiveTab(activeTab.replace("signup", "login"));
//     }
//   };

//   return (

    
//     <div
//       className="relative min-h-screen bg-cover bg-center text-white"
//       style={{ backgroundImage: `url(${homebg})` }}
//     >
//       <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />
//       <div className="relative z-10 px-4 sm:px-10 py-10">
//         <HomeNavbar />

//         {!host && !user && (
//           <div className="flex flex-col lg:flex-row items-center justify-between mt-16 min-h-[80vh]">
//             <div className="max-w-xl lg:w-1/2">
//               <h1 className="text-5xl font-bold text-yellow-400 drop-shadow-lg mb-4 px-10">
//                 Welcome to <span className="text-teal-400">Codenest</span>
//               </h1>
//               <p className="text-lg text-gray-300 mb-6 leading-relaxed text-center">
//                 Codenest is your gateway to mastering coding challenges and
//                 online assessments. Whether youre a student or a teacher, we’ve got you covered.
//               </p>

//               <div className="relative flex flex-col items-center">
//                 <div className="branch-wrapper">
//                   <button
//                     onClick={() => {
//                       setShowBranches(!showBranches);
//                       setAdminOpen(false);
//                       setStudentOpen(false);
//                       setActiveTab(null);
//                     }}
//                     className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-3 rounded-full shadow-lg z-10 relative text-lg font-semibold hover:from-blue-700 hover:to-teal-600 transition-all duration-300 transform hover:scale-105"
//                   >
//                     Create Account
//                   </button>

//                   {showBranches && <div className="straight-line" />}
//                 </div>

//                 {showBranches && (
//                   <div className="branch-container">
//                     <div className="branch-line admin-line"></div>
//                     <button
//                       className="role-button admin-btn"
//                       onClick={() => {
//                         setAdminOpen(!adminOpen);
//                         setStudentOpen(false);
//                       }}
//                     >
//                       Admin
//                     </button>

//                     <div className="branch-line student-line"></div>
//                     <button
//                       className="role-button student-btn"
//                       onClick={() => {
//                         setStudentOpen(!studentOpen);
//                         setAdminOpen(false);
//                       }}
//                     >
//                       Student
//                     </button>

//                     {adminOpen && (
//                       <div className="admin-branch-container">
//                         <div className="child-line left-child"></div>
//                         <button
//                           onClick={() => openModal("login-admin")}
//                           className="child-button left-child-btn"
//                         >
//                           Sign In
//                         </button>

//                         <div className="child-line right-child"></div>
//                         <button
//                           onClick={() => openModal("signup-admin")}
//                           className="child-button right-child-btn"
//                         >
//                           Sign Up
//                         </button>
//                       </div>
//                     )}

//                     {studentOpen && (
//                       <div className="student-branch-container student-offset">
//                         <div className="child-line left-child"></div>
//                         <button
//                           onClick={() => openModal("login-student")}
//                           className="child-button left-child-btn"
//                         >
//                           Sign In
//                         </button>

//                         <div className="child-line right-child"></div>
//                         <button
//                           onClick={() => openModal("signup-student")}
//                           className="child-button right-child-btn"
//                         >
//                           Sign Up
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="hidden lg:block lg:w-1/2" />
//           </div>
//         )}

//         {/* Modal */}
//         {isModalOpen && (
//           <Modal onClose={closeModal}>
//             <div className="text-center mb-4">
//               <h2 className="text-2xl font-bold text-gray-800 mb-2 capitalize">
//                 {isLogin ? "Log In" : "Sign Up"} as {userType}
//               </h2>
//               <p className="text-sm text-gray-600">
//                 {isLogin
//                   ? `Access your ${userType} dashboard.`
//                   : `Create a new ${userType} account and start your journey.`}
//               </p>
//             </div>

//             {isLogin ? (
//               <Login userType={userType} onSubmit={handleLogin} toggleForm={toggleForm} />
//             ) : (
//               <Signup userType={userType} onSubmit={handleSignup} toggleForm={toggleForm} />
//             )}
//           </Modal>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Body;



import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import HomeNavbar from "./HomeNavbar";
import Login from "./Login";
import Signup from "./Signup";
import Modal from "./Modal";
import "../../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Redux actions
import { hostExists, userExists } from "../../redux/reducers/auth";
import { server, config } from "../../constants/config";

// Banner images
const backgroundBanners = ["images/bg1.jpg", "images/bg4.jpg"];

const Body = () => {
  const { host, user } = useSelector((state) => state.auth || {});
  const [activeTab, setActiveTab] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(""); // 🔴 error state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Modal open
  const openModal = (tab) => {
    setActiveTab(tab);
    setIsModalOpen(true);
    setError(""); // reset error
    document.body.style.overflow = "hidden";
  };

  // Modal close
  const closeModal = () => {
    setActiveTab(null);
    setIsModalOpen(false);
    setError("");
    document.body.style.overflow = "auto";
  };

  const isLogin = activeTab?.startsWith("login");
  const userType = activeTab?.includes("admin") ? "admin" : "student";

  // Toggle Login/Signup
  const toggleForm = () => {
    if (!activeTab) return;
    setActiveTab(
      isLogin
        ? activeTab.replace("login", "signup")
        : activeTab.replace("signup", "login")
    );
    setError("");
  };

  // Escape key
  useEffect(() => {
    const escHandler = (e) => e.key === "Escape" && isModalOpen && closeModal();
    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, [isModalOpen]);

  // === Handle Login ===
  const handleLogin = async (formData) => {
    try {
      const endpoint =
        userType === "admin" ? `${server}/admin/login` : `${server}/user/login`;

      const { data } = await axios.post(endpoint, formData, config);

      if (data.success) {
        if (userType === "admin") {
          dispatch(hostExists(data.host));
          navigate("/host-dashboard");
        } else {
          dispatch(userExists(data.user));
          navigate("/student");
        }
        closeModal();
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    }
  };

  // === Handle Signup ===
  const handleSignup = async (formData) => {
    try {
      const endpoint =
        userType === "admin"
          ? `${server}/admin/register`
          : `${server}/user/register`;

      const { data } = await axios.post(endpoint, formData, config);

      if (data.success) {
        if (userType === "admin") {
          dispatch(hostExists(data.host));
          navigate("/host-dashboard");
        } else {
          dispatch(userExists(data.user));
          navigate("/student");
        }
        closeModal();
      } else {
        setError(data.message || "Signup failed, please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed, please try again.");
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden font-sans">
      {/* === Banner === */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        slidesPerView={1}
        effect="fade"
        loop
        autoplay={{ delay: 5200, disableOnInteraction: false }}
        speed={1000}
        className="absolute inset-0 w-full h-full -z-10"
      >
        {backgroundBanners.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              alt={`slide-${i}`}
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-cyan-900/30" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* === Content === */}
      <div className="relative z-10">
        <HomeNavbar />

        {!host && !user && (
          <main className="pt-28 md:pt-36 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
            <section className="max-w-2xl lg:w-1/2 text-center lg:text-left">
              <div className="mb-6 flex justify-center lg:justify-start">
                <span className="px-4 py-1 rounded-full text-sm font-bold text-blue-200 bg-gradient-to-r from-blue-700/20 to-cyan-400/20 border border-blue-300/30 shadow backdrop-blur">
                  🚀 CodeNest v2.0 Released
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                Crack&nbsp;
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 drop-shadow-lg">
                  Coding Challenges
                </span>
                <br className="hidden sm:block" />
                <span className="text-gray-100 font-medium">With Confidence</span>
              </h1>
              <p className="text-gray-200 text-lg md:text-xl mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                CodeNest empowers students to master interviews and enables admins
                to run secure assessments—all in one seamless platform.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => openModal("login-admin")}
                  className="px-7 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl font-bold shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Admin Login →
                </button>
                <button
                  onClick={() => openModal("login-student")}
                  className="px-7 py-4 bg-gradient-to-r from-fuchsia-600 to-pink-500 rounded-2xl font-bold shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Student Login →
                </button>
              </div>
              <p className="text-gray-200 text-sm mt-8">
                New user?{" "}
                <button
                  onClick={() => openModal("signup-student")}
                  className="text-blue-200 hover:text-blue-100 underline font-semibold"
                >
                  Create an account
                </button>
              </p>
            </section>
          </main>
        )}

        {/* === Modal === */}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
                {isLogin ? "Log In" : "Sign Up"} as{" "}
                {userType === "admin" ? "Admin" : "Student"}
              </h2>
              <p className="text-sm text-gray-600 text-center mb-6">
                {isLogin
                  ? `Access your ${userType} dashboard.`
                  : `Create your ${userType} account and start your journey.`}
              </p>

              {/* 🔴 Show error if exists */}
              {error && (
                <div className="bg-red-100 text-red-600 p-2 mb-4 rounded-md text-sm text-center">
                  {error}
                </div>
              )}

              {isLogin ? (
                <Login
                  userType={userType}
                  onSubmit={handleLogin}
                  toggleForm={toggleForm}
                />
              ) : (
                <Signup
                  userType={userType}
                  onSubmit={handleSignup}
                  toggleForm={toggleForm}
                />
              )}
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Body;
