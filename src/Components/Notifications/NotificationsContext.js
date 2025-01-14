import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchUserNotifications } from '../../Redux/Actions/userActions';

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState(null);

  const fetchNotifications = useCallback(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');

    if (userId && token) {
      fetchUserNotifications(userId, token)
        .then((fetchedNotifications) => {
          setNotifications(fetchedNotifications);
          const unread = fetchedNotifications.filter((n) => !n.read).length;
          setUnreadCount(unread);
        })
        .catch(() => {
          setError('Failed to fetch notifications.');
        });
    }
  }, []);

  useEffect(() => {
    fetchNotifications();

    const eventSource = new EventSource(
      'http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com/notifications/stream'
    );

    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prev) => {
        const updated = [newNotification, ...prev];
        setUnreadCount(updated.filter((n) => !n.read).length);
        return updated;
      });
    };


    return () => {
      eventSource.close();
    };
  }, [fetchNotifications]);

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, error }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);