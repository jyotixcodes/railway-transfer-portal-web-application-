import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    employeeId: '', pfNumber: '', name: '', email: '',
    password: '', designation: '', department: '',
    currentZone: '', currentStation: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/api/auth/register', form);
      setSuccess('Registration successful! Await admin verification. Redirecting to login...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>🚂 Railway Transfer Portal</h1>
          <p style={styles.subtitle}>Create your account</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Employee ID</label>
              <input style={styles.input} name="employeeId"
                placeholder="e.g. RLY12345" value={form.employeeId}
                onChange={handleChange} required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>PF Number</label>
              <input style={styles.input} name="pfNumber"
                placeholder="e.g. PF98765" value={form.pfNumber}
                onChange={handleChange} required />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <input style={styles.input} name="name"
              placeholder="Enter your full name" value={form.name}
              onChange={handleChange} required />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <input style={styles.input} type="email" name="email"
              placeholder="Enter your email" value={form.email}
              onChange={handleChange} required />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} type="password" name="password"
              placeholder="Create a password" value={form.password}
              onChange={handleChange} required />
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Designation</label>
              <input style={styles.input} name="designation"
                placeholder="e.g. Station Master" value={form.designation}
                onChange={handleChange} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Department</label>
              <input style={styles.input} name="department"
                placeholder="e.g. Operations" value={form.department}
                onChange={handleChange} />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Current Zone</label>
              <input style={styles.input} name="currentZone"
                placeholder="e.g. Eastern Railway" value={form.currentZone}
                onChange={handleChange} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Current Station</label>
              <input style={styles.input} name="currentStation"
                placeholder="e.g. Howrah" value={form.currentStation}
                onChange={handleChange} />
            </div>
          </div>

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p style={styles.link}>
          Already have an account?{' '}
          <Link to="/login" style={styles.linkText}>Sign in here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    justifyContent: 'center', padding: '20px',
    background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  },
  card: {
    background: '#fff', borderRadius: '12px', padding: '40px',
    width: '100%', maxWidth: '560px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
  },
  header: { textAlign: 'center', marginBottom: '28px' },
  title: { fontSize: '22px', fontWeight: '700', color: '#1a237e', marginBottom: '6px' },
  subtitle: { color: '#666', fontSize: '14px' },
  error: {
    background: '#ffebee', color: '#c62828', padding: '12px',
    borderRadius: '8px', marginBottom: '16px', fontSize: '14px', textAlign: 'center',
  },
  success: {
    background: '#e8f5e9', color: '#2e7d32', padding: '12px',
    borderRadius: '8px', marginBottom: '16px', fontSize: '14px', textAlign: 'center',
  },
  row: { display: 'flex', gap: '16px' },
  field: { marginBottom: '16px', flex: 1 },
  label: { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#444' },
  input: {
    width: '100%', padding: '10px 14px', border: '1px solid #ddd',
    borderRadius: '8px', fontSize: '14px', outline: 'none',
  },
  button: {
    width: '100%', padding: '14px', background: '#1a237e', color: '#fff',
    border: 'none', borderRadius: '8px', fontSize: '16px',
    fontWeight: '600', cursor: 'pointer', marginTop: '8px',
  },
  link: { textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' },
  linkText: { color: '#1a237e', fontWeight: '600', textDecoration: 'none' },
};