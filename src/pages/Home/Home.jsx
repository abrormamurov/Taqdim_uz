import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi"; // Import a menu icon
import { SiApple, SiDropbox, SiInstagram, SiSteam } from "react-icons/si";
import { BiLogoTelegram } from "react-icons/bi";
import { SiWhatsapp } from "react-icons/si";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="container mx-auto px-4 md:px-12">
      <nav className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600">
            TAQDIM.UZ
          </h2>
        </div>

        <div className="hidden md:flex gap-6 items-center">
          {/* <Link to="#" className="hover:text-indigo-600 text-lg font-medium">
            How It Works
          </Link>
          <Link to="#" className="hover:text-indigo-600 text-lg font-medium">
            Features
          </Link> */}
          <Link to="/login">
            <button className="btn2 mt-8 hover:bg-indigo-500 hover:text-white transition py-2 px-4 rounded-lg text-lg font-semibold">
              Log In
            </button>
          </Link>
          <Link to="/signup">
            <button className="btn1 mt-8 hover:bg-indigo-500 transition py-2 px-4 rounded-lg text-lg font-semibold">
              Sign Up
            </button>
          </Link>
        </div>
        <div className="md:hidden">
          <HiMenu className="text-3xl cursor-pointer" onClick={toggleMenu} />
        </div>
      </nav>

      <div
        className={`flex flex-col items-center mt-4 md:hidden transition-transform duration-300 ${
          isMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col gap-4 items-center">
          {/* <Link
            to="#"
            className="mb-2 hover:text-indigo-600 text-lg font-medium"
          >
            How It Works
          </Link>
          <Link
            to="#"
            className="mb-2 hover:text-indigo-600 text-lg font-medium"
          >
            Features
          </Link> */}
          <Link to="/login" className="mb-2">
            <button className="btn2 hover:bg-indigo-500 transition py-2 px-4 rounded-lg text-lg font-semibold">
              Log In
            </button>
          </Link>
          <Link to="/signup" className="mb-2">
            <button className="btn1 hover:bg-indigo-500 transition py-2 px-4 rounded-lg text-lg font-semibold">
              Sign Up
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-16 md:mt-20 justify-between items-center text-center md:text-left mb-16 md:mb-24">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <h2 className="font-extrabold text-4xl md:text-6xl  mb-6">
            Now, you only need one link.
          </h2>
          <h4 className="text-lg md:text-2xl mb-8">
            Share more with your followers in a single click. Myurls makes it
            easy to link to all of your content in one place.
          </h4>
          <Link to="/signup">
            <button className="btn3 hover:bg-indigo-500 hover:text-white font-bold text-lg md:text-xl mb-2 py-2 px-4 rounded-lg">
              Use Taqdim for Free
            </button>
          </Link>
          <p className="text-lg">People have signed up this week!</p>
        </div>

        <div className="mt-10 md:mt-0 w-full md:w-1/2 flex justify-center">
          <div className="relative">
            <img
              src="https://cdn.myurls.co/packs/media/images/website/graphics/phone-in-blob-4-74972f94cd435c175722450fc6bee86a.jpg"
              alt=""
              className="w-full h-auto"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">
              <div className="rounded-full overflow-hidden mb-6"></div>
              <button className="bg-blue-500 flex items-center justify-center gap-3 font-bold text-lg md:text-xl py-2 px-4 rounded-lg w-[299px]">
                <SiSteam className="text-xl md:text-2xl" /> Steam
              </button>
              <button className="bg-green-500 flex items-center justify-center gap-3 font-bold text-lg md:text-xl py-2 px-4 rounded-lg w-[299px]">
                <SiWhatsapp className="text-xl md:text-2xl" /> WhatsApp
              </button>
              <button className="bg-blue-600 flex items-center justify-center gap-3 font-bold text-lg md:text-xl py-2 px-4 rounded-lg w-[299px]">
                <SiDropbox className="text-xl md:text-2xl" /> Dropbox
              </button>
              <button className="bg-purple-500 flex items-center justify-center gap-3 font-bold text-lg md:text-xl py-2 px-4 rounded-lg w-[299px]">
                <SiApple className="text-xl md:text-2xl" /> Apple Podcasts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
