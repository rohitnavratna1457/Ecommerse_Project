import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details
    // For now using the sample data
    setProduct({
      id: parseInt(id),
      name: 'Sample Product',
      price: 499.99,
      description: 'A powerful device with amazing features.',
      brand: 'TechBrand',
      rating: 4.5,
      reviews: 128,
      stock: 50,
      images: [
        'https://via.placeholder.com/400',
        'https://via.placeholder.com/400',
        'https://via.placeholder.com/400',
        'https://via.placeholder.com/400'
      ],
      specifications: {
        'Display': '6.5 inch AMOLED',
        'Processor': 'Latest Gen',
        'RAM': '8GB',
        'Storage': '128GB',
        'Battery': '4500mAh',
        'Camera': '48MP + 12MP + 8MP'
      }
    });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details-content">
        {/* Product Images Section */}
        <div className="product-images">
          <div className="thumbnail-list">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
          <div className="main-image">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
            />
          </div>
          <div className="product-actions">
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button 
              className="buy-now-btn"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="product-rating">
            <span className="rating">{product.rating}★</span>
            <span className="reviews">({product.reviews} Reviews)</span>
          </div>
          <div className="product-price">
            <h2>${product.price}</h2>
            <div className="quantity-selector">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-specifications">
            <h3>Specifications</h3>
            <table>
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <td className="spec-key">{key}</td>
                    <td className="spec-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 