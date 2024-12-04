import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button, Image, Rate, Tag, message, Spin } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, HeartFilled, ArrowLeftOutlined } from '@ant-design/icons';
import API from '../Api/Api';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            const response = await API.get(`api/products/${id}/`);
            setProduct(response.data);
        } catch (error) {
            message.error('Failed to load product details');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-8">
                <h2 className="text-xl">Product not found</h2>
                <Button 
                    type="primary" 
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate('/products')}
                    className="mt-4"
                >
                    Back to Products
                </Button>
            </div>
        );
    }

    return (
        <div className="product-details-container">
            <Button 
                icon={<ArrowLeftOutlined />} 
                onClick={() => navigate('/products')}
                className="mb-4"
            >
                Back to Products
            </Button>
            
            <Card bordered={false}>
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={12}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            className="product-image"
                        />
                    </Col>

                    <Col xs={24} md={12}>
                        <div className="product-info">
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            
                            <div className="flex items-center mt-4">
                                <Rate disabled defaultValue={product.rating || 0} />
                                <span className="ml-2 text-gray-500">
                                    ({product.reviews} reviews)
                                </span>
                            </div>

                            <div className="price-tag">
                                ${product.price.toFixed(2)}
                            </div>

                            <div className="stock-status">
                                {product.inStock ? (
                                    <Tag color="green">In Stock</Tag>
                                ) : (
                                    <Tag color="red">Out of Stock</Tag>
                                )}
                            </div>

                            <p className="product-description">
                                {product.description}
                            </p>

                            <div className="action-buttons">
                                <Button
                                    type="primary"
                                    icon={<ShoppingCartOutlined />}
                                    size="large"
                                    disabled={!product.inStock}
                                    onClick={() => {
                                        message.success('Added to cart');
                                        // Add your cart logic here
                                    }}
                                >
                                    Add to Cart
                                </Button>

                                <Button
                                    icon={isWishlisted ? <HeartFilled /> : <HeartOutlined />}
                                    size="large"
                                    onClick={() => {
                                        setIsWishlisted(!isWishlisted);
                                        message.success(
                                            isWishlisted 
                                                ? 'Removed from wishlist' 
                                                : 'Added to wishlist'
                                        );
                                    }}
                                >
                                    {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                                </Button>
                            </div>

                            <div className="additional-details">
                                <h3 className="text-xl font-semibold">Product Details</h3>
                                <div className="details-grid">
                                    <div className="detail-item">
                                        <div className="detail-label">Category</div>
                                        <div className="detail-value">{product.category}</div>
                                    </div>
                                    <div className="detail-item">
                                        <div className="detail-label">Brand</div>
                                        <div className="detail-value">{product.brand}</div>
                                    </div>
                                    {/* Add more details as needed */}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default ProductDetails; 