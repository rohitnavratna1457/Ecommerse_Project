import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Dashboard from '../pages/dashboard';
import Products from './components/products/Products';
import Orders from './components/Orders';
import Analytics from './components/Analytics';
import Addkyc from './components/kyc/AddKyc';
import './DashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <TopNav />
      
      <main className="dashboard-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products/*" element={<Products />} />
          <Route path="/orders/*" element={<Orders />} />
          <Route path="/analytics/*" element={<Analytics />} />
          <Route path="/addkyc/*" element={<Addkyc />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Routes>
      </main>
    </div>
  );
};

export default DashboardLayout; 