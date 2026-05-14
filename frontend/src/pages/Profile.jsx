import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    name: '', designation: '', department: '',
    currentZone: '', currentStation: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const zones = [
    'Central Railway', 'Eastern Railway', 'Northern Railway',
    'North Eastern Railway', 'Northeast Frontier Railway',
    'Southern Railway', 'South Central Railway', 'South Eastern Railway',
    'Western Railway', 'North Western Railway', 'South Western Railway',
    'East Central Railway', 'East Coast Railway', 'North Central Railway',
    'South East Central Railway', 'West Central Railway',
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/api/user/profile');
      setProfile(res.data);
      setForm({
        name: res.data.name || '',
        designation: res.data.designation || '',
        department: res.data.department || '',
        currentZone: res.data.currentZone || '',
        currentStation: res.data.currentStation || '',
      });
    } catch (err) {
      setError('Failed to load profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess('');
    setError('');
    try {
      await api.put('/api/user/profile', form);
      setSuccess('Profile updated successfully!');
      // Update name in localStorage
      localStorage.setItem('name', form.name);
      fetchProfile();
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <span style={styles.navTitle}>🚂 Railway Transfer Portal</span>
        <div style={styles.navLinks}>
  <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
  <Link to="/post-transfer" style={styles.navLink}>Post Transfer</Link>
  <Link to="/search" style={styles.navLink}>Search</Link>
  <button onClick={() => {
    localStorage.clear();
    navigate('/login');
  }} style={styles.logoutBtn}>Logout</button>
</div>
      </nav>

      <div style={styles.content}>

        {/* Profile Info Card */}
        <div style={styles.infoCard}>
          <div style={styles.avatarCircle}>
            {profile?.name?.charAt(0).toUpperCase()}
          </div>
          <div style={styles.infoDetails}>
            <h2 style={styles.profileName}>{profile?.name}</h2>
            <p style={styles.profileMeta}>
              {profile?.designation} — {profile?.department}
            </p>
            <div style={styles.badgeRow}>
              <span style={styles.employeeBadge}>
                🪪 {profile?.employeeId}
              </span>
              <span style={styles.pfBadge}>
                📋 PF: {profile?.pfNumber}
              </span>
              <span style={{
                ...styles.verifiedBadge,
                background: profile?.verified ? '#e8f5e9' : '#fff8e1',
                color: profile?.verified ? '#2e7d32' : '#f57f17',
              }}>
                {profile?.verified ? '✅ Verified' : '⏳ Pending Verification'}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Form Card */}
        <div style={styles.formCard}>
          <h3 style={styles.formTitle}>Edit Profile</h3>
          <p style={styles.formSubtitle}>
            Note: Employee ID and PF Number cannot be changed.
          </p>

          {success && <div style={styles.success}>{success}</div>}
          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <input style={styles.input} name="name"
                value={form.name} onChange={handleChange}
                placeholder="Enter your full name" />
            </div>

            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Designation</label>
                <input style={styles.input} name="designation"
                  value={form.designation} onChange={handleChange}
                  placeholder="e.g. Station Master" />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Department</label>
                <input style={styles.input} name="department"
                  value={form.department} onChange={handleChange}
                  placeholder="e.g. Operations" />
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Current Zone</label>
                <select style={styles.input} name="currentZone"
                  value={form.currentZone} onChange={handleChange}>
                  <option value="">Select Zone</option>
                  {zones.map(z => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Current Station</label>
                <input style={styles.input} name="currentStation"
                  value={form.currentStation} onChange={handleChange}
                  placeholder="e.g. Howrah" />
              </div>
            </div>

            {/* Read-only fields */}
            <div style={styles.readOnlySection}>
              <h4 style={styles.readOnlyTitle}>Non-editable Information</h4>
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Employee ID</label>
                  <input style={styles.readOnlyInput}
                    value={profile?.employeeId || ''} disabled />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>PF Number</label>
                  <input style={styles.readOnlyInput}
                    value={profile?.pfNumber || ''} disabled />
                </div>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Email Address</label>
                <input style={styles.readOnlyInput}
                  value={profile?.email || ''} disabled />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Account Role</label>
                <input style={styles.readOnlyInput}
                  value={profile?.role || ''} disabled />
              </div>
            </div>

            <button style={styles.button} type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f0f4f8' },
  loading: {
    display: 'flex', justifyContent: 'center',
    alignItems: 'center', height: '100vh', fontSize: '18px',
  },
  navbar: {
    background: '#1a237e', padding: '16px 32px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  navTitle: { color: '#fff', fontSize: '18px', fontWeight: '700' },
  navLinks: { display: 'flex', alignItems: 'center', gap: '24px' },
  navLink: { color: '#fff', textDecoration: 'none', fontSize: '14px' },
  logoutBtn: {
    background: 'transparent', border: '1px solid #fff',
    color: '#fff', padding: '6px 16px', borderRadius: '6px',
    cursor: 'pointer', fontSize: '14px',
  },
  content: { padding: '32px', maxWidth: '760px', margin: '0 auto' },
  infoCard: {
    background: '#fff', borderRadius: '12px', padding: '28px',
    marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    display: 'flex', alignItems: 'center', gap: '24px',
  },
  avatarCircle: {
    width: '72px', height: '72px', borderRadius: '50%',
    background: '#1a237e', color: '#fff', fontSize: '28px',
    fontWeight: '700', display: 'flex', alignItems: 'center',
    justifyContent: 'center', flexShrink: 0,
  },
  infoDetails: { flex: 1 },
  profileName: { fontSize: '22px', fontWeight: '700', color: '#1a237e', marginBottom: '4px' },
  profileMeta: { fontSize: '14px', color: '#666', marginBottom: '12px' },
  badgeRow: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  employeeBadge: {
    background: '#e3f2fd', color: '#1565c0', padding: '4px 12px',
    borderRadius: '12px', fontSize: '13px', fontWeight: '600',
  },
  pfBadge: {
    background: '#f3e5f5', color: '#6a1b9a', padding: '4px 12px',
    borderRadius: '12px', fontSize: '13px', fontWeight: '600',
  },
  verifiedBadge: {
    padding: '4px 12px', borderRadius: '12px',
    fontSize: '13px', fontWeight: '600',
  },
  formCard: {
    background: '#fff', borderRadius: '12px', padding: '32px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  formTitle: { fontSize: '18px', fontWeight: '700', color: '#1a237e', marginBottom: '6px' },
  formSubtitle: { fontSize: '13px', color: '#999', marginBottom: '24px' },
  success: {
    background: '#e8f5e9', color: '#2e7d32', padding: '12px',
    borderRadius: '8px', marginBottom: '16px', fontSize: '14px',
  },
  error: {
    background: '#ffebee', color: '#c62828', padding: '12px',
    borderRadius: '8px', marginBottom: '16px', fontSize: '14px',
  },
  row: { display: 'flex', gap: '16px' },
  field: { marginBottom: '20px', flex: 1 },
  label: {
    display: 'block', marginBottom: '6px',
    fontSize: '13px', fontWeight: '600', color: '#444',
  },
  input: {
    width: '100%', padding: '10px 14px', border: '1px solid #ddd',
    borderRadius: '8px', fontSize: '14px', outline: 'none',
  },
  readOnlySection: {
    background: '#f8f9fa', borderRadius: '8px',
    padding: '20px', marginBottom: '20px',
  },
  readOnlyTitle: {
    fontSize: '13px', fontWeight: '600', color: '#888',
    marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px',
  },
  readOnlyInput: {
    width: '100%', padding: '10px 14px', border: '1px solid #eee',
    borderRadius: '8px', fontSize: '14px', background: '#eee',
    color: '#888', cursor: 'not-allowed',
  },
  button: {
    width: '100%', padding: '14px', background: '#1a237e',
    color: '#fff', border: 'none', borderRadius: '8px',
    fontSize: '16px', fontWeight: '600', cursor: 'pointer',
  },
};