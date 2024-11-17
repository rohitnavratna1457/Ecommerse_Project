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
      image: 'data:image/jpeg;base64,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',
      rating: 4.5,
      reviews: 128,
      discount: 10
    },
    {
      id: 2,
      name: 'Samsung Galaxy S21',
      price: 799.99,
      image: 'data:image/jpeg;base64,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',
      rating: 4.3,
      reviews: 95,
      discount: 15
    },
    {
      id: 3,
      name: 'MacBook Pro',
      price: 1299.99,
      image: 'data:image/jpeg;base64,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',
      rating: 4.8,
      reviews: 75,
      discount: 5
    },
    {
      id: 4,
      name: 'AirPods Pro',
      price: 249.99,
      image: 'data:image/jpeg;base64,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',
      rating: 4.6,
      reviews: 187,
      discount: 20
    },
    {
      id: 5,
      name: 'Oppo Reno11 5g ',
      price: 249.99,
      image: 'data:image/jpeg;base64,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',
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
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScaGX_vG3MZb2fRcJq1zuLQRSzF_w0vNE7PQ&s" alt="Big Deal" />
            <div className="deal-info">
              <h3>Special Offer</h3>
              <p>Up to 50% off on selected items</p>
              <Link to="/products" className="deal-btn">Shop Now</Link>
            </div>
          </div>
          <div className="deal-card">
            <img src="https://cdn.mos.cms.futurecdn.net/AVEcca7TuDmt8wjaFZPkzj.jpg" alt="Deal 1" />
            <div className="deal-info">
              <h3>Flash Sale</h3>
              <p>24 Hours Only</p>
              <Link to="/products" className="deal-btn">View Deals</Link>
            </div>
          </div>
          <div className="deal-card">
            <img src="https://rukminim2.flixcart.com/image/850/1000/j9it30w0/laptop-skin-decal/v/a/u/apple-logo-laptop-skin-sticker-hdm-15-6-original-imaezab8tc6fnjr6.jpeg?q=90&crop=false" alt="Deal 2" />
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