import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    brand: 'all'
  });
  const [sortBy, setSortBy] = useState('featured');

  // Simulated product data
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: 'iPhone 13 Pro',
          price: 999.99,
          image: 'https://via.placeholder.com/200',
          category: 'smartphones',
          brand: 'Apple',
          rating: 4.5,
          reviews: 128,
          description: '6.1-inch Super Retina XDR display, A15 Bionic chip',
          inStock: true
        },
        {
          id: 2,
          name: 'Samsung Galaxy S21',
          price: 799.99,
          image: 'https://via.placeholder.com/200',
          category: 'smartphones',
          brand: 'Samsung',
          rating: 4.3,
          reviews: 95,
          description: '6.2-inch Dynamic AMOLED 2X, Exynos 2100',
          inStock: true
        },
        {
          id: 3,
          name: 'MacBook Pro 14"',
          price: 1999.99,
          image: 'https://via.placeholder.com/200',
          category: 'laptops',
          brand: 'Apple',
          rating: 4.8,
          reviews: 75,
          description: 'M1 Pro chip, 16GB RAM, 512GB SSD',
          inStock: true
        },
        {
          id: 4,
          name: 'Dell XPS 15',
          price: 1799.99,
          image: 'https://via.placeholder.com/200',
          category: 'laptops',
          brand: 'Dell',
          rating: 4.4,
          reviews: 62,
          description: 'Intel i7, 32GB RAM, 1TB SSD',
          inStock: false
        },
        {
          id: 5,
          name: 'iPad Air',
          price: 599.99,
          image: 'https://via.placeholder.com/200',
          category: 'tablets',
          brand: 'Apple',
          rating: 4.6,
          reviews: 89,
          description: '10.9-inch Liquid Retina display, M1 chip',
          inStock: true
        },
        {
          id: 6,
          name: 'Sony WH-1000XM4',
          price: 349.99,
          image: 'https://via.placeholder.com/200',
          category: 'accessories',
          brand: 'Sony',
          rating: 4.7,
          reviews: 156,
          description: 'Wireless Noise Cancelling Headphones',
          inStock: true
        },
        {
          id: 7,
          name: 'Samsung Galaxy Tab S7',
          price: 649.99,
          image: 'https://via.placeholder.com/200',
          category: 'tablets',
          brand: 'Samsung',
          rating: 4.4,
          reviews: 72,
          description: '12.4-inch AMOLED display, S Pen included',
          inStock: true
        },
        {
          id: 8,
          name: 'Apple Watch Series 7',
          price: 399.99,
          image: 'https://via.placeholder.com/200',
          category: 'wearables',
          brand: 'Apple',
          rating: 4.5,
          reviews: 94,
          description: 'Always-On Retina display, ECG app',
          inStock: true
        },
        {
          id: 9,
          name: 'Lenovo ThinkPad X1',
          price: 1599.99,
          image: 'https://via.placeholder.com/200',
          category: 'laptops',
          brand: 'Lenovo',
          rating: 4.3,
          reviews: 45,
          description: 'Intel i7, 16GB RAM, 512GB SSD',
          inStock: true
        },
        {
          id: 10,
          name: 'AirPods Pro',
          price: 249.99,
          image: 'https://via.placeholder.com/200',
          category: 'accessories',
          brand: 'Apple',
          rating: 4.6,
          reviews: 187,
          description: 'Active Noise Cancellation, Spatial Audio',
          inStock: true
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filterProducts = () => {
    let filtered = [...products];

    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    if (filters.brand !== 'all') {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    if (filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case 'under500':
          filtered = filtered.filter(product => product.price < 500);
          break;
        case '500to1000':
          filtered = filtered.filter(product => product.price >= 500 && product.price < 1000);
          break;
        case 'over1000':
          filtered = filtered.filter(product => product.price >= 1000);
          break;
        default:
          break;
      }
    }

    // Sort products
    switch (sortBy) {
      case 'priceLow':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - no sorting needed
        break;
    }

    return filtered;
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  const filteredProducts = filterProducts();

  return (
    <div className="products-page">
      <div className="filters">
        <div className="filter-section">
          <h3>Categories</h3>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="category"
                checked={filters.category === 'all'}
                onChange={() => handleFilterChange('category', 'all')}
              />
              All Categories
            </label>
            {['smartphones', 'laptops', 'tablets', 'accessories', 'wearables'].map(category => (
              <label key={category} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category}
                  onChange={() => handleFilterChange('category', category)}
                />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>Price Range</h3>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === 'all'}
                onChange={() => handleFilterChange('priceRange', 'all')}
              />
              All Prices
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === 'under500'}
                onChange={() => handleFilterChange('priceRange', 'under500')}
              />
              Under $500
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === '500to1000'}
                onChange={() => handleFilterChange('priceRange', '500to1000')}
              />
              $500 - $1000
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === 'over1000'}
                onChange={() => handleFilterChange('priceRange', 'over1000')}
              />
              Over $1000
            </label>
          </div>
        </div>
      </div>

      <div className="products-content">
        <div className="sort-section">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <div className="product-list">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                <div className="rating">
                  <span>{product.rating}★</span>
                  <span className="reviews">({product.reviews} reviews)</span>
                </div>
                {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products; 