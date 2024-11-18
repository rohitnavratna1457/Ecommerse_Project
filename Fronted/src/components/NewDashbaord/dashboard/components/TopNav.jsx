import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBell, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { useShop } from '../../../../context/ShopContext';
import './TopNav.css';

const TopNav = () => {
  const { user, logout } = useShop();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/seller-login');
  };

  return (
    <div className="top-nav">
      <div className="nav-right">
        <div className="notification-icon">
          <FaBell />
          <span className="notification-badge">3</span>
        </div>
        
        <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
          <div className="user-avatar">
            {user?.profilePic ? (
              <img src={user.profilePic} alt="profile" />
            ) : (
              <FaUserCircle />
            )}
          </div>
          <div className="user-info">
            <span className="user-name">{user?.businessName || user?.name || 'Seller'}</span>
            <span className="user-role">Seller</span>
          </div>
          
          {showDropdown && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <div className="user-avatar-large">
                  {user?.profilePic ? (
                    <img src={user.profilePic} alt="profile" />
                  ) : (
                    <FaUserCircle />
                  )}
                </div>
                <div>
                  <p className="user-name-large">{user?.businessName || user?.name}</p>
                  <p className="user-email">{user?.email}</p>
                </div>
              </div>
              
              <div className="dropdown-items">
                <button onClick={() => navigate('/seller/dashboard/profile')}>
                  <FaUserCircle />
                  <span>My Profile</span>
                </button>
                <button onClick={() => navigate('/seller/dashboard/settings')}>
                  <FaCog />
                  <span>Settings</span>
                </button>
                <button onClick={handleLogout} className="logout-btn">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav; 