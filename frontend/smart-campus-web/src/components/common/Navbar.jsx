import NotificationBell from "../notifications/NotificationBell";

function Navbar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 20px",
      backgroundColor: "#2c3e50",
      color: "white"
    }}>
      
      {/* LEFT SIDE */}
      <h2>Smart Campus</h2>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        
        <NotificationBell />

        <span style={{ cursor: "pointer" }}>Profile</span>
        <span style={{ cursor: "pointer" }}>Logout</span>

      </div>

    </div>
  );
}

export default Navbar;