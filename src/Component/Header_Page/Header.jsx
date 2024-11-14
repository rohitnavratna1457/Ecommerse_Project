import React from 'react';
import '../Header_Page/Header.css'; // Import CSS file for styling
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome

function Header() {
  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <span className="explore-plus">Shopping <span className="plus">Portal</span> ✨</span>
      </div>

      {/* Search Section */}
      <div className="navbar-search">
        <input type="text" placeholder="Search for Products, Brands, and More" />
        <button className="search-button">
          <i className="fas fa-search"></i> {/* Search icon */}
        </button>
      </div>

      {/* User Account Section */}
      <div className="navbar-account">
        <i className="fas fa-user-circle"></i>
        <span>Rohit Kumar</span>
      </div>

      {/* Cart Section */}
      <div className="navbar-cart">
        <i className="fas fa-shopping-cart"></i>
        <span>Cart</span>
        <div className="cart-badge">2</div>
      </div>

      
    </div>
  );
}

export default Header;
