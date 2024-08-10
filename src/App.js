import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const savedSidebarOpen = localStorage.getItem("sidebarOpen");
    return savedSidebarOpen !== null ? JSON.parse(savedSidebarOpen) : true;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedIsDarkMode = localStorage.getItem("isDarkMode");
    return savedIsDarkMode !== null ? JSON.parse(savedIsDarkMode) : false;
  });

  const [username, setUsername] = useState(""); // Add state for username

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleOpen = () => setSidebarOpen((prevState) => !prevState);
  const toggleDarkMode = () => setIsDarkMode((prevState) => !prevState);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Define routes that should not show the sidebar */}
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<Create />} />
          {/* Other routes with Sidebar */}
          <Route
            path="*"
            element={
              <div id="main-content">
                <Sidebar sidebarOpen={sidebarOpen} setUsername={setUsername} />
                <div id="content">
                  <Navbar
                    toggleDarkMode={toggleDarkMode}
                    handleOpen={handleOpen}
                    username={username} // Pass username to Navbar
                  />
                  <Routes>
                    <Route path="/" element={<Preview />} />
                    <Route
                      path="/preview/:username"
                      element={<Preview setUsername={setUsername} />}
                    />
                    <Route
                      path="/edit/:username"
                      element={<Edit setUsername={setUsername} />}
                    />
                    <Route path="/myaccount" element={<MyAccount />} />
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
