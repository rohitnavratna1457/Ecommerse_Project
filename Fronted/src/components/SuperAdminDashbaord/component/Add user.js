import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, InputNumber, Upload, Space, Tag, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Checkbox, Row, Col } from 'antd';
import './Products.css';

const { Option } = Select;

const Products = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Lucky',
            password: '12233',
            password2: '12233',
            date: '21-12-2024',
            time: '',
            email: 'lucky@gmail.com',
            mobile_no: '1565624664',
            user_type: 'Admin',
            is_status: true,
            is_admin: true,
            is_superuser: false,
            address: 'Raipur'
        },
        // Add more sample products
    ]);

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Mobile Number',
            dataIndex: 'mobile_no',
            key: 'mobile_no',
            sorter: (a, b) => a.mobile_no - b.mobile_no,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'User Type',
            dataIndex: 'user_type',
            key: 'user_type',
            filters: [
                { text: 'Super Admin', value: 'Super Admin' },
                { text: 'Admin', value: 'Admin' },
                { text: 'Seller', value: 'Seller' },
                { text: 'Customer', value: 'Customer' },
            ],
            onFilter: (value, record) => record.user_type === value,
        },
        {
            title: 'Last Login Date',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => a.date.localeCompare(b.date),
        },
        {
            title: 'Last Login Time',
            dataIndex: 'time',
            key: 'time',
            sorter: (a, b) => a.time.localeCompare(b.time),
        },
        {
            title: 'Is Status',
            dataIndex: 'is_status',
            key: 'is_status',
            render: (is_status) => (
                <Tag color={is_status ? 'green' : 'red'}>
                    {is_status ? 'Yes' : 'No'}
                </Tag>
            ),
        },
        {
            title: 'Is Admin',
            dataIndex: 'is_admin',
            key: 'is_admin',
            render: (is_admin) => (
                <Tag color={is_admin ? 'green' : 'red'}>
                    {is_admin ? 'Yes' : 'No'}
                </Tag>
            ),
        },
        {
            title: 'Is Superuser',
            dataIndex: 'is_superuser',
            key: 'is_superuser',
            render: (is_superuser) => (
                <Tag color={is_superuser ? 'green' : 'red'}>
                    {is_superuser ? 'Yes' : 'No'}
                </Tag>
            ),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            sorter: (a, b) => a.address.localeCompare(b.address),
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
            title: 'Are you sure you want to delete this user?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                setProducts(products.filter(prod => prod.id !== productId));
                message.success('User deleted successfully');
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            if (editingProduct) {
                setProducts(products.map(prod =>
                    prod.id === editingProduct.id ? { ...prod, ...values } : prod
                ));
                message.success('User updated successfully');
            } else {
                const newUser = {
                    id: products.length + 1,
                    ...values,
                    status: 'active'
                };
                setProducts([...products, newUser]);
                message.success('User added successfully');
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
                <h2>Users Management</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalVisible(true)}
                >
                    Add New User
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={products}
                rowKey="id"
                className="products-table"
            />

            <Modal
                title={editingProduct ? "Edit User" : "Add New User"}
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
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="mobile_no"
                                label="Mobile Number"
                                rules={[{ required: true, message: 'Please input your mobile number!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="password2"
                                label="Confirm Password"
                                rules={[{ required: true, message: 'Please confirm your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="user_type"
                                label="User Type"
                                rules={[{ required: true, message: 'Please select your user type!' }]}
                            >
                                <Select>
                                    <Option value="SuperAdmin">Super Admin</Option>
                                    <Option value="Admin">Admin</Option>
                                    <Option value="Seller">Seller</Option>
                                    <Option value="Customer">Customer</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="date"
                                label="Last Login Date"
                            >
                                <Input type="date" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="time"
                                label="Last Login Time"
                            >
                                <Input type="time" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="is_status"
                                valuePropName="checked"
                            >
                                <Checkbox>Is Status</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="is_admin"
                                valuePropName="checked"
                            >
                                <Checkbox>Is Admin</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="is_superuser"
                                valuePropName="checked"
                            >
                                <Checkbox>Is Superuser</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="address"
                                label="Address"
                                rules={[{ required: true, message: 'Please input your address!' }]}
                            >
                                <Input.TextArea rows={2} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default Products;