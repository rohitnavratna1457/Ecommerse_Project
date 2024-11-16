import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/press">Press</Link></li>
            <li><Link to="/corporate-info">Corporate Information</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Help</h3>
          <ul>
            <li><Link to="/payments">Payments</Link></li>
            <li><Link to="/shipping">Shipping</Link></li>
            <li><Link to="/returns">Returns</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Policy</h3>
          <ul>
            <li><Link to="/return-policy">Return Policy</Link></li>
            <li><Link to="/terms">Terms of Use</Link></li>
            <li><Link to="/security">Security</Link></li>
            <li><Link to="/privacy">Privacy</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Social</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <p>Email: support@shopcart.com</p>
            <p>Phone: 1-800-123-4567</p>
            <p>Address: 123 Shopping Street,</p>
            <p>E-commerce City, EC 12345</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="payment-methods">
            <img src="/visa.png" alt="Visa" />
            <img src="/mastercard.png" alt="Mastercard" />
            <img src="/paypal.png" alt="PayPal" />
            <img src="/amex.png" alt="American Express" />
          </div>
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} ShopCart. All rights reserved.</p>
          </div>
          <div className="app-downloads">
            <a href="#" className="app-button">
              <img src="/app-store.png" alt="Download on App Store" />
            </a>
            <a href="#" className="app-button">
              <img src="/play-store.png" alt="Get it on Play Store" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 