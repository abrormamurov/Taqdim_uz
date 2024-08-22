import React from "react";
import { NavLink } from "react-router-dom";
import { HiMenu } from "react-icons/hi"; // Menu icon
import { TranslationSwitcher } from "../Translation/Translations"; // Import qilish

function Navbar({ handleOpen, username, t, language, setLanguage }) {
  return (
    <nav className="h-14 px-6 flex items-center sticky top-0 left-0 shadow-md z-10">
      <div className="flex items-center">
        <HiMenu className="text-xl cursor-pointer" onClick={handleOpen} />
      </div>
      <div className="flex-grow flex justify-center md:justify-center gap-8 font-helvetica">
        <NavLink
          to={`/preview/${username}`}
          className="text-lg hover:text-blue-500 transition duration-300"
        >
          {t.preview} {/* Tarjima qilingan matn */}
        </NavLink>
        <NavLink
          to={`/edit/${username}`}
          className="text-lg hover:text-blue-500 transition duration-300"
        >
          {t.edit} {/* Tarjima qilingan matn */}
        </NavLink>
      </div>
      <div className="flex items-center pb-6">
        <TranslationSwitcher
          language={language}
          setLanguage={setLanguage} // To'g'ri chaqirish
        />
      </div>
    </nav>
  );
}

export default Navbar;
