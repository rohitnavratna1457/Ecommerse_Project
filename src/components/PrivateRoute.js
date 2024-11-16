import React from 'react';
import { Navigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const PrivateRoute = ({ children }) => {
  const { user } = useShop();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute; 