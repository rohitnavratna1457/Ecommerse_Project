import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './SuperAdminDashboard.css';
import Category from './component/Category';
import Subcategory from './component/Subcategory';
import Products from './component/Products';
import Sellers from './component/Sellers';
import Overview from './component/Overview';
import { FaDashboard, FaList, FaTags, FaShoppingCart, FaUsers } from 'react-icons/fa';

const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="admin-dashboard">
      <nav className="admin-sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li><Link to="/superadmin/dashboard"> Overview</Link></li>
          <li><Link to="/superadmin/dashboard/category"><FaList /> Category</Link></li>
          <li><Link to="/superadmin/dashboard/subcategory"><FaTags /> Subcategory</Link></li>
          <li><Link to="/superadmin/dashboard/products"><FaShoppingCart /> Products</Link></li>
          <li><Link to="/superadmin/dashboard/sellers"><FaUsers /> Sellers</Link></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </nav>
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/category" element={<Category />} />
          <Route path="/subcategory" element={<Subcategory />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sellers" element={<Sellers />} />
        </Routes>
      </div>
    </div>
  );
};


export default AdminDashboard; 