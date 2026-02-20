import { useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ onToggle }) => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      login(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className="auth glass">
      <h2>Welcome back</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="error">{error}</p>}
        <button className="btn" type="submit">Login</button>
      </form>
      <button className="link" onClick={onToggle} type="button">Create account</button>
    </section>
  );
};

export default LoginPage;
