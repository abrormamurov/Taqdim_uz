import React from "react";
import { NavLink } from "react-router-dom";
import { HiMenu } from "react-icons/hi"; // Importing a menu icon

function Navbar({ handleOpen, toggleDarkMode, username }) {
  return (
    <nav className="h-14  px-6 flex items-center sticky top-0 left-0 shadow-md z-10">
      <div className="flex items-center">
        <HiMenu
          className="text-xl cursor-pointer text-gray-700"
          onClick={handleOpen}
        />
      </div>
      <div className="flex-grow flex  justify-center md:justify-center gap-8 font-helvetica">
        <NavLink
          to={`/preview/${username}`}
          className="text-gray-700 text-lg hover:text-blue-500 transition duration-300"
        >
          Preview
        </NavLink>
        <NavLink
          to={`/edit/${username}`}
          className="text-gray-700 text-lg hover:text-blue-500 transition duration-300"
        >
          Edit
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
