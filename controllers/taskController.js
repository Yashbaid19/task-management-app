const Task = require('../models/Task');

// 📄 Get all tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error('Fetch tasks error:', err);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

// ➕ Create a task
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newTask = new Task({
      user: req.user.id,
      title,
      description,
      dueDate,
      status: status || 'pending',
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Create task error:', err);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

// ✏️ Update task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const updates = req.body;
    Object.assign(task, updates);

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    console.error('Update task error:', err);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

// ❌ Delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Delete task error