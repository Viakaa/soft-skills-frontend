
import axios from "axios";

export const registerUser = (formData) => async (dispatch) => {
    try {
      const response = await axios.post("http://ec2-34-239-91-8.compute-1.amazonaws.com/auth/signup", formData);
      dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: 'REGISTER_FAIL', payload: error });
      throw error;
    }
};

export const getUserInfo = (userId, token) => async (dispatch) => {
    try {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://ec2-34-239-91-8.compute-1.amazonaws.com/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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