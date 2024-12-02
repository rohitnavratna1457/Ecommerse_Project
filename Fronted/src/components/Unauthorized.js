import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Unauthorized.css';

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1>Unauthorized Access</h1>
        <p>Sorry, you don't have permission to access this page.</p>
        <button onClick={goBack} className="back-button">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Unauthorized; 