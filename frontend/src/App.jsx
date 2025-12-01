import React, { useEffect, useState } from 'react';
import AddTaskForm from './components/AddtaskForm';
import TaskList from './components/TaskList';
import EditTaskModal from './components/EditTaskModal';
import API from './api/axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (task) => {
    try {
      const res = await API.post('/tasks', task);
      setTasks(prev => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
      alert('Failed to add task');
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    if (!window.confirm('Delete this task?')) return;

    try {
      await API.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete task');
    }
  };

  // Update task (called from modal)
  const updateTask = async (updatedTask) => {
    try {
      const id = updatedTask._id;

      const res = await API.put(`/tasks/${id}`, updatedTask);

      // Update UI
      setTasks(prev =>
        prev.map(t => (t._id === id ? res.data : t))
      );

      setEditingTask(null); // Close modal

    } catch (err) {
      console.error(err);
      alert('Failed to update task');
    }
  };

  return (
    <div className="container mt-4">
      <h1>Task Manager App</h1>

      {/* Add Task */}
      <AddTaskForm onAdd={addTask} />

      <hr />

      {/* Display Tasks */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onEdit={(task) => setEditingTask(task)}
          onDelete={deleteTask}
        />
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={updateTask}
        />
      )}
    </div>
  );
}

export default App;
