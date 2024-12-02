import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSeller } from '../Api/CoreApi';
import './SellerLogin.css';
import { FaStore } from 'react-icons/fa';    

const SellerLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    try {
      const response = await loginSeller(credentials);
      
      if (response.access) {
        localStorage.setItem('refresh', response.refresh);
        localStorage.setItem('access', response.access);
        localStorage.setItem('user_type', 'Seller');
        navigate('/seller/dashboard');
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <FaStore className="store-icon" />
        <h2> Welcome Back</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="login-button single-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          {/* Link to Register */}
          <div className="seller-links">
            <button
              onClick={() => navigate('/seller-register')}
              className="link-btn"
            >
              Create new account? Register now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerLogin;
