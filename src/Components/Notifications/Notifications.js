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
          try {
            const unreadIds = batch.map(n => n._id);
            await markNotificationAsRead(unreadIds); 
          } catch (error) {
            console.error('Failed to mark notifications as read:', error);
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
  }, [isVisible, notifications, markNotificationAsRead]);

  return (
    <div className={`notification-sidebar ${isVisible ? 'visible' : ''}`}>
      <div className="close-btn" onClick={onClose}>×</div>
      <h3>Сповіщення</h3>
      <div className="viewAll" onClick={handleViewAllClick}>
        Переглянути всі
      </div>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <p className='loading'>Завантаження сповіщень...</p>
      ) : notifications.length === 0 ? (
        <p className="noNotifications">Немає сповіщень</p>
      ) : (
        <ul id="notification-list" className="list">
          {notifications.map((notification) => (
            <li key={notification._id} className="item-notification">
              <div className="notification-header">
                <div className="profile-placeholder"></div>
                <div className="notification-info">
                  <strong className="name">{notification.ownerName || notification.title}</strong>
                  <span className="theme">
  {notification.meta.message?.includes('Test Link:') ? (
    <>
      <p>{notification.meta.message.split('Test Link:')[0].trim()}</p>
      <a
        href={notification.meta.message.split('Test Link:')[1]?.trim()} 
        className="go-to-test-button"
      >
        Перейти до тесту
      </a>
    </>
  ) : (
    notification.meta.message || notification.meta.shortDescription
  )}
</span>

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
