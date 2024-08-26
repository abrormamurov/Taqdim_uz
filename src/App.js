import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Edit from "./pages/Edit/Edit";
import Preview from "./pages/Preview/Preview";
import "./App.css";
import Login from "./auth/Login/Login";
import Signup from "./auth/Signup/Signup";
import MyAccount from "./components/MyAccount/MyAccount";
import Create from "./components/Create/Create";
import Home from "./pages/Home/Home";
import UserPreview from "./components/UserPage/UserPreview/UserPreview";
import { translations } from "./components/Translation/Translations";
import { Toaster } from "react-hot-toast"; // react-hot-toast kutubxonasidan Toaster komponentini import qilish
import ResetPassword from "./auth/ResetPassword/ResetPassword";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const savedSidebarOpen = localStorage.getItem("sidebarOpen");
    return savedSidebarOpen !== null ? JSON.parse(savedSidebarOpen) : true;
  });

  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("uz");

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  const handleOpen = () => setSidebarOpen((prevState) => !prevState);

  useEffect(() => {
    document.body.classList.add("light-mode");
  }, []);

  const t = translations[language];

  return (
    <BrowserRouter>
      <div className="App">
        <Toaster /> {/* Toaster komponentini qo'shish */}
        <Routes>
          <Route path="/login" element={<Login t={t} />} />
          <Route path="/signup" element={<Signup t={t} />} />
          <Route path="/reset-password" element={<ResetPassword t={t} />} />

          <Route
            path="/"
            element={
              <Home t={t} language={language} setLanguage={setLanguage} />
            }
          />
          <Route path="/create" element={<Create t={t} />} />
          <Route path="/:username" element={<UserPreview t={t} />} />
          <Route
            path="*"
            element={
              <div id="main-content">
                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setUsername={setUsername}
                  t={t}
                />
                <div id="content">
                  <Navbar
                    handleOpen={handleOpen}
                    username={username}
                    t={t}
                    language={language}
                    setLanguage={setLanguage}
                  />
                  <Routes>
                    <Route path="/" element={<Preview t={t} />} />
                    <Route
                      path="/preview/:username"
                      element={<Preview setUsername={setUsername} t={t} />}
                    />
                    <Route
                      path="/edit/:username"
                      element={<Edit setUsername={setUsername} t={t} />}
                    />
                    <Route path="/myaccount" element={<MyAccount t={t} />} />
                  </Routes>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
