import React from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../utils/jwtUtils";
import profileImg from "../../assets/profile.png";

export default function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = decodeToken(token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!decoded) {
    return (
      <div style={{ padding: "40px", color: "#fff", backgroundColor: "#020b1a", minHeight: "100vh" }}>
        <p>Loading profile...</p>
      </div>
    );
  }

  const { name, email, role } = decoded;

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

      {/* Header */}
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
          Account Management
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
          My Profile.
        </h1>
      </div>

      {/* Profile Card - Horizontal Layout */}
      <div style={{ 
        position: "relative", 
        zIndex: 1,
        maxWidth: "800px",
        background: "linear-gradient(145deg, #0a1e3d, #04122a)",
        borderRadius: "24px",
        border: "1px solid rgba(0, 212, 255, 0.2)",
        padding: "40px",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 24px 48px rgba(0, 0, 0, 0.4)",
        gap: "48px",
        flexWrap: "wrap"
      }}>
        {/* Left Side: Avatar Section */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div style={{
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            padding: "4px",
            background: "linear-gradient(135deg, #00d4ff, #0055ee)",
            boxShadow: "0 0 30px rgba(0, 212, 255, 0.3)"
          }}>
            <div style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: "#020b1a",
              overflow: "hidden",
              border: "4px solid #020b1a"
            }}>
              <img 
                src={profileImg} 
                alt="Profile" 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            </div>
          </div>
          <div style={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "#00eec8",
            border: "4px solid #020b1a",
            boxShadow: "0 0 10px #00eec8"
          }} />
        </div>

        {/* Right Side: Info Section */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px", minWidth: "300px" }}>
          <div>
            <h2 style={{ 
              margin: 0, 
              fontFamily: "'Syne', sans-serif", 
              fontSize: "2.2rem", 
              fontWeight: 700, 
              color: "#fff",
              letterSpacing: "-0.01em"
            }}>
              {name}
            </h2>
            <p style={{ 
              margin: "8px 0 0 0", 
              fontFamily: "'DM Mono', monospace", 
              fontSize: "0.9rem", 
              color: "#00d4ff",
              letterSpacing: "0.1em",
              textTransform: "uppercase"
            }}>
              Verified {role}
            </p>
          </div>

          <div style={{ 
            height: "1px", 
            background: "linear-gradient(90deg, rgba(0, 212, 255, 0.3), transparent)" 
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ color: "rgba(180, 220, 255, 0.5)", fontSize: "0.85rem", width: "100px", fontFamily: "'DM Mono', monospace" }}>EMAIL</span>
              <span style={{ color: "#fff", fontSize: "1.05rem", fontWeight: 500 }}>{email}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ color: "rgba(180, 220, 255, 0.5)", fontSize: "0.85rem", width: "100px", fontFamily: "'DM Mono', monospace" }}>IDENTITY</span>
              <span style={{ 
                color: "#1d4ed8", 
                backgroundColor: "rgba(29, 78, 216, 0.1)", 
                padding: "2px 10px", 
                borderRadius: "4px",
                fontSize: "0.75rem",
                fontWeight: 600,
                border: "1px solid rgba(29, 78, 216, 0.3)"
              }}>
                {role === "ADMIN" ? "ROOT_ACCESS" : "SECURE_USER"}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <div style={{ marginTop: "12px" }}>
            <button 
              onClick={handleLogout}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 32px",
                backgroundColor: "#dc2626",
                border: "1px solid #ef4444",
                color: "#ffffff",
                borderRadius: "8px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#b91c1c";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(220, 38, 38, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#dc2626";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.3)";
              }}
            >
              Logout 
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

