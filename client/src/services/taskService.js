// src/services/taskService.js
import axios from 'axios';

const token = localStorage.getItem('token');
const API_URL = '/api/tasks'; // Proxy handles base path

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getTasks = () =>
  axios.get('/api/tasks', config).then(res => res.data);

export const addTask = (taskData) =>
  axios.post('/api/tasks', taskData, config).then(res => res.data);

export const updateTask = (taskId, taskData) =>
  axios.put(`/api/tasks/${taskId}`, taskData, config).then(res => res.data);

export const deleteTask = (taskId) =>
  axios.delete(`/api/tasks/${taskId}`, config).then(res => res.data);