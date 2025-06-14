// ProtectedLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import HomeNavbar from "../homepage/HomeNavbar";

function UserProtectedLayout() {
  return (
    <div className="">
      {/* Navbar Section */}
      <div className="fixed top-0 left-0 w-full z-50">
        <HomeNavbar />
      </div>

      {/* Main Content Section */}
      <div className="pt-[4rem]">
        <Outlet />
      </div>
    </div>
  );
}

export default UserProtectedLayout;
