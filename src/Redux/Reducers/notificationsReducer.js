const initialState = {
    notifications: [],
    unreadCount: 0,
    error: null,
  };
  
  const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_NOTIFICATIONS_SUCCESS":
        return {
          ...state,
          notifications: action.payload,
          unreadCount: action.payload.filter((n) => !n.read).length,
          error: null,
        };
  
      case "FETCH_NOTIFICATIONS_FAIL":
        return { ...state, error: action.payload };
  
      case "MARK_NOTIFICATION_READ":
        return {
          ...state,
          notifications: state.notifications.map((n) =>
            n._id === action.payload ? { ...n, read: true } : n
          ),
          unreadCount: state.notifications.filter((n) => !n.read).length - 1,
        };
  
      default:
        return state;
    }
  };
  
  export default notificationReducer;
  