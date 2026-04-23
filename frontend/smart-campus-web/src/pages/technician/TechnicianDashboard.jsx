import React, { useState, useEffect } from "react";
import { getTechnicianTickets } from "../../services/ticketService";

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

export default function TechnicianDashboard() {
  const [stats, setStats] = useState({
    tickets: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const tickets = await getTechnicianTickets();
        setStats({
          tickets: tickets.length
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching technician dashboard stats:", err);
        setError("Failed to load your assigned tickets. Please refresh the page.");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statConfig = [
    {
      title: "Assigned Tickets",
      value: stats.tickets,
      color: "#f59e0b", // Amber
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    }
  ];

  return (
    <div style={{ padding: "40px", backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header Section */}
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ margin: 0, fontSize: "2.25rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.025em" }}>
          Technician Dashboard
        </h1>
        <p style={{ marginTop: "8px", fontSize: "1.125rem", color: "#64748b" }}>
          Welcome back. Here are your assigned tasks.
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
}