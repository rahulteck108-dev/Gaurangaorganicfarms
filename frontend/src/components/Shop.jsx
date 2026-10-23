import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api';
import '../productImages.js';

const productImages = globalThis.GAURANGA_PRODUCT_IMAGES;

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failedImages, setFailedImages] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.map(product => ({
          ...product,
          ...productImages[product.title],
        })));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate('/checkout');
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="shop" className="products-section">
      <div className="section-title">
        <h2>Farm Fresh <span style={{ color: 'var(--primary)' }}>Produce</span></h2>
        <p>Harvested today, delivered tomorrow.</p>
      </div>

      <div className="filters" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <div className="search-bar-container" style={{ width: '100%', maxWidth: '500px', display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '50px', padding: '0.2rem 1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid rgba(45, 106, 79, 0.2)' }}>
          <i className="fas fa-search" style={{ color: 'var(--primary)', fontSize: '1.1rem' }}></i>
          <input 
            type="text" 
            placeholder="Search fresh produce..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', padding: '0.8rem', fontSize: '1rem', background: 'transparent' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>All</button>
          <button className={`filter-btn ${activeCategory === 'vegetables' ? 'active' : ''}`} onClick={() => setActiveCategory('vegetables')}>Vegetables</button>
          <button className={`filter-btn ${activeCategory === 'fruits' ? 'active' : ''}`} onClick={() => setActiveCategory('fruits')}>Fruits</button>
          <button className={`filter-btn ${activeCategory === 'dairy' ? 'active' : ''}`} onClick={() => setActiveCategory('dairy')}>Dairy Products</button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', fontSize: '1.2rem', color: 'var(--text-main)' }}>
          <i className="fas fa-spinner fa-spin"></i> Loading fresh produce...
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {failedImages[product.id] ? (
                  <div className="product-image-fallback" role="img" aria-label={`Image unavailable for ${product.title}`}>
                    <i className="fas fa-leaf" aria-hidden="true"></i>
                    <span>Image unavailable</span>
                  </div>
                ) : (
                  <img
                    className="product-photo"
                    src={product.image.startsWith('images/') ? `/${product.image}` : product.image}
                    alt={product.title}
                    loading="lazy"
                    onError={() => setFailedImages(previous => ({ ...previous, [product.id]: true }))}
                  />
                )}
                <span className="organic-tag">100% Organic</span>
                {product.imageCredit && (
                  <a
                    className="product-image-credit"
                    href={product.imageCredit}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View photo credit and license information for ${product.title}`}
                  >
                    Photo credit
                  </a>
                )}
              </div>
              <div className="product-info">
                <span className="product-category" style={{ textTransform: 'capitalize' }}>{product.category}</span>
                <h3 className="product-title">{product.title}</h3>
                <div className="product-price">
                  {product.title === 'A2 Cow Ghee' ? (
                    <>
                      <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '1rem', marginRight: '8px' }}>₹3490.00</span>
                      ₹{product.price.toFixed(2)} <span>{product.unit}</span>
                      <span style={{ color: '#28a745', fontSize: '0.95rem', marginLeft: '8px', fontWeight: '500' }}>(5% off)</span>
                    </>
                  ) : (
                    <>₹{product.price.toFixed(2)} <span>{product.unit}</span></>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button 
                    className="add-to-cart-btn" 
                    onClick={() => handleAddToCart(product)}
                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.9rem' }}
                  >
                    <i className="fas fa-shopping-basket"></i>
                  </button>
                  <button 
                    className="add-to-cart-btn" 
                    onClick={() => handleBuyNow(product)}
                    style={{ flex: 2, background: 'var(--primary-dark)', padding: '0.5rem', fontSize: '0.9rem' }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', fontSize: '1.2rem', color: 'var(--text-main)' }}>
          No products found. Please ensure the backend is running and the database is seeded.
        </div>
      )}
    </section>
  );
}

export default Shop;
