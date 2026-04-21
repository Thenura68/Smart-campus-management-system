import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <AdminNavbar />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}