import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/user/UserNavbar";
import Footer from "../components/common/Footer";
import Chatbot from "../components/Chatbot/Chatbot";

export default function UserLayout() {
  return (
    <div className="app-shell">
      <UserNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}