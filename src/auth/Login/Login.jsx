import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginUser } from "../../features/slice/AuthSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // URLdan email parametrini olish
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");
    if (email) {
      setUsername(email);
    }
  }, [location]);

  useEffect(() => {
    if (user) {
      console.log("User found, checking accounts:", user);
      checkUserAccounts();
    }
  }, [navigate, user]);

  const checkUserAccounts = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(`https://api.taqdim.uz/profile/list/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Debug uchun qaytgan natijani tekshiring
      console.log("Accounts response:", response.data);

      const accounts = response.data;
      if (Array.isArray(accounts) && accounts.length > 0) {
        // Birinchi accountga o'tish
        navigate(`/preview/${accounts[0].username}`);
      } else {
        // Hech qanday account yo'q bo'lsa 'create' sahifasiga o'tish
        navigate("/create");
      }
    } catch (error) {
      console.error("Error checking user accounts:", error);
      navigate("/create");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ username, password }));
    if (loginUser.fulfilled.match(result)) {
      const { access } = result.payload;
      localStorage.setItem("access_token", access);
      checkUserAccounts();
    } else {
      console.error("Login failed:", result.payload);
    }
  };

  const renderError = (error) => {
    if (typeof error === "string") {
      return error;
    } else if (typeof error === "object" && error.detail) {
      return error.detail;
    }
    return "An unknown error occurred";
  };

  return (
    <div className="bg-gray-900 z-10 h-screen flex items-center justify-center">
      <div className="relative w-full z-10 max-w-md bg-opacity-20 p-8 rounded-lg shadow-lg backdrop-blur-lg border border-gray-600">
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col items-center"
        >
          <h3 className="text-2xl font-medium text-white mb-6">Login</h3>
          <div className="w-full mb-4">
            <label htmlFor="username" className="block text-white text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              id="username"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-md p-2 placeholder-gray-400"
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="password" className="block text-white text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-md p-2 placeholder-gray-400"
            />
          </div>
          {error && (
            <p className="text-red-500 mb-4">Email or Password is wrong!</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-gray-800 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
          <div className="mt-4 text-white">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:underline">
                Signup
              </Link>
            </p>
          </div>
          <div className="mt-4 text-center text-white">
            <span className="text-gradient font-bold text-lg">TAQDIM.UZ</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
