import React, { memo, useEffect } from 'react';
import './Notifications.css';
import { useNotifications } from './NotificationsContext';

const NotificationSidebar = ({ isVisible, onClose }) => {
  const { notifications, error, loading, markNotificationAsRead, setUnreadCount } = useNotifications();

  const handleViewAllClick = () => {
    window.location.href = '/notifications';
  };

  useEffect(() => {
    if (isVisible) {
      const unreadNotifications = notifications.filter(n => n.status !== 'read');

      if (unreadNotifications.length > 0) {
        const batchSize = 5;
        const markBatch = async (batch) => {
          for (const notification of batch) {
            await markNotificationAsRead(notification._id);
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        };

        const batches = [];
        for (let i = 0; i < unreadNotifications.length; i += batchSize) {
          batches.push(unreadNotifications.slice(i, i + batchSize));
        }

        (async () => {
          for (const batch of batches) {
            await markBatch(batch);
          }
        })();
      }
    }
  }, [isVisible, notifications, markNotificationAsRead, setUnreadCount]);

  return (
    <div className={`notification-sidebar ${isVisible ? 'visible' : ''}`}>
      <div className="close-btn" onClick={onClose}>×</div>
      <h3>Notifications</h3>
      <div className="viewAll" onClick={handleViewAllClick}>
        View all
      </div>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <p className='loading'>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p className="noNotifications">No notifications</p>
      ) : (
        <ul id="notification-list" className="list">
          {notifications.map((notification) => (
            <li key={notification._id} className="item-notification">
              <div className="notification-header">
                <div className="profile-placeholder"></div>
                <div className="notification-info">
                  <strong className="name">{notification.ownerName || notification.title}</strong>
                  <span className="theme">{notification.meta.message || notification.meta.shortDescription}</span>
                </div>
                <div className="date-time">
                  {new Date(notification.created_at).toLocaleString()}
                </div>
              </div>
              <div className="content">{notification.meta.fullDescription || notification.content}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(NotificationSidebar);
