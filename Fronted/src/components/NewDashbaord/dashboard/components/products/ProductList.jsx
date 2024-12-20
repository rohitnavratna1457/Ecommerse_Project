import React, { useState, useEffect } from "react";
import "./Products.css";
import {
  GetProductdata,
  Productdelete,
  ProductUpdate,
} from "../../../../../Api/CoreApi";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product_name: "",
    main_image: "",
    slug: "",
    description: "",
    product_description: "",
    status: "",
    category: "",
    subcategory: "",
    brand: "",
    model_number: "",
    price: "",
    original_price: "",
    discount_percentage: "",
    quantity: "",
    inventory_status: "In Stock",
    low_stock_alert: false,
    is_physical: true,
    weight: "",
    weight_unit: "kg",
    dimensions: "",
    requires_shipping: true,
    shipping_cost: "",
    color: "",
    size: "",
    features: "",
    rating: 0,
    review_count: 0,
    return_policy: "",
    warranty: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  // Fetch all products
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const productList = await GetProductdata();
        if (productList) {
          setProducts(productList);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchAllProducts();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission for updating a product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ProductUpdate(currentProductId, formData);
      if (response) {
        alert("Product updated successfully!");
        const productList = await GetProductdata(); // Refresh product list
        setProducts(productList);
        closeModal();
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An unexpected error occurred.");
    }
  };

  // Open modal for editing
  const openModal = (product) => {
    setFormData(product);
    setIsEdit(true);
    setCurrentProductId(product.id);
  };

  // Close modal
  const closeModal = () => {
    setFormData({
      product_name: "",
      main_image: "",
      slug: "",
      description: "",
      product_description: "",
      status: "",
      category: "",
      subcategory: "",
      brand: "",
      model_number: "",
      price: "",
      original_price: "",
      discount_percentage: "",
      quantity: "",
      inventory_status: "In Stock",
      low_stock_alert: false,
      is_physical: true,
      weight: "",
      weight_unit: "kg",
      dimensions: "",
      requires_shipping: true,
      shipping_cost: "",
      color: "",
      size: "",
      features: "",
      rating: 0,
      review_count: 0,
      return_policy: "",
      warranty: "",
    });
    setIsEdit(false);
    setCurrentProductId(null);
  };

   // Handle product deletion
   const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const response = await Productdelete(id);
      if (response) {
        alert("Product deleted successfully!");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="product-container1">
      <h1>Product List</h1>

      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              {Object.keys(formData).map((key) => (
                <th key={key}>{key.replace(/_/g, " ")}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  {Object.keys(formData).map((key) => (
                    <td key={key}>{product[key]}</td>
                  ))}
                  <td>
                    <button onClick={() => openModal(product)} className="edit-btn">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={Object.keys(formData).length + 1}>
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isEdit && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Product</h2>
              <button onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              {Object.keys(formData).map((key) => (
                <div key={key} className="form-field">
                  <label>{key.replace(/_/g, " ")}</label>
                  {typeof formData[key] === "boolean" ? (
                    <input
                      type="checkbox"
                      name={key}
                      checked={formData[key]}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      type={
                        key === "price" || key === "quantity" ? "number" : "text"
                      }
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      placeholder={key}
                    />
                  )}
                </div>
              ))}
              <div className="modal-footer">
                <button type="button" onClick={closeModal} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
