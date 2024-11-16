import React, { useState } from 'react';
import './Checkout.css';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Details
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    // Payment Details
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  // Sample cart items - replace with actual cart data
  const cartItems = [
    {
      id: 1,
      name: 'Smartphone XYZ',
      price: 499.99,
      quantity: 1,
      image: 'smartphone.jpg'
    },
    {
      id: 2,
      name: 'Laptop ABC',
      price: 999.99,
      quantity: 1,
      image: 'laptop.jpg'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePreviousStep = () => {
    setActiveStep(activeStep - 1);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order submission
    console.log('Order submitted:', { formData, cartItems });
  };

  return (
    <div className="checkout-container">
      {/* Checkout Steps */}
      <div className="checkout-steps">
        <div className={`step ${activeStep >= 1 ? 'active' : ''}`}>
          1. Shipping
        </div>
        <div className={`step ${activeStep >= 2 ? 'active' : ''}`}>
          2. Payment
        </div>
        <div className={`step ${activeStep >= 3 ? 'active' : ''}`}>
          3. Review
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-form">
          {/* Shipping Details Form */}
          {activeStep === 1 && (
            <div className="shipping-details">
              <h2>Shipping Details</h2>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Payment Details Form */}
          {activeStep === 2 && (
            <div className="payment-details">
              <h2>Payment Details</h2>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Name on Card"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Order Review */}
          {activeStep === 3 && (
            <div className="order-review">
              <h2>Review Your Order</h2>
              <div className="review-section">
                <h3>Shipping Address</h3>
                <p>{formData.fullName}</p>
                <p>{formData.address}</p>
                <p>{formData.city}, {formData.state} - {formData.pincode}</p>
                <p>Phone: {formData.phone}</p>
              </div>
              <div className="review-section">
                <h3>Payment Method</h3>
                <p>Card ending in {formData.cardNumber.slice(-4)}</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="form-navigation">
            {activeStep > 1 && (
              <button 
                className="back-btn"
                onClick={handlePreviousStep}
              >
                Back
              </button>
            )}
            {activeStep < 3 ? (
              <button 
                className="next-btn"
                onClick={handleNextStep}
              >
                Continue
              </button>
            ) : (
              <button 
                className="place-order-btn"
                onClick={handleSubmit}
              >
                Place Order
              </button>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p className="item-price">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 