const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const badgeColor = {
    pending: 'secondary',
    inprogress: 'info',
    completed: 'success',
  }[task.status] || 'dark';

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{task.title}</h5>
          {task.description && (
            <p className="card-text text-muted">
              {task.description.length > 100
                ? task.description.slice(0, 100) + '...'
                : task.description}
            </p>
          )}
{task.dueDate && (
  <p className="text-muted small mt-2">
    📅 Due: {new Date(task.dueDate).toLocaleDateString()}
  </p>
)}
          <span className={`badge bg-${badgeColor}`}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
        </div>

        <div className="mt-3 d-flex justify-content-end gap-2">
          <button onClick={() => onEdit(task)} className="btn btn-sm btn-outline-primary">
            ✏️ Edit
          </button>
          <button onClick={() => onToggleStatus(task._id)} className="btn btn-sm btn-outline-success">
            ✅ {task.status === 'completed' ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => onDelete(task._id)} className="btn btn-sm btn-outline-danger">
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;