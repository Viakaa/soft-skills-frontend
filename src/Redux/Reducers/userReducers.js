const initialState = {
  userData: null,
  userInfo: null,
  error: null,
  isAuthenticated: false, 
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
      return { ...state, userData: action.payload, error: null };
    case 'REGISTER_FAIL':
      return { ...state, error: action.payload };
    case 'FETCH_USER_SUCCESS':
      return { ...state, userInfo: action.payload, error: null };
    case 'FETCH_USER_FAIL':
      return { ...state, error: action.payload };
      
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        userData: action.payload, 
        isAuthenticated: true, 
        error: null 
      };
    case 'LOGIN_FAIL':
      return { 
        ...state, 
        error: action.payload,
        isAuthenticated: false 
      };
      
    case 'LOGOUT':
      return { 
        ...state, 
        userData: null,
        userInfo: null,
        isAuthenticated: false,
        error: null 
      };
      
    default:
      return state;
  }
};

export default authReducer;
