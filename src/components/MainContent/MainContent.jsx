import React from "react";
import "./MainContent.scss";
import { Outlet } from "react-router-dom";
function MainContent() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default MainContent;
