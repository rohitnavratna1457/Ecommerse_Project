import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllOrders from './orders/AllOrders';
import PendingOrders from './orders/PendingOrders';
import CompletedOrders from './orders/CompletedOrders';

const Orders = () => {
  return (
    <Routes>
      <Route path="/" element={<AllOrders />} />
      <Route path="/pending" element={<PendingOrders />} />
      <Route path="/completed" element={<CompletedOrders />} />
    </Routes>
  );
};

export default Orders; 
