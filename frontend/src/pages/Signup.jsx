import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { API_BASE_URL } from '../api';

function Signup() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    mobile: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (response.ok) {
        alert(data.emailSent
          ? 'Account created successfully! A welcome email has been sent to your email address. Please login.'
          : 'Account created successfully, but the welcome email could not be sent. Please contact us if you need help.');
        navigate('/login');
      } else {
        setError(data.error || 'Failed to create account.');
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
            <h2>Create Account</h2>
            <p>Join our organic community today.</p>
          </div>
          <form className="auth-form" onSubmit={handleSignup}>
            {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="fullname" placeholder="John Doe" value={formData.fullname} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-group">
              <label>Mobile Number</label>
              <div className="input-field">
                <i className="fas fa-phone"></i>
                <input type="text" name="mobile" placeholder="10-digit number" value={formData.mobile} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-group">
              <label>Password</label>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" name="password" placeholder="Create a strong password" value={formData.password} onChange={handleChange} required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Create Account'}
            </button>
            <div className="auth-footer">
              <p>Already have an account? <Link to="/login">Sign in</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
