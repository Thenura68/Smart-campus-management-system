import React, { useState, useEffect } from "react";
import { adminGetAllBookings } from "../../services/bookingService";
import { getAllTicketsForAdmin } from "../../services/ticketService";
import { getAllResources } from "../../services/resourceService";

// Import images from assets folder
import HeroBg from "../../assets/campus-bg.jpeg";
import BookingImg from "../../assets/bookings1.jpg";
import TicketImg from "../../assets/ticketimage.png";
import ResourceImg from "../../assets/college-image.jpg";

/**
 * StatCard component styled like the Home Page role cards
 */
const StatCard = ({ title, value, icon, color, loading, bgImg }) => (
  <div
    style={{
      position: "relative",
      borderRadius: "20px",
      overflow: "hidden",
      background: "linear-gradient(145deg, #0a1e3d, #04122a)",
      border: `1px solid ${color}44`,
      padding: "32px 28px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      minHeight: "220px",
      cursor: "default",
      boxShadow: `0 6px 28px ${color}15`,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-6px)";
      e.currentTarget.style.boxShadow = `0 18px 44px ${color}30`;
      e.currentTarget.style.borderColor = `${color}88`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = `0 6px 28px ${color}15`;
      e.currentTarget.style.borderColor = `${color}44`;
    }}
  >
    {/* Background Image with Overlay */}
    <div style={{
      position: "absolute",
      inset: 0,
      zIndex: 0,
      opacity: 0.15,
      filter: "grayscale(100%) brightness(1.5)",
    }}>
      <img src={bgImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, #020b1a 20%, transparent 100%)" }} />
    </div>

    <div style={{
      position: "absolute",
      left: 0, top: 0, bottom: 0,
      width: "4px",
      background: `linear-gradient(180deg, ${color}, ${color}aa)`,
      zIndex: 2
    }} />

    <div style={{ 
      position: "relative", 
      zIndex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      height: "100%"
    }}>
      <div style={{
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        backgroundColor: `${color}15`,
        border: `1px solid ${color}30`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: color,
        fontSize: "1.2rem"
      }}>
        {icon}
      </div>

      <div>
        <h3 style={{ 
          margin: 0, 
          fontFamily: "'Syne', sans-serif", 
          fontSize: "1.4rem", 
          fontWeight: 700, 
          color: "#fff",
          letterSpacing: "-0.01em"
        }}>
          {title}
        </h3>
        <p style={{ 
          margin: "8px 0 0 0", 
          fontFamily: "'DM Mono', monospace", 
          fontSize: "0.75rem", 
          fontWeight: 500, 
          color: "rgba(180, 220, 255, 0.6)",
          textTransform: "uppercase",
          letterSpacing: "0.15em"
        }}>
          Current Status
        </p>
      </div>

      <div style={{ marginTop: "auto" }}>
        <span style={{ 
          fontSize: "2.4rem", 
          fontFamily: "'Syne', sans-serif", 
          fontWeight: 800, 
          color: loading ? "rgba(255,255,255,0.2)" : "#fff",
          textShadow: `0 0 20px ${color}40`,
        }}>
          {loading ? "..." : value}
        </span>
      </div>
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
        setError("System Access Error: Please verify administrative credentials.");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statConfig = [
    {
      title: "Total Bookings",
      value: stats.bookings,
      color: "#00eec8", // Teal
      bgImg: BookingImg,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      title: "Active Tickets",
      value: stats.tickets,
      color: "#c4a0ff", // Purple
      bgImg: TicketImg,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "Campus Resources",
      value: stats.resources,
      color: "#7dc8ff", // Blue
      bgImg: ResourceImg,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{ 
      padding: "60px 40px", 
      backgroundColor: "#020b1a", 
      minHeight: "100vh", 
      fontFamily: "'DM Sans', sans-serif",
      color: "#fff",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background Effects */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        backgroundImage: "linear-gradient(rgba(0,100,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,100,255,0.06) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
        pointerEvents: "none"
      }} />

      {/* Hero-style Header */}
      <div style={{ position: "relative", zIndex: 1, marginBottom: "60px" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.22em",
          color: "#00d4ff",
          textTransform: "uppercase",
          background: "rgba(0,212,255,0.08)",
          border: "1px solid rgba(0,212,255,0.25)",
          borderRadius: "100px",
          padding: "8px 16px",
          marginBottom: "24px"
        }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00d4ff", boxShadow: "0 0 8px #00d4ff" }} />
          ADMINISTRATIVE CONTROL PANEL
        </div>

        <h1 style={{ 
          margin: 0, 
          fontFamily: "'Syne', sans-serif", 
          fontSize: "clamp(2rem, 5vw, 3.5rem)", 
          fontWeight: 800, 
          lineHeight: 1, 
          letterSpacing: "-0.02em",
          background: "linear-gradient(135deg, #fff 30%, #7dc8ff 70%, #00d4ff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Campus Overview.
        </h1>
        <p style={{ marginTop: "16px", fontSize: "1.1rem", color: "rgba(180, 220, 255, 0.8)", maxWidth: "600px", fontWeight: 300 }}>
          Manage all campus operations from a single unified digital interface.
          Live system telemetry and resource allocation tracking.
        </p>
      </div>

      {error && (
        <div style={{ 
          marginBottom: "32px", 
          padding: "20px", 
          backgroundColor: "rgba(254, 242, 242, 0.05)", 
          color: "#ff5a5a", 
          borderRadius: "12px", 
          border: "1px solid rgba(255, 90, 90, 0.2)",
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.85rem",
          zIndex: 1,
          position: "relative"
        }}>
          {">"} [ERROR]: {error}
        </div>
      )}

      {/* Stats Grid */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "32px",
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