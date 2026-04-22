import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./UserNavbar.css";

export default function UserNavbar() {
  const { pathname } = useLocation();

  return (
    <nav className="user-navbar">
      <div className="user-navbar-brand">
        <Link to="/user/home">Smart Campus</Link>
      </div>

      <div className="user-navbar-links">
        <Link className={pathname.includes("/user/resources") ? "active" : ""} to="/user/resources">
          Resources
        </Link>
        <Link className={pathname.includes("/user/bookings") ? "active" : ""} to="/user/bookings">
          My Bookings
        </Link>
        <Link className={pathname.includes("/user/tickets") ? "active" : ""} to="/user/tickets">
          My Tickets
        </Link>
        <Link className={pathname.includes("/user/tickets/create") ? "active" : ""} to="/user/tickets/create">
          Create Ticket
        </Link>
        <Link className={pathname.includes("/user/profile") ? "active" : ""} to="/user/profile">
          Profile
        </Link>
      </div>
    </nav>
  );
}