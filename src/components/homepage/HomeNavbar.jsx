import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";



const HomeNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-gray-900/90 via-black/90 to-gray-950/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider drop-shadow-[0_0_10px_rgba(0,255,255,0.7)] font-logo">
            <span className="text-white">Code</span>
            <span className="text-cyan-400">Nest</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium ml-auto items-center">
          <li>
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition duration-300 hover:drop-shadow-[0_0_6px_rgba(0,255,255,1)]"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-white transition duration-300 hover:drop-shadow-[0_0_6px_rgba(0,255,255,1)]"
            >
              Contect
            </Link>
          </li>
          <li>
            <Link
              to="/pricing"
              className="text-yellow-400 px-3 py-1 rounded-md hover:bg-yellow-500 hover:text-white transition duration-300"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-purple-400 px-3 py-1 rounded-md hover:bg-purple-600 hover:text-white transition duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/sed sheet"
              className="bg-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-cyan-600 transition duration-300 shadow-md"
            >
             Sde Sheet
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-cyan-400 text-3xl ml-auto focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-center space-y-4 text-lg font-medium text-cyan-300">
          <Link to="/" onClick={toggleMobileMenu} className="hover:text-white transition">
            Home
          </Link>
          <Link to="/contact" onClick={toggleMobileMenu} className="hover:text-white transition ">
            Contect
          </Link>
          <Link to="/pricing" onClick={toggleMobileMenu} className="text-yellow-400 hover:text-yellow-200 transition">
            Pricing
          </Link>
          <Link to="/about" onClick={toggleMobileMenu} className="text-purple-400 hover:text-purple-200 transition">
            About
          </Link>
          <Link
            to="/host-login"
            onClick={toggleMobileMenu}
            className="bg-cyan-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-cyan-600 transition duration-300 shadow-md"
          >
           Sde Sheet
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
