import React, { useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function ProductHero() {
  const [size, setSize] = useState('1kg');
  const galleryRef = useRef(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const price = size === '500g' ? 1690 : 3315;
  const originalPrice = size === '500g' ? 1780 : 3490;
  const title = `Hand-churned Gir Cow A2 Ghee (${size === '500g' ? '500g' : '1 KG'})`;
  const product = { id: `ghee_${size}`, title, price, image: '/images/gm.png', category: 'dairy', unit: 'jar' };

  const scrollToImage = (index) => {
    if (galleryRef.current) {
      const scrollWidth = galleryRef.current.scrollWidth;
      const amount = index === 0 ? 0 : scrollWidth;
      galleryRef.current.scrollTo({ left: amount, behavior: 'smooth' });
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <section className="product-hero">
      <div className="product-hero-image-gallery" style={{ display: 'flex', flexDirection: 'column' }}>
        <div 
          className="product-hero-media" 
          ref={galleryRef}
          style={{ display: 'flex', overflowX: 'hidden', scrollSnapType: 'x mandatory', gap: '1rem', scrollbarWidth: 'none' }}
        >
          <img 
            src="/images/gm.png" 
            alt="Hand-churned Gir Cow A2 Ghee - Jars" 
            style={{ flex: '0 0 100%', scrollSnapAlign: 'center', width: '100%', borderRadius: '20px', boxShadow: 'var(--shadow)', objectFit: 'cover', aspectRatio: '1/1' }}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1602273661159-863a342416b4?w=800&auto=format&fit=crop&q=80"; }}
          />
          <img 
            src="/images/gheeimage.png" 
            alt="Pure A2 Ghee Single Jar" 
            style={{ flex: '0 0 100%', scrollSnapAlign: 'center', width: '100%', borderRadius: '20px', boxShadow: 'var(--shadow)', objectFit: 'cover', aspectRatio: '1/1' }}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=800&auto=format&fit=crop&q=80"; }}
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
          <img 
            src="/images/gm.png" 
            style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', cursor: 'pointer', border: '3px solid var(--primary)', transition: '0.3s' }} 
            onClick={(e) => {
              scrollToImage(0);
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.nextElementSibling.style.borderColor = 'transparent';
            }}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1602273661159-863a342416b4?w=80px&auto=format&fit=crop&q=80"; }}
          />
          <img 
            src="/images/gheeimage.png" 
            style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', cursor: 'pointer', border: '3px solid transparent', transition: '0.3s' }} 
            onClick={(e) => {
              scrollToImage(1);
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.previousElementSibling.style.borderColor = 'transparent';
            }}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=80px&auto=format&fit=crop&q=80"; }}
          />
        </div>
      </div>
      <div className="product-hero-content">
        <h1>Hand-churned Gir Cow A2 Ghee</h1>
        <div className="product-reviews">
          <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
          <span>Reviews (8)</span>
        </div>
        <p style={{ color: 'var(--text-main)', marginBottom: '1.5rem', lineHeight: '1.7' }}>
          Comes with an exquisite taste, a delightful aroma and wholesome granular structure. Made using the age-old bilona method, this Ghee does wonders in improving the overall nourishment of the body and the mind.
        </p>
        <div className="product-variants" style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>Size</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <label className="variant-option">
              <input 
                type="radio" 
                name="ghee-size" 
                value="500g" 
                onChange={() => setSize('500g')} 
                checked={size === '500g'}
                style={{ display: 'none' }} 
              />
              <span className={`variant-btn ${size === '500g' ? 'active' : ''}`}>500g</span>
            </label>
            <label className="variant-option">
              <input 
                type="radio" 
                name="ghee-size" 
                value="1kg" 
                onChange={() => setSize('1kg')} 
                checked={size === '1kg'}
                style={{ display: 'none' }} 
              />
              <span className={`variant-btn ${size === '1kg' ? 'active' : ''}`}>1 KG</span>
            </label>
          </div>
        </div>

        <div className="product-price">
          <s>₹{originalPrice.toFixed(2)}</s> ₹{price.toFixed(2)} <span style={{ fontSize: '1rem', color: 'var(--text-light)', fontWeight: 400 }}>(5% off)</span>
        </div>
        <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>(Inclusive of taxes)</p>

        <div className="product-add-cart">
          <input type="number" defaultValue="1" min="1" />
          <button 
            className="btn btn-primary" 
            style={{ flex: 1, borderRadius: '8px', fontSize: '1.2rem', background: 'transparent', border: '2px solid var(--primary)', color: 'var(--primary)' }} 
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <button 
            className="btn btn-primary" 
            style={{ flex: 1, borderRadius: '8px', fontSize: '1.2rem' }} 
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>

        <div className="product-features">
          <div className="product-feature">
            <i className="fas fa-truck"></i> Free shipping PAN India
          </div>
          <div className="product-feature">
            <i className="fas fa-clock"></i> Usually ships within 48 hours
          </div>
          <div className="product-feature">
            <i className="fas fa-leaf"></i> Ancient elixir of life
          </div>
        </div>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontStyle: 'italic', background: 'rgba(212, 163, 115, 0.1)', padding: '1rem', borderLeft: '4px solid var(--accent)' }}>
          ‘The first and the most essential of all foods’, according to the Vedas this golden ghee’s medicinal and culinary importance along with its spiritual benefits makes it a true superfood.
        </p>
      </div>
    </section>
  );
}

export default ProductHero;
