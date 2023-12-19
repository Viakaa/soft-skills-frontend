const initialState = {
    userData: null,
    userInfo: null, 
    error: null,
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
      default:
        return state;
    }
  };
  
  export default authReducer;
  