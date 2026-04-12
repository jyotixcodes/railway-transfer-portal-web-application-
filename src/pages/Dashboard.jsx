import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Dashboard() {
  const [myRequests, setMyRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');
  const verified = localStorage.getItem('verified') === 'true';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [reqRes, notifRes, countRes] = await Promise.all([
        api.get('/api/transfer/my-requests'),
        api.get('/api/notifications'),
        api.get('/api/notifications/count'),
      ]);
      setMyRequests(reqRes.data);
      setNotifications(notifRes.data.slice(0, 5));
      setUnreadCount(countRes.data.unreadCount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const markAllRead = async () => {
    await api.put('/api/notifications/read-all');
    setUnreadCount(0);
    fetchData();
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <span style={styles.navTitle}>🚂 Railway Transfer Portal</span>
        <div style={styles.navLinks}>
          <Link to="/profile" style={styles.profileLink}>👤 My Profile</Link>
          <Link to="/post-transfer" style={styles.navLink}>Post Transfer</Link>
          <Link to="/search" style={styles.navLink}>Search</Link>
          {role === 'ADMIN' && (
            <Link to="/admin" style={styles.navLink}>Admin Panel</Link>
          )}
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </nav>

      <div style={styles.content}>
        {/* Welcome */}
        <div style={styles.welcomeCard}>
          <h2 style={styles.welcomeText}>Welcome, {name}! 👋</h2>
          {!verified && (
            <div style={styles.warningBadge}>
              ⚠️ Your account is pending admin verification. You cannot post transfer requests yet.
            </div>
          )}
          {verified && (
            <div style={styles.verifiedBadge}>✅ Account Verified</div>
          )}
        </div>

        <div style={styles.grid}>
          {/* My Transfer Requests */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>My Transfer Requests</h3>
            {myRequests.length === 0 ? (
              <p style={styles.empty}>No transfer requests yet.{' '}
                <Link to="/post-transfer" style={styles.linkText}>Post one now</Link>
              </p>
            ) : (
              myRequests.map(req => (
                <div key={req.id} style={styles.requestItem}>
                  <div style={styles.requestInfo}>
                    <span style={styles.zone}>{req.desiredZone}</span>
                    <span style={styles.station}>{req.desiredStation}</span>
                  </div>
                  <span style={{
                    ...styles.badge,
                    background: req.status === 'OPEN' ? '#e3f2fd' : '#f3e5f5',
                    color: req.status === 'OPEN' ? '#1565c0' : '#6a1b9a',
                  }}>
                    {req.status}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Notifications */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>
                Notifications {unreadCount > 0 && (
                  <span style={styles.countBadge}>{unreadCount}</span>
                )}
              </h3>
              {unreadCount > 0 && (
                <button onClick={markAllRead} style={styles.markReadBtn}>
                  Mark all read
                </button>
              )}
            </div>
            {notifications.length === 0 ? (
              <p style={styles.empty}>No notifications yet.</p>
            ) : (
              notifications.map(n => (
                <div key={n.id} style={{
                  ...styles.notifItem,
                  background: n.read ? '#fff' : '#e8f4fd',
                }}>
                  <p style={styles.notifMsg}>{n.message}</p>
                  <span style={styles.notifTime}>
                    {new Date(n.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
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
  navLink: {
    color: '#fff', textDecoration: 'none',
    fontSize: '14px', fontWeight: '500',
  },
  profileLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
    background: 'rgba(255,255,255,0.15)',
    padding: '6px 14px',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.4)',
  },
  logoutBtn: {
    background: 'transparent', border: '1px solid #fff',
    color: '#fff', padding: '6px 16px', borderRadius: '6px',
    cursor: 'pointer', fontSize: '14px',
  },
  content: { padding: '32px' },
  welcomeCard: {
    background: '#fff', borderRadius: '12px', padding: '24px',
    marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  welcomeText: {
    fontSize: '22px', fontWeight: '700',
    color: '#1a237e', marginBottom: '12px',
  },
  warningBadge: {
    background: '#fff8e1', color: '#f57f17',
    padding: '10px 16px', borderRadius: '8px', fontSize: '14px',
  },
  verifiedBadge: {
    background: '#e8f5e9', color: '#2e7d32', padding: '8px 16px',
    borderRadius: '8px', fontSize: '14px', display: 'inline-block',
  },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
  card: {
    background: '#fff', borderRadius: '12px', padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  cardHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '16px',
  },
  cardTitle: {
    fontSize: '16px', fontWeight: '700',
    color: '#333', marginBottom: '16px',
  },
  empty: { color: '#999', fontSize: '14px' },
  linkText: { color: '#1a237e', fontWeight: '600' },
  requestItem: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px', borderRadius: '8px',
    background: '#f8f9fa', marginBottom: '8px',
  },
  requestInfo: { display: 'flex', flexDirection: 'column' },
  zone: { fontSize: '14px', fontWeight: '600', color: '#333' },
  station: { fontSize: '12px', color: '#888', marginTop: '2px' },
  badge: {
    padding: '4px 10px', borderRadius: '12px',
    fontSize: '12px', fontWeight: '600',
  },
  countBadge: {
    background: '#f44336', color: '#fff', borderRadius: '50%',
    padding: '2px 7px', fontSize: '12px', marginLeft: '8px',
  },
  markReadBtn: {
    background: 'transparent', border: '1px solid #1a237e',
    color: '#1a237e', padding: '4px 12px', borderRadius: '6px',
    cursor: 'pointer', fontSize: '12px',
  },
  notifItem: {
    padding: '12px', borderRadius: '8px',
    marginBottom: '8px', border: '1px solid #eee',
  },
  notifMsg: { fontSize: '13px', color: '#333', marginBottom: '4px' },
  notifTime: { fontSize: '11px', color: '#999' },
};