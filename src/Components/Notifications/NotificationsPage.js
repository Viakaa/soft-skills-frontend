import React, { memo } from 'react';
import './NotificationsPage.css';
import { useNotifications } from './NotificationsContext';

const NotificationsPage = () => {
  const { notifications, error } = useNotifications();

  return (
    <div className="notifications-page">
      <h1>Notifications</h1>
      {error && <div className="error">{error}</div>}
      {notifications.length === 0 ? (
        <p className="no-notifications">No notifications</p>
      ) : (
        <div id="notification-list" className="notifications-list">
          {notifications.map((notification) => (
            <div key={notification._id} className="notification-item">
              <div className="notification-header">
                        <div className="notification-author">
            {notification.ownerName || 'Anonymous'}
          </div>
                <div className="notification-title">{notification.title}</div>
                <div className="notification-time">
                  {new Date(notification.created_at).toLocaleTimeString()} -{' '}
                  {new Date(notification.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="notification-body">
                <p>
                  {notification.meta?.description || 'No description available'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(NotificationsPage);
