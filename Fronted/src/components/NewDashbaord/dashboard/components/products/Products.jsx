import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import Categories from './Categories';

const Products = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/categories" element={<Categories />} />
    </Routes>
  );
};

export default Products; 