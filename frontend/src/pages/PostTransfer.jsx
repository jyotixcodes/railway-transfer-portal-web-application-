import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function PostTransfer() {
  const [form, setForm] = useState({
    desiredZone: '', desiredStation: '', reason: ''
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
      await api.post('/api/transfer/post', form);
      setSuccess('Transfer request posted successfully!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data || 'Failed to post request. Make sure your account is verified.');
    } finally {
      setLoading(false);
    }
  };

  const zones = [
    'Central Railway', 'Eastern Railway', 'Northern Railway',
    'North Eastern Railway', 'Northeast Frontier Railway',
    'Southern Railway', 'South Central Railway', 'South Eastern Railway',
    'Western Railway', 'North Western Railway', 'South Western Railway',
    'East Central Railway', 'East Coast Railway', 'North Central Railway',
    'South East Central Railway', 'West Central Railway',
  ];

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <span style={styles.navTitle}>🚂 Railway Transfer Portal</span>
        <Link to="/dashboard" style={styles.backLink}>← Back to Dashboard</Link>
      </nav>

      <div style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.title}>Post Transfer Request</h2>
          <p style={styles.subtitle}>Fill in the details of your desired transfer location</p>

          {error && <div style={styles.error}>{error}</div>}
          {success && <div style={styles.success}>{success}</div>}

          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <label style={styles.label}>Desired Zone</label>
              <select style={styles.input} name="desiredZone"
                value={form.desiredZone} onChange={handleChange} required>
                <option value="">Select a zone</option>
                {zones.map(z => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Desired Station</label>
              <input style={styles.input} name="desiredStation"
                placeholder="e.g. Mumbai Central" value={form.desiredStation}
                onChange={handleChange} required />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Reason for Transfer</label>
              <textarea style={styles.textarea} name="reason"
                placeholder="Briefly explain your reason for transfer..."
                value={form.reason} onChange={handleChange} rows={4} />
            </div>

            <button style={styles.button} type="submit" disabled={loading}>
              {loading ? 'Posting...' : 'Post Transfer Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f0f4f8' },
  navbar: {
    background: '#1a237e', padding: '16px 32px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  navTitle: { color: '#fff', fontSize: '18px', fontWeight: '700' },
  backLink: { color: '#fff', textDecoration: 'none', fontSize: '14px' },
  content: { padding: '32px', display: 'flex', justifyContent: 'center' },
  card: {
    background: '#fff', borderRadius: '12px', padding: '40px',
    width: '100%', maxWidth: '560px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  title: { fontSize: '22px', fontWeight: '700', color: '#1a237e', marginBottom: '8px' },
  subtitle: { color: '#666', fontSize: '14px', marginBottom: '28px' },
  error: {
    background: '#ffebee', color: '#c62828', padding: '12px',
    borderRadius: '8px', marginBottom: '16px', fontSize: '14px',
  },
  success: {
    background: '#e8f5e9', color: '#2e7d32', padding: '12px',
    borderRadius: '8px', marginBottom: '16px', fontSize: '14px',
  },
  field: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: '#444' },
  input: {
    width: '100%', padding: '12px 14px', border: '1px solid #ddd',
    borderRadius: '8px', fontSize: '14px', outline: 'none',
  },
  textarea: {
    width: '100%', padding: '12px 14px', border: '1px solid #ddd',
    borderRadius: '8px', fontSize: '14px', outline: 'none', resize: 'vertical',
  },
  button: {
    width: '100%', padding: '14px', background: '#1a237e', color: '#fff',
    border: 'none', borderRadius: '8px', fontSize: '16px',
    fontWeight: '600', cursor: 'pointer',
  },
};