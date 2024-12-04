import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useShop();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  if (wishlist?.length === 0) {
    return (
      <div className="empty-wishlist">
        <div className="empty-wishlist-content">
          <FaHeart className="wishlist-icon" />
          <h2>Your Wishlist is Empty</h2>
          <p>Save items that you like in your wishlist and review them anytime.</p>
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1>My Wishlist ({wishlist?.length} items)</h1>
      </div>
      
      <div className="wishlist-grid">
        {wishlist?.map(product => (
          <div key={product.id} className="wishlist-item">
            <button 
              className="remove-btn"
              onClick={() => removeFromWishlist(product.id)}
            >
              ×
            </button>
            
            <Link to={`/product/${product.id}`} className="product-link">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="rating">
                  <span className="stars">{product.rating}★</span>
                  <span className="reviews">({product.reviews} Reviews)</span>
                </div>
                <div className="price-info">
                  <span className="current-price">${product.price}</span>
                  {product.discount > 0 && (
                    <span className="original-price">
                      ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </Link>

            <div className="item-actions">
              <button 
                className="move-to-cart"
                onClick={() => handleAddToCart(product)}
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist; 