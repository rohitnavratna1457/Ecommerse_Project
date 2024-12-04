import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, Tag, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './Subcategory.css';

const { Option } = Select;

const Subcategory = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingSubcategory, setEditingSubcategory] = useState(null);
    const [subcategories, setSubcategories] = useState([
        {
            id: 1,
            name: 'Smartphones',
            parentCategory: 'Electronics',
            products: 45,
            status: 'active'
        },
        {
            id: 2,
            name: 'Laptops',
            parentCategory: 'Electronics',
            products: 30,
            status: 'active'
        },
        // Add more sample data
    ]);

    const columns = [
        {
            title: 'Subcategory Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Parent Category',
            dataIndex: 'parentCategory',
            key: 'parentCategory',
            filters: [
                { text: 'Electronics', value: 'Electronics' },
                { text: 'Fashion', value: 'Fashion' },
            ],
            onFilter: (value, record) => record.parentCategory === value,
        },
        {
            title: 'Products',
            dataIndex: 'products',
            key: 'products',
            sorter: (a, b) => a.products - b.products,
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

    const handleEdit = (subcategory) => {
        setEditingSubcategory(subcategory);
        form.setFieldsValue(subcategory);
        setIsModalVisible(true);
    };

    const handleDelete = (subcategoryId) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this subcategory?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                setSubcategories(subcategories.filter(sub => sub.id !== subcategoryId));
                message.success('Subcategory deleted successfully');
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            if (editingSubcategory) {
                setSubcategories(subcategories.map(sub =>
                    sub.id === editingSubcategory.id ? { ...sub, ...values } : sub
                ));
                message.success('Subcategory updated successfully');
            } else {
                const newSubcategory = {
                    id: subcategories.length + 1,
                    ...values,
                    products: 0,
                    status: 'active'
                };
                setSubcategories([...subcategories, newSubcategory]);
                message.success('Subcategory added successfully');
            }
            handleModalCancel();
        });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setEditingSubcategory(null);
        form.resetFields();
    };

    return (
        <div className="subcategory-container">
            <div className="subcategory-header">
                <h2>Subcategories Management</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalVisible(true)}
                >
                    Add New Subcategory
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={subcategories}
                rowKey="id"
                className="subcategory-table"
            />

            <Modal
                title={editingSubcategory ? "Edit Subcategory" : "Add New Subcategory"}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    className="subcategory-form"
                >
                    <Form.Item
                        name="name"
                        label="Subcategory Name"
                        rules={[{ required: true, message: 'Please input subcategory name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="parentCategory"
                        label="Parent Category"
                        rules={[{ required: true, message: 'Please select parent category!' }]}
                    >
                        <Select>
                            <Option value="Electronics">Electronics</Option>
                            <Option value="Fashion">Fashion</Option>
                            <Option value="Home">Home</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Subcategory;