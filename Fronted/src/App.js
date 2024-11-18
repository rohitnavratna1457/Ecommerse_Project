import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import Nav from './components/Nav';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Login from './components/Login';
import Checkout from './components/Checkout';
import PrivateRoute from './components/PrivateRoute';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import Wishlist from './components/Wishlist';
import Rohit from './components/Rohit';
import SellerLogin from './components/SellerLogin';
import NewDashboard from './components/NewDashbaord/dashboard/DashboardLayout';
import './App.css'

const SellerRoute = ({ children }) => {
  const { user, isSeller } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !isSeller) {
      navigate('/seller-login');
    }
  }, [user, isSeller, navigate]);

  return user && isSeller ? children : null;
};

const App = () => {
  return (
    <ShopProvider>
      <Router>
        <div className="app">
          {!window.location.pathname.includes('/seller/dashboard') && <Nav />}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/rohit" element={<Rohit />} />
              <Route 
                path="/checkout" 
                element={
                  <PrivateRoute>
                    <Checkout />
                  </PrivateRoute>
                } 
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/seller-login" element={<SellerLogin />} />
              <Route 
                path="/seller/dashboard/*" 
                element={
                  <SellerRoute>
                    <NewDashboard />
                  </SellerRoute>
                } 
              />
            </Routes>
          </main>
          {!window.location.pathname.includes('/seller/dashboard') && <Footer />}
        </div>
      </Router>
    </ShopProvider>
  );
};

export default App;
