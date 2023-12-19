import axios from "axios";

const API_URL = "http://ec2-34-239-91-8.compute-1.amazonaws.com/auth/";


const register = async (formData) => {
  try {
    const response = await axios.post(API_URL + "signup", formData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const login = async (formData) => {
  try {

  const response = await axios.post(API_URL + "signin", formData);
  return response.data;
} catch (error) {
  console.error(error);
  throw error;
}
};

const logout = async (formData) => {

  localStorage.removeItem('authToken');
  localStorage.removeItem('userId');
};

export default {
  register,
  login,
  logout
};



