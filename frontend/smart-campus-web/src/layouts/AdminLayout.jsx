import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/adminNav/AdminNavbar";

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <AdminNavbar />
      <main className="admin-main" style={{ paddingTop: "110px" }}>
        <Outlet />
      </main>
    </div>
  );
}