import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaChartLine, FaBars, FaHome, FaSignOutAlt, FaUserCircle, FaTrophy, FaLaptopCode, FaAngleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { config, server } from "../../constants/config";
import { userNotExists } from "../../redux/reducers/auth";

function UserNavbar() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${server}/user/logout`, {}, config);
      if (data.success) {
        dispatch(userNotExists());
        toast.success(data.message);
      } else throw new Error(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const NavLink = ({ to, icon, label }) => (
    <Link
      to={to}
      className="flex items-center gap-2 px-4 py-2 text-lg font-medium rounded-lg transition-all duration-300 hover:text-yellow-300 hover:bg-white/20"
    >
      {icon} {label}
    </Link>
  );

  return (
    <>
      <nav className="bg-[#0A1128] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/Logo.png"
              alt="CodeNest"
              className="h-12 w-auto drop-shadow-lg transition-transform hover:scale-105"
            />
            <span className="text-2xl font-bold hidden sm:block">CodeNest</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden sm:flex items-center space-x-6">
            {/* Practice Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 text-lg font-medium rounded-lg hover:text-yellow-300 hover:bg-white/20 group-hover:text-yellow-300 transition-all duration-300">
                <FaLaptopCode />
                Practice
                <FaAngleDown
                  size={14}
                  className="transform transition-transform duration-300 group-hover:rotate-180"
                />
              </button>
              <div className="absolute top-12 left-0 bg-white text-gray-800 w-56 rounded-lg shadow-lg z-50 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 scale-95 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto">
                <Link to="/sde" className="block px-4 py-2 hover:bg-gray-100">
                  SDE Sheet
                </Link>
                <Link to="/problem-of-the-day" className="block px-4 py-2 hover:bg-gray-100">
                  Problem of the Day
                </Link>
                <Link to="/topics-dsa" className="block px-4 py-2 hover:bg-gray-100">
                  Topic-wise DSA
                </Link>
              </div>
            </div>

            {/* Contests Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 text-lg font-medium rounded-lg hover:text-yellow-300 hover:bg-white/20 group-hover:text-yellow-300 transition-all duration-300">
                <FaTrophy />
                Contests
                <FaAngleDown
                  size={14}
                  className="transform transition-transform duration-300 group-hover:rotate-180"
                />
              </button>
              <div className="absolute top-12 left-0 bg-white text-gray-800 w-56 rounded-lg shadow-lg z-50 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 scale-95 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto">
                <Link to="/contests/weekly" className="block px-4 py-2 hover:bg-gray-100">
                  Weekly Contests
                </Link>
                <Link to="/contests/company" className="block px-4 py-2 hover:bg-gray-100">
                  Company Specific
                </Link>
                <Link to="/contests/monthly" className="block px-4 py-2 hover:bg-gray-100">
                  Monthly Contests
                </Link>
              </div>
            </div>

            {/* Resources Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 text-lg font-medium rounded-lg hover:text-yellow-300 hover:bg-white/20 group-hover:text-yellow-300 transition-all duration-300">
                <FaChartLine />
                Resources
                <FaAngleDown
                  size={14}
                  className="transform transition-transform duration-300 group-hover:rotate-180"
                />
              </button>
              <div className="absolute top-12 left-0 bg-white text-gray-800 w-56 rounded-lg shadow-lg z-50 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 scale-95 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto">
                <Link to="/resources/sheets" className="block px-4 py-2 hover:bg-gray-100">
                  Important Sheets
                </Link>
                <Link to="/resources/roadmaps" className="block px-4 py-2 hover:bg-gray-100">
                  Roadmaps
                </Link>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-lg font-medium rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <FaSignOutAlt /> Logout
                </>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="sm:hidden flex items-center px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars size={24} />
          </button>
        </div>
      </nav>
    </>
  );
}

export default UserNavbar;
