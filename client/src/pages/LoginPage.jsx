import { useState } from 'react';
import { loginUser } from '../services/authService';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await loginUser(form);
      toast.success('🎉 Login successful!');

      const redirectTo = location.state?.from?.pathname || '/tasks';
      navigate(redirectTo);
    } catch (err) {
      setError('Invalid email or password');
      toast.error('❌ Login failed');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="mb-3">🔐 Login</h3>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

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

        <button className="btn btn-primary w-100">Login</button>
      </form>

      <p className="mt-3 text-center">
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;