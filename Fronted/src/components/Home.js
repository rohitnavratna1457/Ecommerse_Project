import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import './Home.css';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerImages = [
    'https://via.placeholder.com/1200x300/2874f0/ffffff?text=Special+Offers',
    'https://via.placeholder.com/1200x300/fb641b/ffffff?text=New+Arrivals',
    'https://via.placeholder.com/1200x300/388e3c/ffffff?text=Best+Deals'
  ];

  const categories = [
    { id: 1, name: 'Smartphones', image: 'https://via.placeholder.com/100', link: '/products?category=smartphones' },
    { id: 2, name: 'Laptops', image: 'https://via.placeholder.com/100', link: '/products?category=laptops' },
    { id: 3, name: 'Tablets', image: 'https://via.placeholder.com/100', link: '/products?category=tablets' },
    { id: 4, name: 'Accessories', image: 'https://via.placeholder.com/100', link: '/products?category=accessories' },
    { id: 5, name: 'Wearables', image: 'https://via.placeholder.com/100', link: '/products?category=wearables' },
    { id: 6, name: 'Audio', image: 'https://via.placeholder.com/100', link: '/products?category=audio' }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'iPhone 13 Pro',
      price: 999.99,
      image: 'https://via.placeholder.com/200',
      rating: 4.5,
      reviews: 128,
      discount: 10
    },
    {
      id: 2,
      name: 'Samsung Galaxy S21',
      price: 799.99,
      image: 'https://via.placeholder.com/200',
      rating: 4.3,
      reviews: 95,
      discount: 15
    },
    {
      id: 3,
      name: 'MacBook Pro',
      price: 1299.99,
      image: 'https://via.placeholder.com/200',
      rating: 4.8,
      reviews: 75,
      discount: 5
    },
    {
      id: 4,
      name: 'AirPods Pro',
      price: 249.99,
      image: 'https://via.placeholder.com/200',
      rating: 4.6,
      reviews: 187,
      discount: 20
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Auto slide banner
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home">
      {/* Banner Slider */}
      <div className="banner-container">
        <div 
          className="banner-slider" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerImages.map((image, index) => (
            <div key={index} className="banner-slide">
              <img src={image} alt={`Banner ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="banner-dots">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <section className="categories">
        <h2>Shop By Category</h2>
        <div className="category-list">
          {categories.map(category => (
            <Link to={category.link} key={category.id} className="category-card">
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
              {product.discount > 0 && (
                <span className="discount-badge">{product.discount}% OFF</span>
              )}
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="price-container">
                  <span className="price">${product.price.toFixed(2)}</span>
                  {product.discount > 0 && (
                    <span className="original-price">
                      ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="rating">
                  <span className="stars">{product.rating}★</span>
                  <span className="reviews">({product.reviews})</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Deals Section */}
      <section className="deals-section">
        <h2>Today's Deals</h2>
        <div className="deals-grid">
          <div className="deal-card big">
            <img src="https://via.placeholder.com/400x200" alt="Big Deal" />
            <div className="deal-info">
              <h3>Special Offer</h3>
              <p>Up to 50% off on selected items</p>
              <Link to="/products" className="deal-btn">Shop Now</Link>
            </div>
          </div>
          <div className="deal-card">
            <img src="https://via.placeholder.com/200" alt="Deal 1" />
            <div className="deal-info">
              <h3>Flash Sale</h3>
              <p>24 Hours Only</p>
              <Link to="/products" className="deal-btn">View Deals</Link>
            </div>
          </div>
          <div className="deal-card">
            <img src="https://via.placeholder.com/200" alt="Deal 2" />
            <div className="deal-info">
              <h3>Clearance</h3>
              <p>Last Chance to Buy</p>
              <Link to="/products" className="deal-btn">Shop Now</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 