/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { config } from "../../constants/config";
import { hostExists, userExists } from "../../redux/reducers/auth";
import { useGoogleLogin } from "@react-oauth/google";

const Login = ({ userType, onSubmit, toggleForm }) => {
  const [formData, setFormData] = useState({
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

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      newErrors.email =
        "Email must be a valid Gmail address (e.g., example@gmail.com).";
    }

    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true); // Show loader while processing
    const loginToast = toast.loading("Processing your login... please wait."); // Show loading toast

    const endpoint = userType === "admin" ? "/admin/login" : "/user/login";

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
        navigate(userType === "admin" ? "/admin-dashboard" : "/student");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      toast.dismiss(loginToast); // Dismiss the loading toast
      setIsLoading(false); // Hide loader after response
    }
  };

  const responseGoogle = async (response) => {
    let googleLoginToast;
    try {
      setGoogleLoginLoading(true); // Set Google login loading state to true
      googleLoginToast = toast.loading(
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
          navigate(userType === "admin" ? "/admin-dashboard" : "/");
        } else {
          toast.error("Login failed. Please try again.");
        }
      } else {
        toast.error("Google authentication failed. Please try again.");
      }
    } catch (error) {
      console.log("Error during Google login:", error);

      if (!error.response) {
        toast.error("Network error. Please check your internet connection.");
      } else if (error.response.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(
          error?.response?.data?.message ||
            "Google login failed. Please try again."
        );
      }
    } finally {
      toast.dismiss(googleLoginToast); // Dismiss the Google login loading toast
      setGoogleLoginLoading(false); // Set Google login loading state back to false
    }
  };

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="flex items-center justify-center w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
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
            autoComplete="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 text-black py-2 border rounded-lg ${
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
          disabled={googleLoginLoading || isLoading}
        >
          {isLoading ? (
            <span className="loader inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            "Login"
          )}
        </button>

        {/* Google Login Button */}
        <button
          type="button"
          className="w-full bg-[#34A853] text-white font-bold py-2 rounded-lg mt-4 hover:bg-[#2c8d44] transition"
          disabled={googleLoginLoading || isLoading}
          onClick={handleLoginWithGoogle}
        >
          <div className="flex items-center justify-center space-x-2">
            {/* Google Icon */}
            <FaGoogle className="w-5 h-5" />
            <span>
              {googleLoginLoading ? (
                <span className="loader inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Login with Google"
              )}
            </span>
          </div>
        </button>

        {/* Switch to Signup */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => toggleForm()}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
