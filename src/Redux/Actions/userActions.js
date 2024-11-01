
import axios from "axios";

const getAllUsers = async () => {
  try {
      const response = await axios.get("http://ec2-13-61-7-222.compute-1.amazonaws.com/users");
      return response.data; //return users data
  } catch (error) {
      console.error("Error retrieving users:", error);
      throw error;
  }
};

//check if email exists
const emailExists = (users, email) => {
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
};

export const registerUser = (formData) => async (dispatch) => {
  try {
   /* const users = await getAllUsers();
    if (emailExists(users, formData.email)) {
      throw new Error("Email already exists. Please use a different email.");
    }*/

    const response = await axios.post("http://ec2-13-61-7-222.compute-1.amazonaws.com/auth/signup", formData);
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
      const response = await axios.get(`http://ec2-13-61-7-222.compute-1.amazonaws.com/users/${userId}`, {
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