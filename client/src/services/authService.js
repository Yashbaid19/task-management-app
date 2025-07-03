import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const API_URL = '/api/users'; // Adjust to match your backend route

export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  const { token } = res.data;
  if (token) localStorage.setItem('token', token);
  return res.data;
};

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token); // Example: { id, name, role, ... }
  } catch {
    return null;
  }
};

export const loginUser = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  const { token } = res.data;
  if (token) localStorage.setItem('token', token);
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};

export const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};

export const getToken = () => localStorage.getItem('token');