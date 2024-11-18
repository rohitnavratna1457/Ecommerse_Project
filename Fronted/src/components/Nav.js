import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { FaSearch, FaShoppingCart, FaUser, FaHeart, FaStore } from 'react-icons/fa';
import './Nav.css';

const Nav = () => {
  const { user, logout, getCartCount, isSeller } = useShop();
  const cartCount = getCartCount();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-brand">
          <Link to="/">
            <span className="brand-name">ShopCart</span>
          </Link>
        </div>

        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <FaSearch />
            </button>
          </form>
        </div>

        <div className="nav-links">
          {!user && (
            <Link to="/seller-login" className="nav-link">
              <FaStore className="nav-icon" />
              <span>Become a Seller</span>
            </Link>
          )}

          {user ? (
            isSeller ? (
              <Link to="/seller/dashboard" className="nav-link">
                <FaStore className="nav-icon" />
                <span>Seller Dashboard</span>
              </Link>
            ) : (
              <div className="user-menu">
                <div className="user-info">
                  <FaUser className="user-icon" />
                  <span className="username">
                    Hello, {user?.name || 'User'}
                  </span>
                  <div className="dropdown-content">
                    <Link to="/profile">My Profile</Link>
                    <Link to="/orders">Orders</Link>
                    <Link to="/wishlist">Wishlist</Link>
                    <button onClick={logout} className="logout-btn">Logout</button>
                  </div>
                </div>
              </div>
            )
          ) : (
            <Link to="/login" className="nav-link">
              <FaUser className="nav-icon" />
              <span>Login</span>
            </Link>
          )}

          {!isSeller && (
            <>
              <Link to="/wishlist" className="nav-link">
                <FaHeart className="nav-icon" />
                <span>Wishlist</span>
              </Link>

              <Link to="/cart" className="nav-link cart-link">
                <div className="cart-icon-container">
                  <FaShoppingCart className="nav-icon" />
                  {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </div>
                <span>Cart</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav; 