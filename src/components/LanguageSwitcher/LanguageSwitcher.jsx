// components/LanguageSwitcher.js
import React, { useState } from "react";

const LanguageSwitcher = ({ setLanguage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prevState) => !prevState);

  return (
    <div className="language-switcher flex justify-end mt-1">
      {/* Mobile Menu Icon */}
      <button
        className="md:hidden p-2"
        onClick={toggleMenu}
        aria-label="Toggle language menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Language Menu for Mobile */}
      {menuOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md md:hidden">
          <button
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setLanguage("uz")}
          >
            Uzb
          </button>
          <button
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setLanguage("en")}
          >
            Eng
          </button>
          <button
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setLanguage("ru")}
          >
            Rus
          </button>
        </div>
      )}

      {/* Language Buttons for Desktop */}
      <div className="hidden md:flex space-x-2">
        <button
          className="px-4 py-2 text-gray-700 hover:bg-gray-200"
          onClick={() => setLanguage("uz")}
        >
          Uzb
        </button>
        <button
          className="px-4 py-2 text-gray-700 hover:bg-gray-200"
          onClick={() => setLanguage("en")}
        >
          Eng
        </button>
        <button
          className="px-4 py-2 text-gray-700 hover:bg-gray-200"
          onClick={() => setLanguage("ru")}
        >
          Rus
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
