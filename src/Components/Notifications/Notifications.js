import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import "./Notifications.css";
import HistoryIcon from "../../Assets/Images/history.png";

let eventSourceInstance;

function getEventSource() {
  if (!eventSourceInstance) {
    eventSourceInstance = new EventSource('http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com/notifications/stream');
  }
  return eventSourceInstance;
}

const NotificationSidebar = ({ isVisible, onClose, onUnreadCountChange }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  const scrollToBottom = useCallback(() => {
    const list = document.getElementById("notification-list");
    if (list) list.scrollTop = list.scrollHeight;
  }, []);

  useEffect(() => {
    if (!isVisible) return; // Fetch notifications only when sidebar is visible

    const eventSource = getEventSource();

    const handleMessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prev) => {
        const updated = [...prev, newNotification];
        const unreadCount = updated.filter((n) => n.status === "Unread").length;
        onUnreadCountChange?.(unreadCount); // Update unread count
        return updated;
      });
      scrollToBottom();
    };

    eventSource.addEventListener("message", handleMessage);

    eventSource.onerror = () => {
      setError("Failed to connect to the notifications service.");
    };

    return () => {
      eventSource.removeEventListener("message", handleMessage);
    };
  }, [isVisible, scrollToBottom, onUnreadCountChange]);

  return (
    <div className={`notification-sidebar ${isVisible ? "visible" : ""}`}>
      <div className="notification-page">
        <img src={HistoryIcon} alt="History Icon" />
      </div>
      <div className="close-btn" onClick={onClose}>×</div>
      <h3>Notifications</h3>
      <div className="viewAll">View all</div>
      {error && <div className="error">{error}</div>}
      {notifications.length === 0 ? (
        <p className="noNotifications">No notifications</p>
      ) : (
        <ul id="notification-list" className="list">
          {notifications.map((notification) => (
            <li key={notification._id} className="item-notification">
              <strong>{notification.title}</strong>
              <p>{JSON.stringify(notification.meta)}</p>
              <small>{new Date(notification.created_at).toLocaleString()}</small>
              <span className={notification.status === "Unread" ? "unread" : "read"}>
                {notification.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

NotificationSidebar.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUnreadCountChange: PropTypes.func,
};

NotificationSidebar.defaultProps = {
  onUnreadCountChange: () => {},
};

export default NotificationSidebar;
