import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../features/slice/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = ({ t }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false); // Parol ko'rinishini boshqarish uchun state

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(signupUser(formData));
      if (signupUser.fulfilled.match(result)) {
        toast.success(t.toastcomplate);
        navigate(`/login?email=${encodeURIComponent(formData.username)}`);
      } else {
        toast.error(t.toasterror);
        console.error("Signup failed:", result.payload);
      }
    } catch (error) {
      toast.error(t.toasterror);
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center relative">
      <div className="relative w-full max-w-md bg-opacity-20 p-8 rounded-lg shadow-lg backdrop-blur-lg border border-gray-600 z-10">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <h3 className="text-2xl font-medium text-white mb-6">{t.signup}</h3>
          <div className="w-full mb-4">
            <label htmlFor="email" className="block text-white text-sm mb-2">
              {t.email}
            </label>
            <input
              type="text"
              placeholder={t.email}
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-md p-2 placeholder-gray-400"
            />
          </div>
          <div className="relative w-full mb-4">
            <label htmlFor="password" className="block text-white text-sm mb-2">
              {t.password}
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder={t.password}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-md p-2 placeholder-gray-400"
            />
            <a
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-0 mt-7 flex items-center px-3"
            >
              {passwordVisible ? (
                <FaEyeSlash className="text-gray-400" />
              ) : (
                <FaEye className="text-gray-400" />
              )}
            </a>
          </div>
          {error && <p className="text-red-500 mb-4">{t.signupError}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-gray-800 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            {loading ? t.signup : t.signup}
          </button>
          <div className="mt-4 text-white">
            <p>
              {t.signupP}
              <Link to="/login" className="text-blue-400 hover:underline">
                {t.login}
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

export default Signup;
