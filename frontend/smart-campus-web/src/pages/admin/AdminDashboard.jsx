import React, { useState, useEffect } from "react";
import { adminGetAllBookings } from "../../services/bookingService";
import { getAllTicketsForAdmin } from "../../services/ticketService";
import { getAllResources } from "../../services/resourceService";

/**
 * StatCard component for displaying summary information
 */
const StatCard = ({ title, value, icon, color, loading }) => (
  <div
    style={{
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "24px",
      display: "flex",
      alignItems: "center",
      gap: "20px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      border: "1px solid #f1f5f9",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "default",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
    }}
  >
    <div
      style={{
        width: "56px",
        height: "56px",
        borderRadius: "12px",
        backgroundColor: `${color}15`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: color,
      }}
    >
      {icon}
    </div>
    <div>
      <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 500, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.025em" }}>
        {title}
      </p>
      <h3 style={{ margin: "4px 0 0 0", fontSize: "1.5rem", fontWeight: 700, color: "#1e293b" }}>
        {loading ? "..." : value}
      </h3>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    bookings: 0,
    tickets: 0,
    resources: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch real data from services
        const [bookings, tickets, resources] = await Promise.all([
          adminGetAllBookings(),
          getAllTicketsForAdmin(),
          getAllResources()
        ]);

        setStats({
          bookings: bookings.length,
          tickets: tickets.length,
          resources: resources.length
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError("Failed to load statistics. Please ensure you are logged in as an admin.");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statConfig = [
    {
      title: "Total Bookings",
      value: stats.bookings,
      color: "#10b981", // Emerald
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      title: "Total Tickets",
      value: stats.tickets,
      color: "#f59e0b", // Amber
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "Total Resources",
      value: stats.resources,
      color: "#f43f5e", // Rose
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" />
          <path d="m21 8-9 6-9-6" />
          <path d="M3 8v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{ padding: "40px", backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header Section */}
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ margin: 0, fontSize: "2.25rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.025em" }}>
          Welcome back, Admin!
        </h1>
        <p style={{ marginTop: "8px", fontSize: "1.125rem", color: "#64748b" }}>
          Here's what's happening on your campus today.
        </p>
      </div>

      {error && (
        <div style={{ marginBottom: "24px", padding: "16px", backgroundColor: "#fef2f2", color: "#b91c1c", borderRadius: "12px", border: "1px solid #fee2e2" }}>
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
        }}
      >
        {statConfig.map((stat, index) => (
          <StatCard key={index} {...stat} loading={loading} />
        ))}
      </div>
    </div>
  );
};


export default AdminDashboard;