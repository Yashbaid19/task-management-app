import { useEffect, useState } from 'react';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import * as taskService from '../services/taskService'; // 💡 Actual service

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError('⚠️ Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (newTask) => {
    try {
      if (editingTask) {
        const updated = await taskService.updateTask(newTask._id, newTask);
        setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      } else {
        const created = await taskService.addTask(newTask);
        setTasks((prev) => [...prev, created]);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Failed to save task.');
    } finally {
      setEditingTask(null);
      setShowForm(false);
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('🗑️ Confirm delete this task?')) return;
    try {
      await taskService.deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error(err);
      alert('❌ Failed to delete task.');
    }
  };

  const handleToggleStatus = async (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    if (!task) return;

    try {
      const updated = await taskService.updateTask(taskId, {
        ...task,
        status: task.status === 'completed' ? 'pending' : 'completed',
      });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } catch (err) {
      console.error(err);
      alert('❌ Failed to update status.');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📋 Your Tasks</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          ➕ Add Task
        </button>
      </div>

      {loading ? (
        <p>⏳ Loading tasks...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : tasks.length === 0 ? (
        <p>No tasks found. Add your first task!</p>
      ) : (
        <div className="row">
          {tasks.map((task) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={task._id}>
              <TaskItem
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default TaskPage;