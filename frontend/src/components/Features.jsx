import React, { useEffect, useRef } from 'react';

function Features() {
  const featureRefs = useRef([]);

  useEffect(() => {
    // We would ideally initialize VanillaTilt here if we import it, 
    // but since it's loaded globally via CDN in index.html, it auto-initializes on elements with data-tilt.
    // In a pure React app, we would use a react-tilt package. For now, this is fine.
  }, []);

  return (
    <section className="features">
      <div className="feature-box" data-tilt data-tilt-max="20" data-tilt-scale="1.05" data-tilt-glare="true" data-tilt-max-glare="0.5">
        <i className="fas fa-leaf"></i>
        <h3>100% Organic</h3>
        <p>No synthetic chemicals or pesticides.</p>
      </div>
      <div className="feature-box" data-tilt data-tilt-max="20" data-tilt-scale="1.05" data-tilt-glare="true" data-tilt-max-glare="0.5">
        <i className="fas fa-truck-fast"></i>
        <h3>Farm to Door</h3>
        <p>Harvested today, delivered tomorrow.</p>
      </div>
      <div className="feature-box" data-tilt data-tilt-max="20" data-tilt-scale="1.05" data-tilt-glare="true" data-tilt-max-glare="0.5">
        <i className="fas fa-cow"></i>
        <h3>A2 Dairy</h3>
        <p>Pure milk from grass-fed Desi cows.</p>
      </div>
      <div className="feature-box" data-tilt data-tilt-max="20" data-tilt-scale="1.05" data-tilt-glare="true" data-tilt-max-glare="0.5">
        <i className="fas fa-hand-holding-heart"></i>
        <h3>Sustainable</h3>
        <p>Eco-friendly and traditional Vedic farming.</p>
      </div>
    </section>
  );
}

export default Features;
