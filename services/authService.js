import axios from 'axios';

// Define the base URL for your backend API
const API_URL = "http://localhost:3001/api/auth";

// Register User
const register = async (name, email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      role,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);  // Save token to localStorage
    }
    return response.data; // Return the response from the API (success message and token)
  } catch (error) {
    console.error("Registration failed", error);
    throw error;
  }
};

// Login User
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);  // Save token to localStorage
    }
    return response.data; // Return the response from the API (success message and token)
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

// Logout User
const logout = () => {
  localStorage.removeItem("token");
};

export default {
  register,
  login,
  logout,
};
