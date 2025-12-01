import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const initial = { title: '', dueDate: '', priority: 'Low', status: 'Pending' };

export default function AddTaskForm({ onAdd }) {
  const [form, setForm] = useState(initial);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert('Title is required');

    onAdd({
      title: form.title,
      dueDate: form.dueDate || null,
      priority: form.priority,
      status: form.status
    });

    setForm(initial);
  };

  return (
    <div className="card shadow-sm p-4 mt-3">
      <h4 className="mb-3">Add New Task</h4>

      <form onSubmit={handleSubmit}>

        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter task name"
          />
        </div>

        {/* Due Date */}
        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            name="dueDate"
            className="form-control"
            value={form.dueDate}
            onChange={handleChange}
          />
        </div>

        {/* Priority */}
        <div className="mb-3">
          <label className="form-label">Priority</label>
          <select
            name="priority"
            className="form-select"
            value={form.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select"
            value={form.status}
            onChange={handleChange}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Button */}
        <button type="submit" className="btn btn-primary w-100">
          Add Task
        </button>
      </form>
    </div>
  );
}
