import React, { memo } from 'react';
import './Notifications.css';
import { useNotifications } from './NotificationsContext';

const NotificationSidebar = ({ isVisible, onClose }) => {
  const { notifications, error } = useNotifications();

  const handleViewAllClick = () => {
    window.location.href = '/notifications';
  };

  return (
    <div className={`notification-sidebar ${isVisible ? 'visible' : ''}`}>
      <div className="close-btn" onClick={onClose}>×</div>
      <h3>Notifications</h3>
      <div className="viewAll" onClick={handleViewAllClick}>
        View all
      </div>
      {error && <div className="error">{error}</div>}
      {notifications.length === 0 ? (
        <p className="noNotifications">No notifications</p>
      ) : (
        <ul id="notification-list" className="list">
          {notifications.map((notification) => (
            <li key={notification._id} className="item-notification">
              <div className="notification-header">
                <div className="profile-placeholder"></div>
                <div className="notification-info">
                <strong className="name">{notification.ownerName || notification.title}</strong>
                <span className="theme">
                    {typeof notification.meta.link === 'string'
                      ? notification.meta.link
                      : JSON.stringify(notification.meta.link)}
                  </span>
                </div>
                <div className="date-time">
                  {new Date(notification.created_at).toLocaleString()}
                </div>
              </div>
              <div className="content">{notification.content}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(NotificationSidebar);
