import { useState } from "react";
import useNotifications from "../../hooks/useNotifications";

function NotificationBell() {
  const userId = 1; // replace later with JWT
  const { notifications, unreadCount, markAsRead } = useNotifications(userId);

  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      
      {/* 🔔 Bell */}
      <div onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
        🔔 {unreadCount > 0 && <span style={{
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px",
              marginLeft: "5px"
            }}>
              {unreadCount}
            </span>}
      </div>

      {/* 📥 Dropdown */}
      {open && (
        <div style={{
          position: "absolute",
          right: 0,
          top: "30px",
          width: "300px",
          background: "white",
          border: "1px solid #ccc",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
        }}>
          {notifications.length === 0 ? (
            <p style={{ padding: "10px" }}>No notifications</p>
          ) : (
            notifications.slice(0, 5).map(n => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  background: n.isRead ? "#fff" : "#f5f5f5",
                  color: "#000",
                  cursor: "pointer"
                }}
              >
                <span>{getIcon(n.type)} </span>
                {n.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function getIcon(type) {
  switch (type) {
    case "TICKET_CREATED":
      return "🆕";
    case "TICKET_ASSIGNED":
      return "👨‍🔧";
    case "TICKET_RESOLVED":
      return "✅";
    default:
      return "🔔";
  }
}

export default NotificationBell;