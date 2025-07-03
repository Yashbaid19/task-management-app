import { useState } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      await registerUser(form);
      toast.success('🎉 Account created successfully!');
      navigate('/tasks');
    } catch (err) {
      setError('Registration failed. Email might already be registered.');
      toast.error('❌ Registration failed');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3 className="mb-3">🧾 Register</h3>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <input
          type="text"
          placeholder="Name"
          className="form-control mb-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="btn btn-success w-100">Sign Up</button>
      </form>

      <p className="mt-3 text-center">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;