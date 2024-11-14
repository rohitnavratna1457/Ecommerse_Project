import React from 'react';
import Header from './Component/Header_Page/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Categories from './Component/Categories/Categories';
// import CategoryPage from './Component/CategoryPage/CategoryPage';  // Import the CategoryPage component

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Categories />} />
          {/* <Route path="/categories/:categoryName" element={<CategoryPage />} /> Add route for category page */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
