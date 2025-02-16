import axios from 'axios';


export const loginUser = (formData) => async (dispatch) => {
  try {
    const response = await axios.post('http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/auth/signin', formData);

    if (response.data && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userId', response.data._id);
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });

      return response.data;
    } else {
      throw new Error('Помилка авторизації.');
    }
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.message || 'Помилка авторизації.' });
    throw error;
  }
};


export const fetchUserNotifications = async () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('authToken');

  if (!userId || !token) {
    throw new Error('User is not authenticated');
  }

  try {
    const response = await axios.get(`http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    throw new Error('Failed to fetch notifications');
  }
};

const getAllUsers = async () => {
  try {
      const response = await axios.get("http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/users");
      return response.data;
  } catch (error) {
      console.error("Error retrieving users:", error);
      throw error;
  }
};

const emailExists = (users, email) => {
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
};

export const registerUser = (formData) => async (dispatch) => {
  try {

    const response = await axios.post("http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/auth/signup", formData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: 'REGISTER_FAIL', payload: error.message || error.response.data.message });
    throw error;
  }
};

export const getUserInfo = (userId, token) => async (dispatch) => {
    try {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://ec2-13-60-83-13.eu-north-1.compute.amazonaws.com:3000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_USER_FAIL', payload: error });
    }
  };

export const logout = () => (dispatch) => {
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");

    document.location.href = "/login";
  };