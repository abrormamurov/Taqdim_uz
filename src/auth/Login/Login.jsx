import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/slice/AuthSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      console.log("User found, navigating to /preview:", user);
      navigate("/preview");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login:", { username, password });
    const result = await dispatch(loginUser({ username, password }));

    if (loginUser.fulfilled.match(result)) {
      const { access, user } = result.payload;
      localStorage.setItem("access_token", access);
      navigate("/preview", { state: user });
    } else {
      console.error("Login failed:", result.payload);
    }
  };

  const renderError = (error) => {
    console.log("Rendering error:", error);
    if (typeof error === "string") {
      return error;
    } else if (typeof error === "object" && error.detail) {
      return error.detail;
    }
    return "An unknown error occurred";
  };

  return (
    <div className="bg-gray-900 z-10   h-screen flex items-center justify-center">
      <div className="relative w-full z-10 max-w-md bg-opacity-20 p-8 rounded-lg shadow-lg backdrop-blur-lg border border-gray-600">
        {/* <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-green-400 absolute -top-16 -left-16 z-0"></div>
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-purple-500 absolute -bottom-16 -right-16 z-0"></div>
        </div> */}
        <form
          onSubmit={handleSubmit}
          className="relative  flex flex-col items-center"
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
          {error && <p className="text-red-500 mb-4">{renderError(error)}</p>}
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
