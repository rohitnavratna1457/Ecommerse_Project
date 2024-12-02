import React from 'react';
import './Orders.css';

const CompletedOrders = () => {
  const completedOrders = [
    {
      id: "ORD002",
      customer: "Jane Smith",
      date: "2024-03-19",
      amount: "₹2,499",
      status: "Delivered",
      deliveryDate: "2024-03-22"
    },
    {
      id: "ORD004",
      customer: "Sarah Wilson",
      date: "2024-03-18",
      amount: "₹1,899",
      status: "Delivered",
      deliveryDate: "2024-03-21"
    }
  ];

  return (
    <div className="orders-container">
      <div className="page-header">
        <h1>Completed Orders</h1>
        <div className="order-stats">
          <div className="stat-item">
            <span className="stat-label">Total Completed</span>
            <span className="stat-value completed">25</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">This Month</span>
            <span className="stat-value">12</span>
          </div>
        </div>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Order Date</th>
              <th>Delivery Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {completedOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.deliveryDate}</td>
                <td>{order.amount}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="view-btn">View Details</button>
                    <button className="invoice-btn">Invoice</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedOrders; 