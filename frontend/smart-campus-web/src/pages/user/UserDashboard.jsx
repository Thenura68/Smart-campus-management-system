import React, { useState, useEffect } from "react";
import { getUserBookings } from "../../services/bookingService";
import { getUserTickets } from "../../services/ticketService";

// Import images from assets folder
import UserHeroBg from "../../assets/college-1.jpg";
import MyBookingImg from "../../assets/bookings1.jpg";
import MyTicketImg from "../../assets/userticket.webp";

/**
 * StatCard component styled like the Home Page role cards
 */
const StatCard = ({ title, value, icon, color, loading, bgImg }) => (
  <div
    style={{
      position: "relative",
      borderRadius: "20px",
      overflow: "hidden",
      background: "linear-gradient(145deg, #0a2a2e, #0d3538)",
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
      filter: "brightness(1.5)",
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
          color: "#ccfaf2",
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
          Management
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

const UserDashboard = () => {
  const [stats, setStats] = useState({
    bookings: 0,
    tickets: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [bookings, tickets] = await Promise.all([
          getUserBookings(),
          getUserTickets()
        ]);

        setStats({
          bookings: bookings.length,
          tickets: tickets.length
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user dashboard stats:", err);
        setError("Network Sync Error: Could not synchronize user dashboard data.");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statConfig = [
    {
      title: "My Bookings",
      value: stats.bookings,
      color: "#00eec8", // Teal
      bgImg: MyBookingImg,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      title: "My Tickets",
      value: stats.tickets,
      color: "#f59e0b", // Amber
      bgImg: MyTicketImg,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
          <path d="m9 12 2 2 4-4" />
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
          color: "#00eec8",
          textTransform: "uppercase",
          background: "rgba(0,238,200,0.08)",
          border: "1px solid rgba(0,238,200,0.25)",
          borderRadius: "100px",
          padding: "8px 16px",
          marginBottom: "24px"
        }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00eec8", boxShadow: "0 0 8px #00eec8" }} />
          STUDENT DASHBOARD
        </div>

        <h1 style={{ 
          margin: 0, 
          fontFamily: "'Syne', sans-serif", 
          fontSize: "clamp(2rem, 5vw, 3.5rem)", 
          fontWeight: 800, 
          lineHeight: 1, 
          letterSpacing: "-0.02em",
          background: "linear-gradient(135deg, #fff 30%, #7dc8ff 70%, #00eec8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Control Center.
        </h1>
        <p style={{ marginTop: "16px", fontSize: "1.125rem", color: "rgba(180, 220, 255, 0.8)", maxWidth: "520px", fontWeight: 300 }}>
          Welcome back. Access your personal reservations and support reports
          to keep your campus journey on track.
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
          {">"} [SYNC_ERROR]: {error}
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

export default UserDashboard;
