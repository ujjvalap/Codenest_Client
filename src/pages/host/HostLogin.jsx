// HostLogin.js
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { config, server } from "../../constants/config";
import { hostExists } from "../../redux/reducers/auth";

function HostLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      // Sending the POST request to login
      const { data } = await axios.post(
        `${server}/admin/login`, // API endpoint
        { email, password }, // Data sent to the server
        config // Additional config, like headers or token
      );

      // Destructuring the response
      const { success, message, host } = data; // 'data' is the entire response object

      if (success) {
        // Dispatching host data to Redux store
        dispatch(hostExists(host)); // 'hostData' contains the host information
        toast.success(message); // Displaying success message from the API
        navigate("/host-dashboard");
      }
    } catch (error) {
      // If there was an error, show the error message
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          Forgot password?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Reset it here
          </a>
        </p>
      </div>
    </div>
  );
}

export default HostLogin;
