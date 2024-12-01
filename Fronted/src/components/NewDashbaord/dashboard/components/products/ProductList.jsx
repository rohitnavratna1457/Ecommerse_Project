import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import './Products.css';

const ProductList = () => {
  const products = [
    { id: 1, name: 'Product 1', price: '₹999', stock: 10, status: 'Active' },
    { id: 2, name: 'Product 2', price: '₹1499', stock: 5, status: 'Active' },
    // Add more products
  ];

  return (
    <div className="product-list-container">
      <div className="page-header">
        <h1>Products</h1>
        <Link to="/seller/dashboard/products/add" className="add-button">
          <FaPlus /> Add New Product
        </Link>
      </div>

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`status ${product.status.toLowerCase()}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
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

export default ProductList; 