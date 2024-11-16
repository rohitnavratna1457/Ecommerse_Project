import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import './Cart.css';
import { FaShoppingBag, FaArrowRight } from 'react-icons/fa';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useShop();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <img 
          src="/empty-cart.png" 
          alt="Empty Cart" 
          className="empty-cart-icon"
        />
        <h2>Your Shopping Cart is Empty</h2>
        <p>
          Looks like you haven't added anything to your cart yet. 
          Explore our wide selection of products and find something you love!
        </p>
        
        <div className="suggestions">
          <h3>Quick Suggestions:</h3>
          <ul className="suggestion-list">
            <li>Check out today's deals and discounts</li>
            <li>Browse our trending products</li>
            <li>View your wishlist items</li>
            <li>Sign in to see saved items</li>
          </ul>
        </div>

        <div className="buttons">
          <button 
            className="continue-shopping"
            onClick={() => navigate('/products')}
          >
            <FaShoppingBag />
            Continue Shopping
          </button>
          <button 
            className="view-offers"
            onClick={() => navigate('/')}
          >
            View Special Offers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-content">
        <div className="cart-items">
          <h2>Shopping Cart ({cart.length} items)</h2>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">${item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-item">
            <span>Subtotal:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-total">
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart; 