import React, { useState, useEffect } from 'react';

const userSliderImages = [
  {
    url: '/images/gauranga_cows.png',
    alt: 'Happy Cows at Gauranga Farm'
  },
  {
    url: '/images/gauranga_farmer_hands.png',
    alt: 'Traditional Organic Farming'
  },
  {
    url: '/images/organic_green_peas.png',
    alt: 'Fresh Organic Green Peas'
  },
  {
    url: '/images/ripe_bananas.png',
    alt: 'Farm Fresh Ripe Bananas'
  },
  {
    url: '/images/gir-cow.jpg',
    alt: 'Premium Gir Cows for A2 Dairy'
  }
];

const adminSliderImages = [
  {
    url: 'https://images.unsplash.com/photo-1595856456574-e822368c3d9a?w=1600&auto=format&fit=crop&q=80',
    alt: 'Farm Administration'
  },
  {
    url: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=1600&auto=format&fit=crop&q=80',
    alt: 'Crop Management'
  },
  {
    url: 'https://images.unsplash.com/photo-1592982537447-6f296d2b5122?w=1600&auto=format&fit=crop&q=80',
    alt: 'Logistics and Supply'
  }
];

function Hero() {
  const [user, setUser] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('gauranga_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed && parsed.user) {
          setUser(parsed.user);
        }
      } catch(e) {}
    }
  }, []);

  const currentSliderImages = user?.role === 'ADMIN' ? adminSliderImages : userSliderImages;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === currentSliderImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSliderImages]);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === currentSliderImages.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? currentSliderImages.length - 1 : currentSlide - 1);
  };

  return (
    <header id="home" className="hero">
      <div className="hero-content-container">
        <div className="hero-content">
          <span className="badge">
            {user?.role === 'ADMIN' ? 'Admin Portal' : user ? `Welcome back, ${user.fullname.split(' ')[0]}!` : 'Direct from our Farm'}
          </span>
          <h1>{user?.role === 'ADMIN' ? 'Farm Dashboard &' : user ? 'Your Daily Dose of' : "Nature's Purest"} <span>{user?.role === 'ADMIN' ? 'Management' : user ? 'Organic Goodness' : 'Bounty'}</span></h1>
          <p>
            {user?.role === 'ADMIN'
              ? "Oversee farm operations, manage fresh organic produce stock, and analyze daily logistics directly from this command center."
              : user 
                ? "We're thrilled to have you back! Explore today's freshly harvested vegetables, seasonal fruits, and premium A2 dairy products delivered straight to your door."
                : "Experience the true taste of ancient Indian farming. We grow organic, pesticide-free vegetables, fruits, and A2 dairy products with love and care."}
          </p>
          <div className="hero-btns">
            {user?.role === 'ADMIN' ? (
              <a href="#admin" className="btn btn-primary">Manage Operations <i className="fas fa-cogs"></i></a>
            ) : (
              <>
                <a href="#shop" className="btn btn-primary">Shop Fresh <i className="fas fa-arrow-right"></i></a>
                {!user && <a href="/signup" className="btn btn-outline">Join Our Community</a>}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="hero-slider-wrapper">
        <div className="slider-overlay"></div>
        {currentSliderImages.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.url} alt={slide.alt} className="slider-image-fullscreen" />
          </div>
        ))}
        
        <button className="slider-arrow prev" onClick={prevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="slider-arrow next" onClick={nextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button>

        <div className="slider-dots">
          {currentSliderImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Hero;
