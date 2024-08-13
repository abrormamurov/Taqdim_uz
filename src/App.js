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

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const savedSidebarOpen = localStorage.getItem("sidebarOpen");
    return savedSidebarOpen !== null ? JSON.parse(savedSidebarOpen) : true;
  });

  const [username, setUsername] = useState("");

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  const handleOpen = () => setSidebarOpen((prevState) => !prevState);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Routes without Sidebar and Navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />

          {/* Dynamic UserPreview route */}
          <Route path="/:username" element={<UserPreview />} />

          {/* Routes with Sidebar and Navbar */}
          <Route
            path="*"
            element={
              <div id="main-content">
                <Sidebar sidebarOpen={sidebarOpen} setUsername={setUsername} />
                <div id="content">
                  <Navbar handleOpen={handleOpen} username={username} />
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
