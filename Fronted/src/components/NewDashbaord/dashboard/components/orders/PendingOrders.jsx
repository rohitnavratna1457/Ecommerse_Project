import React from 'react';
import './Orders.css';

const PendingOrders = () => {
  const pendingOrders = [
    {
      id: "ORD001",
      customer: "John Doe",
      date: "2024-03-20",
      amount: "₹1,299",
      status: "Processing",
      items: 3
    },
    {
      id: "ORD003",
      customer: "Mike Johnson",
      date: "2024-03-20",
      amount: "₹2,199",
      status: "Confirmed",
      items: 2
    }
  ];

  return (
    <div className="orders-container">
      <div className="page-header">
        <h1>Pending Orders</h1>
        <div className="order-stats">
          <div className="stat-item">
            <span className="stat-label">Processing</span>
            <span className="stat-value processing">2</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">To Ship</span>
            <span className="stat-value to-ship">3</span>
          </div>
        </div>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.items}</td>
                <td>{order.amount}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="view-btn">View</button>
                    <button className="process-btn">Process</button>
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

export default PendingOrders; 