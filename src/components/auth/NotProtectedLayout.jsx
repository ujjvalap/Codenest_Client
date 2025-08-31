import React from "react";
import { Outlet } from "react-router-dom";
import HomeNavbar from "../homepage/HomeNavbar";
import Features from "../homepage/Features";
import Footer from "../homepage/Footer";
import Team from "../homepage/Team";
import Chatbot from "../homepage/Chatbot";

function NotProtectedLayout() {
  return (
 <>
      {/* Navbar Section */}
     
     <HomeNavbar/>

      {/* Main Content Section */}
    
        <Outlet />
   

      {/* Additional Sections */}
      <Features />

      <Team/>

      <Chatbot/>
    
      <Footer />
      </>
  );
}

export default NotProtectedLayout;
