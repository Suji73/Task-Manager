const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const { title, dueDate, priority, status } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const task = new Task({
      title,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority,
      status
    });

    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
  try {
    const { title, dueDate, priority, status } = req.body;
    const update = { title, priority, status };
    if (dueDate) update.dueDate = new Date(dueDate);
    else update.dueDate = null;

    const updated = await Task.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const removed = await Task.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
