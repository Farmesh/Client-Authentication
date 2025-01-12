import axios from 'axios';

const API_URL = 'http://localhost:8080'; 

const getAuthHeaders = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return {
    Authorization: `Bearer ${user?.token}`,
  };
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user", error);
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, userData);
    if (response.data.token) {
      sessionStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error("Error logging in", error);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logout = () => {
  sessionStorage.clear();
};

export const editProfile = async (userData) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(`${API_URL}/api/user/profile`, userData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error editing profile", error);
    throw error;
  }
};

export const changePassword = async (passwordData) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(`${API_URL}/api/user/change-password`, passwordData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error changing password", error);
    throw error;
  }
};

// Axios Interceptor for Token Expiry Handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);
