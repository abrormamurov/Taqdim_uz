import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/slice/AuthSlice";
import Profile from "../../service/edit"; // Ensure this path is correct
import "./Sidebar.scss";

function Sidebar({ sidebarOpen }) {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const toggleCreateAccount = async () => {
    setShowCreateAccount(!showCreateAccount);
    if (!showCreateAccount) {
      try {
        const response = await Profile.postPreview();
        setAccounts(response || []);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    }
  };

  return (
    <section id="sidebar" className={!sidebarOpen ? "" : "hide"}>
      <NavLink to={"/"} className="brand">
        <i className="bx "></i>
        <span className="text-gradient">TAQDIM.UZ</span>
      </NavLink>
      <ul className="side-menu top">
        <NavLink to={"/"}>
          <li>
            <label>
              <i className="bx bxs-dashboard"></i>
              <span className="text">Home</span>
            </label>
          </li>
        </NavLink>
        <NavLink>
          <li onClick={toggleCreateAccount}>
            <label>
              <i className="bx bx-user-circle"></i>
              <span className="text">Profile</span>
            </label>
            {showCreateAccount && (
              <ul className="users">
                {accounts.length > 0 ? (
                  accounts.map((account) => (
                    <NavLink
                      key={account.username}
                      to={`/preview/${account.username}`}
                    >
                      <li>
                        <label>
                          <i className="bx bx-user-1"></i>
                          <span className="text">{account.username}</span>
                        </label>
                      </li>
                    </NavLink>
                  ))
                ) : (
                  <li>
                    <label>
                      <span className="bx">No accounts found</span>
                    </label>
                  </li>
                )}
                <NavLink to={"/create"}>
                  <li>
                    <label>
                      <i className="bx bx-plus-circle"></i>
                      <span className="text">Create Account</span>
                    </label>
                  </li>
                </NavLink>
              </ul>
            )}
          </li>
        </NavLink>
        {/* <NavLink to={"/analytics"}>
          <li>
            <label>
              <i className="bx bxs-doughnut-chart"></i>
              <span className="text">New Profile</span>
            </label>
          </li>
        </NavLink> */}
        {/* <NavLink to={"/myaccount"}>
          <li>
            <label>
              <i className="bx bxs-message-dots"></i>
              <span className="text">My Account</span>
            </label>
          </li>
        </NavLink> */}
        {/* <NavLink to={"/team"}>
          <li>
            <label>
              <i className="bx bxs-group"></i>
              <span className="text">Team</span>
            </label>
          </li>
        </NavLink> */}
        {/* <NavLink to={"/settings"}>
          <li>
            <label>
              <i className="bx bxs-cog"></i>
              <span className="text">Settings</span>
            </label>
          </li>
        </NavLink> */}
        <NavLink>
          <li onClick={handleLogout}>
            <label>
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Logout</span>
            </label>
          </li>
        </NavLink>
      </ul>
    </section>
  );
}

export default Sidebar;
