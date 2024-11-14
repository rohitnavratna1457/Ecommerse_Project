import React from 'react';
import './Categories.css';
const categories = [    
  { name: 'Grocery', image: '/images/grocery.png' },
  { name: 'Mobiles', image: '/images/mobiles.png' },
  { name: 'Fashion', image: '/images/fashion.png' },
  { name: 'Electronics', image: '/images/electronics.png' },
  { name: 'Home & Furniture', image: '/images/home-furniture.png' },
  { name: 'Appliances', image: '/images/appliances.png' },
  { name: 'Beauty, Toys & More', image: '/images/beauty-toys.png' },
];

const Categories = () => {
  return (
    <div className="categories">
      {categories.map((category, index) => (
        <div key={index} className="category" style={{ cursor: 'default' }}>
          <img src={category.image} alt={category.name} className="category-image" />
          <span className="category-name">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
