import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sellerRegister } from '../Api/CoreApi';
import { FaStore, FaUser, FaBuilding, FaIdCard, FaPhone, FaMapMarkerAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import './SellerRegister.css';

const SellerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    address: '',
    password: '',
    password2: '',
    bussiness_name: '',
    bussiness_address: '',
    image: [],
    bussiness_mobile_no: '',
    user_type: 'Seller'
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await sellerRegister(formData);
     
      if (response.status === 'success') {
        navigate('/seller-login');
      }
    } catch (error) {
      setError(error.message || 'Registration failed');
    }
  };

  return (
    <div className="seller-container">
      <div className="seller-box seller-register-box">
        <div className="seller-header">
          <FaStore className="seller-icon" />
          <h2>Seller Registration</h2>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>
                <FaUser className="input-icon" />
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>
                <FaEnvelope className="input-icon" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <FaPhone className="input-icon" />
                Mobile No
              </label>
              <input
                type="tel"
                value={formData.mobile_no}
                onChange={(e) => setFormData({...formData, mobile_no: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>
                <FaMapMarkerAlt className="input-icon" />
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <FaLock className="input-icon" />
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>
                <FaLock className="input-icon" />
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.password2}
                onChange={(e) => setFormData({...formData, password2: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              <FaBuilding className="input-icon" />
              Business Name
            </label>
            <input
              type="text"
              value={formData.bussiness_name}
              onChange={(e) => setFormData({...formData, bussiness_name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaMapMarkerAlt className="input-icon" />
              Business Address
            </label>
            <textarea
              value={formData.bussiness_address}
              onChange={(e) => setFormData({...formData, bussiness_address: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaPhone className="input-icon" />
              Business Mobile No
            </label>
            <input
              type="tel"
              value={formData.bussiness_mobile_no}
              onChange={(e) => setFormData({...formData, bussiness_mobile_no: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>
              Image
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => setFormData({...formData, image: Array.from(e.target.files)})}
              required
            />
          </div>

          <button type="submit" className="seller-btn">Register</button>
          <div className="seller-links">
            <button onClick={() => navigate('/seller-login')} className="link-btn">
              Already have an account? Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerRegister; 