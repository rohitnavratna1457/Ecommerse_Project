import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', description: 'Electronic items and gadgets', products: 25 },
    { id: 2, name: 'Clothing', description: 'Fashion and apparel', products: 40 },
    { id: 3, name: 'Books', description: 'Books and publications', products: 15 }
  ]);

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });

  const [editingCategory, setEditingCategory] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingCategory(null);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description
    });
    setIsAddingNew(false);
  };

  const handleDelete = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...newCategory }
          : cat
      ));
    } else {
      // Add new category
      setCategories([
        ...categories,
        {
          id: categories.length + 1,
          ...newCategory,
          products: 0
        }
      ]);
    }
    
    // Reset form
    setNewCategory({ name: '', description: '' });
    setEditingCategory(null);
    setIsAddingNew(false);
  };

  return (
    <div className="categories-container">
      <div className="categories-header">
        <h1>Categories</h1>
        <button className="add-category-btn" onClick={handleAddNew}>
          <FaPlus /> Add Category
        </button>
      </div>

      {(isAddingNew || editingCategory) && (
        <div className="category-form-container">
          <form onSubmit={handleSubmit} className="category-form">
            <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
            <div className="form-group">
              <label>Category Name</label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => {
                setIsAddingNew(false);
                setEditingCategory(null);
              }}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                {editingCategory ? 'Update' : 'Add'} Category
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="categories-grid">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            <div className="category-info">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <span className="product-count">{category.products} Products</span>
            </div>
            <div className="category-actions">
              <button 
                className="edit-btn"
                onClick={() => handleEdit(category)}
              >
                <FaEdit />
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(category.id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories; 