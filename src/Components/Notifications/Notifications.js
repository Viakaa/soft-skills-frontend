import React, { useEffect, useState, useCallback } from 'react';
import './Notifications.css'; 
import HistoryIcon from '../../Assets/Images/history.png'

const NotificationSidebar = ({ isVisible, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  const exampleNotifications = [
    { sender: 'John Doe', theme: 'New Update', time: '14:30', date: '12/17/24', content: 'We just released a new version of the application.' },
    { sender: 'Jane Smith', theme: 'Meeting Reminder', time: '09:00', date: '12/17/24', content: 'Don\'t forget about the team meeting at 10 AM.' },
    { sender: 'Admin', theme: 'System Maintenance', time: '22:00', date: '12/16/24', content: 'Scheduled maintenance will occur tonight from 11 PM to 2 AM.' },
  ];

  const scrollToBottom = useCallback(() => {
    const list = document.getElementById('notification-list');
    if (list) list.scrollTop = list.scrollHeight;
  }, []);

  useEffect(() => {
    const eventSource = new EventSource('http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com/notifications/stream');

    eventSource.addEventListener('message', (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prev) => [...prev, newNotification]);
      scrollToBottom();
    });

    eventSource.onerror = () => {
      setError('Failed to connect to the notifications service.');
      eventSource.close();
    };

    return () => eventSource.close();
  }, [scrollToBottom]);

  return (
    <div className={`notification-sidebar ${isVisible ? 'visible' : ''}`}>
      <div className='notification-page'>
        <img src={HistoryIcon}/>
        </div>
      <div className="close-btn" onClick={onClose}>×</div>
      <h3>Notifications</h3>
      <div className='viewAll'>
        View all
      </div>
      {error && <div className="error">{error}</div>}
      {notifications.length === 0 && exampleNotifications.length > 0 ? (
        <ul id="notification-list" className="list">
          {exampleNotifications.map((notification, index) => (
            <li key={index} className="item-notification">
              <div className="notification-header">
                <span>{notification.sender}</span>
                <div className='date-time'>
                <span className="date">{`${notification.date}`}</span>
                <span className='time'>{`${notification.time}`}</span>
                </div>              
                </div>
              <div className="theme">{notification.theme}</div>
              <div className="content">{notification.content}</div>
            </li>
          ))}
        </ul>
      ) : notifications.length > 0 ? (
        <ul id="notification-list" className="list">
          {notifications.map((notification, index) => (
            <li key={index} className="item">
              {JSON.stringify(notification)}
            </li>
          ))}
        </ul>
      ) : (
        <div className="noNotifications">No notifications</div>
      )}
    </div>
  );
};

export default NotificationSidebar;
