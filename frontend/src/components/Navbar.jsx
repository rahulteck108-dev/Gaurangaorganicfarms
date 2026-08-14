import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [user, setUser] = useState(null);
  const { getCartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check for logged in user
    const storedUser = localStorage.getItem('gauranga_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed && parsed.user) {
          setUser(parsed.user);
        }
      } catch(e) {}
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSearch = (e) => {
    e.preventDefault();
    setIsSearchActive(!isSearchActive);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('gauranga_user');
    setUser(null);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'solid-nav' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <i className="fas fa-seedling"></i> Gauranga Organic Farm
        </Link>

        <ul className="nav-links">
          <li><a href="/#home" className="active">Home</a></li>
          <li><a href="/#shop">Shop Fresh</a></li>
          <li><a href="/#gir-cow">Our Story</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>

        <div className="nav-icons" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div className="search-container">
            <input 
              type="text" 
              id="search-input" 
              placeholder="Search..." 
              className={`search-input ${isSearchActive ? 'active' : ''}`} 
            />
            <a href="#" aria-label="Search" className="search-btn" id="search-btn" onClick={toggleSearch}>
              <i className="fas fa-search"></i>
            </a>
          </div>
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--primary)' }}>
                Hi, {user.fullname ? user.fullname.split(' ')[0] : 'User'}
              </span>
              <a href="#" onClick={handleLogout} aria-label="Logout" title="Logout">
                <i className="fas fa-sign-out-alt"></i>
              </a>
            </div>
          ) : (
            <Link to="/login" aria-label="User Account">
              <i className="fas fa-user"></i>
            </Link>
          )}

          <Link to="/checkout" className="cart-icon" aria-label="Shopping Cart">
            <i className="fas fa-shopping-basket"></i>
            <span className="cart-count">{getCartCount()}</span>
          </Link>
        </div>

        <button className="mobile-menu-btn">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
