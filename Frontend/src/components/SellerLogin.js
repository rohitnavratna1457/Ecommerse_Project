import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Api/CoreApi';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    loginType: '' // Will be used to differentiate login type if required
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle input field changes
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
      // Make API call to login
      const response = await loginUser(credentials);
      console.log('Login Response:', response); // Debugging: log API response

      // Check if response contains necessary fields
      if (response.access && response.user.user_type) {
        // Save to localStorage
        localStorage.setItem('refresh', response.refresh);
        localStorage.setItem('access', response.access);
        localStorage.setItem('user_type', response.user.user_type);

        // Navigate based on user type
        switch (response.user.user_type) {
          case 'SuperAdmin':
            console.log('Navigating to Admin dashboard');
            navigate('/superadmin/dashboard/*');
            break;
          case 'Admin':
            console.log('Navigating to Admin dashboard');
            navigate('/admin/dashboard/*');
            break;
          case 'Seller':
            console.log('Navigating to Seller dashboard');
            navigate('/seller/dashboard/*');
            break;
          default:
            console.error('Unknown user type:', response.user_type);
            setError('Unknown user type. Please contact support.');
        }
      } else {
        setError('Unexpected server response. Please try again.');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
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

export default Login;
