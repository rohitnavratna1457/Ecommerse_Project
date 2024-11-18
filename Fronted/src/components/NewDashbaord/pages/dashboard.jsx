import React from 'react';
import { FaShoppingBag, FaMoneyBillWave, FaBoxes, FaChartLine } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Welcome Back, Seller!</h1>
        <p>Here's what's happening with your store today.</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaMoneyBillWave />
          </div>
          <div className="stat-details">
            <h3>Total Revenue</h3>
            <p className="stat-value">₹50,000</p>
            <span className="stat-change positive">+15% from last month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaShoppingBag />
          </div>
          <div className="stat-details">
            <h3>Total Orders</h3>
            <p className="stat-value">125</p>
            <span className="stat-change positive">+8% from last month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaBoxes />
          </div>
          <div className="stat-details">
            <h3>Products</h3>
            <p className="stat-value">48</p>
            <span className="stat-change neutral">Same as last month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaChartLine />
          </div>
          <div className="stat-details">
            <h3>Conversion Rate</h3>
            <p className="stat-value">3.2%</p>
            <span className="stat-change negative">-2% from last month</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-orders">
          <h2>Recent Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#ORD-001</td>
                <td>John Doe</td>
                <td>Product Name</td>
                <td>₹1,200</td>
                <td><span className="status pending">Pending</span></td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 