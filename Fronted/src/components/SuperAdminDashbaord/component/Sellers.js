import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Tag, message, Card, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import './Seller.css';

const Seller = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const [sellers, setSellers] = useState([
        {
            id: 1,
            name: 'John Store',
            email: 'john@store.com',
            phone: '+1234567890',
            status: 'active',
            totalProducts: 45,
            totalSales: 12500,
            joinDate: '2024-01-15'
        },
        // Add more sample data
    ]);

    const columns = [
        {
            title: 'Seller Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
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
                        icon={<EyeOutlined />}
                        onClick={() => handleView(record)}
                    >
                        View
                    </Button>
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

    const handleView = (seller) => {
        setSelectedSeller(seller);
        setIsModalVisible(true);
    };

    const handleEdit = (seller) => {
        // Implement edit functionality
        message.info('Edit functionality to be implemented');
    };

    const handleDelete = (sellerId) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this seller?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                setSellers(sellers.filter(seller => seller.id !== sellerId));
                message.success('Seller deleted successfully');
            },
        });
    };

    return (
        <div className="seller-container">
            <div className="seller-header">
                <h2>Sellers Management</h2>
            </div>

            <Row gutter={[16, 16]} className="seller-stats">
                <Col xs={24} sm={12} lg={8}>
                    <Card>
                        <div className="stat-item">
                            <span className="stat-label">Total Sellers</span>
                            <span className="stat-value">{sellers.length}</span>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <Card>
                        <div className="stat-item">
                            <span className="stat-label">Active Sellers</span>
                            <span className="stat-value">
                                {sellers.filter(s => s.status === 'active').length}
                            </span>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <Card>
                        <div className="stat-item">
                            <span className="stat-label">Total Sales</span>
                            <span className="stat-value">
                                ${sellers.reduce((acc, curr) => acc + curr.totalSales, 0)}
                            </span>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={sellers}
                rowKey="id"
                className="seller-table"
            />

            <Modal
                title="Seller Details"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={600}
            >
                {selectedSeller && (
                    <div className="seller-details">
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <h3>{selectedSeller.name}</h3>
                                <p>Email: {selectedSeller.email}</p>
                                <p>Phone: {selectedSeller.phone}</p>
                                <p>Join Date: {selectedSeller.joinDate}</p>
                                <p>Total Products: {selectedSeller.totalProducts}</p>
                                <p>Total Sales: ${selectedSeller.totalSales}</p>
                                <p>Status: 
                                    <Tag color={selectedSeller.status === 'active' ? 'green' : 'red'}>
                                        {selectedSeller.status.toUpperCase()}
                                    </Tag>
                                </p>
                            </Col>
                        </Row>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Seller; 