import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = ({ t }) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("https://api.taqdim.uz/password/reset/", {
        username: email.trim(),
      });

      setLoading(false);
      toast.success(t.passwordResetSent);
      setStep(2);
    } catch (error) {
      setLoading(false);
      console.error("Error sending reset email:", error);
      toast.error(t.toasterror);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email.trim() || !code.trim() || !newPassword.trim()) {
        toast.error(t.allFieldsRequired);
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "https://api.taqdim.uz/password/confirm/",
        {
          email: email.trim(),
          code: code.trim(),
          new_password: newPassword.trim(),
        }
      );

      if (response.status === 200) {
        toast.success(t.passwordResetSuccess);
        navigate("/login");
      } else {
        toast.error(t.toasterror);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error resetting password:", error);
      toast.error(t.toasterror);
    }
  };

  return (
    <div className="bg-gray-900 z-10 h-screen flex items-center justify-center">
      <div className="relative w-full z-10 max-w-md bg-opacity-20 p-8 rounded-lg shadow-lg backdrop-blur-lg border border-gray-600">
        {step === 1 ? (
          <form
            onSubmit={handleSendEmail}
            className="relative flex flex-col items-center"
          >
            <h3 className="text-2xl font-medium text-white mb-6">
              {t.resetPassword}
            </h3>
            <div className="w-full mb-4">
              <label htmlFor="email" className="block text-white text-sm mb-2">
                {t.email}
              </label>
              <input
                type="email"
                id="email"
                placeholder={t.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-md p-2 placeholder-gray-400"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-gray-800 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              {loading ? t.sending : t.sendResetLink}
            </button>
            <div className="mt-4 text-center text-white">
              <span className="text-gradient font-bold text-lg">TAQDIM.UZ</span>
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleResetPassword}
            className="relative flex flex-col items-center"
          >
            <h3 className="text-2xl font-medium text-white mb-6">
              {t.enterNewPassword}
            </h3>
            <div className="w-full mb-4">
              <label htmlFor="code" className="block text-white text-sm mb-2">
                {t.verificationCode}
              </label>
              <input
                type="text"
                id="code"
                placeholder={t.verificationCode1}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-md p-2 placeholder-gray-400"
                required
              />
            </div>
            <div className="relative w-full mb-4">
              <label
                htmlFor="newPassword"
                className="block text-white text-sm mb-2"
              >
                {t.newPassword}
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="newPassword"
                placeholder={t.newPassword}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-md p-2 placeholder-gray-400"
                required
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
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-gray-800 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              {loading ? t.resetting : t.resetPassword}
            </button>
            <div className="mt-4 text-center text-white">
              <span className="text-gradient font-bold text-lg">TAQDIM.UZ</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
