import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";
import Navbar from "../components/Navbar"; // ✅ Navbar imported

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    if (!user.email || !user.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        user
      );

      if (response?.data?.success) {
        localStorage.setItem("loggedInUser", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      } else {
        alert(response?.data?.message || "Login failed");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white">
      {/* ✅ Navbar on top */}
      <Navbar />

      {/* Centered login form */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/20">
          {/* 🧠 Heading without icon */}
          <h1 className="text-3xl font-bold text-center mb-6 text-white">
            Login to Your Account
          </h1>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          {/* Button */}
          <button
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold text-lg shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50"
            onClick={loginUser}
            type="button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Signup Link */}
          <p className="mt-6 text-center text-gray-300">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-300 hover:text-blue-400 underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
