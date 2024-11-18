import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { FaStore } from 'react-icons/fa';
import './SellerLogin.css';

const SellerLogin = () => {
  const { login, user, isSeller } = useShop();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    businessName: '',
    gstin: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (user && isSeller) {
      navigate('/seller/dashboard');
    }
  }, [user, isSeller, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      login({
        ...formData,
        isSeller: true
      });
      navigate('/seller/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="seller-login-container">
      <div className="seller-login-box">
        <div className="seller-login-header">
          <FaStore className="store-icon" />
          <h2>{isLogin ? 'Seller Login' : 'Register as Seller'}</h2>
          <p>{isLogin ? 'Login to manage your business' : 'Start selling on ShopCart'}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  name="businessName"
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="gstin"
                  placeholder="GSTIN Number"
                  value={formData.gstin}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="address"
                  placeholder="Business Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? 'Login as Seller' : 'Register as Seller'}
          </button>
        </form>

        <div className="toggle-form">
          {isLogin ? "Don't have a seller account?" : "Already have a seller account?"}
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register Now' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin; 