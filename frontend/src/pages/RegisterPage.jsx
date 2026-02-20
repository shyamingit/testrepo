import { useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const RegisterPage = ({ onToggle }) => {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', form);
      login(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <section className="auth glass">
      <h2>Start building</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {error && <p className="error">{error}</p>}
        <button className="btn" type="submit">Register</button>
      </form>
      <button className="link" onClick={onToggle} type="button">Already have account?</button>
    </section>
  );
};

export default RegisterPage;
