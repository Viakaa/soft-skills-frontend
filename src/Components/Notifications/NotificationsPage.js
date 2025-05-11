import React, { useState, useEffect, useCallback } from 'react';
import './NotificationsPage.css';
import { useNotifications } from './NotificationsContext';
import { debounce } from "lodash";
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
    const cachedUser = localStorage.getItem(`user_${userId}`);
    if (cachedUser) {
      console.log("Using cached user:", cachedUser);  
      return JSON.parse(cachedUser);
    }
  
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;
  
      const response = await axios.get(
        `http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/users/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log("Fetched user data:", response.data);
      localStorage.setItem(`user_${userId}`, JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      if (retries > 0 && error.response?.status === 429) {
        console.log("Retrying to fetch user...");
        await new Promise((resolve) => setTimeout(resolve, delayTime));
        return fetchUserWithRetry(userId, retries - 1, delayTime * 2);
      }
      console.error('Failed to fetch user:', error);
      return null;
    }
  };
  
  const fetchUsers = useCallback(
    debounce(async () => {
      console.log("Fetching users..."); 
      const uniqueUserIds = [...new Set(notifications.map((n) => n.ownerId))];
  
      const usersData = await Promise.all(
        uniqueUserIds.map((id) => users[id] ? Promise.resolve(users[id]) : fetchUserWithRetry(id))
      );
  
      const usersMap = usersData.reduce((acc, user) => {
        if (user) {
          acc[user._id] = user;
        }
        return acc;
      }, {});
  
      setUsers((prevUsers) => {
        const updatedUsers = { ...prevUsers, ...usersMap };
        console.log("Updated users:", updatedUsers); 
        return updatedUsers;
      });
    }, 1000),
    [notifications]
  );

  useEffect(() => {
    console.log("Notifications received:", notifications);
    if (notifications.length > 0) {
      fetchUsers();
    }
  }, [notifications, fetchUsers]);

  const loadMoreNotifications = useCallback(async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);
  
    try {
      const token = localStorage.getItem('authToken');
  
      const response = await axios.get(
        `http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/notifications/user-notifications`,
        {
          params: { pageNumber: currentPage, pageSize: notificationsPerPage },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      console.log("Fetched notifications:", response.data); 
  
      const fetchedNotifications = response.data;
  
      if (fetchedNotifications.length > 0) {
        setPaginatedNotifications((prev) => {
          const newNotifications = fetchedNotifications.filter(
            (notif) => !prev.some((item) => item._id === notif._id)
          );
          const updatedNotifications = [...newNotifications, ...prev];
          localStorage.setItem('cachedNotifications', JSON.stringify(updatedNotifications));
          return updatedNotifications.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
        });
        setCurrentPage((prev) => prev + 1);
      } else {
        localStorage.removeItem('cachedNotifications');
        setPaginatedNotifications([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch more notifications:', error);
    } finally {
      setIsFetching(false);
    }
  }, [currentPage, isFetching, hasMore]);

  // Log the paginated notifications to track if they are being set correctly
  useEffect(() => {
    console.log("Paginated notifications:", paginatedNotifications);
  }, [paginatedNotifications]);

  return (
    <div className="notifications-page">
      <h1>Сповіщення</h1>
      {error && <div className="error">{error}</div>}
      {notifications.length === 0 ? (
  <p className="no-notifications">Немає сповіщень</p>
) : (
  <div className="notifications-list">
    {notifications.map((notification) => {
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

    </div>
  );
};

export default NotificationsPage;
