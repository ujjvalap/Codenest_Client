// ProtectedLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";

function ProtectedLayoutUser() {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50">
        <UserNavbar />
      </div>
      {/* Navbar Section */}

      {/* Main Content Section */}
      <div className="pt-[4rem]">
        <Outlet />
      </div>
    </div>
  );
}

export default ProtectedLayoutUser;
