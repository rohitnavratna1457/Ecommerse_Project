import React from 'react';
import { Row, Col, Card, Statistic, Table, Progress } from 'antd';
import { 
    ShoppingOutlined, 
    UserOutlined, 
    ShoppingCartOutlined, 
    DollarOutlined 
} from '@ant-design/icons';
import './Overview.css';

const Overview = () => {
    const recentOrders = [
        { id: 1, customer: 'John Doe', product: 'iPhone 13', amount: 999, status: 'completed' },
        { id: 2, customer: 'Jane Smith', product: 'MacBook Pro', amount: 1299, status: 'pending' },
        { id: 3, customer: 'Bob Johnson', product: 'iPad Air', amount: 599, status: 'processing' },
    ];

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => `$${amount}`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span className={`status-badge ${status}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            ),
        },
    ];

    return (
        <div className="overview-container">
            <h2>Dashboard Overview</h2>
            
            {/* Statistics Cards */}
            <Row gutter={[16, 16]} className="stats-row">
                <Col xs={24} sm={12} lg={6}>
                    <Card className="stat-card">
                        <Statistic
                            title="Total Sales"
                            value={112893}
                            prefix={<DollarOutlined />}
                            precision={2}
                        />
                        <Progress percent={70} showInfo={false} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="stat-card">
                        <Statistic
                            title="Total Orders"
                            value={1893}
                            prefix={<ShoppingCartOutlined />}
                        />
                        <Progress percent={85} showInfo={false} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="stat-card">
                        <Statistic
                            title="Total Products"
                            value={453}
                            prefix={<ShoppingOutlined />}
                        />
                        <Progress percent={60} showInfo={false} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="stat-card">
                        <Statistic
                            title="Total Customers"
                            value={2458}
                            prefix={<UserOutlined />}
                        />
                        <Progress percent={75} showInfo={false} />
                    </Card>
                </Col>
            </Row>

            {/* Recent Orders */}
            <Card className="recent-orders-card">
                <h3>Recent Orders</h3>
                <Table
                    columns={columns}
                    dataSource={recentOrders}
                    pagination={false}
                    className="orders-table"
                />
            </Card>
        </div>
    );
};

export default Overview;