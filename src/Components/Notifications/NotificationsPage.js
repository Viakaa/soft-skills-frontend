import React, { memo, useState, useEffect } from 'react';
import './NotificationsPage.css';
import { useNotifications } from './NotificationsContext';
import axios from 'axios';

const NotificationsPage = () => {
  const { notifications, error } = useNotifications();
  const [users, setUsers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 10;

  const fetchUserWithRetry = async (userId, retries = 5, delayTime = 1000) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await axios.get(`http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      if (retries > 0 && error.response?.status === 429) {
        await new Promise(resolve => setTimeout(resolve, delayTime));
        return fetchUserWithRetry(userId, retries - 1, delayTime * 2);
      }
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const uniqueUserIds = [...new Set(notifications.map(n => n.ownerId))];
      const usersData = await Promise.all(uniqueUserIds.map(id => fetchUserWithRetry(id)));

      setUsers(usersData.reduce((acc, user) => (user ? { ...acc, [user._id]: user } : acc), {}));
    };

    if (notifications.length) fetchUsers();
  }, [notifications]);

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const totalPages = Math.ceil(sortedNotifications.length / notificationsPerPage);
  const paginatedNotifications = sortedNotifications.slice(
    (currentPage - 1) * notificationsPerPage,
    currentPage * notificationsPerPage
  );

  return (
    <div className="notifications-page">
      <h1>Notifications</h1>
      {error && <div className="error">{error}</div>}
      {paginatedNotifications.length === 0 ? (
        <p className="no-notifications">No notifications</p>
      ) : (
        <div className="notifications-list">
          {paginatedNotifications.map(notification => {
            const owner = users[notification.ownerId] || {};
            return (
              <div key={notification._id} className="notification-item">
                <div className="notification-header">
                  <div className="notification-author">
                    {owner.firstName || 'Anonymous'} {owner.lastName || ''}
                  </div>
                  <div className="notification-title">{notification.title}</div>
                  <div className="notification-time">
                    {new Date(notification.created_at).toLocaleTimeString()} -{' '}
                    {new Date(notification.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="notification-body">
                  <p>{notification.meta?.description || 'No description available'}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="pagination-controls">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default memo(NotificationsPage);
