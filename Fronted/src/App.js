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
import SuperAdminDashboard from './components/SuperAdminDashbaord/SuperAdminDashboard'
import Seller_Kyc from './components/SuperAdminDashbaord/component/Seller_Kyc';

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
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/Seller_Kyc" element={<Seller_Kyc />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/seller-login" element={<SellerLogin />} />
                <Route path='/seller-register' element={<SellerRegister/>}/>
                <Route path="/unauthorized" element={<Unauthorized />} />
                 {/* Super Admin Routes */}
                 <Route 
                  path="/superadmin/dashboard/*" 
                  element={
                    // <ProtectedRoute allowedRoles={['Seller']}>
                      <SuperAdminDashboard />
                    // </ProtectedRoute>
                  } 
                />
                 {/* Seller Routes */}
                 <Route 
                  path="/seller/dashboard/*" 
                  element={
                    // <ProtectedRoute allowedRoles={['Seller']}>
                      <NewDashboard />
                    // </ProtectedRoute>
                  } 
                />

                {/* Admin Routes */}
                <Route 
                  path="/admin/dashboard/*" 
                  element={
                    // <ProtectedRoute allowedRoles={['Admin']}>
                      <AdminDashboard />
                    // </ProtectedRoute>
                  } 
                />

                {/* Protected Routes */}
                <Route 
                  path="/cart" 
                  element={
                    <ProtectedRoute allowedRoles={['user', 'Seller', 'Admin']}>
                      <Cart />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute allowedRoles={['user', 'Seller', 'Admin']}>
                      <Checkout />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/wishlist" 
                  element={
                    <ProtectedRoute allowedRoles={['user', 'Seller', 'Admin']}>
                      <Wishlist />
                    </ProtectedRoute>
                  } 
                />

               
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
