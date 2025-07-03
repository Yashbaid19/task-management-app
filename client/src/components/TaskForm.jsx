import { useEffect, useState } from 'react';

const TaskForm = ({ task = {}, onSave, onCancel }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending',
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '', // format for input[type="date"]
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!form.title.trim()) {
    alert("❗ Title is required.");
    return;
  }

  const updatedTask = {
    ...task,
    title: form.title.trim(),
    description: form.description.trim(),
    status: form.status,
    dueDate: form.dueDate || undefined,
  };

  onSave(updatedTask);
};


  return (
    <div className="card shadow p-4 mb-4">
      <h5 className="mb-3">{task._id ? '✏️ Edit Task' : '➕ New Task'}</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="form-control mb-2"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          className="form-control mb-2"
          placeholder="Description (optional)"
          rows="3"
          value={form.description}
          onChange={handleChange}
        />

        <div className="row mb-2">
          <div className="col-md-6 mb-2">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-select"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="col-md-6 mb-2">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              name="dueDate"
              className="form-control"
              value={form.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button type="submit" className="btn btn-primary">
            💾 Save
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;