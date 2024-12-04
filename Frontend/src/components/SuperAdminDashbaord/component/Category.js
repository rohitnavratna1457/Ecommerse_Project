import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Tag, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './Category.css';

const Category = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingCategory, setEditingCategory] = useState(null);
    const [categories, setCategories] = useState([
        { id: 1, name: 'Electronics', status: 'active', products: 150 },
        { id: 2, name: 'Fashion', status: 'active', products: 320 },
        { id: 3, name: 'Home & Living', status: 'inactive', products: 90 },
        // Add more sample data as needed
    ]);

    const columns = [
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
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
            title: 'Total Products',
            dataIndex: 'products',
            key: 'products',
            sorter: (a, b) => a.products - b.products,
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

    const handleEdit = (category) => {
        setEditingCategory(category);
        form.setFieldsValue(category);
        setIsModalVisible(true);
    };

    const handleDelete = (categoryId) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this category?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                setCategories(categories.filter(cat => cat.id !== categoryId));
                message.success('Category deleted successfully');
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            if (editingCategory) {
                // Update existing category
                setCategories(categories.map(cat =>
                    cat.id === editingCategory.id ? { ...cat, ...values } : cat
                ));
                message.success('Category updated successfully');
            } else {
                // Add new category
                const newCategory = {
                    id: categories.length + 1,
                    ...values,
                    products: 0,
                    status: 'active'
                };
                setCategories([...categories, newCategory]);
                message.success('Category added successfully');
            }
            handleModalCancel();
        });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setEditingCategory(null);
        form.resetFields();
    };

    return (
        <div className="category-container">
            <div className="category-header">
                <h2>Categories Management</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalVisible(true)}
                >
                    Add New Category
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={categories}
                rowKey="id"
                className="category-table"
            />

            <Modal
                title={editingCategory ? "Edit Category" : "Add New Category"}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    className="category-form"
                >
                    <Form.Item
                        name="name"
                        label="Category Name"
                        rules={[{ required: true, message: 'Please input category name!' }]}
                    >
                        <Input placeholder="Enter category name" />
                    </Form.Item>

                    {editingCategory && (
                        <Form.Item
                            name="status"
                            label="Status"
                            initialValue={editingCategory.status}
                        >
                            <Input disabled />
                        </Form.Item>
                    )}
                </Form>
            </Modal>
        </div>
    );
};

export default Category;