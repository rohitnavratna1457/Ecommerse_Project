import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, InputNumber, Upload, Space, Tag, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import './Products.css';

const { Option } = Select;

const Products = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingProduct, setEditingProduct] = useState(null);
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'iPhone 13 Pro',
            category: 'Electronics',
            price: 999.99,
            stock: 50,
            status: 'active'
        },
        // Add more sample products
    ]);

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            filters: [
                { text: 'Electronics', value: 'Electronics' },
                { text: 'Fashion', value: 'Fashion' },
            ],
            onFilter: (value, record) => record.category === value,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (price) => `$${price.toFixed(2)}`,
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            sorter: (a, b) => a.stock - b.stock,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    // Handler functions similar to Category component
    const handleEdit = (product) => {
        setEditingProduct(product);
        form.setFieldsValue(product);
        setIsModalVisible(true);
    };

    const handleDelete = (productId) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this product?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                setProducts(products.filter(prod => prod.id !== productId));
                message.success('Product deleted successfully');
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            if (editingProduct) {
                setProducts(products.map(prod =>
                    prod.id === editingProduct.id ? { ...prod, ...values } : prod
                ));
                message.success('Product updated successfully');
            } else {
                const newProduct = {
                    id: products.length + 1,
                    ...values,
                    status: 'active'
                };
                setProducts([...products, newProduct]);
                message.success('Product added successfully');
            }
            handleModalCancel();
        });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setEditingProduct(null);
        form.resetFields();
    };

    return (
        <div className="products-container">
            <div className="products-header">
                <h2>Products Management</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalVisible(true)}
                >
                    Add New Product
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={products}
                rowKey="id"
                className="products-table"
            />

            <Modal
                title={editingProduct ? "Edit Product" : "Add New Product"}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                width={720}
            >
                <Form
                    form={form}
                    layout="vertical"
                    className="product-form"
                >
                    <Form.Item
                        name="name"
                        label="Product Name"
                        rules={[{ required: true, message: 'Please input product name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: 'Please select category!' }]}
                    >
                        <Select>
                            <Option value="Electronics">Electronics</Option>
                            <Option value="Fashion">Fashion</Option>
                            <Option value="Home">Home</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please input price!' }]}
                    >
                        <InputNumber
                            prefix="$"
                            min={0}
                            precision={2}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="stock"
                        label="Stock"
                        rules={[{ required: true, message: 'Please input stock!' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Product Image"
                    >
                        <Upload>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Products;