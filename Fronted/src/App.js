import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext';
import AdminRoute from './components/auth/AdminRoute';
import SellerRoute from './components/auth/SellerRoute';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Nav from './components/Nav';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Login from './components/Login';
import Checkout from './components/Checkout';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import Wishlist from './components/Wishlist';
import SellerLogin from './components/SellerLogin';
import NewDashboard from './components/NewDashbaord/dashboard/DashboardLayout';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Unauthorized from './components/Unauthorized';
import SellerRegister from './components/SellerRegister';

import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <ShopProvider>
        <Router>
          <div className="app">
            {!window.location.pathname.includes('/dashboard') && <Nav />}
            <main className="main-content">
              <Routes>
                {/* Public Routes - No Authentication Required */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/seller-login" element={<SellerLogin />} />
                <Route path="/seller-register" element={<SellerRegister/>} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Protected Seller Routes */}
                <Route path="/seller/dashboard/*" element={
                  <SellerRoute>
                    <NewDashboard />
                  </SellerRoute>
                } />

                {/* Protected Admin Routes */}
                <Route path="/admin/dashboard/*" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />

                {/* Protected User Routes */}
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            {!window.location.pathname.includes('/dashboard') && <Footer />}
          </div>
        </Router>
      </ShopProvider>
    </AuthProvider>
  );
};

export default App;
