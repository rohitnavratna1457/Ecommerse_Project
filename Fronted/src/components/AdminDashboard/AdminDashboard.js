import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';
import Category from './component/Category';
import Subcategory from './component/Subcategory';
import Products from './component/Products';
import ProductVerify from './component/ProductVerify';
import Overview from './component/Overview';
import SellerProfile from './component/SellerProfile';
import { FaDashboard, FaList, FaTags, FaShoppingCart, FaUsers } from 'react-icons/fa';

const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="admin-dashboard">
      <nav className="admin-sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li><Link to="/admin/dashboard"> Overview</Link></li>
          <li><Link to="/admin/dashboard/category"><FaList /> Category</Link></li>
          <li><Link to="/admin/dashboard/subcategory"><FaTags /> Subcategory</Link></li>
          <li><Link to="/admin/dashboard/products"><FaShoppingCart /> Products</Link></li>
          <li><Link to="/admin/dashboard/ProductVerify"><FaUsers /> Product Verify</Link></li>
          <li><Link to="/admin/dashboard/SellerProfile"><FaUsers /> Seller Profiles Verify </Link></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </nav>
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/category" element={<Category />} />
          <Route path="/subcategory" element={<Subcategory />} />
          <Route path="/products" element={<Products />} />
          <Route path="/ProductVerify" element={<ProductVerify />} />
          <Route path="/SellerProfile" element={<SellerProfile />} />
        </Routes>
      </div>
    </div>
  );
};


export default AdminDashboard; 