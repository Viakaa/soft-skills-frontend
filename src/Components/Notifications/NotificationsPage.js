  import React, { memo, useState, useEffect } from 'react';
  import './NotificationsPage.css';
  import { useNotifications } from './NotificationsContext';
  import axios from 'axios';

  const NotificationsPage = () => {
    const { notifications, error, deleteNotification } = useNotifications();
    const [users, setUsers] = useState({});

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const fetchUserWithRetry = async (userId, retries = 5, delayTime = 1000) => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error("No token found!");
          return;
        }
    
        const response = await axios.get(`http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched User:', response.data);
        return response.data;
      } catch (error) {
        if (retries > 0 && error.response?.status === 429) {
          const retryAfter = parseInt(error.response.headers['Retry-After'] || delayTime / 1000);
          console.log(`Rate limited. Retrying in ${retryAfter} seconds...`);
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000)); 
          return fetchUserWithRetry(userId, retries - 1, delayTime * 2); 
        } else {
          console.error("Error fetching user:", error);
        }
      }
    };
    

    useEffect(() => {
      const fetchAllUsers = async () => {
        const userIds = notifications.map((notification) => notification.ownerId);
        const uniqueUserIds = [...new Set(userIds)];

        const userPromises = uniqueUserIds.map(async (id, index) => {
          await delay(500);  
          return fetchUserWithRetry(id);
        });

        const userResults = await Promise.all(userPromises);

        const usersMap = userResults.reduce((acc, user) => {
          if (user) acc[user._id] = user;
          return acc;
        }, {});

        setUsers(usersMap);
      };

      if (notifications.length > 0) {
        fetchAllUsers();
      }
    }, [notifications]);

    return (
      <div className="notifications-page">
        <h1>Notifications</h1>
        {error && <div className="error">{error}</div>}
        {notifications.length === 0 ? (
          <p className="no-notifications">No notifications</p>
        ) : (
          <div id="notification-list" className="notifications-list">
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
                    <p>
                      {notification.meta?.description || 'No description available'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  export default memo(NotificationsPage);
