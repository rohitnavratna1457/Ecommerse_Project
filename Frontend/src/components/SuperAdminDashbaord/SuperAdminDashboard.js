import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import {
    DashboardOutlined,
    UserOutlined,
    ShoppingOutlined,
    AppstoreOutlined,
    TeamOutlined,
    SettingOutlined
} from '@ant-design/icons';

import Overview from './component/Overview';
import Category from './component/Category';
import Subcategory from './component/Subcategory';
import Products from './component/Products';
import Seller from './component/Sellers';
import './SuperAdminDashboard.css';

const { Header, Sider, Content } = Layout;

const SuperAdminDashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const menuItems = [
        {
            key: 'overview',
            icon: <DashboardOutlined />,
            label: <Link to="/super-admin/overview">Overview</Link>
        },
        {
            key: 'categories',
            icon: <AppstoreOutlined />,
            label: <Link to="/super-admin/categories">Categories</Link>
        },
        {
            key: 'subcategories',
            icon: <AppstoreOutlined />,
            label: <Link to="/super-admin/subcategories">Subcategories</Link>
        },
        {
            key: 'products',
            icon: <ShoppingOutlined />,
            label: <Link to="/super-admin/products">Products</Link>
        },
        {
            key: 'sellers',
            icon: <TeamOutlined />,
            label: <Link to="/super-admin/sellers">Sellers</Link>
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: <Link to="/super-admin/settings">Settings</Link>
        }
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider 
                collapsible 
                collapsed={collapsed} 
                onCollapse={(value) => setCollapsed(value)}
                className="dashboard-sider"
            >
                <div className="logo">
                    {!collapsed && <h2>Super Admin</h2>}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname.split('/')[2] || 'overview']}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header className="dashboard-header">
                    <div className="header-content">
                        <h2>Super Admin Dashboard</h2>
                        <div className="user-info">
                            <UserOutlined />
                            <span>Admin Name</span>
                        </div>
                    </div>
                </Header>
                <Content className="dashboard-content">
                    <Routes>
                        <Route path="/" element={<Overview />} />
                        <Route path="/overview" element={<Overview />} />
                        <Route path="/categories" element={<Category />} />
                        <Route path="/subcategories" element={<Subcategory />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/sellers" element={<Seller />} />
                        <Route path="/settings" element={<div>Settings Page</div>} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};

export default SuperAdminDashboard; 