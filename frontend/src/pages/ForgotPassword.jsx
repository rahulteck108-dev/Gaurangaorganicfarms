import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { API_BASE_URL } from '../api';

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    newPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (response.ok) {
        alert('Password reset successfully! Please login with your new password.');
        navigate('/login');
      } else {
        setError(data.error || 'Failed to reset password.');
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
            <h2>Reset Password</h2>
            <p>Verify your details to set a new password.</p>
          </div>
          <form className="auth-form" onSubmit={handleReset}>
            {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}
            
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" name="email" placeholder="Enter your registered email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="input-group">
              <label>Mobile Number</label>
              <div className="input-field">
                <i className="fas fa-phone"></i>
                <input type="text" name="mobile" placeholder="Enter your registered mobile" value={formData.mobile} onChange={handleChange} required />
              </div>
            </div>

            <div className="input-group">
              <label>New Password</label>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" name="newPassword" placeholder="Enter new password" value={formData.newPassword} onChange={handleChange} required />
              </div>
            </div>

            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Reset Password'}
            </button>
            <div className="auth-footer">
              <p>Remember your password? <Link to="/login">Sign in</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
