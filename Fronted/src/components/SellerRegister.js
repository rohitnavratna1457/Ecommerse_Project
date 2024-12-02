import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sellerRegister } from '../Api/CoreApi';
import './SellerRegister.css';
import { message } from 'antd';

const SellerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    mobile_no: '',
    address: '',
    bussiness_name: '',
    bussiness_address: '',
    bussiness_mobile_no: '',
    user_type: 'Seller'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await sellerRegister(formData);
      console.log(formData)
      navigate('/seller-login');
      
    } catch (err) {
      console.error('Registration Error:', err);
      if (err.response?.data) {
        // Handle specific field errors from backend
        const errors = Object.entries(err.response.data)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('\n');
        setError(errors);
        message.error('Please check all required fields.');
      } else {
        setError('Registration failed. Please try again.');
        message.error('Registration failed. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Seller Registration</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          {/* Personal Information Section */}
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="tel"
                name="mobile_no"
                placeholder="Mobile Number"
                value={formData.mobile_no}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <textarea
                name="address"
                placeholder="Personal Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Business Information Section */}
          <div className="form-section">
            <h3 className="section-title">Business Information</h3>
            <div className="input-group">
              <input
                type="text"
                name="bussiness_name"
                placeholder="Business Name"
                value={formData.bussiness_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <textarea
                name="bussiness_address"
                placeholder="Business Address"
                value={formData.bussiness_address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="tel"
                name="bussiness_mobile_no"
                placeholder="Business Contact Number"
                value={formData.bussiness_mobile_no}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password Section */}
          <div className="form-section">
            <h3 className="section-title">Security</h3>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password2"
                placeholder="Confirm Password"
                value={formData.password2}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Button Section */}
          <div className="button-section">
            <button
              type="submit"
              className="register-button"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register as Seller'}
            </button>
            
            <div className="login-link">
              <button
                onClick={() => navigate('/seller-login')}
                type="button"
              >
                Already have an account? Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerRegister; 