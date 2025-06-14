import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaBars, FaHome, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { config, server } from "../../constants/config";
import { hostNotExists } from "../../redux/reducers/auth";

function HostNavbar() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const { host } = useSelector((state) => state.auth);

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(`${server}/admin/logout`, {}, config);
      if (data.success) {
        dispatch(hostNotExists());
        toast.success(data.message);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/Logo.png"
              alt="CodeNest"
              className="h-12 w-auto drop-shadow-lg transform transition-transform duration-300 hover:scale-105"
            />
            <span className="text-2xl font-bold tracking-wide hidden sm:block">
              CodeNest
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden sm:flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-lg font-medium rounded-lg transition-all duration-300 hover:text-yellow-300 hover:bg-white/20"
            >
              <FaHome /> Dashboard
            </Link>

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

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden flex items-center px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="sm:hidden bg-indigo-800 text-white py-2 space-y-2">
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-2 text-lg font-medium transition-all duration-300 hover:text-yellow-300 hover:bg-white/20"
            >
              <FaHome /> Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-6 py-2 text-lg font-medium bg-red-600 hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* Host Profile Inside Mobile Menu */}
            {host && (
              <div className="border-t pt-4">
                <div className="flex items-center space-x-4">
                  {host?.picture ? (
                    <img
                      src={host.picture}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-gray-400"
                    />
                  ) : (
                    <FaUserCircle className="text-gray-600 text-3xl" />
                  )}
                  <div>
                    <p className="text-sm font-semibold">{host.username}</p>
                    <p className="text-xs text-gray-500">{host.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default HostNavbar;
