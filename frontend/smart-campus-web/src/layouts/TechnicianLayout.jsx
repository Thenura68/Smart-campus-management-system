import React from "react";
import { Outlet } from "react-router-dom";
import TechnicianNavbar from "../components/technicianNav/TechnicianNavbar";

export default function TechnicianLayout() {
  return (
    <div className="tech-shell">
      <TechnicianNavbar />
      <main className="tech-main" style={{ paddingTop: "110px" }}>
        <Outlet />
      </main>
    </div>
  );
}