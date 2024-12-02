import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getlogin } from '../Api/CoreApi';
import './Login.css';

const Login = () => {
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
      const response = await getlogin(credentials);
      
      if (response.access) {
        localStorage.setItem('refresh', response.refresh);
        localStorage.setItem('access', response.access);
        localStorage.setItem('user_type', response.user.user_type);

        // Navigate based on user type
        switch (response.user.user_type) {
          case 'Customer':
            navigate('/dashboard');
            break;
          case 'Admin':
            navigate('/admin/dashboard');
            break;
          default:
            setError('Invalid user type');
            localStorage.clear();
        }
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
        <h2>Welcome Back</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="login-button single-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className="login-links">
            <button
              onClick={() => navigate('/signup')}
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
