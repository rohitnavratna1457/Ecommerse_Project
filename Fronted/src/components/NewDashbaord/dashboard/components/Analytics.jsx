import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SalesAnalytics from './analytics/SalesAnalytics';
import ProductAnalytics from './analytics/ProductAnalytics';

const Analytics = () => {
  return (
    <Routes>
      <Route path="/sales" element={<SalesAnalytics />} />
      <Route path="/products" element={<ProductAnalytics />} />
    </Routes>
  );
};

export default Analytics; 
