import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { SiApple, SiDropbox, SiSteam } from "react-icons/si";
import { BiLogoTelegram } from "react-icons/bi";
import { SiWhatsapp } from "react-icons/si";
import { TranslationSwitcher } from "../../components/Translation/Translations"; // Import

function Home({ t, language, setLanguage }) {
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
          <TranslationSwitcher
            className="mb-6"
            language={language}
            setLanguage={setLanguage}
          />
          <Link to="/login">
            <button className="btn2 mt-12 hover:bg-indigo-500 hover:text-white transition py-2 px-4 rounded-lg text-lg font-semibold">
              {t.login}
            </button>
          </Link>
          <Link to="/signup">
            <button className="btn1 mt-12 hover:bg-indigo-500 transition py-2 px-4 rounded-lg text-lg font-semibold">
              {t.signup}
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
        <div className="flex justify-center  gap-4 ">
          <Link to="/login" className="mt-1">
            <button className="btn2 hover:bg-indigo-500 transition py-2 px-4 rounded-lg text-lg font-semibold">
              {t.login}
            </button>
          </Link>
          <Link to="/signup" className="mt-1">
            <button className="btn1 hover:bg-indigo-500 transition py-2 px-4 rounded-lg text-lg font-semibold">
              {t.signup}
            </button>
          </Link>
          <TranslationSwitcher language={language} setLanguage={setLanguage} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-16 md:mt-20 justify-between items-center text-center md:text-left mb-16 md:mb-24">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <h2 className="font-extrabold text-4xl md:text-6xl  mb-6">
            {t.homeH2}
          </h2>
          <h4 className="text-lg md:text-2xl mb-8">{t.homeP}</h4>
          <Link to="/signup">
            <button className="btn3 hover:bg-indigo-500 hover:text-white font-bold text-lg md:text-xl mb-2 py-2 px-4 rounded-lg">
              {t.homeButton}
            </button>
          </Link>
        </div>

        <div className="mt-10 md:mt-0 w-full md:w-1/2 flex justify-center">
          <div className="relative">
            <img
              src="https://cdn.myurls.co/packs/media/images/website/graphics/phone-in-blob-4-74972f94cd435c175722450fc6bee86a.jpg"
              alt=""
              className="w-full h-auto"
            />
            <div className="p-10 w-[56%] md:w-[75%]">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-0 px-20">
                <button className="bg-blue-500 flex items-center justify-center gap-1 md:gap-3 font-bold text-sm md:text-lg py-2 px-4 rounded-lg w-[91%] md:w-[299px]">
                  <SiSteam className=" md:text-xl text-sm" /> Steam
                </button>
                <button className="bg-green-500 flex items-center justify-center gap-3 font-bold text-sm md:text-lg py-2 px-4 rounded-lg w-[91%] md:w-[299px]">
                  <SiWhatsapp className="text-lg md:text-xl" /> WhatsApp
                </button>
                <button className="bg-blue-600 flex items-center justify-center gap-3 font-bold text-sm md:text-lg py-2 px-4 rounded-lg w-[91%] md:w-[299px]">
                  <SiDropbox className="text-lg md:text-xl" /> Dropbox
                </button>
                <button className="bg-purple-500 flex items-center justify-center gap-3 font-bold text-sm md:text-lg py-2 px-4 rounded-lg w-[91%] md:w-[299px]">
                  <SiApple className="text-lg md:text-xl" /> Apple Podcasts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
