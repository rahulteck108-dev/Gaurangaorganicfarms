import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3><i className="fas fa-seedling"></i> Gauranga Organic Farm</h3>
          <p style={{ color: 'var(--text-light)', marginTop: '1rem', lineHeight: '1.6' }}>
            We believe in traditional farming methods that honor the earth and bring the purest, most nutritious food to your table.
          </p>
          <div className="social-links" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ color: 'var(--white)', background: 'var(--primary)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: '0.3s' }}><i className="fab fa-facebook-f"></i></a>
            <a href="#" style={{ color: 'var(--white)', background: 'var(--primary)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: '0.3s' }}><i className="fab fa-instagram"></i></a>
            <a href="#" style={{ color: 'var(--white)', background: 'var(--primary)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: '0.3s' }}><i className="fab fa-twitter"></i></a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
            <li style={{ marginBottom: '0.8rem' }}><a href="#home" style={{ color: 'var(--text-light)', textDecoration: 'none', transition: '0.3s' }}>Home</a></li>
            <li style={{ marginBottom: '0.8rem' }}><a href="#shop" style={{ color: 'var(--text-light)', textDecoration: 'none', transition: '0.3s' }}>Shop</a></li>
            <li style={{ marginBottom: '0.8rem' }}><a href="#about" style={{ color: 'var(--text-light)', textDecoration: 'none', transition: '0.3s' }}>Our Story</a></li>
            <li style={{ marginBottom: '0.8rem' }}><Link to="/login" style={{ color: 'var(--text-light)', textDecoration: 'none', transition: '0.3s' }}>My Account</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Newsletter</h3>
          <p style={{ color: 'var(--text-light)', marginTop: '1rem', marginBottom: '1rem' }}>Subscribe to get special offers and organic farming tips.</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input type="email" placeholder="Your email address" style={{ padding: '0.8rem', borderRadius: '8px', border: 'none', flex: '1', outline: 'none' }} />
            <button className="btn btn-primary" style={{ padding: '0.8rem 1.2rem', borderRadius: '8px' }}>Subscribe</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom" style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '3rem', color: 'var(--text-light)' }}>
        <p>&copy; {new Date().getFullYear()} Gauranga Organic Farm. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
