const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// 🔐 Apply auth to all task routes
router.use(authMiddleware);

// ➕ Create a new task
router.post('/', async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      user: req.user.id,
    });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📥 Get filtered/sorted/searched tasks
router.get('/', async (req, res) => {
  try {
    const { status, sort = '-createdAt', q } = req.query;

    const filter = { user: req.user.id };

    if (status) {
      filter.status = status;
    }

    if (q) {
      filter.title = { $regex: q, $options: 'i' };
    }

    const tasks = await Task.find(filter).sort(sort);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update a task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;