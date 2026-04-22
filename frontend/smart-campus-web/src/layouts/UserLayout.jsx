import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/userNav/UserNavbar";
import Footer from "../components/common/Footer";
import Chatbot from "../components/Chatbot/Chatbot";

export default function UserLayout() {
  return (
    <div className="app-shell">
      <UserNavbar />
      <main style={{ paddingTop: "110px" }}>
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}