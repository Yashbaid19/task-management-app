// src/services/axiosClient.js
import axios from 'axios';
import { logoutUser } from './authService';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000, // optional: fail after 10s to avoid hanging
});

// Add token to Authorization header before every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 Unauthorized and redirect to login
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      logoutUser();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;