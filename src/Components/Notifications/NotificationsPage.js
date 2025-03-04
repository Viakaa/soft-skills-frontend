import React, { useState, useEffect, useCallback } from 'react';
import './NotificationsPage.css';
import { useNotifications } from './NotificationsContext';
import axios from 'axios';

const NotificationsPage = () => {
  const { notifications, error } = useNotifications();
  const [paginatedNotifications, setPaginatedNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [users, setUsers] = useState({});
  const notificationsPerPage = 10;

  const fetchUserWithRetry = async (userId, retries = 5, delayTime = 1000) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await axios.get(
        `http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      if (retries > 0 && error.response?.status === 429) {
        await new Promise((resolve) => setTimeout(resolve, delayTime));
        return fetchUserWithRetry(userId, retries - 1, delayTime * 2);
      }
      console.error('Failed to fetch user:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const uniqueUserIds = [...new Set(notifications.map((n) => n.ownerId))];
      const usersData = await Promise.all(
        uniqueUserIds.map((id) => fetchUserWithRetry(id))
      );

      const usersMap = usersData.reduce((acc, user) => {
        if (user) {
          acc[user._id] = user;
        }
        return acc;
      }, {});

      setUsers(usersMap);
    };

    if (notifications.length > 0) {
      fetchUsers();
    }
  }, [notifications]);

  const loadMoreNotifications = useCallback(async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(
        `http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/notifications/user-notifications`,
        {
          params: {
            pageNumber: currentPage,
            pageSize: notificationsPerPage,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.length > 0) {
        setPaginatedNotifications((prev) => {
          const newNotifications = response.data.filter(
            (notif) => !prev.some((item) => item._id === notif._id)
          );
          const updatedNotifications = [...newNotifications, ...prev]; 
          return updatedNotifications.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at) 
          );
        });
        setCurrentPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch more notifications:', error);
    } finally {
      setIsFetching(false);
    }
  }, [currentPage, isFetching, hasMore]);

  useEffect(() => {
    if (paginatedNotifications.length === 0) {
      loadMoreNotifications();
    }
  }, [loadMoreNotifications, paginatedNotifications]);
  

  return (
    <div className="notifications-page">
      <h1>Notifications</h1>
      {error && <div className="error">{error}</div>}
      {paginatedNotifications.length === 0 ? (
        <p className="no-notifications">No notifications</p>
      ) : (
        <div className="notifications-list">
          {paginatedNotifications.map((notification) => {
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
          {hasMore && (
            <button
              className="show-more-btn"
              onClick={loadMoreNotifications}
              disabled={isFetching}
            >
              {isFetching ? 'Loading...' : 'Show More'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;