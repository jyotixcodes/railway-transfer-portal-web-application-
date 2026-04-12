import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const role = localStorage.getItem('role');

 useEffect(() => {
    if (role !== 'ADMIN') {
      navigate('/dashboard');
      return;
    }
    fetchData();
  }, [role, navigate]);

  const fetchData = async () => {
    try {
      const [usersRes, transfersRes] = await Promise.all([
        api.get('/api/admin/all-users'),
        api.get('/api/admin/all-transfers'),
      ]);
      setUsers(usersRes.data);
      setTransfers(transfersRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const verifyUser = async (userId) => {
    try {
      const res = await api.put(`/api/admin/verify/${userId}`);
      setMessage(res.data);
      fetchData();
    } catch (err) {
      setMessage('Failed to verify user.');
    }
  };

  const rejectUser = async (userId) => {
    try {
      const res = await api.put(`/api/admin/reject/${userId}`);
      setMessage(res.data);
      fetchData();
    } catch (err) {
      setMessage('Failed to reject user.');
    }
  };

  const approveTransfer = async (requestId) => {
    try {
      const res = await api.put(`/api/admin/approve-transfer/${requestId}`);
      setMessage(res.data);
      fetchData();
    } catch (err) {
      setMessage('Failed to approve transfer.');
    }
  };

  const closeTransfer = async (requestId) => {
    try {
      const res = await api.put(`/api/admin/close-transfer/${requestId}`);
      setMessage(res.data);
      fetchData();
    } catch (err) {
      setMessage('Failed to close transfer.');
    }
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <span style={styles.navTitle}>🚂 Railway Transfer Portal — Admin Panel</span>
        <div style={styles.navLinks}>
          <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
          <button onClick={() => { localStorage.clear(); navigate('/login'); }}
            style={styles.logoutBtn}>Logout</button>
        </div>
      </nav>

      <div style={styles.content}>

        {message && (
          <div style={styles.messageBanner}>
            ✅ {message}
            <button onClick={() => setMessage('')} style={styles.closeMsg}>✕</button>
          </div>
        )}

        {/* Stats Row */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <p style={styles.statNumber}>{users.length}</p>
            <p style={styles.statLabel}>Total Users</p>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statNumber}>
              {users.filter(u => !u.verified).length}
            </p>
            <p style={styles.statLabel}>Pending Verification</p>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statNumber}>{transfers.length}</p>
            <p style={styles.statLabel}>Total Transfers</p>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statNumber}>
              {transfers.filter(t => t.status === 'OPEN').length}
            </p>
            <p style={styles.statLabel}>Open Requests</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={{ ...styles.tab, ...(activeTab === 'users' ? styles.activeTab : {}) }}
            onClick={() => setActiveTab('users')}>
            Users ({users.length})
          </button>
          <button
            style={{ ...styles.tab, ...(activeTab === 'transfers' ? styles.activeTab : {}) }}
            onClick={() => setActiveTab('transfers')}>
            Transfer Requests ({transfers.length})
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div style={styles.tableCard}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Employee ID</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Zone / Station</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} style={styles.tableRow}>
                    <td style={styles.td}>{user.id}</td>
                    <td style={styles.td}>{user.name}</td>
                    <td style={styles.td}>{user.employeeId}</td>
                    <td style={styles.td}>{user.email}</td>
                    <td style={styles.td}>
                      {user.currentZone}<br />
                      <span style={styles.small}>{user.currentStation}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.roleBadge,
                        background: user.role === 'ADMIN' ? '#f3e5f5' : '#e3f2fd',
                        color: user.role === 'ADMIN' ? '#6a1b9a' : '#1565c0',
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.statusBadge,
                        background: user.verified ? '#e8f5e9' : '#fff8e1',
                        color: user.verified ? '#2e7d32' : '#f57f17',
                      }}>
                        {user.verified ? '✅ Verified' : '⏳ Pending'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {user.role !== 'ADMIN' && (
                        <div style={styles.actionBtns}>
                          {!user.verified ? (
                            <button style={styles.verifyBtn}
                              onClick={() => verifyUser(user.id)}>
                              Verify
                            </button>
                          ) : (
                            <button style={styles.rejectBtn}
                              onClick={() => rejectUser(user.id)}>
                              Revoke
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Transfers Tab */}
        {activeTab === 'transfers' && (
          <div style={styles.tableCard}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Employee</th>
                  <th style={styles.th}>From</th>
                  <th style={styles.th}>Wants to Go</th>
                  <th style={styles.th}>Reason</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map(t => (
                  <tr key={t.id} style={styles.tableRow}>
                    <td style={styles.td}>{t.id}</td>
                    <td style={styles.td}>
                      {t.user?.name}<br />
                      <span style={styles.small}>{t.user?.employeeId}</span>
                    </td>
                    <td style={styles.td}>
                      {t.user?.currentZone}<br />
                      <span style={styles.small}>{t.user?.currentStation}</span>
                    </td>
                    <td style={styles.td}>
                      {t.desiredZone}<br />
                      <span style={styles.small}>{t.desiredStation}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.reason}>{t.reason || '—'}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.statusBadge,
                        background:
                          t.status === 'OPEN' ? '#e3f2fd' :
                          t.status === 'APPROVED' ? '#e8f5e9' :
                          t.status === 'CLOSED' ? '#ffebee' : '#f3e5f5',
                        color:
                          t.status === 'OPEN' ? '#1565c0' :
                          t.status === 'APPROVED' ? '#2e7d32' :
                          t.status === 'CLOSED' ? '#c62828' : '#6a1b9a',
                      }}>
                        {t.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionBtns}>
                        {t.status === 'OPEN' && (
                          <button style={styles.verifyBtn}
                            onClick={() => approveTransfer(t.id)}>
                            Approve
                          </button>
                        )}
                        {t.status !== 'CLOSED' && (
                          <button style={styles.rejectBtn}
                            onClick={() => closeTransfer(t.id)}>
                            Close
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f0f4f8' },
  loading: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' },
  navbar: {
    background: '#1a237e', padding: '16px 32px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  navTitle: { color: '#fff', fontSize: '16px', fontWeight: '700' },
  navLinks: { display: 'flex', alignItems: 'center', gap: '20px' },
  navLink: { color: '#fff', textDecoration: 'none', fontSize: '14px' },
  logoutBtn: {
    background: 'transparent', border: '1px solid #fff',
    color: '#fff', padding: '6px 16px', borderRadius: '6px',
    cursor: 'pointer', fontSize: '14px',
  },
  content: { padding: '32px' },
  messageBanner: {
    background: '#e8f5e9', color: '#2e7d32', padding: '12px 20px',
    borderRadius: '8px', marginBottom: '20px', fontSize: '14px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  closeMsg: { background: 'none', border: 'none', cursor: 'pointer', color: '#2e7d32', fontSize: '16px' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' },
  statCard: {
    background: '#fff', borderRadius: '12px', padding: '20px',
    textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  statNumber: { fontSize: '32px', fontWeight: '700', color: '#1a237e' },
  statLabel: { fontSize: '13px', color: '#888', marginTop: '4px' },
  tabs: { display: 'flex', gap: '8px', marginBottom: '16px' },
  tab: {
    padding: '10px 24px', border: '1px solid #ddd', borderRadius: '8px',
    background: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: '500',
  },
  activeTab: { background: '#1a237e', color: '#fff', border: '1px solid #1a237e' },
  tableCard: {
    background: '#fff', borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'auto',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { background: '#f8f9fa' },
  th: {
    padding: '14px 16px', textAlign: 'left', fontSize: '13px',
    fontWeight: '600', color: '#555', borderBottom: '1px solid #eee',
  },
  tableRow: { borderBottom: '1px solid #f0f0f0' },
  td: { padding: '14px 16px', fontSize: '14px', color: '#333', verticalAlign: 'middle' },
  small: { fontSize: '12px', color: '#888' },
  roleBadge: { padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' },
  statusBadge: { padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' },
  actionBtns: { display: 'flex', gap: '8px' },
  verifyBtn: {
    padding: '6px 14px', background: '#e8f5e9', color: '#2e7d32',
    border: '1px solid #a5d6a7', borderRadius: '6px', cursor: 'pointer', fontSize: '13px',
  },
  rejectBtn: {
    padding: '6px 14px', background: '#ffebee', color: '#c62828',
    border: '1px solid #ef9a9a', borderRadius: '6px', cursor: 'pointer', fontSize: '13px',
  },
  reason: { fontSize: '12px', color: '#666', fontStyle: 'italic' },
};