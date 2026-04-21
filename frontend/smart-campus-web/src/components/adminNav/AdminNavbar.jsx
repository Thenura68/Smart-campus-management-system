import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  const { pathname } = useLocation();

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-brand">
        <Link to="/admin/dashboard">Admin Panel</Link>
      </div>

      <div className="admin-navbar-links">
        <Link className={pathname.includes("/admin/dashboard") ? "active" : ""} to="/admin/dashboard">
          Dashboard
        </Link>
        <Link className={pathname.includes("/admin/resources") ? "active" : ""} to="/admin/resources">
          Manage Resources
        </Link>
        <Link className={pathname.includes("/admin/bookings") ? "active" : ""} to="/admin/bookings">
          Manage Bookings
        </Link>
        <Link className={pathname.includes("/admin/tickets") ? "active" : ""} to="/admin/tickets">
          Manage Tickets
        </Link>
        <Link className={pathname.includes("/admin/users") ? "active" : ""} to="/admin/users">
          Manage Users
        </Link>
      </div>
    </nav>
  );
}