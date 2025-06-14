import React from 'react';
// Import Font Awesome Icons
import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        {/* Footer Content Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl font-bold text-yellow-400">Codenest</h1>
            <p className="text-sm mt-3">
              Codenest is a cutting-edge online platform designed to enhance coding skills through interactive tests created by professionals.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Empowering students and educators with tools for learning and teaching coding in an engaging way.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
            <nav className="flex flex-col space-y-3">
              <a href="#home" className="text-sm hover:underline">Home</a>
              <a href="#about" className="text-sm hover:underline">About</a>
              <a href="#courses" className="text-sm hover:underline">Courses</a>
              <a href="#contact" className="text-sm hover:underline">Contact</a>
              <a href="#blog" className="text-sm hover:underline">Blog</a>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
            <p className="text-sm mb-4">Feel free to reach out for support or inquiries. We are always here to help!</p>
            <p className="text-sm">Email: <a href="mailto:support@codenest.com" className="hover:underline text-blue-400">codenest@gmail.com</a></p>
            <p className="text-sm">Phone: <a href="tel:+123456789" className="hover:underline text-blue-400">+91 7692057868</a></p>
            <p className="text-sm">Address: Ashoka Garden, Bhopal, India</p>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-gray-800 p-6 rounded-md mt-10">
          <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-sm mb-4">Get the latest updates on coding resources, new courses, and more. Join our community today!</p>
          
          {/* Add gap-4 to create space between input and button */}
          <div className="flex flex-col md:flex-row items-center md:gap-4">
            <input
              type="email"
              className="bg-gray-700 text-white px-4 py-2 rounded-md mb-4 md:mb-0 md:w-2/3"
              placeholder="Enter your email"
            />
            <button className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-yellow-600">
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6">
          <div className="flex justify-between items-center">
            {/* Social Media Links */}
            <div className="flex space-x-6">
              <a href="https://github.com/tulsirampathe" className="text-gray-400 hover:text-white">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/tulsiram-pathe-03b7b9258/" className="text-gray-400 hover:text-white">
                <FaLinkedinIn />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-500 text-sm">
              © 2025 Codenest. All Rights Reserved. <br />
              <a href="#privacy" className="text-sm text-gray-400 hover:underline">Privacy Policy</a> | <a href="#terms" className="text-sm text-gray-400 hover:underline">Terms of Service</a>
            </div>
          </div>
        </div>
        </div>
      </footer>
    );
  };

export default Footer;