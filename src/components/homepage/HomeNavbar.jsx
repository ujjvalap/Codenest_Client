import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const HomeNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="container mx-auto px-1 py-1 flex justify-between items-center relative z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <h1 className="text-5xl font-extrabold tracking-wider drop-shadow-[0_0_10px_rgba(0,255,255,0.7)] font-logo">
          <span className="text-white">Code</span>
          <span className="text-cyan-400">Nest</span>
        </h1>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-8 text-lg font-medium ml-auto items-center">
        <li>
          <Link
            to="/"
            className="hover:text-white transition duration-300 hover:drop-shadow-[0_0_6px_rgba(0,255,255,1)]"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/features"
            className="hover:text-white transition duration-300 hover:drop-shadow-[0_0_6px_rgba(0,255,255,1)]"
          >
            Features
          </Link>
        </li>
        <li>
          <Link
            to="/pricing"
            className="transition duration-300 px-3 py-1 rounded-md hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:text-white"

          >
            Pricing
          </Link>
        </li>
        <li>
          <Link
            to="/signin"
            className=" text-white px-4 py-2 rounded-lg font-semibold hover:bg-cyan-500 transition duration-300 shadow-md"
          >
            Sign In
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-cyan-400 text-3xl ml-auto"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 right-6 md:hidden bg-black px-6 py-4 space-y-4 text-cyan-400 shadow-lg rounded-lg">
          <Link to="/" onClick={toggleMobileMenu} className="block hover:text-white transition">
            Home
          </Link>
          <Link to="/features" onClick={toggleMobileMenu} className="block hover:text-white transition">
            Features
          </Link>
          <Link to="/pricing" onClick={toggleMobileMenu} className="block hover:text-white transition">
            Pricing
          </Link>
          <Link
            to="/signin"
            onClick={toggleMobileMenu}
            className="block bg-cyan-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-cyan-500 transition duration-300"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default HomeNavbar;
