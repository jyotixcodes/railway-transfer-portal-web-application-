import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function SearchTransfer() {
  const [results, setResults] = useState([]);
  const [zone, setZone] = useState('');
  const [station, setStation] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/transfer/all');
      setResults(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!zone) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await api.get('/api/transfer/search', {
        params: { zone, station }
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
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
        <h2 style={styles.title}>Search Transfer Requests</h2>

        <div style={styles.searchCard}>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <select style={styles.select} value={zone}
              onChange={(e) => setZone(e.target.value)}>
              <option value="">Select Zone</option>
              {zones.map(z => <option key={z} value={z}>{z}</option>)}
            </select>
            <input style={styles.searchInput} placeholder="Station (optional)"
              value={station} onChange={(e) => setStation(e.target.value)} />
            <button style={styles.searchBtn} type="submit">Search</button>
            <button style={styles.resetBtn} type="button" onClick={() => {
              setZone(''); setStation(''); setSearched(false); fetchAll();
            }}>Reset</button>
          </form>
        </div>

        {loading ? (
          <p style={styles.loading}>Searching...</p>
        ) : (
          <>
            <p style={styles.resultCount}>
              {results.length} {searched ? 'matching' : 'open'} request(s) found
            </p>
            <div style={styles.grid}>
              {results.map(req => (
                <div key={req.id} style={styles.card}>
                  <div style={styles.cardTop}>
                    <div>
                      <p style={styles.employeeName}>{req.user?.name}</p>
                      <p style={styles.currentLocation}>
                        Currently at: {req.user?.currentStation}, {req.user?.currentZone}
                      </p>
                    </div>
                    <span style={styles.statusBadge}>{req.status}</span>
                  </div>
                  <div style={styles.arrow}>⬇ Wants to transfer to</div>
                  <div style={styles.desiredLocation}>
                    <span style={styles.desiredZone}>{req.desiredZone}</span>
                    <span style={styles.desiredStation}>{req.desiredStation}</span>
                  </div>
                  {req.reason && (
                    <p style={styles.reason}>📝 {req.reason}</p>
                  )}
                  <p style={styles.date}>
                    Posted: {new Date(req.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
            {results.length === 0 && (
              <div style={styles.empty}>
                <p>No transfer requests found for the selected criteria.</p>
              </div>
            )}
          </>
        )}
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
  content: { padding: '32px' },
  title: { fontSize: '22px', fontWeight: '700', color: '#1a237e', marginBottom: '20px' },
  searchCard: {
    background: '#fff', borderRadius: '12px', padding: '20px',
    marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  searchForm: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  select: {
    padding: '10px 14px', border: '1px solid #ddd', borderRadius: '8px',
    fontSize: '14px', flex: '1', minWidth: '200px',
  },
  searchInput: {
    padding: '10px 14px', border: '1px solid #ddd', borderRadius: '8px',
    fontSize: '14px', flex: '1', minWidth: '150px',
  },
  searchBtn: {
    padding: '10px 24px', background: '#1a237e', color: '#fff',
    border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600',
  },
  resetBtn: {
    padding: '10px 24px', background: '#fff', color: '#1a237e',
    border: '1px solid #1a237e', borderRadius: '8px', cursor: 'pointer',
  },
  resultCount: { color: '#666', fontSize: '14px', marginBottom: '16px' },
  loading: { textAlign: 'center', color: '#666', padding: '40px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' },
  card: {
    background: '#fff', borderRadius: '12px', padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' },
  employeeName: { fontSize: '16px', fontWeight: '700', color: '#333' },
  currentLocation: { fontSize: '12px', color: '#888', marginTop: '2px' },
  statusBadge: {
    background: '#e3f2fd', color: '#1565c0', padding: '4px 10px',
    borderRadius: '12px', fontSize: '12px', fontWeight: '600',
  },
  arrow: { color: '#999', fontSize: '12px', marginBottom: '8px' },
  desiredLocation: { display: 'flex', flexDirection: 'column', marginBottom: '10px' },
  desiredZone: { fontSize: '15px', fontWeight: '600', color: '#1a237e' },
  desiredStation: { fontSize: '13px', color: '#555', marginTop: '2px' },
  reason: { fontSize: '13px', color: '#666', marginBottom: '8px', fontStyle: 'italic' },
  date: { fontSize: '11px', color: '#bbb' },
  empty: { textAlign: 'center', color: '#999', padding: '40px', fontSize: '16px' },
};