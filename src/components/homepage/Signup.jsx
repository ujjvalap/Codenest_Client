/* eslint-disable react/prop-types */
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { config } from "../../constants/config";
import { hostExists, userExists } from "../../redux/reducers/auth";

// Helper function for validation
const validateForm = (data) => {
  const errors = {};
  if (!data.username) errors.username = "Username is required.";
  if (!data.email) errors.email = "Email is required.";
  else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(data.email)) {
    errors.email =
      "Email must be a valid Gmail address (e.g., example@gmail.com).";
  }
  if (!data.password) errors.password = "Password is required.";
  else if (data.password.length < 6)
    errors.password = "Password must be at least 6 characters.";
  return errors;
};

const Signup = ({ userType, onSubmit, toggleForm }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoginLoading, setGoogleLoginLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear specific error on input change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    const loginToast = toast.loading("Processing your signup... please wait."); // Show loading toast

    const endpoint =
      userType === "admin" ? "/admin/register" : "/user/register";

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}${endpoint}`,
        formData,
        config
      );

      const { success, message, user, host } = data;

      if (success) {
        if (userType === "admin" && host) {
          dispatch(hostExists(host));
        } else if (userType === "student" && user) {
          dispatch(userExists(user));
        } else {
          toast.error("Unexpected response. Please try again.");
          return;
        }

        toast.success(message);
        onSubmit();
        navigate(userType === "admin" ? "/admin-dashboard" : "/");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      toast.dismiss(loginToast);
      setIsLoading(false);
    }
  };

  const responseGoogle = async (response) => {
    let googleSingUpToast;
    try {
      setGoogleLoginLoading(true); // Set Google login loading state to true
      googleSingUpToast = toast.loading(
        "Logging you in with Google... please wait."
      ); // Show loading toast

      // Extract the authorization code from the Google response
      const authCode = response?.code;

      if (authCode) {
        // Define the API endpoint based on user type
        const endpoint =
          userType === "admin"
            ? "/admin/loginWithGoogle"
            : "/user/loginWithGoogle";

        // Send the authorization code to your backend for further processing
        const { data } = await axios.post(
          `${import.meta.env.VITE_SERVER}${endpoint}`,
          { code: authCode },
          config
        );

        const { success, message, user, host } = data;

        if (success) {
          // Handle successful login for Admin or Student
          if (userType === "admin" && host) {
            dispatch(hostExists(host));
          } else if (userType === "student" && user) {
            dispatch(userExists(user));
          } else {
            toast.error(
              "Unexpected response from the server. Please try again."
            );
            return;
          }

          toast.success(message); // Show success message
          onSubmit();
          navigate(userType === "admin" ? "/admin-dashboard" : "/student");
        } else {
          toast.error("Login failed. Please try again.");
        }
      } else {
        // If the authCode is not available, show an error message
        toast.error("Google authentication failed. Please try again.");
      }
    } catch (error) {
      // Handle different types of errors and provide meaningful feedback
      console.log("Error during Google login:", error);

      // Check for network issues or server errors
      if (!error.response) {
        toast.error("Network error. Please check your internet connection.");
      } else if (error.response.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        // Handle other errors (like validation failures, etc.)
        toast.error(
          error?.response?.data?.message ||
            "Google login failed. Please try again."
        );
      }
    } finally {
      toast.dismiss(googleSingUpToast);
      setGoogleLoginLoading(false);
    }
  };

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: responseGoogle, // Trigger the responseGoogle function on success
    onError: responseGoogle, // Trigger the same function on error to handle gracefully
    flow: "auth-code",
  });

  return (

    
    <div className="flex items-center justify-center w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        {/* Username Input */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-medium mb-1"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-4 py-2 text-black border rounded-lg ${
              errors.username ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full text-black px-4 py-2 border rounded-lg ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full text-black px-4 py-2 border rounded-lg ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={isLoading || googleLoginLoading}
        >
          {isLoading ? (
            <span className="loader inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            "Sign Up"
          )}
        </button>

        {/* Google Sign Up Button */}
        <button
          type="button"
          className="w-full bg-[#34A853] text-white font-bold py-2 rounded-lg mt-4 hover:bg-[#2c8d44] transition"
          disabled={isLoading || googleLoginLoading}
          onClick={handleLoginWithGoogle}
        >
          <div className="flex items-center justify-center space-x-2">
            {/* Google Icon */}
            <FaGoogle className="w-5 h-5" />
            <span>
              {googleLoginLoading ? (
                <span className="loader inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Sign Up with Google"
              )}
            </span>
          </div>
        </button>

        {/* Switch to Login */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => toggleForm()}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Log In
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;



