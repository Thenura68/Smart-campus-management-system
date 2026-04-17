import { useEffect, useState } from "react";

export default function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = () => {
    fetch(`http://localhost:8080/api/notifications/${userId}`)
      .then(res => res.json())
      .then(data => setNotifications(data));
  };

  const fetchUnreadCount = () => {
    fetch(`http://localhost:8080/api/notifications/${userId}/unread/count`)
      .then(res => res.json())
      .then(data => setUnreadCount(data));
  };

  const markAsRead = (id) => {
    fetch(`http://localhost:8080/api/notifications/${id}/read`, {
      method: "PUT"
    }).then(() => {
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, isRead: true } : n)
      );
      fetchUnreadCount();
    });
  };

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();

    const interval = setInterval(() => {
      fetchNotifications();
      fetchUnreadCount();
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, [userId]);

  return { notifications, unreadCount, markAsRead };
}