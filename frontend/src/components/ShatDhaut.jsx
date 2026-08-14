import React from 'react';

function ShatDhaut() {
  return (
    <section className="product-hero" style={{ background: 'var(--bg-light)' }}>
      <div className="product-hero-content">
        <h2 style={{ color: 'var(--primary)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Learn more about our unique</h2>
        <h1 style={{ fontSize: '3rem', lineHeight: '1.1', marginBottom: '1.5rem' }}>Full Moon <span style={{ color: 'var(--accent)' }}>Shat Dhaut Ghrit</span></h1>
        <p style={{ color: 'var(--text-main)', lineHeight: '1.7', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Ayurveda calls it “The Supreme Skin Elixir”. Derived from over 5000-year-old ancient ayurvedic text Charaka Samhita, wherein pure ghee is washed 100 times in a sacred copper vessel in the aura of divine mantra chants on a full moon day.
        </p>
        <div className="product-features" style={{ background: 'var(--white)' }}>
          <div className="product-feature">
            <i className="fas fa-tint"></i> A great moisturizer
          </div>
          <div className="product-feature">
            <i className="fas fa-sun"></i> Effectively reduces pigmentation
          </div>
          <div className="product-feature">
            <i className="fas fa-spa"></i> Anti-aging and anti-wrinkle
          </div>
          <div className="product-feature">
            <i className="fas fa-baby"></i> Helps clear diaper rash
          </div>
        </div>
        <a href="#shop" className="btn btn-outline" style={{ marginTop: '1rem', display: 'inline-block' }}>Discover More</a>
      </div>
      <div className="product-hero-media" style={{ padding: '2rem' }}>
        <div style={{ position: 'relative', borderRadius: '50%', padding: '2rem', background: 'white', boxShadow: 'var(--shadow)', width: '100%', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src="/images/shatdhaut.png" 
            alt="Shat Dhaut Ghrit Copper Washing Process" 
            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%', animation: 'float 6s ease-in-out infinite' }} 
            onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&auto=format&fit=crop&q=80"; }}
          />
        </div>
      </div>
    </section>
  );
}

export default ShatDhaut;
