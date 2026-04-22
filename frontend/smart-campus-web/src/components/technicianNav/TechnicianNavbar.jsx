import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./TechnicianNavbar.css";

export default function TechnicianNavbar() {
  const { pathname } = useLocation();

  return (
    <nav className="technician-navbar">
      <div className="technician-navbar-brand">
        <Link to="/technician/dashboard">Technician Panel</Link>
      </div>

      <div className="technician-navbar-links">
        <Link className={pathname.includes("/technician/dashboard") ? "active" : ""} to="/technician/dashboard">
          Dashboard
        </Link>
        <Link className={pathname.includes("/technician/tickets") ? "active" : ""} to="/technician/tickets">
          Assigned Tickets
        </Link>
       
      </div>
    </nav>
  );
}