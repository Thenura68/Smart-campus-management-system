import { useEffect, useState } from "react";

export default function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    if (!token || !userId) {
      setNotifications([]);
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/notifications/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error(`Failed to fetch notifications: ${res.status}`);
        setNotifications([]);
        return;
      }

      const data = await res.json();
      setNotifications(data);
    } catch (error) {
      console.error("Notification fetch error:", error);
      setNotifications([]);
    }
  };

  const fetchUnreadCount = async () => {
    if (!token || !userId) {
      setUnreadCount(0);
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/notifications/${userId}/unread/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error(`Failed to fetch unread count: ${res.status}`);
        setUnreadCount(0);
        return;
      }

      const data = await res.json();
      setUnreadCount(data);
    } catch (error) {
      console.error("Unread count fetch error:", error);
      setUnreadCount(0);
    }
  };

  const deleteNotification = async (id) => {
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:8080/api/notifications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error(`Failed to delete notification: ${res.status}`);
        return;
      }

      setNotifications((prev) => prev.filter((n) => n.id !== id));
      fetchUnreadCount();
    } catch (error) {
      console.error("Delete notification error:", error);
    }
  };

  useEffect(() => {
    if (!token || !userId) return;

    fetchNotifications();
    fetchUnreadCount();

    const interval = setInterval(() => {
      fetchNotifications();
      fetchUnreadCount();
    }, 3000);

    return () => clearInterval(interval);
  }, [userId, token]);

  return { notifications, unreadCount, deleteNotification };
}