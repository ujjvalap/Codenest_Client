import React from "react";
import { Outlet } from "react-router-dom";
import HomeNavbar from "../homepage/HomeNavbar";
import Features from "../homepage/Features";
import Footer from "../homepage/Footer";
import Team from "../homepage/Team";

function NotProtectedLayout() {
  return (
 <>
      {/* Navbar Section */}
     

      {/* Main Content Section */}
    
        <Outlet />
   

      {/* Additional Sections */}
      <Features />
    
      <Footer />
      </>
  );
}

export default NotProtectedLayout;
