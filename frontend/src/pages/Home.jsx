import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>

      {/* Hero Section with gradient background */}
      <div style={styles.hero}>

        {/* Navbar */}
        <nav style={styles.navbar}>
          <span style={styles.navTitle}>🚂 Railway Transfer Portal</span>
          <div style={styles.navLinks}>
            <button onClick={() => navigate('/login')} style={styles.navLoginBtn}>
              Sign In
            </button>
            <button onClick={() => navigate('/register')} style={styles.navRegisterBtn}>
              Register
            </button>
          </div>
        </nav>

        {/* Decorative circles */}
        <div style={styles.circle1}></div>
        <div style={styles.circle2}></div>
        <div style={styles.circle3}></div>

        {/* Hero content */}
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            🚂 Indian Railways Mutual Transfer Portal
          </div>
          <h1 style={styles.heroTitle}>
            Find Your Perfect<br />Transfer Match
          </h1>
          <p style={styles.heroSubtitle}>
            Connect with fellow railway employees who want to swap postings.
            Simple, transparent, and officially supported.
          </p>
          <div style={styles.heroBtns}>
            <button
              onClick={() => navigate('/search')}
              style={styles.btnOrange}>
              Explore Transfers →
            </button>
            <button
              onClick={() => navigate('/login')}
              style={styles.btnGlass}>
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div style={styles.trustBar}>
        <span style={styles.trustItem}>✓ Verified Employees Only</span>
        <span style={styles.trustItem}>✓ Secure & Private</span>
        <span style={styles.trustItem}>✓ Free for All Railway Staff</span>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <div style={styles.statNum}>16+</div>
          <div style={styles.statLabel}>Railway Zones</div>
        </div>
        <div style={styles.statDivider}></div>
        <div style={styles.statCard}>
          <div style={styles.statNum}>Fast</div>
          <div style={styles.statLabel}>Mutual Matching</div>
        </div>
        <div style={styles.statDivider}></div>
        <div style={styles.statCard}>
          <div style={styles.statNum}>Free</div>
          <div style={styles.statLabel}>For All Employees</div>
        </div>
      </div>

      {/* Features */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Everything you need for a smooth transfer</h2>
        <p style={styles.sectionSubtitle}>Designed specifically for Indian Railway employees</p>
        <div style={styles.featureGrid}>
          {[
            { icon: '🔐', title: 'Verified Identity', text: 'Register with your Employee ID and PF Number. Admin verifies your identity before you can post.' },
            { icon: '🔍', title: 'Smart Search', text: 'Search transfer requests by zone and station. Find employees who want to come to your location.' },
            { icon: '🔔', title: 'Instant Notifications', text: 'Get notified by email and in-app when a potential match is found for your transfer request.' },
          ].map((f, i) => (
            <div key={i} style={styles.featureCard}>
              <div style={styles.featureIcon}>{f.icon}</div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureText}>{f.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={styles.howSection}>
        <h2 style={styles.sectionTitle}>How it works</h2>
        <p style={styles.sectionSubtitle}>Get your transfer done in 4 simple steps</p>
        <div style={styles.stepsRow}>
          {[
            { num: 1, title: 'Register', text: 'Sign up with your Employee ID and PF Number' },
            { num: 2, title: 'Get Verified', text: 'Admin verifies your identity and activates your account' },
            { num: 3, title: 'Post Request', text: 'Post your desired transfer zone and station' },
            { num: 4, title: 'Get Matched', text: 'System notifies you when a mutual match is found' },
          ].map(step => (
            <div key={step.num} style={styles.step}>
              <div style={styles.stepNum}>{step.num}</div>
              <h4 style={styles.stepTitle}>{step.title}</h4>
              <p style={styles.stepText}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={styles.cta}>
        <div style={styles.ctaCircle1}></div>
        <div style={styles.ctaCircle2}></div>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to find your transfer match?</h2>
          <p style={styles.ctaSubtitle}>
            Join thousands of railway employees already using the portal
          </p>
          <button
            onClick={() => navigate('/register')}
            style={styles.btnOrange}>
            Get Started — It's Free
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <span>© 2026 Railway Transfer Portal</span>
        <span style={styles.footerDot}>·</span>
        <span>For Indian Railway Employees Only</span>
      </div>

    </div>
  );
}

const PRIMARY = '#1a237e';
const ORANGE = '#f57c00';

const styles = {
  page: { minHeight: '100vh', background: '#fff', overflow: 'hidden' },

  hero: {
    background: 'linear-gradient(135deg, #0a0f5e 0%, #1a237e 40%, #283593 70%, #1565c0 100%)',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },

  circle1: {
    position: 'absolute',
    width: '600px', height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(100,130,255,0.25) 0%, transparent 70%)',
    top: '-200px', right: '-150px',
    pointerEvents: 'none',
    filter: 'blur(40px)',
  },
  circle2: {
    position: 'absolute',
    width: '500px', height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(80,100,220,0.2) 0%, transparent 70%)',
    bottom: '-100px', left: '-150px',
    pointerEvents: 'none',
    filter: 'blur(50px)',
  },
  circle3: {
    position: 'absolute',
    width: '350px', height: '350px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(245,124,0,0.15) 0%, transparent 70%)',
    top: '30%', right: '15%',
    pointerEvents: 'none',
    filter: 'blur(60px)',
  },

  navbar: {
    padding: '20px 48px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    position: 'relative', zIndex: 10,
  },
  navTitle: { color: '#fff', fontSize: '18px', fontWeight: '700' },
  navLinks: { display: 'flex', gap: '12px', alignItems: 'center' },
  navLoginBtn: {
    background: 'rgba(255,255,255,0.15)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.3)',
    padding: '8px 24px', borderRadius: '8px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '500',
    backdropFilter: 'blur(10px)',
  },
  navRegisterBtn: {
    background: ORANGE, color: '#fff', border: 'none',
    padding: '8px 24px', borderRadius: '8px',
    cursor: 'pointer', fontSize: '14px', fontWeight: '600',
  },

  heroContent: {
    flex: 1,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    textAlign: 'center',
    padding: '20px 40px 80px',
    position: 'relative', zIndex: 10,
  },
  heroBadge: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '24px', padding: '10px 24px',
    fontSize: '13px', color: 'rgba(255,255,255,0.9)',
    marginBottom: '32px',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
    letterSpacing: '0.3px',
  },

  heroTitle: {
    fontSize: '58px', fontWeight: '800',
    color: '#fff', marginBottom: '20px',
    lineHeight: '1.1', letterSpacing: '-1.5px',
    textShadow: '0 2px 40px rgba(0,0,0,0.3)',
  },
  heroSubtitle: {
    fontSize: '18px', color: 'rgba(255,255,255,0.85)',
    maxWidth: '520px', margin: '0 auto 40px',
    lineHeight: '1.6',
  },
  heroBtns: {
    display: 'flex', gap: '16px',
    justifyContent: 'center', flexWrap: 'wrap',
  },
  btnOrange: {
    background: ORANGE, color: '#fff', border: 'none',
    padding: '16px 36px', borderRadius: '10px',
    fontSize: '16px', fontWeight: '700', cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(245,124,0,0.4)',
  },
  btnGlass: {
    background: 'rgba(255,255,255,0.12)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.25)',
    padding: '16px 36px', borderRadius: '10px',
    fontSize: '16px', fontWeight: '600', cursor: 'pointer',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
  },

  trustBar: {
    background: '#0a0f5e', padding: '14px 32px',
    display: 'flex', justifyContent: 'center',
    gap: '40px', flexWrap: 'wrap',
  },
  trustItem: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: '13px', fontWeight: '500',
  },

  statsRow: {
    display: 'flex', justifyContent: 'center',
    alignItems: 'center', background: '#fff',
    padding: '40px', gap: '0',
    borderBottom: '1px solid #e8eaf6',
  },
  statCard: {
    textAlign: 'center', padding: '0 60px',
  },
  statDivider: {
    width: '1px', height: '60px',
    background: '#e8eaf6',
  },
  statNum: {
    fontSize: '36px', fontWeight: '800',
    color: PRIMARY, marginBottom: '4px',
  },
  statLabel: { fontSize: '13px', color: '#888' },

  section: { padding: '80px 32px', background: '#f0f2ff' },
  howSection: { padding: '80px 32px', background: '#fff' },

  sectionTitle: {
    textAlign: 'center', fontSize: '28px',
    fontWeight: '800', color: PRIMARY, marginBottom: '8px',
  },
  sectionSubtitle: {
    textAlign: 'center', color: '#888',
    fontSize: '15px', marginBottom: '48px',
  },

  featureGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px', maxWidth: '960px', margin: '0 auto',
  },
  featureCard: {
    background: '#fff', borderRadius: '16px',
    padding: '32px', border: '1px solid #e8eaf6',
    boxShadow: '0 2px 12px rgba(26,35,126,0.06)',
  },
  featureIcon: {
    width: '52px', height: '52px', borderRadius: '14px',
    background: '#e8eaf6', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: '24px', marginBottom: '20px',
  },
  featureTitle: {
    fontSize: '16px', fontWeight: '700',
    color: PRIMARY, marginBottom: '10px',
  },
  featureText: { fontSize: '14px', color: '#666', lineHeight: '1.6' },

  stepsRow: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px', maxWidth: '960px', margin: '0 auto',
  },
  step: { textAlign: 'center', padding: '20px 16px' },
  stepNum: {
    width: '48px', height: '48px', borderRadius: '50%',
    background: ORANGE, color: '#fff', fontWeight: '800',
    fontSize: '20px', display: 'flex', alignItems: 'center',
    justifyContent: 'center', margin: '0 auto 16px',
    boxShadow: '0 4px 12px rgba(245,124,0,0.3)',
  },
  stepTitle: {
    fontSize: '15px', fontWeight: '700',
    color: '#333', marginBottom: '8px',
  },
  stepText: { fontSize: '13px', color: '#888', lineHeight: '1.5' },

 cta: {
    background: 'linear-gradient(135deg, #0a0f5e 0%, #1a237e 50%, #283593 100%)',
    padding: '80px 32px', textAlign: 'center',
    position: 'relative', overflow: 'hidden',
  },
  ctaCircle1: {
    position: 'absolute', width: '300px', height: '300px',
    borderRadius: '50%', background: 'rgba(255,255,255,0.06)',
    top: '-100px', right: '-50px', pointerEvents: 'none',
  },
  ctaCircle2: {
    position: 'absolute', width: '200px', height: '200px',
    borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
    bottom: '-50px', left: '-50px', pointerEvents: 'none',
  },
  ctaContent: { position: 'relative', zIndex: 10 },
  ctaTitle: {
    fontSize: '32px', fontWeight: '800',
    color: '#fff', marginBottom: '12px',
  },
  ctaSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: '16px', marginBottom: '32px',
  },

 footer: {
    background: '#0a0f5e',
    padding: '24px 32px',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)', fontSize: '13px',
    display: 'flex', justifyContent: 'center',
    alignItems: 'center', gap: '12px',
  },
  footerDot: { opacity: 0.3 },
};