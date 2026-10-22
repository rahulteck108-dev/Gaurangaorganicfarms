import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { API_BASE_URL } from '../api';

function Login() {
  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: formData.loginId,
          password: formData.password
        })
      });
      const data = await response.json();
      
      if (response.ok) {
        // Here we would typically save the JWT token or user details
        localStorage.setItem('gauranga_user', JSON.stringify(data));
        navigate('/');
      } else {
        setError(data.error || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Network error. Could not connect to backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className="auth-wrapper" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="auth-card">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your organic account.</p>
          </div>
          <form className="auth-form" onSubmit={handleLogin}>
            {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}
            <div className="input-group">
              <label>Email or Mobile</label>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="loginId" placeholder="Enter email or mobile" value={formData.loginId} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-group">
              <label>Password</label>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} required />
              </div>
            </div>
            <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
              <Link to="/forgot-password" style={{ fontSize: '0.9rem', color: '#2e7d32', textDecoration: 'none', fontWeight: '500' }}>Forgot Password?</Link>
            </div>
            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Sign In'}
            </button>
            <div className="auth-footer">
              <p>Don't have an account? <Link to="/signup">Create one</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
