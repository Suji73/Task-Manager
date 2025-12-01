import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (isNaN(d)) return '-';
  return d.toISOString().split('T')[0];
}

// Small helper for colored badges
function PriorityBadge({ priority }) {
  const colors = {
    Low: "success",
    Medium: "warning",
    High: "danger"
  };
  return (
    <span className={`badge bg-${colors[priority] || "secondary"}`}>
      {priority}
    </span>
  );
}

function StatusBadge({ status }) {
  const colors = {
    "Pending": "secondary",
    "In Progress": "info",
    "Completed": "success"
  };
  return (
    <span className={`badge bg-${colors[status] || "dark"}`}>
      {status}
    </span>
  );
}

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks || tasks.length === 0)
    return <p className="text-muted">No tasks found.</p>;

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h4 className="card-title mb-3">All Tasks</h4>

        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created At</th>
              <th style={{ width: "140px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map(task => (
              <tr key={task._id}>
                <td>{task.title}</td>

                <td>{formatDate(task.dueDate)}</td>

                {/* Priority with colored badge */}
                <td>
                  <PriorityBadge priority={task.priority} />
                </td>

                {/* Status with colored badge */}
                <td>
                  <StatusBadge status={task.status} />
                </td>

                <td>{formatDate(task.createdAt)}</td>

                <td>
                  <button
                    onClick={() => {
                      onEdit(task);
                    }}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(task._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
