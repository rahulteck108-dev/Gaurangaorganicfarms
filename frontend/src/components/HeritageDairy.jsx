import React from 'react';

function HeritageDairy() {
  return (
    <section style={{ backgroundColor: 'var(--primary-light)', padding: '5rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--white)', marginBottom: '3rem' }}>Premium Heritage Dairy</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div 
            style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow)', transformStyle: 'preserve-3d' }}
            data-tilt data-tilt-max="15" data-tilt-scale="1.02" data-tilt-glare="true" data-tilt-max-glare="0.4"
          >
            <img 
              src="/images/butter.jpg" 
              alt="Fresh White Butter"
              style={{ width: '100%', height: '250px', objectFit: 'cover', transform: 'translateZ(20px)' }} 
              onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&auto=format&fit=crop&q=80"; }}
            />
            <div style={{ padding: '1.5rem', textAlign: 'left', transform: 'translateZ(30px)' }}>
              <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>Fresh White Butter (Makhan)</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>Hand-churned traditionally using the Bilona method just like in the old days.</p>
            </div>
          </div>

          <div 
            style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow)', transformStyle: 'preserve-3d' }}
            data-tilt data-tilt-max="15" data-tilt-scale="1.02" data-tilt-glare="true" data-tilt-max-glare="0.4"
          >
            <img 
              src="/images/honey.jpg" 
              alt="Organic Honey"
              style={{ width: '100%', height: '250px', objectFit: 'cover', transform: 'translateZ(20px)' }} 
              onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1587049352847-8d4e8941554a?w=800&auto=format&fit=crop&q=80"; }}
            />
            <div style={{ padding: '1.5rem', textAlign: 'left', transform: 'translateZ(30px)' }}>
              <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>Raw Farm Honey</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>Unheated and unfiltered—collected harmoniously from our farm's blossom fields.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeritageDairy;
