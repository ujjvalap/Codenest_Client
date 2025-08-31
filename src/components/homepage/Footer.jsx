import React from 'react';
import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div>
            <h1 className="text-3xl font-extrabold text-yellow-400 mb-4">Codenest</h1>
            <p className="text-sm leading-relaxed">
              Codenest is a cutting-edge online platform designed to enhance coding skills through interactive tests created by professionals.
            </p>
            <p className="text-xs text-gray-400 mt-3">
              Empowering students and educators with tools for learning and teaching coding in an engaging way.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick Links" className="space-y-3">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
            <a href="#home" className="text-sm hover:underline focus:underline focus:outline-none">Home</a>
            <a href="#about" className="text-sm hover:underline focus:underline focus:outline-none">About</a>
            <a href="#courses" className="text-sm hover:underline focus:underline focus:outline-none">Courses</a>
            <a href="#contact" className="text-sm hover:underline focus:underline focus:outline-none">Contact</a>
            <a href="#blog" className="text-sm hover:underline focus:underline focus:outline-none">Blog</a>
          </nav>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
            <p className="text-sm mb-4">Feel free to reach out for support or inquiries. We are always here to help!</p>
            <p className="text-sm">
              Email: <a href="mailto:support@codenest.com" className="text-blue-400 hover:underline focus:underline">codenest@gmail.com</a>
            </p>
            <p className="text-sm">
              Phone: <a href="tel:+123456789" className="text-blue-400 hover:underline focus:underline">+91 7692057868</a>
            </p>
            <p className="text-sm">Address: Ashoka Garden, Bhopal, India</p>

            {/* Social Icons */}
            <div className="flex space-x-5 mt-6">
              <a href="https://github.com/tulsirampathe" aria-label="Github" className="text-gray-400 hover:text-white transition">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/tulsiram-pathe-03b7b9258/" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition">
                <FaLinkedinIn size={20} />
              </a>
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition">
                <FaFacebookF size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-gray-800 rounded-md p-8 mt-14 max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-sm mb-6 max-w-xl mx-auto">
            Get the latest updates on coding resources, new courses, and more. Join our community today!
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Handle subscription logic here
            }}
            className="flex flex-col md:flex-row justify-center gap-4"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full md:w-2/3 rounded-md px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              aria-label="Email address for newsletter subscription"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md px-6 py-2 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div className="mb-4 md:mb-0">
            © 2025 Codenest. All Rights Reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:underline focus:underline focus:outline-none">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:underline focus:underline focus:outline-none">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
