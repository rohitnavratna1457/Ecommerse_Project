import React from 'react';
import './Orders.css';

const AllOrders = () => {
  const orders = [
    {
      id: "ORD001",
      customer: "John Doe",
      date: "2024-03-20",
      amount: "₹1,299",
      status: "Pending"
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      date: "2024-03-19",
      amount: "₹2,499",
      status: "Completed"
    }
  ];

  return (
    <div className="orders-container">
      <div className="page-header">
        <h1>All Orders</h1>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.amount}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="view-btn">View</button>
                    <button className="update-btn">Update</button>
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

export default AllOrders; 