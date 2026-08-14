import React from 'react';

function GirCowSection() {
  return (
    <section id="gir-cow" style={{ padding: '5rem 2rem', backgroundColor: 'var(--white)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}>The Pride of Our Farm: <span style={{ color: 'var(--accent)' }}>A2 Gir Cows</span></h2>
          <p style={{ color: 'var(--text-light)', maxWidth: '700px', margin: '1rem auto', fontSize: '1.1rem' }}>
            Our traditional Indian Gir cows are the source of our incredibly pure dairy products. Known for their unique anatomy and A2 milk, they are nurtured with love and organic fodder.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div 
            style={{ position: 'relative', textAlign: 'center', background: '#000', borderRadius: '20px', boxShadow: 'var(--shadow)', overflow: 'hidden', transformStyle: 'preserve-3d' }}
            data-tilt data-tilt-max="10" data-tilt-scale="1.02" data-tilt-glare="true" data-tilt-max-glare="0.5"
          >
            <img 
              src="/images/gir-cow.jpg" 
              alt="A2 Gir Cow Diagram with labels" 
              style={{ width: '100%', display: 'block', transform: 'translateZ(20px)' }} 
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=800&auto=format&fit=crop&q=80"; // Fallback image if local is missing
              }}
            />
          </div>

          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <i className="fas fa-check-circle"></i> Prominent Hump
              </h3>
              <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>The Surya Ketu Nadi (vein) passes through the prominent hump, absorbing solar energy to enrich the milk with golden properties.</p>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <i className="fas fa-check-circle"></i> Rounded Shape Forehead
              </h3>
              <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>Their majestic, deeply rounded foreheads give them a calm, peaceful nature—resulting in hormone-free, stress-free milk.</p>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <i className="fas fa-check-circle"></i> Folded Dewlap
              </h3>
              <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>A prominent skin fold beneath their neck helps them stay cool and strongly supports higher immunity.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GirCowSection;
