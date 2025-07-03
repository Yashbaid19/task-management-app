// src/services/taskService.js
import api from './axiosClient'; // centralized axios instance

const API_URL = '/tasks';

export const getTasks = () =>
  api.get(API_URL).then((res) => res.data);

export const addTask = (taskData) =>
  api.post(API_URL, taskData).then((res) => res.data);

export const updateTask = (taskId, taskData) =>
  api.put(`${API_URL}/${taskId}`, taskData).then((res) => res.data);

export const deleteTask = (taskId) =>
  api.delete(`${API_URL}/${taskId}`).then((res) => res.data);